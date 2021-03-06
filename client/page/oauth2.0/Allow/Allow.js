import React from 'react'
import axios from 'axios';

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authorize_url: (typeof window !== 'undefined') ? window.__INITIAL__STATE__ : this.props.authorize_url
    }
  }

  onAllow = () => {
    axios.post('/oauth2.0/authorize').then((res) => {
      console.log(res);
    });
  };

  render () {
    let { authorize_url } = this.state;
    if(typeof window !== 'undefined') {
      authorize_url = window.__INITIAL__STATE__
    }
    console.log('-------------', authorize_url);
    return (
      <form method="post" action="/login"  className="container">
        <div className="title">是否同意使用你的账号登陆？</div>
        <img className="logo" src="/images/logo.png" alt="logo" onClick={() => alert('fffffffff')}/>
          <div className="btn-container">
            <button name="allow" className="btn allow">同意</button>
            <button name="deny" className="btn deny">拒绝</button>
          </div>
      </form>
    )
  }
}
/*
export default class Login extends React.Component {
  allow(data) {
    let { authorize_url } = this.props;
    authorize_url = authorize_url || __INITIAL__STATE__;
    fetch(authorize_url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      // mode: 'no-cors',
      body: JSON.stringify({[data]: true, aaa: 'ffffffffffffff', ff: 'ccccccccccc'})
    })
  }
  render () {
    let { authorize_url } = this.props;
    authorize_url = authorize_url || __INITIAL__STATE__;
    return (
      <div method="post" action={ authorize_url }>
        <button name="allow" onClick={() => this.allow("allow")}>Allow</button>
        <button name="deny" onClick={() => this.allow("deny")}>Deny</button>
      </div>
    )
  }
}
*/
