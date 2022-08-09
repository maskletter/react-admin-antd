import React from 'react';
import { Button, Table as AntdTable, Tag } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useAppDispath } from '../../hook/store';


export const Table = () => {

    const nav = useNavigate();
    const dispath = useAppDispath();

    const dataSource = [
        {
            key: '1',
            name: '张三',
            age: 32,
            address: '北京市朝阳区1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '北京市海淀区234号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'tags',
            render(data) {
                return <div>
                    <Tag color='blue' onClick={() => {
                        dispath({
                            type: 'table/setInfo', 
                            payload: data
                        })
                        nav('info/1');
                    }}>
                        编辑
                </Tag>
                </div>
            }
        }
    ];


    return <div>
        <Button type='primary' onClick={() => {
            nav('info/new');
        }}>新增</Button><br /><br />
        <AntdTable dataSource={dataSource} columns={columns}></AntdTable>
    </div>

}

export default Table;