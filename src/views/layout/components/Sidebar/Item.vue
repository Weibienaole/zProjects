<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: ''
        }
      }
    }
  },
  render(h, context) {
    // template替代方案，有render()就不会运行template
    // h -- 该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode
    // 如果是函数组件，额外接口 context 参数，为没有实例的函数组件提供上下文信息
    const { icon, title } = context.props.meta
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
