import store from '@/store'

const { body } = document
const WIDTH = 992 // 拟定一个界限，大于此值是PC端，反之移动端

export default {
  watch: {
    $route(route) {
      // 移动端下关闭(移动端下直接关闭，而不是缩小)侧边栏时
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    // 挂载之前监听窗口变化
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    // 初始化判定是否为移动端
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      // getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        // 每次窗口变化，进行判定
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          // 移动端默认不显示侧边栏
          store.dispatch('CloseSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
