import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
        <a className="navbar-brand" href="/"><span role="img" aria-label="Stunbox">📦</span>&nbsp;STUNBOX</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Apps
                  </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/grimoire">Item collection</a>
                <a className="dropdown-item" href="/usermgr">User management</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">New app</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/">Wishlist</a>
            </li>
          </ul>

          <form class="form-inline">
            <button class="btn btn-sm btn-primary my-2 my-sm-0" type="submit">Sign out</button>
          </form>

        </div>
      </nav>
    );
  }
}

export default Header;