import React from 'react'

export default class Login extends React.PureComponent {
  render () {
    let { next_url } = this.props;
    if(typeof window !== 'undefined') {
      next_url = window.__INITIAL__STATE__
    }

    return (
      <form className="container" method="post" action="/login">
        <input type="hidden" name="next" value={ next_url }/>
        <img className="logo" src="/images/logo.png" alt="logo"/>
        <div className="input-box">
          <span className="label">用户名：</span>
          <input className="input" type="text" placeholder="username" name="account"/>
        </div>
        <div className="input-box">
          <span className="label">密码：</span>
          <input className="input" type="password" placeholder="password" name="pwd"/>
        </div>
        <button className="btn login">Login</button>
      </form>
    )
  }
}
