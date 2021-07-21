/*
esta função recebe dbType e retorna o id registrado no localstorage chave "inProgressRecipes"
*/

function checkInProgressId(dbType) {
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(recipeInProgress);
  let id = '';
  if (recipeInProgress) {
    id = recipeInProgress[dbType] ? Object.keys(recipeInProgress[dbType])[0] : '';
  }
  return id;
}

export default checkInProgressId;
