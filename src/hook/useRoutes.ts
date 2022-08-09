import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { mainRouter } from "../router";


export const useRoutes = () => {

    const location = useLocation();
    const [routes, setRoutes] = useState<any[]>([]);
    const formatRouteUrl = (pathname: string, routers = mainRouter, memo: any[] = []) => {

        routers.filter(item => {
            if (pathname.startsWith(`/${item.path}`) && item.path !== '') {
                pathname = pathname.replace(`/${item.path}`, '')
                memo.push({...item, link: `/${item.path}`});
                return true;
            } else if (item.path.includes(':')) {
                const reg = new RegExp('/'+item.path.replace(/:([a-z]+)?/g, '([A-z0-9]+)'))
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

    useEffect(() => {
        setRoutes(formatRouteUrl(location.pathname.replace('/main', '')));
        console.log(formatRouteUrl(location.pathname.replace('/main', '')))
    }, [location])

    return routes;

}