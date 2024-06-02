<template>
  <!-- 当数据为空需要占位时，会显示 cellEmptyContent -->
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt wt-120" @click="handleBulid()">新增护理项目</button>
      </div>
      <t-table
        row-key="index"
        :data="data"
        :columns="COLUMNS"
        :stripe="stripe"
        :bordered="bordered"
        :hover="hover"
        :table-layout="'fixed'"
        :size="size"
        :show-header="showHeader"
        :loading="loading"
        cell-empty-content="-"
        resizable
        @row-click="handleRowClick"
      >
        <template #image="{ row }">
          <div class="tdesign-demo-image-viewer__base">
            <t-image-viewer :images="[row.image]">
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="row.image"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span> <BrowseIcon size="1.4em" /> 预览 </span>
                  </div>
                </div>
              </template>
            </t-image-viewer>
          </div>
        </template>
        <template #price="{ row }">
          {{ row.price.toFixed(2) }}
        </template>
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl" @click="deleteById(row)">删除</a>
            <a class="font-bt" @click="handleedit(row.id)">编辑</a>
            <a class="delete" @click="statusHandleOpen(row)">
                {{ row.status === 1 ? '禁用' : '启用' }}
            </a>
          </div>
        </template>
        <template #rowIndex="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
      </t-table>
      <t-pagination
        v-if="total > 10"
        v-model:current="pagination.pageNum"
        v-model:pageSize="pagination.pageSize"
        :total="total"
        @change="onPageChange"
        @page-size-change="pagesizechange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { COLUMNS } from '../constants'

// 接收父组件传来的数据
const props = defineProps({
  data: Object,
  total: Number,
  loading: Boolean,
  pagination: Object
})

const emits = defineEmits([
  'onPageChange',
  'pagesizechange',
  'handleBulid',
  'handleedit',
  'edit',
  'deleteById',
  'statusHandleOpen'
])
const onPageChange = (val) => {
  emits('onPageChange', val)
}

const pagesizechange = (val) => {
  emits('pagesizechange', val)
}

const statusHandleOpen = (val) => {
  emits('statusHandleOpen', val)
}

// 新增按钮
const handleBulid = () => {
  emits('handleBulid')
}

const handleedit = (id) => {
  emits('handleedit', id)
}

const deleteById = (val) => {
  emits('deleteById', val)
}
// const edit = (row) => {
//   emits('edit', row)
// }

const stripe = ref(true)
const bordered = ref(true)
const hover = ref(true)
const size = ref('medium')
const showHeader = ref(true)
</script>
