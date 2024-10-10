import React, { useState, useEffect } from "react";

export default function Navbar(props) {
  const [isCelsius, setIsCelsius] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setSearchTerm(lastSearch);
    }
  }, []);

  const handleToggle = () => {
    setIsCelsius((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    localStorage.setItem("lastSearch", searchTerm);

    if (props.onSearch) {
      props.onSearch(searchTerm);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Weather Report
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <form
                className="d-flex ms-5"
                onSubmit={handleSearch}
                role="search"
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search For Any City"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </ul>
            <span className="navbar-text d-flex">
              <p className="me-2 p">
                {isCelsius ? `${props.degc}°C` : `${props.degf}°F`}
              </p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!isCelsius}
                  onChange={handleToggle}
                />
                <span className="slider round"></span>
              </label>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
