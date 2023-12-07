import { useContext, useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import LoaderContext from "./context/Loader";
import SearchContainer from "./components/SearchContainer";
import DownloadContent from "./components/DownloadContent";


function App() {
  let {title,error, setError} = useContext(LoaderContext)
  const [showDownloadBar, setShowDownloadBar] = useState(false);

  const handleErrorClick = () => {
    setError(null)
  }

  return (
    <div>
      <h2><FaYoutube className="icon"/> <div><span>You</span>Loader</div></h2>

      <SearchContainer setShowDownloadBar={setShowDownloadBar}/>
      {title !== '' && <DownloadContent showDownloadBar={showDownloadBar} setShowDownloadBar={setShowDownloadBar}/>}
      {
        error !== null && 
        <div className="errorMeesage" onClick={handleErrorClick}>
          <span>{error}</span>
        </div>
      }
    </div>
  );
}

export default App;
