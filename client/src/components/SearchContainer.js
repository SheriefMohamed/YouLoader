import { useContext } from "react";
import LoaderContext from "../context/Loader";

function SearchContainer({setShowDownloadBar}){
    let {loading, getInfo, setYtLink, ytLink} = useContext(LoaderContext)

    const handleSearchEvent = () => {
        if(!loading){
          getInfo();
          setShowDownloadBar(false)
        }
      }
    
    const handleLinkChange = (e) => {
        setYtLink(e.target.value)
    }

    return <div className="container">
    <label ><span>Youtube</span> Link</label>
    <div className="infoContainer">
      <input value={ytLink} onChange={handleLinkChange}></input>
      <button className="searchBtn" onClick={handleSearchEvent}>
        {
        loading
        ? <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        : 'Search'
        }
      </button>
    </div>
  </div>
}

export default SearchContainer;