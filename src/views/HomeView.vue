<template>
  <div class="content">
    <div class="top-content">
      <t-descriptions class="descriptions" title="欢迎使用">
        <t-descriptions-item label="用户">Jackey</t-descriptions-item>
        <t-descriptions-item label="使用方式">易上手得要命</t-descriptions-item>
      </t-descriptions>
      <t-dropdown :options="options" trigger="hover" @click="clickHandler">
        <t-avatar size="50px" :image="image" :hide-on-load-failed="false" />
      </t-dropdown>
    </div>
    <TalkViewVue :list="talklist"/>
    <div class="startButton" :style="talklist.length === 0 ? 'margin-top: 8%;' : ''">
      <div class="symbol">
        <div v-if="talklist.length === 0" style="display: flex;align-items: center;margin-bottom: 20px;">
          <LogoAdobeIllustrateIcon color="#4d6bfe" size="50px"/>
          <div class="text">我是 JackeySeek，很高兴见到你！</div>
        </div>
        <t-textarea class="textarea" tips="内容由 AI 生成，请仔细甄别 (按下F4键可快捷发送)" v-model="talkValue" placeholder="给JackeySeek发送信息" name="description" @change="onChange" @keydown="keydown" :autosize="{ minRows: 5, maxRows: 5 }" />
        <div class="button">
          <t-button shape="circle" theme="primary" size="large" :disabled="!talkValue" @click="startTalk">
            <template v-if="!loading" #icon> <ArrowUpIcon /></template>
            <template v-else #icon> <StopIcon /></template>
          </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' 
import { NotifyPlugin } from 'tdesign-vue-next'
import { SearchIcon, LogoAdobeIllustrateIcon, ArrowUpIcon, StopIcon } from 'tdesign-icons-vue-next';
import { seekApi } from '@/api/ai.js'
import TalkViewVue from './TalkView.vue';
const image = ref('https://tdesign.gtimg.com/site/avatar.jpg')
const options = ref([
  { content: '我的', value: 1 },
  { content: '查询余额', value: 2 },
  { content: '分享', value: 3 },
  { content: '捐赠', value: 4 },
])
const loading = ref(false)
const talklist = ref([
])
const talkValue = ref('')
const keydown = (val, con) => {
  if (val) {
    if (con.e && con.e.keyCode === 115) {
      startTalk()
    }
  }
}
const startTalk = async () => {
  loading.value = true
  if (talkValue.value) {
    talklist.value.push({ role: 'user', text: talkValue.value })
    let val = talkValue.value
    talkValue.value = ''
    talklist.value.push({ role: 'system', text: '' })
    const body = {
      "model": "deepseek-r1:7b",
      "stream": false,
      "prompt": val
    }
    const res = await seekApi(JSON.stringify(body)).catch(err => console.log(err))
    if (res && res.data && res.data.response) {
      talklist.value[talklist.value.length - 1].text = res.data.response
    } else {
      talklist.value[talklist.value.length - 1].text = '网络出错'
    }
  } else {
    NotifyPlugin('error', { title: '提示', content:'请填写有效内容后提交' })
  }
  loading.value = false
}
</script>

<style lang="less" scoped>
  .content {
    overflow: hidden;
  }
  .top-content {
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