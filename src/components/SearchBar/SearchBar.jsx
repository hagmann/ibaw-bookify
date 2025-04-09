import { useState } from 'react';
// GEÄNDERT: Import React Bootstrap Komponenten
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // GEÄNDERT: Verwende React Bootstrap Form-Komponenten
  return (
    <div className="mb-4">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Suche nach Buchtitel, Autor, ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" type="submit">
            <FaSearch className="me-1" /> Suchen
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SearchBar;