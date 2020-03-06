import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/oauth2';
import '../../root.less';
import './login.less';
// import './style.scss';

ReactDOM.hydrate(<Login />, document.getElementById('root'));
