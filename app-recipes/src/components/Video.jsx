import React from 'react';
import PropTypes from 'prop-types';
import '../styleSheets/ContentDetail.css';

export default function Video({ recipe }) {
  function getYouTubeURL() {
    if (recipe.strYoutube) {
      const recipeURL = recipe.strYoutube.split('=');
      const VIDEO_ID = recipeURL[recipeURL.length - 1];
      return `http://www.youtube.com/embed/${VIDEO_ID}`;
    }
  }

  return (
    <section className="container-content">
      <h3 className="title-content">Vídeo</h3>
      <iframe
        src={ getYouTubeURL() }
        title="recipe video"
        data-testid="video"
        className="field-content"
      />
    </section>
  );
}

Video.propTypes = {
  recipe: PropTypes.shape({
    strYoutube: PropTypes.string,
  }).isRequired,
};
