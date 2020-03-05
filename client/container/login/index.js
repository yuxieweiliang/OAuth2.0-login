import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/Login';
import '../../root.less';
import './login.less';
// import './style.scss';

ReactDOM.hydrate(<Login />, document.getElementById('root'));
