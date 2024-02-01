<template>
	<div id="Layout_Components_Tags">
		<el-scrollbar ref="refScrollbar" class="tagsViewWrapper">
			<router-link
				v-for="tag in visitedViews"
				ref="refTag"
				:key="tag.path"
				:class="isActive(tag) ? 'active' : ''"
				:to="
					{
						path: tag.path,
						query: tag.query,
						fullPath: tag.fullPath
					} as RouteLocationRaw
				"
				class="tagsViewItem"
				@click.middle="isAffix(tag) && closeSelectedTag(tag)"
			>
				<span class="tags-title">{{ tag.title }}</span>
				<el-icon
					v-if="!isAffix(tag)"
					name="close"
					class="el-icon-close"
					@click.prevent.stop="closeSelectedTag(tag)"
				>
					<Close />
				</el-icon>
			</router-link>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import path from 'path-browserify'
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'
import { computed, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'

import { usePermissionStore } from '@/store/permission'
import { useTagsViewStore } from '@/store/tagsView'

const tagAndTagSpacing = 4 // tagAndTagSpacing

const state = reactive({
	affixTags: [],
	refTag: null,
	refScrollbar: null
})

const { refTag, refScrollbar } = toRefs(state)

const router = useRouter()
const route = useRoute()
const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()

const visitedViews = computed(() => tagsViewStore.visitedViews)
const routes = computed(() => permissionStore.routes)

watch(
	() => route.path,
	() => {
		addTags()
		moveToCurrentTag()
	}
)

const isActive = (tag) => {
	return tag.path === route.path
}

const isAffix = (tag) => {
	return tag.meta && tag.meta.affix
}

const filterAffixTags = (routeList, basePath = '/home') => {
	let tags = []
	routeList.forEach((routeItem) => {
		if (routeItem.meta && routeItem.meta.affix) {
			const tagPath = path.resolve(basePath, routeItem.path)
			tags.push({
				fullPath: tagPath,
				path: tagPath,
				name: routeItem.name,
				meta: { ...routeItem.meta }
			})
		}
		if (routeItem.children) {
			const tempTags = filterAffixTags(routeItem.children, routeItem.path)
			if (tempTags.length >= 1) {
				tags = [...tags, ...tempTags]
			}
		}
	})
	return tags
}

const initTags = () => {
	state.affixTags = filterAffixTags(routes.value)
	for (const tag of state.affixTags) {
		if (tag.name) {
			tagsViewStore.addView(tag)
		}
	}
}

const addTags = () => {
	const { name } = route
	if (name) {
		tagsViewStore.addView(route)
	}
	return false
}

const moveToTarget = (currentTag) => {
	const $container = refScrollbar.value.wrapRef
	const $containerWidth = $container.offsetWidth
	const $scrollWidth = $container.scrollWidth
	const tagList = refTag.value

	let firstTag = null
	let lastTag = null
	// find first tag and last tag
	if (tagList.length > 0) {
		firstTag = tagList[0]
		lastTag = tagList[tagList.length - 1]
	}

	if (firstTag === currentTag) {
		$container.scrollLeft = 0
	} else if (lastTag === currentTag) {
		$container.scrollLeft = $scrollWidth - $containerWidth
	} else {
		// find preTag and nextTag
		const currentIndex = tagList.findIndex((item) => item === currentTag)
		const prevTag = tagList[currentIndex - 1]
		const nextTag = tagList[currentIndex + 1]

		// the tag's offsetLeft after of nextTag
		const afterNextTagOffsetLeft =
			nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

		// the tag's offsetLeft before of prevTag
		const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

		if (afterNextTagOffsetLeft > $container.scrollLeft + $containerWidth) {
			$container.scrollLeft = afterNextTagOffsetLeft - $containerWidth
		} else if (beforePrevTagOffsetLeft < $container.scrollLeft) {
			$container.scrollLeft = beforePrevTagOffsetLeft
		}
	}
}

const moveToCurrentTag = () => {
	nextTick(() => {
		for (const tag of refTag.value) {
			if (tag.to.path === route.path) {
				moveToTarget(tag)
				// when query is different then update
				if (tag.to.fullPath !== route.fullPath) {
					tagsViewStore.updateVisitedView(route)
				}
				break
			}
		}
	})
}

const closeSelectedTag = (view) => {
	tagsViewStore.delView(view).then(({ visitedViews }) => {
		if (isActive(view)) {
			toLastView(visitedViews, view)
		}
	})
}

const toLastView = (visitedViews, view) => {
	const latestView = visitedViews.slice(-1)[0]
	if (latestView) {
		router.push(latestView.fullPath)
	} else {
		// now the default is to redirect to the home page if there is no tags-view,
		// you can adjust it according to your needs.
		if (view.name === 'Home') {
			// to reload home page
			router.replace({ path: '/redirect' + view.fullPath })
		} else {
			router.push('/home')
		}
	}
}

onMounted(() => {
	initTags()
	addTags()
})
</script>

<style lang="scss" scoped>
#Layout_Components_Tags {
	height: 40px;
	width: 100%;
	background: #fff;
	box-shadow:
		0 1px 3px 0 rgba(0, 0, 0, 0.12),
		0 0 3px 0 rgba(0, 0, 0, 0.04);
	box-sizing: border-box;

	.tagsViewWrapper {
		.tagsViewItem {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 10px;
			font-size: 12px;
			margin-left: 5px;
			white-space: nowrap;

			&:first-of-type {
				margin-left: 15px;
			}

			&:last-of-type {
				margin-right: 15px;
			}

			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;

				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}

			.tags-title {
				padding: 0 5px;
			}

			.el-icon-close {
				vertical-align: middle;
				border-radius: 50%;
				text-align: center;
				transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
				transform-origin: 100% 50%;
				font-size: 12px;

				&:before {
					transform: scale(0.6);
					display: inline-block;
					vertical-align: -3px;
				}

				&:hover {
					background-color: #b4bccc;
					color: #fff;
				}
			}
		}
	}

	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;

			&:hover {
				background: #eee;
			}
		}
	}
}
</style>

<style lang="scss">
#Layout_Components_Tags {
	.el-scrollbar__wrap {
		display: flex;
		align-items: center;
	}
}
</style>
