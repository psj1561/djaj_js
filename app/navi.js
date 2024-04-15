'use client'

import LoginBtn from "./loginbutton"
import LogOutBtn from "./logoutbutton"
import Darkmode from "./darkMode"

// 부트스트랩
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

export default function Navi({res, session}){
    return(
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
        <Container>
          <Navbar.Brand href="/">djaj.gg</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/list">List</Nav.Link>
              <Nav.Link href="/write">Write</Nav.Link>
              {/* {
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              } */}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container className="justify-content-end">
            <Darkmode res={res}></Darkmode> 
            {// 로그인, 로그아웃상태에 따라 상태창 변경
                session? 
                <Navbar.Brand>{session.user?.name}님<LogOutBtn></LogOutBtn></Navbar.Brand>
                :<LoginBtn/>
            }
        </Container>
        </Navbar>
        // <div className="navbar">
        //   <Link href="/" className="logo">Appleforum</Link>
        //   <Link href="/list">List</Link>
        //   <Link href="/write">Write</Link>
        //   {// 로그인, 로그아웃상태에 따라 상태창 변경
        //     session? 
        //     <span>{session.user?.name}님<LogOutBtn></LogOutBtn></span>
        //     : <LoginBtn /> 
        //   }
        //   <Darkmode res={res}></Darkmode>
        // </div>
    )
}