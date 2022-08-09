import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import styles from './index.module.scss';
import { useLoading } from '../../hook';

export const Login = () => {

    const { loading, showLoading } = useLoading();
    const nav = useNavigate();

    const onFinish = (values: any) => {
        showLoading();
        setTimeout(() => {
            sessionStorage.setItem('user', JSON.stringify(values))
            nav('/main', { replace: true });
        }, 1000)
        
    }

    return <div className={styles.body}>
        <div className={styles.wrapper}>
            <h2 className={styles.title}>登陆</h2>
            <div className={styles.form}>
                <Form onFinish={onFinish}>
                    <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                        <Input.Password placeholder="请输入密码"  />
                    </Form.Item>
                    <div className={styles.footer}>
                        <Button loading={loading} type='primary' htmlType="submit">确定</Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>

}