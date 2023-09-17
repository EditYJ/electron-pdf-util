<script setup lang="ts">
import { Button, Textarea } from 'ant-design-vue'
import { useFileDialog } from '@vueuse/core'
import { checkFile, getMemoryUrl } from './utils/file'
import { jsPDF } from 'jspdf'
import { getImageWH } from './utils/image'
import { ref } from 'vue'
import { font } from '@/assets/Alibaba-normal'
defineOptions({ name: 'app-page' })

const { onChange, open, reset } = useFileDialog()
const text = ref('')

onChange(async (fileList) => {
  const file = fileList?.item(0)
  if (file && checkFile(file, { showMsg: true, maxFileSize: 1024 * 1042 * 100 })) {
    const url = getMemoryUrl(file).url
    const { width, height } = await getImageWH(url)
    const orientation = width > height ? 'l' : 'p'
    const doc = new jsPDF({ unit: 'px', orientation: orientation, format: [width, height] })
    console.log([width, height])
    doc.addImage(url, 'jpg', 0, 0, width, height)
    doc.save(`${file.name}.pdf`)
  }
  reset()
})

const resetText = () => {
  text.value = ''
}

const textToPdf = () => {
  const pdf = new jsPDF()
  pdf.addFileToVFS('Alibaba-normal.ttf', font)
  pdf.addFont('Alibaba-normal.ttf', 'Alibaba', 'normal')
  pdf.setFont('Alibaba')
  pdf.text(text.value, 5, 10)
  pdf.save(`${text.value.substring(0, 6)}.pdf`)
}
</script>

<template>
  <div class="app-page">
    <h1>茜茜专用工具集</h1>
    <div class="content">
      <Button type="primary" @click="() => open()">图片转PDF</Button>
      <div class="text-to-pdf">
        <Textarea v-model:value="text" :rows="4" placeholder="请输入要转换的文字"></Textarea>
        <div class="options">
          <Button @click="resetText">重置内容</Button>
          <Button type="primary" @click="textToPdf">文字转PDF</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-page {
  padding: 12px;
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    .text-to-pdf {
      display: flex;
      flex-direction: column;
      align-items: end;
      row-gap: 4px;
      .options {
        column-gap: 4px;
        display: flex;
      }
    }
  }
}
</style>
