import React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import sign from '../../models/sign';
// const { MSG } = services.state;


const signBgImg = '/images/sign-bg.png';
const logo = '/images/logo.png';
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { signUpVisible: false };
  }

  submit = (e) => {
    e.preventDefault();
    sign.in();
    console.log('post login', this.account);
    message.error('login');
  };

  render() {
    const validate = sign.init();

    console.log('::::::::::::: render :::::::::::::');
    return (
      <div className="sign">
        <div className="sign-warp">
          <div className="sign-bg">
            <img src={signBgImg} alt='sign background' />
          </div>
          <div className="sign-box">
            <img src={logo} alt='sign background' style={{width: 60}} />
            <h6 className="sign-title">用户登录</h6>
            <Form onSubmit={this.submit}>
              <Form.Item>
                <Input
                  prefix={<Icon type="user" className='text-muted' />}
                  placeholder='账号'
                  name="account"
                  onChange={e => this.account = e.target.value}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  prefix={<Icon type="lock" className='text-muted' />}
                  type="password"
                  placeholder='密码'
                  name="pwd"
                  onChange={e => this.password = e.target.value}
                />
              </Form.Item>

              <Form.Item>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item>
                <div className='text-right'>
                  <Button type="primary" htmlType="submit">登录</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
