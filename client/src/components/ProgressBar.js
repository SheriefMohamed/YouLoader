import { useEffect, useState } from "react";
import env from 'react-dotenv';

function ProgressBar() {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const socket = require('socket.io-client')(env.SERVER_BASE_URL);

        socket.on('downloadProgress', (data) => {
            setPercent(data.percent.toFixed(0))
        });

    }, [])

    return <div className="progressContainer">
        <div style={{ marginTop: '10px' }}>
            <progress value={percent} max="100" className="progress"></progress>
            {
                percent < 100
                ? <span>{`${percent}%`}</span>
                : <span className="completeDownload">Completed!</span>
            }
        </div>
    </div>
}

export default ProgressBar;