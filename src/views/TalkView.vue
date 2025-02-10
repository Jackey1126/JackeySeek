<template>
  <div class="talk-content" :class="list.length !== 0 ? 'fix-height' : ''">
    <div class="middle" v-for="(item, index) in list" :key="index">
      <div class="ava-text-user" v-if="item.role === 'user'">
        <div class="talk-textarea toInlineBlock">{{ item.text }}</div>
        <t-avatar :image="image" :hide-on-load-failed="false" />
      </div>
      <div class="ava-text-ai" v-if="item.role === 'system'">
        <LogoAdobeIllustrateIcon color="#4d6bfe" size="30px"/>
        <div v-if="item.text" class="talk-textarea toInlineBlock" v-html="item.text" />
        <t-loading style="margin-left: 8px;" v-else></t-loading>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'
import { LogoAdobeIllustrateIcon } from 'tdesign-icons-vue-next';
const props = defineProps({
  list: {
    type: Array,
    default: []
  }
})
const image = ref('https://tdesign.gtimg.com/site/avatar.jpg')
</script>

<style lang="less" scoped>
.toInlineBlock {
  display: inline-block;
}
.fix-height {
  height: 550px;
  overflow: hidden;
  overflow-y: auto;
}
.fix-height::-webkit-scrollbar {
  width: 0;
}
.talk-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .middle {
    width: 50%;
    margin: 20px 0;
    .ava-text-ai {
      text-align: left;
      display: flex;
      .talk-textarea {
        max-width: 855px;
        background-color: #fff;
        padding: 12px;
        border-radius: 10px;
        margin-left: 8px;
      }
    }
    .ava-text-user {
      text-align: right;
      .talk-textarea {
        max-width: 855px;
        background-color: #fff;
        padding: 12px;
        border-radius: 10px;
        margin-right: 8px;
      }
    }
  }
}
</style>