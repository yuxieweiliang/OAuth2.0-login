import React from 'react';
import { Icon, Input, Form, Button, Checkbox, message } from 'antd';
import sign from '../../models/sign';
import styles from './style.scss';
import SignUp from './sign-up';
import signBgImg from './sign-bg.png';
const { MSG } = services.state;

import logo from '../../../public/images/logo.png';
class Sign extends React.Component {
    constructor(props) {
        super(props);
        this.state = { signUpVisible: false };
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const is = await sign.in(values);

                if (is === true) {
                    message.info(MSG.signinSuccess);
                    return sign.localize(values, this.props);
                }

                if (is && is.code > 0) {
                    return message.error(is.msg);
                }
            }

            message.error(MSG.signinFailure);
        });
    }

    onSignUpOpen = () => {
        this.setState({
            signUpVisible: true
        });
    };

    onSignUpClose = () => {
        this.setState({
            signUpVisible: false
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const validate = sign.init();

        return (
            <div className={styles.sign}>
                <div className={styles.signWarp}>
                    <div className={styles.signBg}>
                        <img src={signBgImg} alt='sign background' />
                    </div>
                    <div className={styles.signBox}>
                        <img src={logo} alt='sign background' style={{width: 100}} />
                        <h6 className={styles.signTit}>用户登录</h6>
                        <Form onSubmit={this.submit.bind(this)}>
                            <Form.Item>
                                {getFieldDecorator('account', validate.account)(
                                    <Input prefix={<Icon type="user" className='text-muted' />} placeholder='账号' />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('pwd', validate.pwd)(
                                    <Input prefix={<Icon type="lock" className='text-muted' />} type="password" placeholder='密码' />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('remember', validate.remember)(<Checkbox>记住密码</Checkbox>)}
                                <a href='javascript:;' onClick={this.onSignUpOpen}>立即注册</a>
                            </Form.Item>

                            <Form.Item>
                                <div className='text-right'>
                                    <Button type="primary" htmlType="submit">登录</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
                {this.state.signUpVisible && <SignUp {...this.props} onCancel={this.onSignUpClose} />}
            </div>
        )
    }
}

export default null;
