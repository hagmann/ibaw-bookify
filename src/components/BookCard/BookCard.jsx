import { useState } from "react";
import { Card, Button, Badge } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

function BookCard({ book }) {
  const { id, title, author, imageUrl, description, publishedDate, previewLink } = book;
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isBookFavorite = isFavorite(id);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(book);
  };
  
  // Standard-Bild, falls kein Bild-URL bereitgestellt wird
  const defaultImage = "https://placehold.co/128x192";
  
  return (
    <Card className="h-100">
      <div className="d-flex flex-column flex-md-row">
        <div style={{ flex: '0 0 128px' }}>
          <Card.Img 
            src={imageUrl || defaultImage} 
            alt={`Cover von ${title}`}
            style={{ height: '192px', objectFit: 'cover' }}
          />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
          
          {publishedDate && (
            <Badge bg="secondary" className="mb-2">Veröffentlicht: {publishedDate}</Badge>
          )}
          
          <Card.Text>
            {description 
              ? description.length > 150 
                ? `${description.substring(0, 150)}...` 
                : description
              : "Keine Beschreibung verfügbar"}
          </Card.Text>
          
          <div className="d-flex gap-2 mt-auto">
            <Button 
              as={Link} 
              to={`/book/${id}`} 
              variant="primary"
            >
              Details
            </Button>
            
            {previewLink && (
              <Button 
                variant="outline-primary" 
                href={previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt className="me-1" /> Vorschau
              </Button>
            )}
            
            <Button 
              variant={isBookFavorite ? "danger" : "outline-danger"}
              size="sm" 
              onClick={handleFavoriteClick}
            >
              {isBookFavorite ? '❤️' : '🖤'}
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default BookCard;
