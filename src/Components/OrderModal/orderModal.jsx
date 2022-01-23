import "./orderModal.scss";

import { useEffect, useRef, useState } from "react";

import xbtn from "../../images/xbtn.png";
import monster from "../../images/monster.png";

function OrderModal({ modal, setModal , pr , setPr}) {
  const [allProduct, setAllProduct] = useState();
  const [amount, setAmount] = useState(1);
  const [res, setRes] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [defValue , setDefValue] = useState()
  const customernameRef = useRef();
  const customerphoneRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    fetch("https://mattrassue.herokuapp.com/products/all_active")
      .then((res) => res.json())
      .then((data) => setAllProduct(data));
  }, []);

  useEffect(() => {
    if(pr) {
       setDefValue(pr)
    }
  }, [pr]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorModal(false);

    let userName = customernameRef.current.value;
    let userPhone = customerphoneRef.current.value;
    let id = selectRef.current.value;

    const phone = new RegExp("[0-9]", "gi");
    const checkedPhone = userPhone.match(phone);

    const user = new RegExp(
      "^(?=.{3,20}$)(?![_.])[a-zA-Z0-9._ ]+(?<![_.])$",
      "gi"
    );
    const checkedUser = userName.match(user);

    if (checkedUser !== null && checkedPhone.length === 9 && id.length) {
      const obj = {
        customerName: userName,
        customerPhone: `+998 ${userPhone}`,
        productID: id,
        amount: amount,
      };

      fetch("https://mattrassue.herokuapp.com/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => setRes(data))
        .catch((err) => console.log(err));
    } else {
      setErrorModal(true);
    }
  };
  return (
    <>
      {modal ? (
        <div className="container orderModal_container">
          <div
            className="order-modal"
            onClick={(e) =>
              e.target.classList[0] === "order-modal" ? setModal(false) : ""
            }
          >
            <div className="modal-content">
              <button className="xbtn">
                <img src={xbtn} alt="x-btn" onClick={(e) => setModal(false)} />
              </button>
              {res === null ? (
                <div className="order-box">
                  <h2 className="form-text">Buyurtma qilish</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      ref={customernameRef}
                      placeholder="Ismingizni yozing"
                      required
                    />
                    <input
                      type="text"
                      ref={customerphoneRef}
                      className="number-input"
                      placeholder="Raqamingizni yozing"
                    />
                    <label className="productName-text">
                      Mahsulot nomini tanlang
                      <select className="productSelect" ref={selectRef} id="option">
                        <option value="" defaultValue key={""}></option>
                        {allProduct
                          ? allProduct.map((p) => {
                            if(p.id === defValue) {
                              
                              return (
                                <option selected={true} value={p.id} key={p.id}>
                                  {p.name}
                                </option>
                              );
                            }
                              return (
                                <option value={p.id} key={p.id}>
                                  {p.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </label>
                    <label>Miqdorini tanlang</label>
                    <div className="count-box">
                      <button
                        className="btns minus-btn"
                        type="button"
                        onClick={(e) => {
                          if (amount >= 2) setAmount(amount - 1);
                        }}
                      >
                        -
                      </button>
                      <p className="amount">{amount}</p>
                      <button
                        className="btns plus-btn"
                        type="button"
                        onClick={(e) => {
                          setAmount(amount + 1);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button className="submit-btn" type="submit">
                      Yuborish
                    </button>
                  </form>
                </div>
              ) : (
                ""
              )}

              {res && res.message === "added" ? (
                <div className="response-box">
                  <h3>Arizangiz muvaffaqiyatli yuborildi</h3>
                  <img src={monster} alt="monster" />
                  <p>Tez orada operatorlarimiz siz bilan bog’lanishadi</p>
                  <button
                    className="ok-btn"
                    type="button"
                    onClick={(e) => {
                      setModal(false);
                      setRes(null);
                      setAmount(1);
                    }}
                  >
                    {" "}
                    Ok{" "}
                  </button>
                </div>
              ) : (
                ""
              )}

              {errorModal ? (
                <div className="error-modal">
                  <h3 className="err-txt">
                    Iltimos, ma'lumotlaringizni to'liq kirgizing!
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default OrderModal;
