import "./ModalLoading.scss";
import loading from "../../images/loading.png";

function ModalLoading({ modalLoading }) {
  return (
    <>
      {modalLoading ? (
        <div className="loading_modal_wrapper">
          <img src={loading} alt="loading" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ModalLoading;
