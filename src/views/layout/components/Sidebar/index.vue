<template>
  <div class="layout_component" wrap-class="scrollbar-wrapper">
    <div class="klLogo">logo</div>
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
}
</script>
<style lang="scss">
.layout_component {
  .klLogo {
    height: 8%;
    width: 100%;
    background: rebeccapurple;
  }
  .el-scrollbar {
    height: 92%;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}
</style>
