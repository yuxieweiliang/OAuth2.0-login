import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import '../../root.less';
import './home.less';

console.log('---------------');
ReactDOM.hydrate(<Login />, document.getElementById('root'));
