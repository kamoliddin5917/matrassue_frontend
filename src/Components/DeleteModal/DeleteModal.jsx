import "./DeleteModal.scss";

function DeleteModal({ deleteModal, setDeleteModal, deleteBtnClick }) {
  return (
    <>
      {deleteModal ? (
        <div className="delete_modal_wrapper">
          <h3>Haqiqatdan ham o’chirmoqchimisiz?</h3>
          <div className="delete_btn_wrapper">
            <button onClick={() => setDeleteModal(false)}>YO’Q</button>
            <button onClick={deleteBtnClick}>HA</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DeleteModal;
