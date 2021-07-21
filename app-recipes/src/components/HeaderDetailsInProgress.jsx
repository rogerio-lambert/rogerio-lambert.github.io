import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import ButtonFavorite from './ButtonFavorite';
import ContextRecipes from '../context/ContextRecipes';
import ButtonShare from './ButtonShare';
import CustonAlert from './CustonAlert';
import '../styleSheets/HeaderDetailsInProgress.css';

function HeaderDetailsInProgress(props) {
  const { recipe } = props;
  const { alertOn } = useContext(ContextRecipes);
  const { pathname } = useLocation();
  const dbType = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';
  const type = pathname.includes('comidas') ? 'Meal' : 'Drink';
  const url = pathname.includes('comidas') ? 'comidas' : 'bebidas';
  return (
    <header className="container-header-detail">
      <img
        src={ recipe[`str${type}Thumb`] }
        data-testid="recipe-photo"
        width="200px"
        alt="recipe details"
        className="image-recipe"
      />
      <div className="container-info">
        <h2 data-testid="recipe-title" className="title-header">
          { recipe[`str${type}`] }
        </h2>
        <ButtonShare
          idRecipe={ recipe[`id${type}`] }
          typeRecipe={ url }
          testid="share-btn"
        />
        {alertOn && <CustonAlert message="Link copiado!" />}
        <ButtonFavorite
          idRecipe={ recipe[`id${type}`] }
          dbType={ dbType }
          testid="favorite-btn"
        />
      </div>

      <p data-testid="recipe-category" className="category-name">
        { url === 'comidas' ? recipe.strCategory : recipe.strAlcoholic }
      </p>
    </header>
  );
}

HeaderDetailsInProgress.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string,
  }).isRequired,
};

export default HeaderDetailsInProgress;
