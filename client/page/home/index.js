import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import '../../root.less';
import './home.less';

console.log('---------------');
ReactDOM.hydrate(<Home />, document.getElementById('root'));
