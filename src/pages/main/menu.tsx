import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useResolvedPath, useMatch } from 'react-router-dom'
import { Menu as AndtMenu} from 'antd'
import { mainRouter, RouterItem } from '../../router'

export const Menu = () => {

    const location = useLocation();
    const nav = useNavigate();
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(
        location.pathname.replace('/main', '').split('/').filter(v => v)
    );
    const p = useResolvedPath(location.pathname);
    const as = useMatch(p.pathname);
    const [menuList, setMenuList] = useState<any[]>();

    const formatRouterToMenu = (routers: RouterItem[]) => {
        return routers.filter(v => {
            return v.path !== '*' && v.hide !== true
        }).map(item => {
            const children = item.children ? formatRouterToMenu(item.children) : undefined;
            return {
                label: item.meta?.title,
                key: item.path,
                icon: item.meta?.icon,
                children: children?.length === 1 && children[0].key === '' || children?.length === 0  ? undefined : children
            }
        })
    }

    useEffect(() => {
        setMenuList(formatRouterToMenu(mainRouter));
        console.log(formatRouterToMenu(mainRouter))
    }, [])

    useEffect(() => {
        // console.log(as)
        // const c = 'ad/:name';
        // if (c.includes(':')) {
        //     c.match(/:([a-z]+)?/)
        // }
        // console.log(compilePath('info/:ad', true))

        // console.log(location.pathname.replace('/main', ''), mainRouter)
        // console.log(formatRouteUrl(location.pathname.replace('/main', '')))

    }, [as])

    function formatRouteUrl(pathname: string, routers = mainRouter, memo: any[] = []) {

        routers.filter(item => {
            if (pathname.startsWith(`/${item.path}`) && item.path !== '') {
                pathname = pathname.replace(`/${item.path}`, '')
                memo.push({...item, link: `/${item.path}`});
                return true;
            } else if (item.path.includes(':')) {
                const reg = new RegExp('/'+item.path.replace(/:([a-z]+)?/, '([A-z0-9]+)'))
                if (pathname.match(reg)) {
                    let link = '';
                    pathname = pathname.replace(reg, (a,b,c) => {
                        link = a;
                        return '';
                    })
                    memo.push({...item, link})
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }).forEach(item => {
            formatRouteUrl(pathname, item.children, memo);
        })
        return memo;
    }

    const getRoute = (keys: string[], router = mainRouter) => {
        const key = keys.shift();
        const route = router.find(v => v.path === key);
        if (keys.length === 0) {
            return route;
        } else if (route) {
            return getRoute(keys, route.children);
        } else {
            return undefined;
        }
    }
    return <div>
        <AndtMenu defaultOpenKeys={defaultOpenKeys} defaultSelectedKeys={defaultOpenKeys} mode="inline" items={menuList} onClick={e => {
            const route = getRoute([...e.keyPath].reverse());
            if (route.link) {
                return window.open(route.link);
            }
            nav(`/main/${e.keyPath.reverse().join('/')}`)
        }}>
        </AndtMenu>
    </div>

}