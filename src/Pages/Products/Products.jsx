import "./Products.scss";

// Modules
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Images
import x from "../../images/Vector.svg";
import image from "../../images/Image.png";
import edit from "../../images/edit.svg";
import deleteBtn from "../../images/delete.svg";

// Contexts
import { SearchContext } from "../../Context/SearchContext";

// Assets
import { storage } from "../../assets/firebase";

// Components
import Header from "../../Components/Header/Header";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import ModalLoading from "../../Components/ModalLoading/ModalLoading";

// Hooks
import useAuth from "../../Hooks/useAuth";
import useFetch from "../../Hooks/useFetch";
import port from "../../assets/config";

function Products() {
  const [modalLoading, setModalLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [img, setImg] = useState("");
  const [url, setUrl] = useState([]);
  const [id, setId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);
  const [imgLength, setImgLength] = useState(0);
  const [token] = useAuth(true);

  useEffect(() => {
    (async () => {
      const responsive = await fetch(`${port.url}/categories`, {
        headers: {
          token: token,
        },
      });
      const data = await responsive.json();
      setDataItem(await data);
    })();
  }, [token]);

  // hooks
  const { message, setBody, method, setMethod } = useFetch("/products");
  const { data, setParam, setName } = useContext(SearchContext);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    setName("name");
    setParam("/products/all");
  }, [setName, setParam]);

  const inputChange = (e) => {
    for (let i = 0; i < 4; i++) {
      const image = e.target.files[i];
      const img_name = uuidv4();
      if (typeof image !== "undefined") {
        setImgLength((i) => i + 1);
        const upload = storage.ref(`images/${img_name}`).put(image);
        upload.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          async () => {
            await storage
              .ref("images")
              .child(img_name)
              .getDownloadURL()
              .then((urlImg) => {
                setUrl((prevUrl) => [...prevUrl, urlImg]);
              });
          }
        );
      }
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImg(reader.result);
    };
    setModalLoading(true);
  };

  const checkboxChange = (e) => {
    setMethod("PUT");
    setBody({
      id: e.target.dataset.id,
      is_active: e.target.checked,
    });
    setModalLoading(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".up_input");
    if (inputs.length && url.length) {
      setBody({
        id: id,
        images: url,
        category_id: inputs[1].value,
        name: inputs[2].value,
        price: parseInt(inputs[3].value),
        cargo: parseInt(inputs[4].value),
        dimensions: inputs[5].value,
        warranty: parseInt(inputs[6].value),
        capacity: parseInt(inputs[7].value),
        sale_price: parseInt(inputs[8].value) ? parseInt(inputs[8].value) : null,
        is_on_sale: inputs[9].checked,
        description: inputs[10].value,
        is_new: inputs[11].checked,
        is_active: inputs[12].checked,
      });
    }
    setModalLoading(true);
  };

  const deleteBtnClick = (e) => {
    setMethod("DELETE");
    setBody({
      id: id,
    });
    const deletedProduct = products.filter((item) => item.id !== id);
    setProducts(deletedProduct);
    setModalLoading(true);
    setDeleteModal(false);
  };

  const editBtnClick = (e) => {
    const productValue = JSON.parse(e.target.dataset.product);
    setUrl(productValue.images);
    setImgLength(productValue.images.length)
    setDefaultValue(productValue);
    setId(productValue.id);
    setMethod("PUT");
    setModal(true);
  };

  useEffect(() => {
    if (message !== null) {
      setModalLoading(false);
      setModal(false);
      setImg("");
      if (method === "PUT" || method === "POST") {
        window.location.reload();
      }
    }
    if (url.length === imgLength) {
      setModalLoading(false);
    }
  }, [imgLength, message, method, url]);

  const backgroudStyle = {
    backgroundImage:
      method !== "PUT"
        ? img
          ? `url(${img})`
          : `url(${image})`
        : `url(${defaultValue ? defaultValue.images[0] : img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize:
      method !== "PUT" ? (img ? "auto 100%" : "auto") : "auto 100%",
  };
  return (
    <div>
      <Header input={true} placeholder={"Mahsulotlar"} />
      {products && products.length && products[0].id ? (
        <table>
          <thead>
            <tr>
              <th>Mahsulot nomlari</th>
              <th>Toifalar</th>
              <th>Narxi</th>
              <th>Yuklama</th>
              <th>Razmeri</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category_name}</td>
                  <td>{p.price}</td>
                  <td>{p.cargo}</td>
                  <td>{p.dimensions}</td>
                  <td>
                    <div className="customers_checkbox_wrapper">
                      <label className="checkbox-container customers_checkbox-container">
                        <input
                          defaultChecked={p.is_active}
                          className="customer_input"
                          type="checkbox"
                          data-id={p.id}
                          onChange={checkboxChange}
                        />
                        <span className="checkmark customers_checkmark">
                          <div></div>
                        </span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <button>
                      <img
                        src={edit}
                        data-product={JSON.stringify(p)}
                        alt="edit"
                        onClick={editBtnClick}
                      />
                    </button>
                    <button>
                      <img
                        src={deleteBtn}
                        alt="deleteBtn"
                        onClick={() => {
                          setId(p.id);
                          setDeleteModal(true);
                        }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
      {/* Add Button */}
      <button
        className="add_btn"
        onClick={() => {
          setModal(true);
          setMethod("POST");
        }}
      >
        Qo’shish
      </button>
      {modal ? (
        <div
          className="modal_wrapper"
          onClick={(e) =>
            e.target.classList[0] === "modal_wrapper" ? setModal(false) : ""
          }
        >
          <div className="modal product_modal">
            <h3>Tahrirlash</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="file-input_wrapper" style={backgroudStyle}>
                <label htmlFor="input-file"></label>
                <input
                  multiple
                  required={method === "PUT" ? false : true}
                  className="up_input"
                  id="input-file"
                  type="file"
                  onChange={inputChange}
                />
              </div>
              <small>* 1 dan 4 gacha rasm tanlashingiz mumkin.</small>
              <div className="loaction_wrapper products_inputs_wrapper">
                <label htmlFor="Manzil">Toifalar</label>
                <select
                  required
                  className="up_input product_select"
                  id="Manzil"
                >
                  {dataItem ? (
                    dataItem.map((c) => {
                      return (
                        <option key={c.category_id} value={c.category_id}>
                          {c.category_name}
                        </option>
                      );
                    })
                  ) : (
                    <option selected>Category not avable</option>
                  )}
                </select>
                <label htmlFor="Tovar">Tovar nomi</label>
                <input
                  defaultValue={method === "PUT" ? defaultValue.name : ""}
                  placeholder="masalan: Lux Soft Memory"
                  required
                  className="up_input"
                  id="Tovar"
                  type="text"
                />
                <label htmlFor="Narxi">Narxi</label>
                <input
                  defaultValue={method === "PUT" ? defaultValue.price : ""}
                  placeholder="masalan: 20 000"
                  required
                  className="up_input"
                  id="Narxi"
                  type="text"
                />
                <label htmlFor="Yuklama">Yuklama</label>
                <input
                  defaultValue={method === "PUT" ? defaultValue.cargo : ""}
                  placeholder="masalan: 200 kg"
                  required
                  className="up_input"
                  id="Yuklama"
                  type="text"
                />
              </div>
              <div className="loaction_wrapper products_inputs_wrapper">
                <label htmlFor="Razmeri">Razmeri</label>
                <input
                  defaultValue={method === "PUT" ? defaultValue.dimensions : ""}
                  required
                  className="up_input"
                  id="Razmeri"
                  type="text"
                  placeholder="masalan: 200 x 140 x 40"
                />
                <label htmlFor="Kafolat">Kafolat</label>
                <input
                  defaultValue={method === "PUT" ? defaultValue.warranty : ""}
                  required
                  className="up_input"
                  id="Kafolat"
                  type="text"
                  placeholder="masalan: 1 yil"
                />
                <label htmlFor="Sig’m">Sig’m</label>
                <input
                  defaultValue={method === "PUT" ? defaultValue.capacity : ""}
                  required
                  className="up_input"
                  id="Sig’m"
                  type="text"
                  placeholder="masalan: 2"
                />
                <label className="tick_wrapper">
                  <p>Aksiya Narxi</p>
                  <input
                    defaultValue={
                      method === "PUT" ? defaultValue.sale_price : ""
                    }
                    className="up_input"
                    type="text"
                    placeholder="masalan: 1 200 000"
                  />
                </label>
                <label className="tick_wrapper">
                  <input
                    defaultChecked={
                      method === "PUT" ? defaultValue.is_on_sale : false
                    }
                    className="up_input"
                    type="checkbox"
                  />
                  <span className="tick"></span>
                </label>
              </div>
              <div className="textarea_wrapper loaction_wrapper products_inputs_wrapper">
                <label htmlFor="Matn">
                  <p>Ma’lumot</p>
                  <textarea
                    defaultValue={
                      method === "PUT" ? defaultValue.description : ""
                    }
                    required
                    className="up_input"
                    id="Matn"
                    cols="30"
                    rows="10"
                    placeholder="info..."
                  ></textarea>
                </label>
                <section className="product_section">
                  <label className="checkbox-container">
                    New
                    <input
                      defaultValue={
                        method === "PUT" ? defaultValue.is_new : true
                      }
                      defaultChecked={true}
                      className="up_input"
                      type="checkbox"
                    />
                    <span className="checkmark">
                      <div></div>
                    </span>
                  </label>
                </section>
                <section className="product_section">
                  <label className="checkbox-container">
                    Active
                    <input
                      defaultValue={
                        method === "PUT" ? defaultValue.product_is_active : true
                      }
                      defaultChecked={true}
                      className="up_input"
                      type="checkbox"
                    />
                    <span className="checkmark">
                      <div></div>
                    </span>
                  </label>
                </section>
                <button className="addBtn" type="submit">
                  Saqlash
                </button>
              </div>
            </form>
            <button className="btn_x" onClick={() => setModal(false)}>
              <img src={x} alt="x" />
            </button>
          </div>

          {/* loading modal */}
        </div>
      ) : (
        ""
      )}
      <ModalLoading modalLoading={modalLoading} />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteBtnClick={deleteBtnClick}
      />
    </div>
  );
}

export default Products;
