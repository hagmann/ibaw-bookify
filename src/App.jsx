import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
      <Container className="py-4">
        <Outlet />
      </Container>
      <footer className="bg-light py-3 text-center">
        <Container>
          <p className="text-muted mb-0">
            &copy; {new Date().getFullYear()} Bücher-Projekt
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default App;