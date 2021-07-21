import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';
import ByIngredients from './screens/ByIngredients';
import ByOrigin from './screens/ByOrigin';
import DetailsInProgress from './screens/DetailsInProgress';
import Explore from './screens/Explore';
import ExploreFilters from './screens/ExploreFilters';
import Login from './screens/Login';
import DoneAndFavorites from './screens/DoneAndFavorites';
import Main from './screens/Main';
import NotFound from './screens/NotFound';
import Profile from './screens/Profile';

function App() {
  return (
    <BrowserRouter>
      <ProviderRecipes>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route
            path="/comidas/:id/in-progress"
            render={ (props) => <DetailsInProgress { ...props } /> }
          />
          <Route
            path="/bebidas/:id/in-progress"
            render={ (props) => <DetailsInProgress { ...props } /> }
          />
          <Route
            path="/comidas/:id"
            render={ (props) => <DetailsInProgress { ...props } /> }
          />
          <Route
            path="/bebidas/:id"
            render={ (props) => <DetailsInProgress { ...props } /> }
          />
          <Route path="/comidas" component={ Main } />
          <Route path="/bebidas" component={ Main } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFilters } />
          <Route exact path="/explorar/bebidas" component={ ExploreFilters } />
          <Route path="/explorar/comidas/ingredientes" component={ ByIngredients } />
          <Route path="/explorar/bebidas/ingredientes" component={ ByIngredients } />
          <Route path="/explorar/comidas/area" component={ ByOrigin } />
          <Route path="/receitas-feitas" component={ DoneAndFavorites } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-favoritas" component={ DoneAndFavorites } />
          <Route component={ NotFound } />
        </Switch>
      </ProviderRecipes>
    </BrowserRouter>
  );
}

export default App;
