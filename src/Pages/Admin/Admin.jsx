import { Route, Switch } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { SearchProvider } from "../../Context/SearchContext";
import Addresses from "../Addresses/addresses";
import Categories from "../Categories/Categories";
import Customers from "../Customers/customers";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Technologies from "../Technologies/Technologies";
import "./Admin.scss";

function Admin() {
  return (
    <SearchProvider>
      <NavBar>
        <Switch>
          <Route path="/admin/buyurtmalar" component={Orders} exact />
          <Route path="/admin/customers" component={Customers} />
          <Route path="/admin/toifalar" component={Categories} />
          <Route path="/admin/mahsulotlar" component={Products} />
          <Route path="/admin/texnologiyalar" component={Technologies} />
          <Route path="/admin/manzil" component={Addresses} />
        </Switch>
      </NavBar>
    </SearchProvider>
  );
}

export default Admin;
