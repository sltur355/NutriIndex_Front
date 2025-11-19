import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  return (
    <BSNavbar bg="white" expand="lg" className="border-bottom custom-navbar" fixed="top">
      <Container>
        {/* Логотип слева */}
        <BSNavbar.Brand as={Link} to="/" className="navbar-brand-custom">
          NutriScan
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BSNavbar.Collapse id="basic-navbar-nav">
          {/* Навигация по центру */}
          <Nav className="mx-auto">
            <Nav.Link 
              as={Link} 
              to="/biomarkers" 
              className={`nav-link-custom ${
                location.pathname.startsWith('/biomarkers') ? 'active' : ''
              }`}
            >
              Биомаркеры
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}

export default Navbar