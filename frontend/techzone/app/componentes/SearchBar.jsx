'use client'
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, padding: '8px' }}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}
