<template>
  <div class="chart">
    <el-button style="margin-bottom: 20px;" type="primary" @click="add">新建</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="UserName" label="账号" align="center"></el-table-column>
      <el-table-column prop="Name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="Phone" label="手机号" align="center"></el-table-column>
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
    <el-dialog :title="isAdOrEd ? '新建账号' : '编辑账号'" :visible.sync="chulai" :close-on-click-modal="false" width="40%" :show-close="false">
      <el-form :model="ruleForm" label-width="100px" ref="ruleForm" style="width: 100%">
        <el-form-item label="账号" prop="userName" :rules="$rules.name">
          <el-input v-model="ruleForm.userName" maxlength="10" placeholder="请输入账号" :disabled="!isAdOrEd"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :rules="$rules.name">
          <el-input v-model="ruleForm.name" maxlength="20" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :rules="$rules.phone">
          <el-input v-model="ruleForm.phone" maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :rules="$rules.pwd">
          <el-input v-model="ruleForm.pwd" type="password" maxlength="16" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" :rules="$rules.status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
            <el-option v-for="item in $statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="emit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      tableData: [],
      search: {
        Name: ''
      },
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
        name: row.Name,
        phone: row.Phone,
        userName: row.UserName,
        pwd: row.Pwd,
        status: row.Status,
        id: row.ID
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
