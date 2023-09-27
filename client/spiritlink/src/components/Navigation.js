import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/sbu.png'

function Navigation() {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <LinkContainer to="/">
              <Navbar.Brand>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                  <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }}/>                  
                </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                <LinkContainer to='/Chat'>
                    <Nav.Link>Chat</Nav.Link>                    
                </LinkContainer>

                <LinkContainer to='/Login'>
                    <Nav.Link>Login</Nav.Link>                    
                </LinkContainer>                

                <LinkContainer to='/Signup'>
                    <Nav.Link>Signup</Nav.Link>                    
                </LinkContainer>

              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default Navigation;