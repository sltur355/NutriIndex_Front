import { type FC } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../Routes'
import './Header.css'

const Header: FC = () => {
  const location = useLocation()

  return (
    <Navbar className="custom-header" expand="lg" fixed="top">
      <Container fluid>
        <div className="logo-container">
          <Navbar.Brand as={Link} to={ROUTES.HOME} className="logo-link">
            <span className="logo-text">NutriScan</span>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to={ROUTES.BIOMARKERS}
              className={`nav-link-custom ${
                location.pathname.startsWith(ROUTES.BIOMARKERS) ? 'active' : ''
              }`}
            >
              Биомаркеры
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
