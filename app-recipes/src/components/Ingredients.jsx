import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import checkIngredientIsDone from '../service/checkIngredientIsDone';
import checkRecipeIsCompleted from '../service/checkRecipeIsCompleted';
import toogleInProgressIngrLS from '../service/toogleInProgressIngrLS';
import '../styleSheets/ContentDetail.css';

function Ingredients({ recipe }) {
  const { pathname } = useLocation();
  const [flagUpdate, setFlagUpdate] = useState(false);
  const { setIsCompleted } = useContext(ContextRecipes);
  const dbType = pathname.includes('comidas') ? 'meals' : 'cocktails';
  const id = dbType === 'meals' ? recipe.idMeal : recipe.idDrink;
  const isInProgress = pathname.includes('in-progress');
  const recipeEntries = Object.entries(recipe);
  const measuresList = [];
  const ingredientsList = [];

  if (recipeEntries.length > 0) {
    recipeEntries.forEach((enter) => {
      if (enter[0]
        .includes('Ingredient') && enter[1] !== '' && enter[1]) {
        ingredientsList.push(enter[1]);
      }
      if (enter[0]
        .includes('Measure') && enter[1] !== '' && enter[1]) {
        measuresList.push(enter[1]);
      }
    });
  }

  useEffect(() => {
    setIsCompleted(checkRecipeIsCompleted(dbType, id, ingredientsList));
  }, [flagUpdate]);

  return (
    <section className="container-content">
      <h3 className="title-content">Ingredientes:</h3>
      <ul className="field-content">
        {ingredientsList.map((ingredient, index) => {
          const isDone = checkIngredientIsDone(dbType, id, ingredient);
          const decoration = isDone && isInProgress ? 'line-through' : 'none';
          const checkbox = (
            <input
              type="checkbox"
              onChange={ () => {
                toogleInProgressIngrLS(dbType, id, ingredient);
                setFlagUpdate(!flagUpdate);
              } }
              checked={ isDone }
              className="marker"
            />);
          return (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className="ingredient"
            >
              {isInProgress && checkbox}
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
                style={ { 'text-decoration': decoration } }
              >
                {`- ${ingredient} - ${measuresList[index]}`}
              </li>
            </div>
          );
        })}

      </ul>
    </section>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Ingredients;
