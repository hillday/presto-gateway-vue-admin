<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" v-loading="isLoading" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="内存限制">
        <el-input v-model="form.softMemoryLimit" placeholder="输入内存限制,如100%"/>
      </el-form-item>
      <el-form-item label="队列限制">
        <el-input v-model="form.maxQueued" placeholder="输入队列限制,如10"/>
      </el-form-item>
      <el-form-item label="软并行度">
        <el-input v-model="form.softConcurrencyLimit" placeholder="输入软并行度,如5"/>
      </el-form-item>
      <el-form-item label="硬并行度">
        <el-input v-model="form.hardConcurrencyLimit" placeholder="输入硬并行度,如5"/>
      </el-form-item>
      <el-form-item label="调度策略">
        <el-select v-model="form.schedulingPolicy" placeholder="please select your schedulingPolicy">
          <el-option label="fair" value="fair" />
          <el-option label="weighted" value="weighted" />
          <el-option label="weighted_fair" value="weighted_fair" />
          <el-option label="query_priority" value="query_priority" />
        </el-select>
      </el-form-item>
      <el-form-item label="调度权重">
        <el-input v-model="form.schedulingWeight" placeholder="输入调度权重,如5"/>
      </el-form-item>
      <el-form-item label="软CPU限制">
        <el-input v-model="form.softCpuLimit" placeholder="输入CPU限制,如5"/>
      </el-form-item>
      <el-form-item label="硬CPU限制">
        <el-input v-model="form.hardCpuLimit" placeholder="输入CPU限制,如5"/>
      </el-form-item>
      <el-form-item label="环境">
        <el-input v-model="form.environment" placeholder="输入环境"/>
      </el-form-item>
      <el-form-item label="JMX导出">
        <el-select v-model="form.jmxExport" placeholder="please select your JMX">
          <el-option label="导出" value="true" />
          <el-option label="不导出" value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="父资源组">
        <el-select v-model="form.parent" placeholder="please select your parent">
          <template v-for="(item) in topResourceGroups">
            <el-option :label="item.name" :value="item.resourceGroupId" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="数据库" :visible.sync="dialogVisible" :close-on-click-modal="false" 
    :close-on-press-escape="false" :show-close="false">
      <el-input v-model="useSchema" placeholder="请输入数据库" size="medium"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleProcess('cancel')">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleProcess('ok')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList,updateResourceGroup } from '@/api/resource_group'
export default {
  data() {
    return {
      form: {
        resourceGroupId: null,
        name: '', 
        softMemoryLimit: '', 
        maxQueued: null, 
        softConcurrencyLimit: null, 
        hardConcurrencyLimit: null, 
        schedulingPolicy: null, 
        schedulingWeight: null, 
        jmxExport: null, 
        softCpuLimit: null, 
        hardCpuLimit: null, 
        parent: null, 
        environment: 'production'
      },
      list: null,
      topResourceGroups: [],
      useSchema: null,
      isLoading: false,
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        softMemoryLimit: [
          { required: true, message: '请输入内存限制', trigger: 'blur' }
        ], maxQueued: [
          { required: true, message: '请输入队列限制', trigger: 'blur' }
        ], softConcurrencyLimit: [
          { required: true, message: '请输入并行度设置', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    
    if(this.$route.query.resourcegroup){
      this.form = this.$route.query.resourcegroup
      delete this.form.parentName
    }
    
    if (this.$route.query.useSchema) {
      this.useSchema = this.$route.query.useSchema
      this.fetchData()
    }else{
      this.dialogVisible = true
    }
    
  },
  methods: {
    dialogVisibleProcess(state){
      if (state === 'cancel'){
        this.dialogVisible = false
        this.$router.push({path:'/resourcegroup/list'})
      }else{
        if (this.useSchema) {
          this.dialogVisible = false
          this.fetchData()
        }else{
          this.$message({
            message: 'no database input',
            type: 'warning'
          })
        }
      }
    },
    onSubmit() {
      if(this.form.jmxExport)
      {
        this.form.jmxExport = "true"
      }else{
        this.form.jmxExport = "false"
      }
      const formData = this.form
      this.isLoading = true
      
      updateResourceGroup(this.useSchema, JSON.stringify(formData)).then(response => {
        this.isLoading = false
        this.$message('Update success')
        this.$router.push({path:'/resourcegroup/list',query: {useSchema: this.useSchema}})
      })
    },
    fetchData() {
      getList(this.useSchema).then(response => {
        this.list = response
        let self = this
        this.list.forEach(ele => {
          if (!ele.parent) {
            self.topResourceGroups.push(ele)
          }
        })
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

