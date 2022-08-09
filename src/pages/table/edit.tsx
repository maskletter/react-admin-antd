import { Form, Input } from 'antd';
import React, { useEffect } from 'react'
import { useAppDispath, useAppSelector } from '../../hook/store'


export default () => {

    const info = useAppSelector(state => state.table.info);
    const dispath = useAppDispath();

    useEffect(() => {
        return () => {
            dispath({
                type: 'table/setInfo',
                payload: {}
            })
        }
    }, [])

    return <div>
        <h2>编辑</h2>
        <Form>
            <Form.Item label='名字'>
                <Input value={info.name} />
            </Form.Item>
            <Form.Item label='年龄'>
                <Input value={info.age}/>
            </Form.Item>
            <Form.Item label='住址'>
                <Input value={info.address} />
            </Form.Item>
        </Form>
    </div>
}