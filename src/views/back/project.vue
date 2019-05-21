<template>
  <div class="chart">
    <el-button type="primary" style="margin-bottom: 10px" @click="add">新建</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="Project_Name" label="项目名称" align="center"></el-table-column>
      <el-table-column prop="Create_Time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="Status" label="状态" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.Status ? 'color: #67c23a' : 'color: #f56c6c'">{{scope.row.Status ? '正常' : '禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isAdOrEd ? '新建项目' : '编辑项目'" :visible="chulai" width="30%">
      <el-form :model="ruleForm" label-width="100px" ref="ruleForm" style="width: 100%;margin-bottom: 20px">
        <el-form-item label="项目名称" prop="projectName" :rules="$rules.name">
          <el-input v-model="ruleForm.projectName" maxlength="10" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" :rules="$rules.option">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
            <el-option v-for="item in $statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div align="right">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="emit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'project',
  data () {
    return {
      tableData: [],
      ruleForm: {},
      chulai: false,
      isAdOrEd: true
    }
  },
  methods: {
    add () {
      this.isAdOrEd = true
      this.chulai = true
    },
    edit (row) {
      this.ruleForm = {
        projectName: row.Project_Name,
        status: row.Status,
        id: row.ID,
        createTime: row.Create_Time
      }
      this.chulai = true
      this.isAdOrEd = false
    },
    cancel () {
      this.ruleForm = {}
      this.$refs.ruleForm.resetFields()
      this.chulai = false
    },
    emit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$message.success('操作成功')
          this.cancel()
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
