import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; // ÄNDERUNG: React Bootstrap Komponenten
import BookList from '../../components/BookList/BookList';
import { searchGoogleBooks } from '../../services/googleBooksService';

function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeaturedBooks() {
      try {
        setLoading(true);
        const data = await searchGoogleBooks('bestseller fiction', 8);
        setFeaturedBooks(data);
        setError(null);
      } catch (err) {
        setError('Fehler beim Laden der Bücher.');
        console.error('Error loading featured books:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedBooks();
  }, []);

  return (
    <Container> {/* ÄNDERUNG: Container statt div mit Klasse */}
      <Row className="my-4"> {/* ÄNDERUNG: Row mit Bootstrap-Spacing */}
        <Col>
          <h1>Willkommen im Bücher-Projekt</h1>
          <p className="lead"> {/* ÄNDERUNG: Bootstrap Lead-Text */}
            Entdecke neue Bücher und verwalte deine Favoriten.
          </p>
        </Col>
      </Row>

      <h2>Empfohlene Bücher</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* ÄNDERUNG: Bootstrap Alert */}
      {loading ? (
        <div className="text-center my-5"> {/* ÄNDERUNG: Bootstrap-Utility-Klassen */}
          <Spinner animation="border" /> {/* ÄNDERUNG: Bootstrap Spinner */}
          <p>Empfohlene Bücher werden geladen...</p>
        </div>
      ) : (
        <BookList books={featuredBooks} />
      )}
    </Container>
  );
}

export default HomePage;