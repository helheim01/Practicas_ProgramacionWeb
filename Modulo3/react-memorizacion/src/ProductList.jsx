import React from "react";
import ProductRow from "./ProductRow";

function ProductList({ products }) {
  console.log("Render ProductList");

  return (
    <ul>
      {products.map((p) => (
        <ProductRow key={p.id} product={p} />
      ))}
    </ul>
  );
}

export default React.memo(ProductList);
