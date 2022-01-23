import "./Footer.scss";
import { Link } from "react-router-dom";

import facebookIcon from "../../images/icons/facebook.png";
import twitterIcon from "../../images/icons/twitter.png";
import vimeoIcon from "../../images/icons/vimeo.png";
import youtubeIcon from "../../images/icons/youtube.png";
import authorLogo from "../../images/author-logo.png";
import Arrow from "../../assets/arrow";

function Footer() {
  return (
    <footer className="footer">
      <div className="container--home">
        <section className="footer-above">
          <ul className="footer-above-nav">
            <li className="footer-above-nav-item">
              <a className="footer-above-nav-item__links" href="#about-us">
                Biz haqimizda
              </a>
            </li>
            <li className="footer-above-nav-item">
              <a className="footer-above-nav-item__links" href="#category">
                Katalog
              </a>
            </li>
            <li className="footer-above-nav-item">
              <a className="footer-above-nav-item__links" href="#discount">
                Aksiya
              </a>
            </li>
            <li className="footer-above-nav-item">
              <a className="footer-above-nav-item__links" href="#address">
                Manzilimiz
              </a>
            </li>
          </ul>

          <ul className="footer-above-sm">
            <li className="footer-above-sm-item">
              <a
                className="footer-above-sm-item__link"
                href="https://www.facebook.com/abutechuz/"
                target="_blank"
              >
                <img
                  className="footer-above-sm-item__link__image"
                  src={facebookIcon}
                  alt=""
                />
              </a>
            </li>
            <li className="footer-above-sm-item">
              <a
                className="footer-above-sm-item__link"
                href="https://twitter.com/"
                target="_blank"
              >
                <img
                  className="footer-above-sm-item__link__image"
                  src={twitterIcon}
                  alt=""
                />
              </a>
            </li>
            <li className="footer-above-sm-item">
              <a
                className="footer-above-sm-item__link"
                href="https://vimeo.com/"
                target="_blank"
              >
                <img
                  className="footer-above-sm-item__link__image"
                  src={vimeoIcon}
                  alt=""
                />
              </a>
            </li>
            <li className="footer-above-sm-item">
              <a
                className="footer-above-sm-item__link"
                href="https://www.youtube.com/"
                target="_blank"
              >
                <img
                  className="footer-above-sm-item__link__image"
                  src={youtubeIcon}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </section>

        <section className="footer-below">
          <p className="footer-below-copyright">
            &copy; 2021 Mattrassue. Barcha huquqlar himoyalangan.
          </p>
          <a className="footer-below-arrow" href="#hero-id">
            <Arrow />
          </a>
          <div className="footer-below-logo">
            <a href="https://www.facebook.com/abutechuz/" target="_blank">
              <img src={authorLogo} alt="Author's Logo" />
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
