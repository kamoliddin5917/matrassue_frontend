import "./ZoomModal.scss";
import xbtn from "../../images/xbtnyellow.png";
import { useEffect, useState } from "react";

function ZoomModal({ modal, setModal, productsAll }) {
  const [imgs, setimgs] = useState();
  const [num, setNum] = useState(0);
  function modalHandler(e) {
    if (
      e.target.classList.value === "zmodal__wr" ||
      e.target.classList.value === "zmodal__btn" ||
      e.target.classList.value === "zmodal__btnimg"
    ) {
      setModal(false);
    }
  }
  useEffect(() => {
    productsAll.forEach((element) => {
      if (element.id === modal) {
        setimgs(element.images);
      }
    });
  }, [modal, productsAll]);

  function btnHandler(e) {
    document
      .querySelector(".zmodal__btn-act")
      .classList.remove("zmodal__btn-act");
      console.log();
    document.querySelectorAll(".zmodal__change-btn")[e.target.dataset.id].classList.add("zmodal__btn-act");
    setNum(e.target.dataset.id);
  }
  return (
    <>
      {modal && imgs ? (
        <div className="zmodal__wr" onClick={modalHandler}>
          <button className="zmodal__btn" onClick={modalHandler}>
            <img className="zmodal__btnimg" src={xbtn} alt="" />
          </button>
          <div>
            <img
              className="zmodal_mainimg"
              src={imgs[num]}
              width="775"
              height="355"
              alt="mainimg"
            />
            <ul className="zmodal__list">
              {imgs.map((img, index) => {
                return (
                  <li key={index}>
                    {index === 0 ? (
                      <button
                        className="zmodal__change-btn zmodal__btn-act"
                        data-id={index}
                        onClick={btnHandler}
                      >
                        <img
                          className="zmodal_btn-img"
                          data-id={index}
                          src={img}
                          alt="images"
                        />
                      </button>
                    ) : (
                      <button
                        className="zmodal__change-btn"
                        data-id={index}
                        onClick={btnHandler}
                      >
                        <img
                          className="zmodal_btn-img"
                          data-id={index}
                          src={img}
                          alt="images"
                        />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ZoomModal;
