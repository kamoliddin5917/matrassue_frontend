import "./VideoModal.scss";
import ReactPlayer from "react-player";
import xbtn from "../../images/xbtnyellow.png";
const VideoModal = ({ url, setPlayVideo }) => {
  console.log(url);
  const closeModal = () => {
    setPlayVideo(false);
  };
  return (
    <div
      className="video-modal"
      onClick={(e) =>
        e.target.classList[0] === "video-modal" ? setPlayVideo(false) : ""
      }
    >
      <div className="video-wrapper">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          className="reactPlayer"
          controls={true}
        />
        <button className="close-modal" onClick={closeModal}>
          <img src={xbtn} alt="img" width={30} height={30} />
        </button>
      </div>
    </div>
  );
};
export default VideoModal;
