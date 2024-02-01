import { Suspense } from 'react'
import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Toast } from 'antd-mobile'

/*
  route = [
    {
      path: '页面路径',
      module: '',
      exact: '不设置的话  如果 children 有值，则为false，反之true',
      childrens:[
        ...同上
      ]
    }
  ]

  嵌套路由：

  如果需要将 path 为 / 的路由下设置子路由的话，/ 路径(父路由)不需要重定向，module指定固定模块。 在 / 路由下设置childrens 添加子路由，第一个children为 {
        path: '/',
        rediect: '/homePage',
      },
      重定向到指定页面，完成嵌套
      

  父路由的exact必须为false！ 不然启动严格校验后不显示子路由内容

  设置子路由后，父路由页面必须在最底部加入 {prrops.children} 才能正常显示！

  重定向
  如果要将首页具有子路由，就将首页，默认 '/' 页面 重定向到一个 具有新path的首页，然后创建子路由。
  
  example: 
  
  {
    path: '/',
    rediect: '/index',
    module: ''
  },
  {
    path: '/index',
    module: 'page/index/index'
  },
  {
    path: '/index2',
    module: 'page/index2',
    childrens: [
      {
        path: '/index2/:123',
        module: 'page/index/index3child',
        exact: false
      }
    ]
  }
 */

const route = [
  {
    path: '/',
    module: 'page/index',
  }
]

function getModule(routes) {
  return routes.map((item) => ({
    ...item,
    module: item.module && React.lazy(() => import(`@/${item.module}`)),
    childrens: item?.childrens ? getModule(item.childrens) : []
  }))
}

function Routes(route) {
  return route.map(
    ({ path, childrens = [], module, rediect, exact }, index) => {
      const Component = module
      return (
        <Route
          key={'Route' + index}
          path={path}
          exact={typeof exact === 'boolean' ? exact : childrens.length === 0}
          render={(props) => {
            // 重定向
            if (rediect && !module) {
              return <Redirect to={rediect} />
            } else {
              return (
                <Component {...props}>
                  {childrens.length > 0 && <Switch>{Routes(childrens)}</Switch>}
                </Component>
              )
            }
          }}
        ></Route>
      )
    }
  )
}

const router = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>{Routes(getModule(route))}</Switch>
      </Suspense>
    </HashRouter>
  )
}

const Loading = () => {
  Toast.loading('加载中...', 500000)
  useEffect(() => {
    return () => {
      Toast.hide()
    }
  }, [])
  return (
    <div></div>
  )
}

export default router
