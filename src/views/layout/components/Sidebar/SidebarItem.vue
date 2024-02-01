<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 没有子项，只有一个路由 -->
    <!-- 如果只有一个路由 且 (该路由下没有子 或者 显示的父路由器) 且 此路由的alwaysShow为false(详见router.js)-->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- router内的path如果是一个路由地址，则前往该地址，网址则新开页面前往网址页面 -->
      <app-link :to="resolvePath(onlyOneChild.path)"> 
        <!-- 唯一标志为此路由路径 -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}"> <!-- :class中传入一个对象，键值为true则显示键名这个类，false则不显示-->
          <item :meta="{...item.meta,...onlyOneChild.meta}" />
        </el-menu-item>
      </app-link>
    </template>
  <!-- 由多个子项，有下拉列表 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item :meta="item.meta" />
      </template>
      <!-- 引用自身，只要声明name，就算注册组件，就可以引用自身 -->
      <sidebar-item
        v-for="child in item.children"
        :is-nest="true"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        class="nest-menu" />
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          // router设置隐藏
          return false
        } else {
          // 如果只有一个显示子项，则将使用
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个子路由器时，默认显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        // noShowingChildren 此情况独有
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      // 校验path
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
