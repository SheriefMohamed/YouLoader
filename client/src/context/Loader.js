import { createContext, useState } from "react";
import axios from "axios";
import { sanitizeFilename } from "../utils/BytesCalculation";
import env from 'react-dotenv';

const LoaderContext = createContext();

function Provider({ children }){
    const [title, setTitle] = useState('');
    const [formats, setFormats] = useState([]);
    const [duration, setDuration] = useState([]);
    const [ytLink, setYtLink] = useState('');
    const [ytPermanentLink, setYtPermanentLink] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const baseUrl = env.SERVER_BASE_URL

    const getInfo = async () => {
        setLoading(true);
        setTimeout(async ()=>{
            try{
                const response = await axios.post(`${baseUrl}/info`, {
                    link: ytLink
                });
                setTitle(response.data.data.title);
                setFormats(response.data.data.formats);
                setDuration(response.data.data.duration);
                setYtPermanentLink(ytLink)
                setYtLink('')
                setLoading(false);
            } catch(err){
                setError(err.response.data.message)
                setLoading(false);
            }
        }, 2000)
    }

    const downloadVid = async (format) => {
        setLoading(true);
        setTimeout(async ()=>{
            try{
                const response = await axios.post(`${baseUrl}/download`, {
                    link: ytPermanentLink,
                    format: format
                }, { responseType: 'blob' });
                const blob = new Blob([response.data], { type: 'video/mp4' });

                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = `${sanitizeFilename(title)}_${format.qualityLabel}.mp4`;

                document.body.appendChild(downloadLink);
                downloadLink.click();

                document.body.removeChild(downloadLink);

                setLoading(false);
            } catch(err){
                setError(err.response.data.message)
                setLoading(false);
            }
        }, 2000)
    }

    const valueToShare = {
        title,
        ytLink,
        formats,
        duration,
        error,
        loading,
        setError,
        setYtLink,
        getInfo,
        downloadVid
      }
    
      return <LoaderContext.Provider value={valueToShare}>
            {children}
        </LoaderContext.Provider>;
}

export { Provider };
export default LoaderContext;