import { Breadcrumb as AntdBreadcrumb } from 'antd';
import React from 'react';
import { useRoutes } from '../../hook/useRoutes';



export const Breadcrumb = () => {

    const routes = useRoutes();
    
    return <AntdBreadcrumb>
        {
            routes.map(item => <AntdBreadcrumb.Item key={item.path}>{item.meta?.title}</AntdBreadcrumb.Item>)
        }
    </AntdBreadcrumb>
}