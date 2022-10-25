import { Html, Main, Head, NextScript } from "next/document";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import {
  faBars,
  faCamera,
  faChevronLeft,
  faFile,
  faHomeAlt,
  faLayerGroup,
  faMoon,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DefaultDocument(props) {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/icon/solutech-pwanextjs-36x36.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icon/solutech-pwanextjs-72x72.png" />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body className="theme-light">
        <div id="preloader">
          <div className="spinner-border color-highlight" role="status"></div>
        </div>
        <div id="page">
          <div className="header header-fixed header-logo-center">
            <a href="index.html" className="header-title">
              Starter
            </a>
            <a href="#" data-back-button className="header-icon header-icon-1">
              <i className="fas fa-chevron-left"></i>
            </a>
            <a
              href="#"
              data-menu="menu-main"
              className="header-icon header-icon-4"
            >
              <i className="fas fa-bars"></i>
            </a>
            <a
              href="#"
              data-toggle-theme
              className="header-icon header-icon-3 show-on-theme-dark"
            >
              <i className="fas fa-sun"></i>
            </a>
            <a
              href="#"
              data-toggle-theme
              className="header-icon header-icon-3 show-on-theme-light"
            >
              <i className="fas fa-moon"></i>
            </a>
          </div>

          <div id="footer-bar" className="footer-bar-6">
            <BottomNavbar
              href="/index-components"
              title="Features"
              icon={faLayerGroup}
              urlPath={props.asPath}
            />
            <BottomNavbar
              href="/index-pages"
              title="Pages"
              icon={faFile}
              urlPath={props.asPath}
            />
            <BottomNavbar
              href="/"
              title="Welcome"
              className="circle-nav"
              iconColor="white"
              icon={faHomeAlt}
              urlPath={props.asPath}
              circleNav={true}
            />
            <BottomNavbar
              href="/index-projects"
              title="Projects"
              icon={faCamera}
              urlPath={props.asPath}
            />
            <BottomNavbar
              href="/page-user-edit"
              title="Profile"
              icon={faUser}
              urlPath={props.asPath}
            />
          </div>

          <div className="page-content header-clear-medium">
            <Main />
            <NextScript />
          </div>
        </div>
        <div data-menu-load="menu-footer.html"></div>
        <Script
          id="global-custom-script"
          src="/scripts/bootstrap.min.js"
          strategy="afterInteractive"
        />
        <Script
          id="global-custom-script"
          src="/scripts/custom.js"
          strategy="afterInteractive"
        />
      </body>
    </Html>
  );
}
