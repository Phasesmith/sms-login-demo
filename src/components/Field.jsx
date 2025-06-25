import React from 'react';
import { Form, Input } from 'antd';

const Field = ({ name, label, rules, type = 'text', placeholder, maxLength, addonAfter }) => {
    const input =
        type === 'password' ? (
            <Input.Password placeholder={placeholder} maxLength={maxLength} />
        ) : (
            <Input.Password placeholder={placeholder} maxLength={maxLength} addonAfter={addonAfter} />
        );

    return (
        <Form.Item name={name} label={label} rules={rules}>
            {input}
        </Form.Item>
    );
};

export default Field;