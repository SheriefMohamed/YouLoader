const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const ytdl = require('ytdl-core');
const { sanitizeFilename } = require('./utils/sanitizeFilename');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());

app.use(cors());

app.post('/info', async (req, res) => {
    try{
        const videoUrl = req.body.link

        if(!videoUrl){
            return res.status(400).json({
                success: false,
                message: "Select youtuble video link"
            })
        }

        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid YouTube video URL" });
        }

        const videoInfo = await ytdl.getInfo(videoUrl);

        const formats = videoInfo.formats.filter(format => {
            if(format.container === 'mp4' && format.qualityLabel !== null){
                return format
            }
        })

        res.json({
            success: true,
            data: {
                title: videoInfo.videoDetails.title,
                formats: formats,
                duration: videoInfo.videoDetails.lengthSeconds
            }
        })
    } catch(error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

app.post('/download', async (req, res) => {
    try {
        const videoUrl = req.body.link;
        const format = req.body.format;

        if(!videoUrl){
            return res.status(400).json({
                success: false,
                message: "Select youtuble video link"
            })
        }
        if(!format){
            return res.status(400).json({
                success: false,
                message: "Select format"
            })
        }

        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid YouTube video URL" });
        }

        const videoInfo = await ytdl.getInfo(videoUrl);
        res.header('Content-Disposition', `attachment; filename="ToutubeVid.mp4"`);
        res.header('Content-Type', 'video/mp4');

        const videoStream = ytdl(videoUrl, { format });

        videoStream.pipe(res);

        videoStream.on('progress', (chunkLength, downloaded, total) => {
            const percent = (downloaded / total) * 100;
            io.emit('downloadProgress', { percent });
        });

        videoStream.on('error', (error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Runnining on port ${PORT}`);
})