<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" v-loading="isLoading" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="代理地址">
        <el-input v-model="form.proxyTo" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.active" placeholder="please select your active">
          <el-option label="启用" value="true" />
          <el-option label="不启用" value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="路由组">
        <el-input v-model="form.routingGroup" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOrUpdateBackend } from '@/api/backend_proxy'
export default {
  data() {
    return {
      form: {
        name: '',
        proxyTo: '',
        active: '',
        routingGroup: ''
      },
      isLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        proxyTo: [
          { required: true, message: '请输入代理集群', trigger: 'blur' }
        ], active: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ], routingGroup: [
          { required: true, message: '请输入路由组', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.form = this.$route.query
  },
  methods: {
    onSubmit() {
      const formData = this.form
      this.isLoading = true
      addOrUpdateBackend(JSON.stringify(formData)).then(response => {
        this.isLoading = false
        this.$message('Update success')
        this.$router.push({path:'/backend/list'})
      })
    },
    onCancel() {
      this.$router.back()
      /*this.$message({
        message: 'cancel!',
        type: 'warning'
      })*/
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

