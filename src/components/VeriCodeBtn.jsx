import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { sendCode } from '../api/auth';

const VeriCodeBtn = ({ form, loginType }) => {
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        try {
            const fields = loginType === 'phone' ? ['phone', 'captcha'] : ['email', 'captcha'];
            const values = await form.validateFields(fields);
            setLoading(true);
            await sendCode(values[loginType]);
            message.success('验证码已发送');
            setCountdown(60);
        } catch (error) {
            console.error('验证码发送失败', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown((prev) => { prev - 1 })
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <Button type='link' onClick={handleSend} disabled={countdown > 0 || loading}>
            {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
        </Button>
    );
};

export default VeriCodeBtn;