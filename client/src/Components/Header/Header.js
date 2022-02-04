import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { categories } from "../../Axios/Products.js";
const Header = () => {
  const [headers, setHeaders] = useState([]);
  const getHeaders = () => {
    categories()
      .then((res) => setHeaders(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHeaders();
  }, []);
  return (
    <header style={{ position: "relative", height: 70 }}>
      <div className="container-menu-desktop">
        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop " style={{ maxWidth: "100vw" }}>
            <Link to="/" className="logo">
              {/* <img src="images/icons/logo-01.png" alt="IMG-LOGO"> */}
              <h2
                style={{
                  fontSize: 25,
                  fontFamily: '"Varela Round", sans-serif',
                  fontWeight: 700,
                }}
              >
                CafeCart
              </h2>
            </Link>
            <ul className="main-menu ">
              <li className="nav-item">
                <a className="nav-link nav_item" href="/pages/about-us">
                  About Us
                </a>
              </li>
              {headers.length > 0 &&
                headers.map((curr, index) => {
                  return (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link nav_item"
                        to={`/products/category/${curr.slug}`}
                        id="navbarDropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {curr.title}
                      </Link>
                      <div
                        className="dropdown-menu  "
                        aria-labelledby="navbarDropdown"
                        style={{ top: 62 }}
                      >
                        <div class="dropdown-menu-container">
                          {curr.Subcategories.length > 0 &&
                            curr.Subcategories.map((sub, index) => {
                              return (
                                <div
                                  class="dropdown-menu-subsection"
                                  key={index}
                                >
                                  <Link className="dropdown-item-header" to="/">
                                    {sub.Parent_Subcategory.title}
                                  </Link>
                                  <div class="dropdown-item-container">
                                    {sub.Child_Subcategory.length > 0 &&
                                      sub.Child_Subcategory.map(
                                        (last, index) => {
                                          return (
                                            <Link
                                              key={index}
                                              className="dropdown-item"
                                              to=""
                                            >
                                              {last.title}
                                            </Link>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              <li className="nav-item">
                <Link to="/blog" class=" nav-link nav_item">
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
