import React from 'react';
import LoginForm from '../components/LoginForm';
import {Card} from 'antd';

export default function LoginPage() {
    return (
        <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <Card title="多种方式登录" style={{width: 360}}>
                <LoginForm />
            </Card>
        </div>
    );
}