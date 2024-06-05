import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
// import turkey from "../public/images/turkey.svg";

function Navigation() {
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
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container justify-content-none">
          <Nav.Link className="nav-item p-1 ">
            <Link
              to="/"
              className="nav-link d-inline-flex flex-row align-items-center"
            >
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
            <Link
              to="/turkey-map"
              className="nav-link d-inline-flex flex-row align-items-center"
            >
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
            <Link
              to="/create-support"
              className="nav-link d-inline-flex flex-row align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2.385 21h3v-8.154h-3zM14 21.808l7-2.308v-1.577h-7.923l-2.87-.942l.312-.752l2.596.925h3v-1.596l-7.352-2.712H6.385v6.737zm1.692-9.423l-3.765-3.608q-.66-.635-1.101-1.422q-.441-.788-.441-1.709q0-1.106.77-1.876T13.03 3q.819 0 1.49.443q.671.444 1.171 1.076q.5-.632 1.171-1.076Q17.535 3 18.353 3q1.107 0 1.877.77T21 5.646q0 .921-.438 1.709q-.439.787-1.099 1.422z"
                />
              </svg>{" "}
              Destek Ol
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item p-1">
            <Link
              to="/confirmed_supports"
              className="nav-link d-inline-flex flex-row align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
                width="2em"
                height="2em"
                viewBox="0 0 1200 1200"
              >
                <path
                  fill="currentColor"
                  d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0m132.789 343.503c71.295-1.114 135.772 37.646 166.337 103.724c28.273 87.356 4.612 176.225-45.251 243.199c-32.912 45.417-72.247 84.584-112.462 118.807c-36.997 34.439-119.808 102.591-141.755 104.483c-19.397-3.708-41.173-25.678-56.573-36.968c-86.534-65.781-179.667-145.742-226.899-233.207c-39.601-83.97-39.673-187.864 21.96-252.241c79.917-72.048 200.39-57.946 261.512 17.325c16.415-21.295 36.605-38.066 60.562-50.267c24.279-9.69 48.803-14.483 72.569-14.855"
                />
              </svg>
              Bağışlar
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item p-1">
          <Link
              to="/confirmed_needs"
              className="nav-link d-inline-flex flex-row align-items-center"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
              >
              <path class="feather_een" d="M24,12.442c0-0.911-0.414-1.773-1.126-2.343L19.751,7.6C19.276,7.221,19,6.646,19,6.039V6
              	c0.552,0,1-0.448,1-1V1c0-0.552-0.448-1-1-1h-6c-0.552,0-1,0.448-1,1v4c0,0.552,0.448,1,1,1v0.039c0,0.608-0.276,1.182-0.751,1.562
              	l-3.123,2.499C8.414,10.669,8,11.53,8,12.442V15c0,0.601,0.27,1.133,0.69,1.5C8.27,16.867,8,17.399,8,18v4
              	c0,0.601,0.27,1.133,0.69,1.5C8.27,23.867,8,24.399,8,25v4c0,1.657,1.343,3,3,3h10c1.657,0,3-1.343,3-3v-4
              	c0-0.601-0.27-1.133-0.69-1.5C23.73,23.133,24,22.601,24,22v-4c0-0.601-0.27-1.133-0.69-1.5C23.73,16.133,24,15.601,24,15V12.442z
              	 M13,1h6v4h-6V1z M12.874,8.381C13.586,7.812,14,6.95,14,6.039V6h4v0.039c0,0.911,0.414,1.773,1.126,2.343l2.147,1.718H10.727
              	L12.874,8.381z M23,15c0,0.552-0.448,1-1,1h-0.5c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5H22c0.552,0,1,0.448,1,1v4
              	c0,0.552-0.448,1-1,1h-0.5c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5H22c0.552,0,1,0.448,1,1v4c0,1.105-0.895,2-2,2H11
              	c-1.105,0-2-0.895-2-2v-4c0-0.552,0.448-1,1-1h0.5c0.276,0,0.5-0.224,0.5-0.5c0-0.276-0.224-0.5-0.5-0.5H10c-0.552,0-1-0.448-1-1v-4
              	c0-0.552,0.448-1,1-1h0.5c0.276,0,0.5-0.224,0.5-0.5c0-0.276-0.224-0.5-0.5-0.5H10c-0.552,0-1-0.448-1-1v-2.558
              	c0-0.55,0.236-1.066,0.631-1.442h12.738C22.764,11.376,23,11.891,23,12.442V15z" fill="white"/>
              
              </svg>{" "}
              İhtiyaçlar
          </Link>
          </Nav.Link>
          <Nav.Link className="nav-item p-1 ml-auto res-button">
            <Link
              to="/signup"
              className="nav-link d-inline-flex flex-row align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                width="2em"
                height="2em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M226.878 16v243.274a120.023 120.023 0 0 0 30 236.71a119.996 119.996 0 0 0 29.998-236.242v-93.747h59.998v-44.998h-59.998v-45h89.997V16zm25.312 299.99a60 60 0 0 1 2.343 0a60 60 0 0 1 2.343 0a59.998 59.998 0 0 1 0 119.996a60.044 60.044 0 0 1-4.688-119.996z"
                />
              </svg>{" "}
              Kayıt Ol
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item p-1 ">
            <Link
              to="/login"
              className="nav-link d-inline-flex flex-row align-items-center"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1m3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75c-2.578 0-4.5 2.08-4.5 4.75"
                />
              </svg>
              STK Yetkili Giriş
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
