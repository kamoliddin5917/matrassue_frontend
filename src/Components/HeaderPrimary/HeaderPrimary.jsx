import "./HeaderPrimary.scss";
import { useState } from "react";
import logo from "../../images/logo-header.png";
import burger from "../../images/burger.png";
import call from "../../images/Call.svg";
import closeBtn from "../../images/closeBtn.png";

const HeaderPrimary = ({ modal, setModal }) => {
  const [burgerModal, setBurgerModal] = useState(false);
  const clickNav = () => {
    setBurgerModal(false);
  };
  return (
    <div
      className="header"
      onKeyUp={(e) => {
        if (e.keyCode === 27) {
          setModal(false);
        }
      }}
    >
      <ul className="nav-list">
        <li className="nav-list__item">
          <a href="#category" className="nav-list__link">
            Katalog
          </a>
        </li>
        <li className="nav-list__item">
          <a href="#discount" className="nav-list__link">
            Aksiya
          </a>
        </li>
        <li className="nav-list__item">
          <a href="#about-us" className="nav-list__link">
            Biz haqimizda
          </a>
        </li>
        <li className="nav-list__item">
          <a href="#address" className="nav-list__link">
            Manzilimiz
          </a>
        </li>
        <li className="nav-list__item">
          <a href="#communication" className="nav-list__link">
            Aloqa
          </a>
        </li>
      </ul>
      <div className="header-bottom">
        <div>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>

        <ul className="header-list">
          <li className="header-list__item">
            <a href="tel:+998901234567" className="header-list__link">
              +998 90 123 45 67
            </a>
          </li>
          <li className="header-list__item">
            <button className="btn order" onClick={() => setModal(true)}>
              Buyurtma berish
            </button>
          </li>
        </ul>
        <button className="burger">
          <img src={burger} alt="burger" onClick={() => setBurgerModal(true)} />
        </button>
      </div>

      {/* Mobile Modal */}
      {burgerModal ? (
        <div className="burger_modal">
          <div className="burger_modal__logo">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
            <button className="burger">
              <img
                src={closeBtn}
                alt="burger"
                onClick={() => setBurgerModal(false)}
              />
            </button>
          </div>
          <ul className="nav-list_mobile">
            <li className="nav-list_mobile__item">
              <a
                href="#category"
                className="nav-list_mobile__link"
                onClick={clickNav}
              >
                Katalog
              </a>
            </li>
            <li className="nav-list_mobile__item">
              <a
                href="#discount"
                className="nav-list_mobile__link"
                onClick={clickNav}
              >
                Aksiya
              </a>
            </li>
            <li className="nav-list_mobile__item">
              <a
                href="#about-us"
                className="nav-list_mobile__link"
                onClick={clickNav}
              >
                Biz haqimizda
              </a>
            </li>
            <li className="nav-list_mobile__item">
              <a
                href="#address"
                className="nav-list_mobile__link"
                onClick={clickNav}
              >
                Manzilimiz
              </a>
            </li>
            <li className="nav-list_mobile__item">
              <a
                href="#communication"
                className="nav-list_mobile__link"
                onClick={clickNav}
              >
                Aloqa
              </a>
            </li>
            <li className="nav-list_mobile__item">
              <button
                className="btn order nav-list_mobile__btn"
                onClick={() => setModal(true)}
              >
                Buyurtma berish
              </button>
            </li>
            <li className="nav-list_mobile__item">
              <a
                href="tel:+998901234567"
                className="header-list__link call__link"
              >
                <img src={call} alt="call" />
                +998 90 123 45 67
              </a>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default HeaderPrimary;
