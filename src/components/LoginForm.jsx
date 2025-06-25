import React, { useEffect, useState } from 'react';
import { Form, Button, Tabs, message, Checkbox } from 'antd';
import { loginWithPhone, loginWithEmail, loginWithUsername } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Field from './Field';
import VeriCodeBtn from './VeriCodeBtn';

const { Tabpane } = Tabs;

const LoginForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState(() => {
        const remembered = localStorage.getItem('loginType');
        return remembered || 'phone';
    });
    const { login } = useAuth;

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            let res;
            if (loginType === 'username') {
                res = await loginWithUsername(values.username, values.password);
            } else if (loginType === 'email') {
                res = await loginWithEmail(values.email, values.code);
            } else {
                res = await loginWithPhone(values.phone, values.code);
                if (values.rememberPhone) {
                    localStorage.setItem('rememberedPhone', values.phone);
                } else {
                    localStorage.removeItem('rememberedPhone');
                }
            }
            login(res.data);
            message.success('登陆成功');
        } catch (err) {
            console.error(err);
            message.error('登录失败');
        } finally {
            setLoading(false);
        }
    };

    const rememberedPhone = localStorage.getItem('rememberedPhone') || '';

    return (
        <>
            <Tabs
                defaultActiveKey={loginType}
                onChange={(key) => {
                    setLoginType(key);
                    form.resetFields();
                    localStorage.setItem('loginType', key);
                }}
                style={{ marginBottom: 24 }}
            >
                <Tabpane tab="手机号登录" key="phone" />
                <Tabpane tab="邮箱登录" key="email" />
                <Tabpane tab="用户名登录" key="username" />
            </Tabs>

            <Form form={form} onFinish={handleLogin} layout="vertical" initialValues={{ phone: 'rememberedPhone' }}>
                {loginType === 'phone' && (
                    <>
                        <Field
                            name="phone"
                            label="手机号"
                            placeholder="手机号"
                            maxLength={11}
                            rules={[
                                { required: true, message: "请输入手机号" },
                                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的中国大陆手机号' }
                            ]}
                        />
                        <Field 
                            name="captcha"
                            label="图形验证码"
                            placeholder="图形验证码"
                            maxLength={6}
                            rules={[{required: true, message: "请输入图形验证码"}]}
                        />
                        <Field 
                            name="code"
                            label="短信验证码"
                            placeholder="短信验证码"
                            maxLength={6}
                            rules={[
                                {required: true, message: "请输入短信验证码"},
                                {pattern:/^d[6]$/, message: "验证码必须为6位数字"}
                            ]}
                            addonAfter={<VeriCodeBtn form={form} loginType="phone" />}
                        />
                        <Form.Item name="rememberPhone" valuePropName='checked'>
                            <Checkbox>记住手机号</Checkbox>
                        </Form.Item>
                    </>
                )}

                {loginType === 'email' && (
                    <>
                        <Field
                            name="email"
                            label="邮箱"
                            placeholder="邮箱"
                            rules={[
                                { required: true, message: "请输入邮箱" },
                                { type: 'email', message: '邮箱格式必须有效' }
                            ]}
                        />
                        <Field 
                            name="captcha"
                            label="图形验证码"
                            placeholder="图形验证码"
                            maxLength={6}
                            rules={[{required: true, message: "请输入图形验证码"}]}
                        />
                        <Field 
                            name="code"
                            label="邮箱验证码"
                            placeholder="邮箱验证码"
                            maxLength={6}
                            rules={[
                                {required: true, message: "请输入邮箱验证码"},
                                {pattern:/^d[6]$/, message: "验证码必须为6位数字"}
                            ]}
                            addonAfter={<VeriCodeBtn form={form} loginType="phone" />}
                        />
                    </>
                )}

                {loginType === 'username' && (
                    <>
                        <Field
                            name="username"
                            label="用户名"
                            placeholder="用户名"
                            rules={[{ required: true, message: "请输入用户名" }]}
                        />
                        <Field
                            name="password"
                            label="密码"
                            placeholder="密码"
                            rules={[{ required: true, message: "请输入密码" }]}
                        />
                    </>
                )}
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;