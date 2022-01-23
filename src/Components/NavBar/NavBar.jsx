import { Link, NavLink } from "react-router-dom";
import "./NavBar.scss";
import logo from "../../images/logo.png";
import home from "../../images/home.svg";
import customers from "../../images/customers.svg";
import category from "../../images/category.svg";
import products from "../../images/products.svg";
import techs from "../../images/techs.svg";
import address from "../../images/address.svg";

function NavBar({ children }) {
  return (
    <div className="nav-bar_wrapper">
      <div className="nav-bar_wrapper_inner">
        <div className="logo_wrapper">
          <Link to="/admin/buyurtmalar">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav_list">
            <li className="nav_list_item">
              <NavLink
                activeClassName="nav_link--active"
                className="nav_link"
                to="/admin/buyurtmalar"
              >
                <img src={home} alt="home" />
                Buyurtmalar
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                activeClassName="nav_link--active"
                className="nav_link"
                to="/admin/customers"
              >
                <img src={customers} alt="customers" />
                Сustomers
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                activeClassName="nav_link--active"
                className="nav_link"
                to="/admin/toifalar"
              >
                <img src={category} alt="category" />
                Toifalar
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                activeClassName="nav_link--active"
                className="nav_link"
                to="/admin/mahsulotlar"
              >
                <img src={products} alt="products" />
                Mahsulotlar
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                activeClassName="nav_link--active"
                className="nav_link"
                to="/admin/texnologiyalar"
              >
                <img src={techs} alt="techs" />
                Texnologiyalar
              </NavLink>
            </li>
            <li className="nav_list_item">
              <NavLink
                activeClassName="nav_link--active"
                className="nav_link"
                to="/admin/manzil"
              >
                <img src={address} alt="address" />
                Manzil
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
}

export default NavBar;
