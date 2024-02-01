
<template>
<!-- is中可以一个已注册的组件名称，也可以是一个全是 attribute 的对象 -->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      // 如果校验成功，则是一个a标签
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 否则是一个router-link
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
