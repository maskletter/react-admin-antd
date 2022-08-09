import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { Menu } from './menu'
import { Breadcrumb } from './breadcrumb'
import { useAppSelector } from '../../hook/store';


export const Main = () => {

    const user = useAppSelector(state => state.user.userInfo);

    return <Layout style={{ height: '100vh' }}>
        <Layout.Header style={{ color: 'white' }}><h1>欢迎登陆:{user.username}</h1></Layout.Header>
        <Layout>
            <Layout.Sider style={{ background: 'white' }}>
                <Menu />
            </Layout.Sider>
            <Layout style={{ padding: 20 }}>
                <Breadcrumb /><br />
                <Layout.Content>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    </Layout>

}

export default Main;