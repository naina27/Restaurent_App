import React from 'react';

import ReactDOM from 'react-dom';


import {BrowserRouter as Router, Route} from 'react-router-dom';


import Cform from './Component/Cform';
import Dform from './Component/Dform';
import Menulist from './Component/Menulist';
import Filter from './Component/Filter';
import Edit from './Component/Edit';
import Editlist from './Component/Editlist';
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
return(
  <div>
    <Router>
    <Route path='/cform' exact component={Cform}/>   
    <Route path='/dform' exact component={Dform}/>   
    <Route path='/menulist' exact component={Menulist}/>   
    <Route path='/filter' exact component={Filter}/>   
    <Route path='/edit' exact component={Edit}/>   
    <Route path='/editlist' exact component={Editlist}/>   


    </Router>
    </div>

  )
}

export default App;
