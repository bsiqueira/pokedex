import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-proxima-nova/style.css'
import Pokedex from './components/Pokedex';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pokedex />, document.getElementById('root'));
registerServiceWorker();
