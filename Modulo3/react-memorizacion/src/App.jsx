import { useState, useCallback, useMemo } from "react";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 40 },
  { id: 3, name: "Teclado", price: 80 },
  { id: 4, name: "Monitor", price: 300 },
];

export default function App() {
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  console.log("Render APP");

  // ⚡ useCallback → evita recrear la función en cada render
  const handleFilterChange = useCallback((text) => {
    setFilterText(text);
  }, []);

  const handleSortChange = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // ⚡ useMemo → evita recalcular la lista filtrada/ordenada sin cambios
  const filteredProducts = useMemo(() => {
    console.log("Calculando lista filtrada...");
    return PRODUCTS
      .filter((p) => p.name.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [filterText, sortOrder]);

  return (
    <div>
      <h1>Productos</h1>

      <FilterBar
        filterText={filterText}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}
