// 用户注册

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, Select, Row, Col, message } from 'antd';
import sign from '../../models/sign';

const { SEX } = services.state;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },

    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    }
};

class UserSignup extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                sign.up(values).then(res => {
                    if (res && res.code === 0) {
                        message.info('用户注册成功');
                        this.props.onSuccess(res.data);
                        this.props.onCancel();
                    } else {
                        message.error('用户注册失败：' + res.msg);
                        this.props.onError(res);
                    }
                });
            }
        });
    }

    fields = {
        account: {
            label: '账号',
            name: 'account',
            type: 'input:text',
            placeholder: '请输入用户账号，账号用于登录',
            vaildate: {
                rules: [{ required: true, message: '请输入用户账号!' }]
            }
        },

        pwd: {
            label: '密码',
            name: 'pwd',
            type: 'input:text',
            placeholder: '请输入用户密码，密码用户登录',
            vaildate: {
                rules: [{ required: true, message: '请输入用户密码!' }],
                initialValue: '123456'
            }
        },

        name: {
            label: '昵称',
            name: 'name',
            type: 'input:text',
            placeholder: '请输入用户昵称',
            vaildate: {
                rules: [{ required: true, message: '请输入用户昵称' }],
                initialValue: '无名'
            }
        },

        sex: {
            label: '性别',
            name: 'sex',
            type: 'select',
            placeholder: undefined,
            vaildate: {
                rules: [{ required: false, message: '请选择用户性别' }],
                initialValue: 0
            }
        },

        mobile: {
            label: '手机',
            name: 'mobile',
            type: 'input:text',
            placeholder: '请输入用户手机号'
        },

        email: {
            label: '邮箱',
            name: 'email',
            type: 'input:text',
            placeholder: '请输入用户邮箱'
        }
    }

    render() {
        const { onCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        const fields = this.fields;

        return (
            <Modal title='用户注册' visible onCancel={onCancel} footer={null}>
                <Form onSubmit={this.submit}>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label='账号' >
                                {getFieldDecorator('account', fields.account.vaildate)(<Input type='text' placeholder={fields.account.placeholder} />)}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label='密码' >
                                {getFieldDecorator('pwd', fields.pwd.vaildate)(<Input type='text' placeholder={fields.pwd.placeholder} />)}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label='昵称' >
                                {getFieldDecorator('name', fields.name.vaildate)(<Input type='text' placeholder={fields.name.placeholder} />)}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label='性别'>
                                {getFieldDecorator('sex', fields.sex.vaildate)(
                                    <Select>
                                        <Select.Option value={0} key={0}>{SEX[0]}</Select.Option>
                                        <Select.Option value={1} key={1}>{SEX[1]}</Select.Option>
                                        <Select.Option value={2} key={2}>{SEX[2]}</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label='手机' >
                                {getFieldDecorator('mobile', fields.mobile.vaildate)(<Input type='text' placeholder={fields.mobile.placeholder} />)}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label='邮箱' >
                                {getFieldDecorator('email', fields.email.vaildate)(<Input type='email' placeholder={fields.email.placeholder} />)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <div className='text-right'>
                            <Button type="primary" htmlType="submit" >提交</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

UserSignup.defaultProps = {
    onCancel: PropTypes.func,
    onError: PropTypes.func,
    onSuccess: PropTypes.func
}

export default Form.create()(UserSignup);
