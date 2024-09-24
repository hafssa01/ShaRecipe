import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">ShaRecipe</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
          </Nav>
          <div className="d-flex">
            <Link to="/login">
              <Button 
                variant="outline-dark" 
                style={{ borderRadius: '12px', marginRight: '8px' }}>
                Sign In
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                variant="dark" 
                style={{ borderRadius: '12px' }}>
                Sign Up
              </Button>
            </Link>


          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
