<template>
  <div class="content">
    <div class="top-content">
      <t-descriptions class="descriptions" title="欢迎使用">
        <t-descriptions-item label="用户">Jackey</t-descriptions-item>
        <t-descriptions-item label="使用方式">点击聊天即可开始</t-descriptions-item>
      </t-descriptions>
      <t-dropdown :options="options" trigger="hover" @click="clickHandler">
        <t-avatar size="50px" :image="image" :hide-on-load-failed="false" />
      </t-dropdown>
    </div>
    <div class="startButton">
      <div class="symbol">
        <div style="display: flex;align-items: center;margin-bottom: 20px;">
          <LogoAdobeIllustrateIcon color="#4d6bfe" size="50px"/>
          <div class="text">我是 JackeySeek，很高兴见到你！</div>
        </div>
        <t-textarea class="textarea" tips="内容由 AI 生成，请仔细甄别" v-model="value" placeholder="给JackeySeek发送信息" name="description" @change="onChange"  :autosize="{ minRows: 5, maxRows: 8 }" />
        <div class="button">
          <t-button shape="circle" theme="primary" size="large">
            <template #icon> <ArrowUpIcon /></template>
          </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' 
import { SearchIcon, LogoAdobeIllustrateIcon, ArrowUpIcon } from 'tdesign-icons-vue-next';
const image = ref('https://tdesign.gtimg.com/site/avatar.jpg')
const options = ref([
  { content: '我的', value: 1 },
  { content: '查询余额', value: 2 },
  { content: '分享', value: 3 },
  { content: '捐赠', value: 4 },
])
const startTalk = () => {
  console.log('开始聊天')
}
</script>

<style lang="less" scoped>
  .content {
    overflow: hidden;
  }
  .top-content {
    position: absolute;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    .descriptions {
      padding: 10px;
      border-radius: 20px;
      width: 40%;
      background-color: #fff;
    }
  }
  .startButton {
    margin-top: 16%;
    .symbol {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 24px;
        color: #fff;
      }
      .button {
        position: absolute;
        left: 72%;
        bottom: 42px;
      }
    }
    .textarea {
      position: relative;
      width: 50%;
      .button {
        position: absolute;
        display: flex;
        justify-content: space-between;
      }
    }
    :deep(.t-textarea__inner) {
      border-radius: 30px;
      padding: 15px;
      background-color: #fff;
      color: #000;
      border: 0;
    }
    :deep(.t-textarea__inner:focus) {
      border: 0 !important;
      box-shadow: none;
    }
    :deep(.t-textarea__tips) {
      color: #fff;
      margin: 10px 0 0 10px;
    }
    .button {
      &:hover {
        transform:scale(1.3) ;
      }
    }
  }
</style>