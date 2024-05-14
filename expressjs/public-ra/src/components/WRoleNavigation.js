import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function LoginNavigation(props) {
  return (
    <Navbar
      sticky="top"
      id="navbar"
      className="mb-1 navbar bg-dblue navbar-expand-lg navbar-dark"
      collapseOnSelect
      bg="light"
      expand="lg"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="container d-flex flex-col"
      >
        <Nav className=" justify-content-none">
          <Nav.Link className="nav-item p-1">
            <Link to="/"  className="nav-link d-inline-flex flex-row align-items-center">
              {" "}
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
                />
              </svg>
              Anasayfa
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item p-1">
            <Link to="/turkey-map"  className="nav-link d-inline-flex flex-row align-items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                width="2em"
                height="2em"
                viewBox="0 0 48 48"
              >
                <ellipse
                  cx="24"
                  cy="28.154"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  rx="3.03"
                  ry="3.105"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M24 20.609a7.6 7.6 0 0 0-7.093 5.766a10.1 10.1 0 0 0-.106 3.034c.488 4.06 4.223 7.83 7.199 11.001c2.977-3.172 6.711-6.942 7.2-11a10.1 10.1 0 0 0-.107-3.035A7.6 7.6 0 0 0 24 20.609M4.5 17.85a23.663 23.663 0 0 1 39-.004"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.236 22.929a16.118 16.118 0 0 1 27.528 0"
                />
              </svg>{" "}
              Analiz Haritası
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item p-1">
            <Link to="/warehouse"  className="nav-link d-inline-flex flex-row align-items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                width="2em"
                height="2em"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8m0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8m0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8m106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3"
                />
              </svg>
              Depo Yönetimi
            </Link>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <li className="nav-item mr-1 mt-1 row ml-auto">
            <span className="navbar-text c-white pr-1">Hoşgeldin,</span>
            <span className="navbar-text text-weigth-bold">
              {props.username}
            </span>
          </li>
          <li className="nav-item p-1 lognav ">
            <a href="/api/logout" className="c-white nav-link">
              Çıkış Yap
            </a>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default LoginNavigation;
