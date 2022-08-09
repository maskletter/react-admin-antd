import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { InstagramOutlined, GithubOutlined, SlackOutlined, GitlabOutlined, MediumOutlined } from '@ant-design/icons';
import { Login } from '../pages/login';
import { TestPage1, TestPage3, TestPage2, TestPage1_1, TestPage1_1_1, TestPage1_2 } from '../pages/test-page';

export interface RouterItem {
    path: string,
    component?: JSX.Element | (() => Promise<any>),
    link?: string
    auth?: boolean,
    hide?: boolean
    children?: RouterItem[]
    meta?: {
        title?: string
        icon?: JSX.Element
    }
}


export const mainRouter: RouterItem[] = [
    {
        path: 'home',
        meta: {
            title: '首页',
            icon: <InstagramOutlined />
        },
        component: () => import('../pages/home')
    },
    {
        path: 'table',
        meta: {
            title: '表格',
            icon: <SlackOutlined />,
        },
        component: <Outlet />,
        children: [
            { path: '', meta: {title: '列表'}, component: () => import('../pages/table') },
            { path: 'info/:edit', meta: {title: '编辑'}, hide: true, component: () => import('../pages/table/edit') }
        ]
    },
    {
        path: 'editor',
        meta: {
            title: '富文本',
            icon: <GitlabOutlined />,
        },
        component: () => import('../pages/editor')
    },
    {
        path: 'test-page',
        meta: {
            title: '测试页面',
            icon: <MediumOutlined />,
        },
        component: <Outlet />,
        children: [
            { 
                path: 'test1', 
                meta: { title: '测试1'}, 
                component: <TestPage1 /> ,
                children: [
                    {
                        path: 'children1',
                        meta: { title: '子级1'}, 
                        component: <TestPage1_1 />
                    },
                    {
                        path: 'children2',
                        meta: { title: '子级2'}, 
                        component: <TestPage1_2 />,
                        children: [
                            // {
                            //     path: '',
                            //     meta: { title: '子级2' },
                            //     component: <TestPage1_1
                            // },
                            {
                                path: 'name/:name/id/:id/edit',
                                meta: { title: '编辑详情' },
                                hide: true,
                                component: <TestPage1_1_1 />
                            }
                        ]
                    }
                ]
            },
            { 
                path: 'test2', 
                meta: { title: '测试2'}, 
                component: <TestPage2 /> 
            },
            { 
                path: 'test3', 
                meta: { title: '测试3'}, 
                component: <TestPage3 /> 
            }
        ]
    },
    {
        path: 'github',
        meta: {
            title: 'github',
            icon: <GithubOutlined />,
        },
        link: 'https://github.com/maskletter/react-admin-antd'
    },
    {
        path: '*',
        component: <div>
            路径丢失了
        </div>
    }
];


export const routers: RouterItem[] = [
    {
        path: '/',
        component: () => import('../pages/helloworld')
    },
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/main',
        component: () => import('../pages/main'),
        auth: true,
        children: mainRouter
    }
]


export const AuthRoute = (props: RouterItem & { component: any}) => {
    const nav = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem('user')) {
            nav('/login?redirectTo='+encodeURIComponent(props.path), {
                replace: true
            })
        }
    }, [])
    if (sessionStorage.getItem('user')) {
        return props.component;
    } else {
        return <div></div>
    }
}

export const Router = () => {
    const CreateRoute = (item: RouterItem) => {
        let Component: any;
        if (item.component && item.component instanceof Function) {
            const LazyComponent = lazy(item.component);
            Component = () => <Suspense fallback={<div>loading....</div>} >
                <LazyComponent />
            </Suspense>
        } else if (item.component) {
            Component = () => item.component;
        } else if (item.link) {
            return undefined;
        }
        if (item.auth) {
            return <Route key={item.path} path={item.path} element={<AuthRoute {...item} component={<Component />}/>}>
                {item.children ? item.children.map(mapRoute) : null}
            </Route>
        }
        return <Route key={item.path} path={item.path} element={<Component />} >
            {item.children ? item.children.map(mapRoute) : null}
        </Route>
    }
    const mapRoute = (item: RouterItem) => CreateRoute(item);
    return <Routes>
        {
            routers.map(mapRoute)
        }
    </Routes>
}