<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="type" label="需求类型" width="140" />
    <el-table-column prop="description" label="需求描述" />
    <el-table-column prop="budget" label="预算" width="120" />
    <el-table-column prop="place" label="地点" width="140" />
    <el-table-column prop="createTime" label="发布时间" width="180" />
    <el-table-column label="操作" width="140">
      <template #default="{ row }">
        <el-button type="primary" plain size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" plain size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑弹窗 -->
  <el-dialog v-model="editDialogVisible" title="编辑需求" width="500px">
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="需求类型">
        <el-input v-model="editForm.type" placeholder="请输入需求类型" />
      </el-form-item>
      <el-form-item label="需求描述">
        <el-input v-model="editForm.description" type="textarea" rows="3" placeholder="请输入需求描述" />
      </el-form-item>
      <el-form-item label="预算">
        <el-input v-model="editForm.budget" placeholder="请输入预算" />
      </el-form-item>
     <el-form-item label="地点">
      <el-select v-model="editForm.place" placeholder="请选择地点" clearable style="width:100%">
        <el-option v-for="o in localOptions" :key="o.value" :label="o.label" :value="o.value" />
      </el-select>
    </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="editForm.createTime" disabled placeholder="自动生成，不可修改" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">确认保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDemandStore } from '@/stores/demandstore.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useDemandStore()

const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex === 1) return 'warning-row'
  if (rowIndex === 3) return 'success-row'
  return ''
}

const tableData = computed(() => store.myDemands)
const editDialogVisible = ref(false)
const editForm = ref({})

onMounted(async () => {
  await store.fetchMyDemands()
})

// 删除（同步删除本地存储）
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这条需求吗？删除后无法恢复！', '提示', { type: 'warning' })
    store.deleteDemand(row.id)
    ElMessage.success('删除成功！')
  } catch {
    ElMessage.info('已取消')
  }
}

// 编辑
const handleEdit = (row) => {
  editForm.value = { ...row }
  editDialogVisible.value = true
}

// 保存编辑（同步更新本地）
const saveEdit = () => {
  store.updateDemand(editForm.value)
  editDialogVisible.value = false
  ElMessage.success('修改成功！')
}
// 省份选择框选项（和列表页完全一样）
const localOptions = ref([
  { value: '', label: '全部省份' },
  { value: '北京市', label: '北京市' },
  { value: '天津市', label: '天津市' },
  { value: '河北省', label: '河北省' },
  { value: '山西省', label: '山西省' },
  { value: '内蒙古自治区', label: '内蒙古自治区' },
  { value: '辽宁省', label: '辽宁省' },
  { value: '吉林省', label: '吉林省' },
  { value: '黑龙江省', label: '黑龙江省' },
  { value: '上海市', label: '上海市' },
  { value: '江苏省', label: '江苏省' },
  { value: '浙江省', label: '浙江省' },
  { value: '安徽省', label: '安徽省' },
  { value: '福建省', label: '福建省' },
  { value: '江西省', label: '江西省' },
  { value: '山东省', label: '山东省' },
  { value: '河南省', label: '河南省' },
  { value: '湖北省', label: '湖北省' },
  { value: '湖南省', label: '湖南省' },
  { value: '广东省', label: '广东省' },
  { value: '广西壮族自治区', label: '广西壮族自治区' },
  { value: '海南省', label: '海南省' },
  { value: '重庆市', label: '重庆市' },
  { value: '四川省', label: '四川省' },
  { value: '贵州省', label: '贵州省' },
  { value: '云南省', label: '云南省' },
  { value: '西藏自治区', label: '西藏自治区' },
  { value: '陕西省', label: '陕西省' },
  { value: '甘肃省', label: '甘肃省' },
  { value: '青海省', label: '青海省' },
  { value: '宁夏回族自治区', label: '宁夏回族自治区' },
  { value: '新疆维吾尔自治区', label: '新疆维吾尔自治区' },
  { value: '香港特别行政区', label: '香港特别行政区' },
  { value: '澳门特别行政区', label: '澳门特别行政区' },
  { value: '台湾省', label: '台湾省' },
])
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.dialog-footer {
  text-align: right;
}
</style>