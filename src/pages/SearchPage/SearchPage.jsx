import { useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap'; // ÄNDERUNG: React Bootstrap Komponenten
import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/BookList/BookList';
import { searchGoogleBooks } from '../../services/googleBooksService';

function SearchPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query) => {
    setSearchTerm(query);
    
    if (!query.trim()) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const results = await searchGoogleBooks(query);
      setBooks(results);
      setSearchPerformed(true);
    } catch (err) {
      setError('Fehler bei der Suche.');
      console.error('Error searching books:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container> {/* ÄNDERUNG: Container statt div mit Klasse */}
      <h1>Bücher suchen</h1>
      <p>Gib einen Suchbegriff ein, um nach Büchern zu suchen.</p>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && <Alert variant="danger">{error}</Alert>} {/* ÄNDERUNG: Bootstrap Alert */}
      
      {searchPerformed && !loading && (
        <Alert variant="info"> {/* ÄNDERUNG: Bootstrap Alert */}
          <h5>Suchergebnisse für "{searchTerm}"</h5>
          <p className="mb-0">{books.length} {books.length === 1 ? 'Buch' : 'Bücher'} gefunden</p>
        </Alert>
      )}
      
      {loading ? (
        <div className="text-center my-5"> {/* ÄNDERUNG: Bootstrap-Utility-Klassen */}
          <Spinner animation="border" /> {/* ÄNDERUNG: Bootstrap Spinner */}
          <p>Bücher werden gesucht...</p>
        </div>
      ) : (
        searchPerformed && <BookList books={books} />
      )}
    </Container>
  );
}

export default SearchPage;