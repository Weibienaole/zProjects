# 组件
- 命名格式：驼峰，首字母大写
- class命名格式：[name]_Components_Container
# 请求
- 创建：api下以页面分开，全局采用 core.ts
- 命名格式：[name]
- 导入并使用：
	- import * as api from '/api/[page].ts'
	- api.xxx
# 类型声明
- 命名格式：前缀为 I 驼峰，首字母大写 
	- example： export interface IUserLoginReqData {}
- 存放位置：简单页面存放当前页面，复杂页面单抽出一个typing.ts，公共存放至src/typing/index.d.ts
# 页面
- 命名：驼峰
- 根元素下id命名：[page]_Page_Container
#vue3
- 开发格式：
```ts
// 修改时以 state.[name] = xxx 进行统一修改
const state = reactive<IPageState>({
	a: unknown
	// ... some state
})

// a变量向外暴露，提供给template使用，不需要 .value
const { a } = toRefs<IPageState>(state)
```
# pinia
- 文件命名：store/[page] core为全局状态
- 导出命名：use[驼峰文件名]Store
example: /store/core.ts
- 使用：
const coreStore = useCoreStore()
coreStore.action方法()
# template
- 组件和页面通用
```ts
<template>
	<view id="Index_Page_Container">
	</view>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import { reactive, toRefs } from 'vue';
	
	interface IPageState{
		
	}

	onMounted(() => {
	})

	const state = reactive<IPageState>({

	})
	const {

	} = toRefs<IPageState>(state)
</script>

<style lang="scss" scoped>
</style>
```

# css
简单内嵌，复杂单开