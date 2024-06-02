<template>
  <div class="min-h serveProject bg-wt">
    <searchForm
      :searchData="pagination"
      @handleClear="handleClear"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
    >
    </searchForm>
    <tableList
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :total="total"
      @onPageChange="onPageChange"
      @pagesizechange="onPageSizeChange"
      @handleBulid="handleBulid"
      @handleedit="handleedit"
      @deleteById="deleteOpen"
      @statusHandleOpen="statusHandleOpen"
    >
    </tableList>
    <Forbidden
      :visible="statusVisible"
      :text="statusName"
      @handleSubmit="statusChange"
      @handleClose="statusHandleClose"
    ></Forbidden>
    <Delete
      :visible="deleteVisible"
      :delete-text="deleteName"
      @handleDelete="deleteHandle"
      @handleClose="deleteHandleClose"
    ></Delete>
    <DialogFrom
      :visible="visible"
      :data="dataDialog"
      :title="title"
      @handleClose="handleClose"
      @handleBuild="handleBuild"
      @handle-add="handleAdd"
      @handleEdit="edit"
    ></DialogFrom>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import {
  getProjectDetails,
  projectUpdate,
  getProjectList,
  projectAdd,
  projectDelete,
  projectStatus
} from '@/api/serve.ts'
import Delete from '@/components/OperateDialog/index.vue'
import Forbidden from '@/components/Forbidden/index.vue'
import DialogFrom from './components/DialogFrom.vue'
import searchForm from './components/searchForm.vue'
import tableList from './components/tableList.vue'

const getList = async () => {
  loading.value = true
  const res = await getProjectList(pagination.value)
  loading.value = false
  console.log(res)
  pagination.value.pageNum = Number(res.data.pageNum)
  pagination.value.pageSize = Number(res.data.pageSize)
  total.value = Number(res.data.total)
  data.value = res.data.records
}

onMounted(() => {
  getList()
})

const pagination = ref({
  pageNum: 1,
  pageSize: 10
})

const formRef = ref(null)
const data = ref([])
const loading = ref()
const total = ref(0)

const handleRowClick = (e) => {
  console.log(e)
}

const onPageChange = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}

const onPageSizeChange = (val) => {
  // alert(val)
  pagination.value.pageNum = 1
  pagination.value.pageSize = val
  getList()
}

const handleClear = (val) => {
  if (val === 'name') {
    delete pagination.value.name
  } else {
    delete pagination.value.status
  }
}

const handleReset = () => {
  pagination.value.pageNum = 1
  delete pagination.value.name
  delete pagination.value.status
  getList()
}

const handleSearch = () => {
  pagination.value.pageNum = 1
  getList()
}

// 编辑接口打开弹窗
const handleedit = async (id) => {
  const res = await getProjectDetails(id)
  title.value = '编辑'
  dataDialog.value = res.data
  visible.value = true
}

const title = ref()
// 是否显示弹窗
const visible = ref(false)

const deleteVisible = ref(false)
// 回显数据
const dataDialog = ref({})

// 点击新增护理项目 按钮 把visible设置为true，弹出
const handleBulid = () => {
  title.value = '新增'
  visible.value = true
}

// 点击弹窗中的关闭或取消，关闭弹窗
const handleClose = () => {
  visible.value = false
}

const handleAdd = async (val) => {
  const res = await projectAdd(val)
  if (res.code === 200) {
    MessagePlugin.success('添加成功')
    pagination.value.pageNum = 1
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 修改方法
const edit = async (val) => {
  const res = await projectUpdate(val)
  if (res.code === 200) {
    MessagePlugin.success('修改成功')
    pagination.value.pageNum = val.current
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}

// 打开删除弹窗
const deleteOpen = async (val) => {
  deleteName.value = '项目'
  deleteVal.value = val
  deleteVisible.value = true
}

const deleteName = ref('')
const deleteVal = ref()

// 删除项目
const deleteHandle = async () => {
  const res = await projectDelete(deleteVal.value.id)
  if (res.code === 200) {
    deleteVisible.value = false
    MessagePlugin.success('删除成功')
    pagination.value.pageNum = deleteVal.value.current
    getList()
  } else {
    MessagePlugin.error('删除失败')
  }
}

// 关闭删除弹窗
const deleteHandleClose = () => {
  deleteVisible.value = false
}

const statusVisible = ref(false)
const statusName = ref('')
const statusVal = ref()

// 打开禁用弹窗
const statusHandleOpen = (val) => {
  val.status = val.status === 1 ? 0 : 1
  statusName.value = '项目'
  console.log(val)
  statusVisible.value = true
}

// 关闭禁用弹窗
const statusHandleClose = () => {
  statusVisible.value = false
}

// 禁用项目
const statusChange = async () => {
  const res = await projectStatus(statusVal.value)
  if (res.code === 200) {
    statusVisible.value = false
    MessagePlugin.success('状态修改成功')
    pagination.value.pageNum = statusVal.value.current
    getList()
  } else {
    MessagePlugin.error('状态修改失败')
  }
}
</script>
