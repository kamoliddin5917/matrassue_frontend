// Styles
import "./Home.scss";
// React
import { useEffect, useState, useRef } from "react";
// Component
import HeaderPrimary from "../../Components/HeaderPrimary/HeaderPrimary";
import Footer from "../../Components/Footer/Footer";
import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import HeroSliderController from "../../Components/HeroSliderController/HeroSliderController";
import AdresImgSlider from "../../Components/AdresImgSlider/AdresImgSlider";
import AdresInfoSlider from "../../Components/AdresInfoSlider/AdresInfoSlider";
import ProductBtn from "../../Components/ProductBtn/ProductBtn";
import Product from "../../Components/Product/Product";
import ZoomModal from "../../Components/ZoomModal/ZoomModal";
import Communication from "../../Components/Communication/Communication";
import OrderModal from "../../Components/OrderModal/orderModal";
import VideoModal from "../../Components/VideoModal/VideoModal";

// Images
import memariform from "../../images/memariform.png";
import tabiiyLateks from "../../images/tabiiy-lateks.png";
import mustaqilPrujina from "../../images/mustaqil-prujina.png";
import penatibus from "../../images/Penatibus.png";
import libero from "../../images/Libero.png";
import deliver from "../../images/deliver.png";
import support from "../../images/support.png";
import warranty from "../../images/warranty.png";
import play from "../../images/play.png";
import arrow from "../../images/icons/arrow.png";
import ArrowRight from "../../assets/arrow-right";
// port
import port from "../../assets/config";

const Home = () => {
  const [btns, setBtns] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("barchasi");
  const [modal, setModal] = useState(false);
  const [modalim, setModalim] = useState(false);
  const [pr, setPr] = useState();
  const [width, setWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(8);
  const [btnList, setBtnList] = useState(150);
  const [activeBtn, setActiveBtn] = useState(false);
  const [activeBtnNext, setActiveBtnNext] = useState(false);
  const [activeBtnNextClick, setActiveBtnNextClick] = useState(true);
  const [addressSlider, setAddressSlider] = useState([]);

  const [videoUrl, setVideoUrl] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const productTop = useRef();
  const btnPrev = useRef();
  const btnNext = useRef();
  const btnsUl = useRef();
  const listCate = useRef();

  useEffect(() => {
    fetch(`${port.url}/categories`)
      .then((data) => data.json())
      .then((d) => {
        if (d && d.length) {
          setBtns(d);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${port.url}/products/all_active`)
      .then((data) => data.json())
      .then((d) => {
        if (d && d.length) {
          setProducts(d);
        }
      });
  }, []);

  useEffect(() => {
    if (
      window.innerWidth <
      +btnsUl.current.style.width.slice(
        0,
        btnsUl.current.style.width.length - 2
      )
    ) {
      setActiveBtnNext(true);
    } else {
      setActiveBtnNext(false);
    }
    // btns
    if (
      +window
        .getComputedStyle(listCate.current)
        .width.slice(
          0,
          window.getComputedStyle(listCate.current).width.length - 2
        ) <= 100
    ) {
      setWindowWidth(3);
      setBtnList(100);
    } else {
      setWindowWidth(8);
      setBtnList(150);
    }
  }, [btns]);
  useEffect(() => {
    fetch(`${port.url}/addresses`)
      .then((data) => data.json())
      .then((d) => {
        if (d) {
          setAddressSlider(d);
        }
      });
  }, []);

  const nextBtn = () => {
    if (-((btns.length - windowWidth) * btnList) === width) {
      setActiveBtnNextClick(false);
    } else {
      setWidth(width - btnList);
      setActiveBtn(true);

      if (-((btns.length - windowWidth) * btnList) + btnList === width) {
        setActiveBtnNextClick(false);
      }
    }
  };
  const prevBtn = () => {
    if (0 > width) {
      setWidth(width + btnList);
      setActiveBtnNextClick(true);
    } else {
      setWidth(0);
      setActiveBtn(false);
    }
    if (width === -btnList) {
      setActiveBtn(false);
    }
  };
  const clickPlay = (e) => {
    setPlayVideo(true);
    setVideoUrl(e.target.dataset.url);
  };
  return (
    <>
      <section className="hero" id="hero-id">
        <div className="container--home">
          <HeaderPrimary modal={modalim} setModal={setModalim} />
          <div className="hero-body">
            <div className="hero-left">
              <h1 className="hero__title">Kechalari sokin dam oling</h1>
              <a className="btn hero__btn" href="#category">
                Kategoriyalar
                <ArrowRight  />
              </a>
              <HeroSliderController />
            </div>
            <div className="hero-right">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>
      <section className="statistics ">
        <div className="container--home">
          <ul className="statistics-list">
            <li className="statistics-list__item">
              <h1 className="statistics-title">7</h1>
              <p className="statistics-description">yillik tajriba</p>
            </li>
            <li className="statistics-list__item">
              <h1 className="statistics-title">10k+</h1>
              <p className="statistics-description">mamnun mijozlar</p>
            </li>
            <li className="statistics-list__item">
              <h1 className="statistics-title">10</h1>
              <p className="statistics-description">yillik kafolat</p>
            </li>
            <li className="statistics-list__item">
              <h1 className="statistics-title">3</h1>
              <p className="statistics-description">kunda yetkazish</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="product" id="category">
        <div ref={productTop} className="product-top">
          <div className="container--home">
            <h2 className="secondary-heading">Bizning mahsulotlar </h2>

            <div className="arrows">
              <button
                ref={btnPrev}
                className={`arrows__btn arrows__btn--prev ${
                  activeBtn && "arrows__btn-active"
                }`}
                onClick={prevBtn}
              >
                <img src={arrow} alt="prev" />
              </button>
              <button
                ref={btnNext}
                className={`arrows__btn ${
                  activeBtnNextClick && activeBtnNext && "arrows__btn-active"
                }`}
                onClick={nextBtn}
              >
                <img src={arrow} alt="next" />
              </button>
            </div>

            <div className="slider_box"></div>

            <ul
              ref={btnsUl}
              className="product-card"
              style={{
                width: 150 * btns.length,
                transform: `translateX(${width}px)`,
              }}
            >
              <li
                onClick={() => {
                  setCategoryId("barchasi");
                }}
                className={
                  categoryId === "barchasi" ? "list list-active " : "list"
                }
                ref={listCate}
              >
                <span>Barchasi</span>
              </li>

              {btns.length ? (
                <>
                  {btns.map(
                    (btn, i) =>
                      btn.category_is_active && (
                        <ProductBtn
                          key={i}
                          btn={btn}
                          categoryId={categoryId}
                          setCategoryId={setCategoryId}
                        />
                      )
                  )}
                </>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="product-bottom">
          <div className="container--product">
            <ul>
              {products.length ? (
                <>
                  {products.map((product, id) =>
                    categoryId === "barchasi" ? (
                      <Product
                        setPr={setPr}
                        setModal2={setModalim}
                        key={id}
                        product={product}
                        modal={modal}
                        setModal={setModal}
                      />
                    ) : categoryId === product.category_id ? (
                      <Product
                        setPr={setPr}
                        setModal2={setModalim}
                        key={id}
                        product={product}
                        modal={modal}
                        setModal={setModal}
                      />
                    ) : null
                  )}
                </>
              ) : (
                <h1>Hozir bu mahsulot yo'q, tez orada chiqadi :)</h1>
              )}
            </ul>

            <h2
              className="secondary-heading"
              style={{ marginTop: "100px", marginBottom: "60px" }}
              id="discount"
            >
              Aksiyadagi mahsulotlar
            </h2>

            <ul>
              {products.length ? (
                products.map(
                  (product, id) =>
                    product.is_on_sale && (
                      <Product
                        setPr={setPr}
                        setModal2={setModalim}
                        modal={modal}
                        products={products}
                        setModal={setModal}
                        key={id}
                        product={product}
                      />
                    )
                )
              ) : (
                <h1>Hozir aksiyadagi mahsulot yo'q, tez orada chiqadi :)</h1>
              )}
            </ul>
          </div>
        </div>
        <OrderModal
          pr={pr}
          setPr={setPr}
          modal={modalim}
          setModal={setModalim}
        />
        <ZoomModal productsAll={products} modal={modal} setModal={setModal} />
      </section>
      <section className="about-us">
        <div className="container--home">
          <h2 className="secondary-heading" style={{ marginTop: "138px" }}>
            Ishlab chiqarish texnologiyalari
          </h2>
          <ul className="technologies">
            <li className="technologies__item">
              <p className="technologies__title">Memoriform</p>
              <img
                src={memariform}
                data-url="https://www.youtube.com/watch?v=MWRIHCqbPAg"
                onClick={clickPlay}
                className="technologies__img"
                alt="img"
              />
              <img
                src={play}
                data-url="https://www.youtube.com/watch?v=MWRIHCqbPAg"
                onClick={clickPlay}
                className="technologies__play"
                alt="img"
              />
              <p className="technologies__text">
                Lectus pellentesque senectus elit donec massa ipsum ultricies
                dui. Bibendum et enim fringilla tincidunt ligula non,
                condimentum nunc.
              </p>
            </li>
            <li className="technologies__item">
              <p className="technologies__title">Tabiiy lateks</p>
              <img
                src={tabiiyLateks}
                data-url="https://www.youtube.com/watch?v=bo4rJSlUeus"
                onClick={clickPlay}
                className="technologies__img"
                alt="img"
              />
              <img
                src={play}
                data-url="https://www.youtube.com/watch?v=bo4rJSlUeus"
                onClick={clickPlay}
                className="technologies__play"
                alt="img"
              />
              <p className="technologies__text">
                Aliquam euismod ornare justo, sed faucibus eu. Sed amet tellus
                netus quis bibendum. Euismod diam eu sem tristique aenean
                rhoncus.
              </p>
            </li>
            <li className="technologies__item">
              <p className="technologies__title">Mustaqil prujina</p>
              <img
                src={mustaqilPrujina}
                data-url="https://www.youtube.com/watch?v=h6nc1rXwxAc"
                onClick={clickPlay}
                className="technologies__img"
                alt="img"
              />
              <img
                src={play}
                data-url="https://www.youtube.com/watch?v=h6nc1rXwxAc"
                onClick={clickPlay}
                className="technologies__play"
                alt="img"
              />
              <p className="technologies__text">
                Enim urna consequat, justo, cras tincidunt imperdiet orci
                sodales. Dui purus feugiat morbi quam orci, vel. Elementum
                tincidunt blandit ultricies venenatis rhoncus.
              </p>
            </li>
          </ul>
          {playVideo ? (
            <VideoModal url={videoUrl} setPlayVideo={setPlayVideo} />
          ) : (
            ""
          )}
          <ul className="company-list" id="about-us">
            <li className="company-list__item">
              <div className="company-list__item__wrapper">
                <h2 className="secondary-heading company__heading ">
                  Mattrassue kompaniyasi haqida
                </h2>
                <p className="company__text">
                  Penatibus viverra gravida rhoncus in. At turpis morbi ante
                  tortor a est. Habitant adipiscing ut sed pulvinar tellus, ut
                  urna, fermentum:
                </p>
                <div className="company-list__wrapper">
                  <ul className="penatibus-list">
                    <li className="penatibus-list__item">
                      <p className="penatibus-list__text">
                        Penatibus viverra gravida rhoncus in.
                      </p>
                    </li>
                    <li className="penatibus-list__item">
                      <p className="penatibus-list__text">
                        Dolor integer in interdum viverra risus dolor enim.
                      </p>
                    </li>
                    <li className="penatibus-list__item">
                      <p className="penatibus-list__text">
                        Turpis senectus eu, eget aenean nulla pellentesque sed
                        ut tempor.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="company-img-wrapper">
                <img
                  src={penatibus}
                  onClick={clickPlay}
                  data-url="https://www.youtube.com/watch?v=NnlUn5_k770"
                  className="company__img"
                  alt="img"
                />
                <img
                  src={play}
                  onClick={clickPlay}
                  data-url="https://www.youtube.com/watch?v=NnlUn5_k770"
                  className="company__play"
                  alt="img"
                />
              </div>
            </li>
            <li className="company-list__item">
              <div>
                <img src={libero} className="company__img" alt="img" />
              </div>
              <div className="company-list__item--wrapper">
                <p className="company__text company--text">
                  Libero erat praesent ullamcorper eget tortor sed et. Nec id
                  lobortis gravida vitae. Scelerisque id fusce vitae ut. Integer
                  sed vulputate sed nec. Arcu id mattis erat et id.{" "}
                </p>
                <div className="company-list__wrapper company-list--wrapper">
                  <ul className="libero-list">
                    <li className="libero-list__item">
                      <p className="libero-list__numeric">1.</p>
                      <p className="libero-list__text">
                        Id risus phasellus laoreet eget. A nec pulvinar.
                      </p>
                    </li>
                    <li className="libero-list__item">
                      <p className="libero-list__numeric">2.</p>
                      <p className="libero-list__text">
                        Eu justo, tincidunt fringilla diam nulla.
                      </p>
                    </li>
                    <li className="libero-list__item">
                      <p className="libero-list__numeric">3.</p>
                      <p className="libero-list__text">
                        Amet, nullam cras lacus, fermentum leo tellus sagittis.
                      </p>
                    </li>
                    <li className="libero-list__item">
                      <p className="libero-list__numeric">4.</p>
                      <p className="libero-list__text">
                        Facilisi mauris condimentum sagittis odio rhoncus
                        semper.
                      </p>
                    </li>
                  </ul>
                </div>
                <p className="company__text company--text">
                  Ac tortor volutpat pellentesque mauris nisi, praesent. Et
                  tempus accumsan est elementum feugiat arcu mauris tincidunt.
                  Eget faucibus pharetra et luctus eget ut fames. A cursus
                  elementum egestas eu scelerisque id.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="info">
        <div className="container--home">
          <h2 className="secondary-heading info__heading">
            Nega bizni tanlashadi
          </h2>
          <ul className="info-list">
            <li className="info-list__item">
              <img className="info-list__img" src={deliver} alt="img" />
              <h4 className="info-list__title">Yetkazib berish</h4>
              <p className="info-list__text">
                Toshkent bo'ylab bepul o'lchov va etkazib berish
              </p>
            </li>
            <li className="info-list__item">
              <img className="info-list__img" src={support} alt="img" />
              <h4 className="info-list__title">Qo'llab-quvvatlash</h4>
              <p className="info-list__text">
                Bizning qo'llab-quvvatlash xizmati sizga har qanday savolda
                yordam beradi va menejerlarning{" "}
              </p>
              <a href="tel:+99897144-24-42" className="info-list__link">
                +998 97 144-24-42
              </a>
            </li>
            <li className="info-list__item">
              <img className="info-list__img" src={warranty} alt="img" />
              <h4 className="info-list__title">Kafolat</h4>
              <p className="info-list__text">
                Biz matraslarimiz uchun 8 yilgacha kafolat beramiz. Agar matras
                kamida 25 mm qisqartirilsa.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="address" id="address">
        <div className="container--home">
          <div className="address-info">
            <h2 className="address-info__heading secondary-heading">
              Manzilimiz
            </h2>
            <AdresInfoSlider address={addressSlider} />
          </div>
          <AdresImgSlider address={addressSlider} />
        </div>
      </section>
      <Communication />
      <Footer />
    </>
  );
};
export default Home;
