import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import fetchApiById from '../service/fetchApiById';
import Ingredients from '../components/Ingredients';
import Recommendations from '../components/Recomendations';
import HeaderDetailsInProgress from '../components/HeaderDetailsInProgress';
import Video from '../components/Video';
import Instructions from '../components/Instructions';
import ButtonStart from '../components/ButtonStart';
import ButtonFinish from '../components/ButtonFinish';
import '../styleSheets/DetailsInProgress.css';

function DetailsInProgress(props) {
  const { match: { params: { id } } } = props;
  const { isCompleted } = useContext(ContextRecipes);
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [isLoalding, setIsLoalding] = useState(false);
  const dbType = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';
  const local = pathname.includes('comidas') ? 'comidas' : 'bebidas';
  const isInProgress = pathname.includes('in-progress');
  const buttonFinish = (
    <ButtonFinish
      completed={ isCompleted }
      dbType={ dbType }
      id={ id }
    />
  );

  useEffect(() => {
    async function requestApi() {
      setIsLoalding(true);
      const request = await fetchApiById(dbType, id);
      setRecipe(request);
      setIsLoalding(false);
    }
    requestApi();
  }, [dbType, id]);

  return (
    <div>
      { isLoalding ? <h1>Loalding</h1>
        : (
          <main className="container-main">
            <HeaderDetailsInProgress recipe={ recipe } />
            <Ingredients recipe={ recipe } />
            <Instructions instructions={ recipe.strInstructions } />
            { recipe.strMeal && !isInProgress ? <Video recipe={ recipe } /> : null }
            {!isInProgress && <Recommendations recipe={ dbType } />}
            {isInProgress
              ? buttonFinish
              : <ButtonStart type={ local } id={ id } />}
          </main>)}
    </div>
  );
}

DetailsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DetailsInProgress;
