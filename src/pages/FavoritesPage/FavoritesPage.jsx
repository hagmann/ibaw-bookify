// src/pages/FavoritesPage/FavoritesPage.jsx
import { Container, Alert } from 'react-bootstrap';
import BookList from '../../components/BookList/BookList';
import { useFavorites } from '../../context/FavoritesContext';

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <Container>
      <h1>Meine Favoriten</h1>
      
      {favorites.length > 0 ? (
        <>
          <Alert variant="success">
            Du hast {favorites.length} {favorites.length === 1 ? 'Buch' : 'Bücher'} in deinen Favoriten
          </Alert>
          <BookList books={favorites} />
        </>
      ) : (
        <Alert variant="info">
          <Alert.Heading>Keine Favoriten</Alert.Heading>
          <p>
            Du hast noch keine Bücher zu deinen Favoriten hinzugefügt.
            Füge Bücher hinzu, indem du auf das Herz-Symbol auf der Buchkarte klickst.
          </p>
        </Alert>
      )}
    </Container>
  );
}

export default FavoritesPage;