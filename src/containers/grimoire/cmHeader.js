import React from 'react';

class GrimoireHeader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbar-fixed-top">

        <a className="navbar-brand" href="/"><span role="img" aria-label="books">📚</span>&nbsp;GRIMOIRE</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <a className="nav-link" href="/">Dashboard<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="GAME"><span role="img" aria-label="Games">🎮 </span>Games&nbsp;&nbsp;<span className="badge badge-secondary">231</span></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="MOVIE"><span role="img" aria-label="Movies">💿 </span>Movies&nbsp;&nbsp;<span className="badge badge-secondary">78</span></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="BOOK"><span role="img" aria-label="Books">📚 </span>Books&nbsp;&nbsp;<span className="badge badge-secondary">35</span></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="BOARDGAME"><span role="img" aria-label="Boardgames">🎲 </span>Boardgames&nbsp;&nbsp;<span className="badge badge-secondary">23</span></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="GENERIC"><span role="img" aria-label="Generic">💻 </span>Generic&nbsp;&nbsp;<span className="badge badge-secondary">47</span></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/"><span role="img" aria-label="WishList">🔖 </span>Wishlist</a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/"><span role="img" aria-label="Settings">⚙️ </span>Settings</a>
            </li>
          </ul>
        </div>
      </nav >
    );
  }
}

export default GrimoireHeader;