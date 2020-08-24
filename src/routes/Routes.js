import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Consulta from '../pages/Consulta.js';
import Detalle from '../pages/Detalle.js';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Consulta}/>
        <Route exact path="/detalle" component={Detalle}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;