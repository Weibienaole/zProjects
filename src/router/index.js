import Vue from "vue";
import Router from "vue-router";

// 在开发环境中不要使用延迟加载，因为延迟加载过多的页面会导致网页包热更新太慢。所以只有在生产中才使用延迟加载

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true    true时显示在侧边栏中，false不显示

* alwaysShow: true  if set true, will always show the root menu, whatever its child routes length    如果设置为true，将始终显示根菜单，无论其子路径长度如何
if not set alwaysShow, only more than one route under the children  *如果未设置总是显示，则只能在子项下设置多个路由
it will becomes nested mode, otherwise not show the root menu  *它将变成嵌套模式，否则不显示根菜单

* redirect: noredirect           面包屑重定向到此路径   noredirect - 面包屑中不重定向

* name:'router-name'             <keep-alive> 中使用  - 必须使用 (must set!!!)

* path  当前页面的路径，如果是一个网址则新开一个页面前往此网址
* component  引入组件 -- 动态 & 手动

* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)  名称显示在子菜单和面包屑中

    icon: 'svg-name'             the icon show in the sidebar  侧边栏显示icon

    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)  如果为false，则项目将隐藏在breadcrumb中（默认值为true）
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    hidden: true,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index")
      }
    ]
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "example" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "Tree", icon: "tree" }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "form" }
      }
    ]
  },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" }
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" }
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "menu2" }
      }
    ]
  },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
