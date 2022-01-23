import "./ProductBtn.scss";

const ProductBtn = ({ btn, setCategoryId, categoryId }) => {
  const handleClicBtn = () => {
    setCategoryId(btn.category_id);
  };
  return (
    <li
      className={categoryId === btn.category_id ? "list list-active" : "list "}
      onClick={handleClicBtn}
    >
      <span>{btn.category_name}</span>
    </li>
  );
};

export default ProductBtn;
