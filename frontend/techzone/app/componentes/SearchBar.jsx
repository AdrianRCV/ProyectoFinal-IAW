'use client';
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value); // Llama a onSearch cada vez que el usuario escribe
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={handleSearch}
        style={{ flex: 1, padding: '8px' }}
      />
    </div>
  );
}