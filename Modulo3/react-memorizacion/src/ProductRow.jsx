import React from "react";

function ProductRow({ product }) {
  console.log("Render ProductRow:", product.name);

  return (
    <li>
      {product.name} — ${product.price}
    </li>
  );
}

export default React.memo(ProductRow);
