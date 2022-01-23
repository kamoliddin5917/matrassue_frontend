import "./customers.scss";

// React Components
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../Context/SearchContext";

// Components
import Header from "../../Components/Header/Header";

// Images
import deleteBtn from "../../images/delete.svg";
import useFetch from "../../Hooks/useFetch";
import ModalLoading from "../../Components/ModalLoading/ModalLoading";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

function Customers() {
  const [modalLoading, setModalLoading] = useState(false);
  const [customers, setCustomers] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const { data, setParam, setName } = useContext(SearchContext);
  const { message, setBody, method, setMethod } = useFetch("/customers");

  useEffect(() => {
    setCustomers(data);
  }, [data]);

  useEffect(() => {
    setName("quote_number");
    setParam("/customers");
  }, [setName, setParam]);

  const checkboxChange = (e) => {
    setMethod("PUT");
    setBody({
      id: e.target.dataset.id,
      contacted: e.target.checked,
    });
    setModalLoading(true);
  };

  const deleteBtnClick = (e) => {
    setMethod("DELETE");
    setBody({
      id: id,
    });
    const deletedCustomer = customers.filter((item) => item.quote_id !== id);
    setCustomers(deletedCustomer);
    setDeleteModal(false);
    setModalLoading(true);
  };
  useEffect(() => {
    if (message !== null) {
      setModalLoading(false);
      if (method === "PUT") {
        window.location.reload();
      }
    }
  }, [message, method]);

  return (
    <div>
      <Header placeholder="User" input={true} />

      {customers && customers.length && customers[0].quote_id ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>sana</th>
              <th>telefon raqami</th>
              <th>Qayta aloqa</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => {
              const date = c.quote_date ? c.quote_date.split(/[.T\s/]/) : "";
              return (
                <tr key={c.quote_id} className="table_tr">
                  <td>{i + 1}</td>
                  <td>
                    {date[1]}-<span className="date">{date[0]}</span>
                  </td>
                  <td>{c.quote_number}</td>
                  <td>
                    <div className="customers_checkbox_wrapper">
                      <label className="checkbox-container customers_checkbox-container">
                        <input
                          defaultChecked={c.quote_contacted}
                          required
                          className="customer_input"
                          type="checkbox"
                          data-id={c.quote_id}
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
                        src={deleteBtn}
                        alt="deleteBtn"
                        data-id={c.quote_id}
                        onClick={() => {
                          setId(c.quote_id);
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
      <ModalLoading modalLoading={modalLoading} />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteBtnClick={deleteBtnClick}
      />
    </div>
  );
}

export default Customers;
