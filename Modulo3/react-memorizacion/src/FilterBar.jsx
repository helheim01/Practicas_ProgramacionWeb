import React from "react";

function FilterBar({ filterText, onFilterChange, onSortChange }) {
  console.log("Render FilterBar");

  return (
    <div style={{ marginBottom: 10 }}>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
      />

      <button onClick={onSortChange} style={{ marginLeft: 10 }}>
        Ordenar por precio
      </button>
    </div>
  );
}

export default React.memo(FilterBar);
