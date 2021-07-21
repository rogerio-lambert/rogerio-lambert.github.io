import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';
import '../styleSheets/Profile.css';

function Profile() {
  const { user } = localStorage;
  const FILTER_EMAIL_START = 10;
  const FILTER_EMAIL_END = -2;

  return (
    <main className="container-profile">
      <HeaderExplore />
      <h3 data-testid="profile-email" className="user-email">
        {(user) ? user.slice(FILTER_EMAIL_START, FILTER_EMAIL_END) : null}
      </h3>
      <Link to="receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="navegate-buttons"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="navegate-buttons"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ (() => localStorage.clear()) }
          className="exit-button"
        >
          Sair
        </button>
      </Link>
      <FooterBar />
    </main>
  );
}

export default Profile;
