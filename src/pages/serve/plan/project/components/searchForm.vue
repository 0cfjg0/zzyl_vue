<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" label-width="98">
      <t-row>
        <t-col>
          <t-form-item label="护理项目名称：" name="name">
            <t-input
              v-model="searchData.name"
              placeholder="请输入内容"
              class="form-item-content"
              type="search"
              clearable
              @clear="handleClear('name')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="状态：" name="status">
            <t-select
              v-model="searchData.status"
              clearable
              placeholder="请输入内容"
              @clear="handleClear('status')"
            >
              <t-option
                v-for="(item, index) in statusData"
                :key="index"
                :value="item.id"
                :label="item.value"
                title=""
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col class="searchBtn">
          <button type="button" class="bt-grey wt-60" @click="handleReset()">
            重置
          </button>
          <button type="button" class="bt wt-60" @click="handleSearch()">
            搜索
          </button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { statusData } from '@/utils/commonData'

const props = defineProps({
  searchData: Object
})

const emits = defineEmits(['handleClear', 'handleSearch', 'handleReset'])

const handleSearch = () => {
  emits('handleSearch')
}

const handleClear = () => {
  emits('handleClear')
}

const handleReset = () => {
  emits('handleReset')
}
// const name = props.data.name
// const status = props.data.status
</script>
