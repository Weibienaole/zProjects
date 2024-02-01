import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', {
	state: () => {
		return {
			visitedViews: []
		}
	},
	actions: {
		addView(view) {
			this.addVisitedView(view)
		},
		addVisitedView(view) {
			if (this.visitedViews.some((v) => v.path === view.path)) return
			this.visitedViews.push(
				Object.assign({}, view, {
					title: view.meta.title || 'no-name'
				})
			)
		},
		delView(view) {
			return new Promise((resolve) => {
				this.delVisitedView(view)
				resolve({
					visitedViews: [...this.visitedViews]
				})
			})
		},
		delVisitedView(view) {
			return new Promise((resolve) => {
				for (const [i, v] of this.visitedViews.entries()) {
					if (v.path === view.path) {
						this.visitedViews.splice(i, 1)
						break
					}
				}
				resolve([...this.visitedViews])
			})
		},
		delAllViews(view) {
			return new Promise((resolve) => {
				this.delAllVisitedViews(view)
				resolve({
					visitedViews: [...this.visitedViews]
				})
			})
		},
		delAllVisitedViews() {
			return new Promise((resolve) => {
				// keep affix tags
				const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
				this.visitedViews = affixTags
				resolve([...this.visitedViews])
			})
		},
		updateVisitedView(view) {
			for (let v of this.visitedViews) {
				if (v.path === view.path) {
					v = Object.assign(v, view)
					break
				}
			}
		}
	}
})
