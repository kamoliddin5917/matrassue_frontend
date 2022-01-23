import "./Product.scss";
import { useEffect, useState } from "react";
import Shop from "../../assets/shop";
import zoomIn from "../../images/zoom_in.png";

const Product = ({ product, setModal, setModal2, setPr: setProduct }) => {
  const [myProduct, setMyProduct] = useState();
  const [nums, setNums] = useState();

  function pretty(num) {
    const prettyNum = num.split(".")[0].split("").reverse();
    const res = [];
    prettyNum.forEach((num, index) => {
      if ((index + 1) % 3 === 0) {
        res.push(num, " ");
        return;
      }
      res.push(num);
    });
    return res.reverse().join("");
  }
  useEffect(() => {
    setMyProduct(pretty(product.price));
    if (product?.is_on_sale) {
      setNums(pretty(product.sale_price));
    }
  }, [product]);

  function clickHandler(e) {
    setModal(e.target.dataset.id);
  }

  function productHandler(e) {
    setProduct(e.target.attributes.getNamedItem("data-id").value);
    setModal2(true);
  }

  return (
    <li className="products-list__item">
      <button onClick={clickHandler} data-id={product.id}  className="product__zoom-btn product__zoom-btn2">
            <img data-id={product.id} src={zoomIn} alt="" />
          </button>
      <div className="products-list__wr">
        <div className="product__btn-wr">
          {product.is_new && product.is_on_sale ? (
            <>
              <p className="product__isnew ">Yangi mahsulot</p>
              <p className="product__isnew product__sale product__twopart">
                Aksiya
              </p>
            </>
          ) : product.is_new ? (
            <p className="product__isnew">Yangi mahsulot</p>
          ) : product.is_on_sale ? (
            <p className="product__isnew product__sale">Aksiya</p>
          ) : (
            <p className="product__helloworld"></p>
          )}
          
        </div>
        <img src={product.images[0]} className="product__mainim" alt="" />
      </div>
      <div className="products-list__wrapper">
        <h3 className="product__name">{product.name}</h3>
        <ul className="product__detail">
          <li>
            <p className="product__detail-name">Yuklanma</p>
            <p className="product__detail-info">
              <span className="product__detail-number">{product.cargo} </span>
              kg
            </p>
          </li>
          <li>
            <p className="product__detail-name">Kafolat</p>
            <p className="product__detail-info">
              <span className="product__detail-number">
                {`${product.warranty} `}
              </span>
              yil
            </p>
          </li>
          <li>
            <p className="product__detail-name">O’lchami</p>
            <p className="product__detail-info">
              <span className="product__detail-number">
                {product.dimensions}
              </span>
            </p>
          </li>
          <li>
            <p className="product__detail-name">Sig’imi</p>
            <p className="product__detail-info">
              <span className="product__detail-number">
                {`${product.capacity} `}
              </span>
              kishilik
            </p>
          </li>
        </ul>
        <p className="product__info">{product.description}</p>
        <p className="product__price-name">Narxi</p>
        {product.is_on_sale ? (
          <p className="product__detail-info product__detail-info2">
            <span className="product__outline">
              {`${myProduct} `} <span className="product__sum"> so’m</span>
            </span>
            <span className="product__detail-number"> {nums}</span>
            so’m
          </p>
        ) : (
          <p className="product__detail-info">
            <span className="product__detail-number">{myProduct}</span>
            so’m
          </p>
        )}
        <button
          className="product__button"
          data-id={product.id}
          onClick={productHandler}
        >
          Buyurtma berish <Shop />
        </button>
      </div>
    </li>
  );
};

export default Product;
