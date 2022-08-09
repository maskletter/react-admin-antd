import { Button } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


export const TestPage1 = () => {

    return <div>
        TestPage1
        <Outlet />
    </div>

}
export const TestPage1_1 = () => {
    const nav = useNavigate();
    return <div>
        TestPage1_1<br />
    </div>
}
export const TestPage1_2 = () => {
    const nav = useNavigate();
    return <div>
        TestPage1_2<br />
        <Button onClick={() => {
            nav('name/tom/id/123456/edit')
        }}>
            测试跳转
        </Button>
        <Outlet />
    </div>
}
export const TestPage1_1_1 = () => {

    return <div>
        TestPage1_1_1
    </div>

}

export const TestPage2 = () => {

    return <div>
        TestPage2
    </div>

}

export const TestPage3 = () => {

    return <div>
        TestPage3
    </div>

}