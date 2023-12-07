import { useContext } from "react";
import LoaderContext from "../context/Loader";
import { formatFileSize, calculateSize } from "../utils/BytesCalculation";
import ProgressBar from "./ProgressBar";


function DownloadContent({showDownloadBar,setShowDownloadBar}){
    let {title, formats, duration, downloadVid} = useContext(LoaderContext);


    const renderedFormats = formats.map(format => {
        return <div key={format.bitrate} className="qualityContent" onClick={() => {
            setShowDownloadBar(true)
            downloadVid(format);
        }}>
            <div className="quality">{format.qualityLabel}</div>
            <div className="type">{format.hasAudio ? 'V/A' : 'V'}</div>
            <div className="size">{formatFileSize(calculateSize(format.hasAudio ? format.bitrate+format.audioBitrate : format.bitrate, duration))}</div>
        </div>
    })

    return <div className="container">
        <div className="videoTitle"><span>Title</span>: {title}</div>
        <div className="downloadTitle">Download</div>
        <div className="qualitiesContainer">
            {renderedFormats}
        </div>
        {showDownloadBar && <ProgressBar />}
    </div>
}

export default DownloadContent;