<template>
  <view id="Index_Page_Container">
    <TopBar title="title" :noArrow="true" />
    <view class="content" :style="{ marginTop: coreStore.topMargin }">
      name
      <div class="go" @click="go">gogogo</div>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { onLoad, onShareAppMessage, onShow } from "@dcloudio/uni-app";

import utils from "../../utils";
import useCoreStore from "../../store/core";
import storage from "../../utils/storage";

interface IPageState {
  user: {
    id?: string;
    [key: string]: any;
  };
}
const state = reactive<IPageState>({
  user: {},
});

const {} = toRefs(state);

const coreStore = useCoreStore();

onLoad((params) => {
  if (params.scene) {
    // 小程序码进入
    try {
      params.code = decodeURIComponent(params.scene).split("=")[1];
    } catch {}
  }
  console.log(params, "params");

  const user = coreStore.user;

  if (user.id) {
    state.user = user;
  }
});

// 	确保最新数据
onShow(() => {
  if (!state.user.id) {
    const user = coreStore.user;
    if (user?.id) {
      state.user = user;
    }
  }
});

onShareAppMessage(() => {
  return {
    title: "title",
    path: `/src/pages/index/index`,
    imageUrl: `${utils.returnEnvConstants("filePath")}wxSharePic.png`,
  };
});

const goPage = (path: string, params?: any) => {
  if (!storage.get("token", null)) {
    utils.goTargetPage("login/index");
  } else {
    utils.goTargetPage(path, params);
  }
};

const go = () => {
  goPage("user/index");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
