import React, { useEffect, useState } from 'react'
import logo from '../assests/logo-black.png'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(props) {
  let searchQ = "";
  let location = useLocation();
  const [searchQuerry, setSearchQuerry] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchDropdown, setSearchDropdown] = useState(false);

  const changeSearchQuerry = elem => {
    searchQ = elem.target.value;
    setSearchQuerry(searchQ);
    if (searchQuerry !== "") {
      searchAnime(searchQuerry);
    }
  }

  const searchAnime = async (searchQuerry, page = 1) => {
    try {
      const fetchingSearchData = await fetch(`https://consumet-api-private.vercel.app/meta/anilist/${searchQuerry.replace(" ", "%20")}?page=${page}&perPage=5`);
      if (fetchingSearchData.status !== 200) {          // Error Handling Here - To Do
        console.log("API Error");
      }
      else if(fetchingSearchData.status === 200) {
        const fetchedSearchData = await fetchingSearchData.json();
        setSearchResult(fetchedSearchData.results);
        // console.log(fetchedSearchData.results);
      }
    } catch (error) {
      console.log("error is running")
    }
  }

  const toggleDropdownSearch = () => {
    if (searchDropdown) {
      document.getElementById("search-dropdown-container").style.display = "block";
      if (window.innerWidth < 1410) {
        document.getElementById("mobile-dropdown").style.display = "block";
      }
    }
    else if (!searchDropdown) {
      document.getElementById("search-dropdown-container").style.display = "none";
      if (window.innerWidth < 1410) {
        document.getElementById("mobile-dropdown").style.display = "none";
      }
    }
  }

  const toggleMobileSearch = () => {
    document.getElementById("mobile-search").classList.toggle("active");
  }

  useEffect(() => {
    if (props.bgColor !== undefined) {
      document.getElementById("navbar").style.backgroundColor = `${props.bgColor}`
    }
    console.log(location.pathname)

    const delayDebounceFn = setTimeout(() => {
      console.log(searchQuerry)
      // Send API request here
      if (searchQuerry !== "") {
        searchAnime(searchQuerry);
        setSearchDropdown(true);
      } else {
        setSearchDropdown(false)
      }
      toggleDropdownSearch();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line
  }, [location, searchQ, searchQuerry, searchDropdown]);
  // console.log("searchDrop: " + searchDropdown);

  const mouseEnterStyles = {
    "0": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[0].style.left = "0px";
    },
    "1": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[1].style.left = "0px";
    },
    "2": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[2].style.left = "0px";
    },
    "3": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[3].style.left = "0px";
    }
  }
  const mouseOutStyles = {
    "0": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[0].style.left = "-100px";
    },
    "1": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[1].style.left = "-100px";
    },
    "2": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[2].style.left = "-100px";
    },
    "3": () => {
      let navbarUnderlines = document.querySelectorAll(".nav-li-underline");
      navbarUnderlines[3].style.left = "-100px";
    }
  }
  return (
    <>
      <div id="navbar">
        <nav>
          <div className="logo" id='nav-logo'><Link to="/home"><img src={logo} alt="Logo" /></Link></div>
          <ul id='nav-pc-ul'>
            <li><Link className={`${location.pathname === "/home" ? "nav-active" : ""}`} onMouseEnter={mouseEnterStyles[0]} onMouseOut={mouseOutStyles[0]} to="/home">
              Home
              <div className={`nav-li-underline ${location.pathname === "/home" ? "nav-active" : ""}`}></div>
            </Link></li>
            <li><Link className={`${location.pathname === "/catalogue" ? "nav-active" : ""}`} onMouseEnter={mouseEnterStyles[1]} onMouseOut={mouseOutStyles[1]} to="/catalogue">
              Catalogue
              <div className={`nav-li-underline ${location.pathname === "/catalogue" ? "nav-active" : ""}`}></div></Link></li>
            <li><Link className={`${location.pathname === "/watchlist" ? "nav-active" : ""}`} onMouseEnter={mouseEnterStyles[2]} onMouseOut={mouseOutStyles[2]} to="/watchlist">
              Watchlist
              <div className={`nav-li-underline ${location.pathname === "/watchlist" ? "nav-active" : ""}`}></div></Link></li>
            <li><Link className={`${location.pathname === "/about" ? "nav-active" : ""}`} onMouseEnter={mouseEnterStyles[3]} onMouseOut={mouseOutStyles[3]} to="/about">
              About Us
              <div className={`nav-li-underline ${location.pathname === "/about" ? "nav-active" : ""}`}></div></Link></li>
          </ul>
          <div className="search" id='navbar-search-container'>
            <form id='nav-pc-search' action="/search">
              <input type="text" className='search-area' id='navbar-search-area' placeholder="Search Here" value={searchQuerry} onChange={changeSearchQuerry} />
              <button className='input-nav-search-btn' id='navbar-search-btn'>
                <i className="fa-solid fa-magnifying-glass fa-lg" title='Search' style={{ color: `#111` }}></i>
              </button>
            </form>
            <div className="dropdown-container" id="search-dropdown-container">
              <ul>
                {
                  (searchResult.length !== 0) ?
                    searchResult.map((elem) => {
                      let i = 0;
                      let title = (elem.title.english !== null) ? elem.title.english : elem.title.romaji;
                      i++;
                      return (
                        <li key={title + i}><Link to={`/watch/${elem.id}?ep=1`}>
                          <div className='search-result-container'>
                            <div className="search-result-anime-poster"><img src={elem.image} alt="img" /></div>
                            <div className="search-result-anime-info-container">
                              <h2 className='search-dropdown-anime-title'>{(title.length > 30) ? title.slice(0, 30) + '...' : title}</h2>
                              <p className="search-dropdown-anime-description">{elem.description !== null && (elem.description.length > 60) ? elem.description.slice(0, 57) + '...' : elem.description}</p>
                              <div className="search-dropdown-anime-other-info">
                                <span className="search-dropdown-anime-release-date">{(elem.releaseDate !== null) ? elem.releaseDate : `?`}</span>
                                <div className="dot"></div>
                                {/* <i className="fa fa-star search-dropdown-rating"></i> */} {/* star icon */}
                                <span className="search-dropdown-anime-type">{(elem.type !== null) ? elem.type : `?`}</span>
                                <div className="dot"></div>
                                <span className="search-dropdown-anime-status">{(elem.status !== null) ? elem.status : `?`}</span>
                              </div>
                            </div>
                          </div>
                        </Link></li>
                      )
                    })
                    :
                    null
                }
              </ul>
            </div>
            <button className='search nav-mobile-search-btn' id='mobile-search-btn' onClick={toggleMobileSearch}>
              <i className="fa-solid fa-magnifying-glass fa-xl" title='Search' style={{ color: `#fff` }}></i>
            </button>
          </div>
          <Link to="/login"><div className="login-btn" id='navbar-login-btn'>Log In</div></Link>
          <div className="mobile-search-container" id='mobile-search'>
            <form id='nav-mobile-search' action="/search">
              <input type="text" placeholder="Search Here" value={searchQuerry} onChange={changeSearchQuerry} />
              <button className='search nav-mobile-search-btn input-nav-search-btn'>
                <i className="fa-solid fa-magnifying-glass fa-lg" title='Search' style={{ color: `#111` }}></i>
              </button>
            </form>
            <div className="mobile-search-container" id='mobile-dropdown'>
              <div className="dropdown-container" id="mobile-search-dropdown-container">
                <ul>
                  {
                    (searchResult.length !== 0) ?
                      searchResult.map((elem) => {
                        let i = 0;
                        let title = (elem.title.english !== null) ? elem.title.english : elem.title.romaji;
                        i++;
                        return (
                          <li key={title + i}><Link to={`/watch/${elem.id}?ep=1`}>
                            <div className='search-result-container'>
                              <div className="search-result-anime-poster"><img src={elem.image} alt="img" /></div>
                              <div className="search-result-anime-info-container">
                                <h2 className='search-dropdown-anime-title'>{(title.length > 30) ? title.slice(0, 30) + '...' : title}</h2>
                                <p className="search-dropdown-anime-description">{elem.description !== null && (elem.description.length > 60) ? elem.description.slice(0, 57) + '...' : elem.description}</p>
                                <div className="search-dropdown-anime-other-info">
                                  <span className="search-dropdown-anime-release-date">{(elem.releaseDate !== null) ? elem.releaseDate : `?`}</span>
                                  <div className="dot"></div>
                                  {/* <i className="fa fa-star search-dropdown-rating"></i> */} {/* star icon */}
                                  <span className="search-dropdown-anime-type">{(elem.type !== null) ? elem.type : `?`}</span>
                                  <div className="dot"></div>
                                  <span className="search-dropdown-anime-status">{(elem.status !== null) ? elem.status : `?`}</span>
                                </div>
                              </div>
                            </div>
                          </Link></li>
                        )
                      })
                      :
                      null
                  }
                </ul>
              </div>
            </div>

          </div>

        </nav>
        {/* <div id="mobile-nav-search-container">
          <form action="/search">
            <input type="text" placeholder="Search..." />
            <button className='search'>
                <i className="fa-solid fa-magnifying-glass fa-lg" title='Search' style={{ color: `#111` }}></i>
              </button>
          </form>
        </div> */}
      </div>
    </>
  )
}
