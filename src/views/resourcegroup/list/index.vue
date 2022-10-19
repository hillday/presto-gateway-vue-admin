<template>
  <div class="app-container">
    <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="useSchema" placeholder="请输入数据库" size="medium"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button @click.native="queryData" type="success">查询</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button @click.native="addResourceGroup" type="primary">新增资源组</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :current-page.sync="currentPage"
      @row-click="handdleRowClick"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="名称" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="内存限制">
        <template slot-scope="scope">
          {{ scope.row.softMemoryLimit }}
        </template>
      </el-table-column>
      <el-table-column label="最大队列" width="70">
        <template slot-scope="scope">
          {{ scope.row.maxQueued }}
        </template>
      </el-table-column>
      <el-table-column label="软并行" width="70">
        <template slot-scope="scope">
          {{ scope.row.softConcurrencyLimit }}
        </template>
      </el-table-column>
      <el-table-column label="硬并行" width="70">
        <template slot-scope="scope">
          {{ scope.row.hardConcurrencyLimit }}
        </template>
      </el-table-column>
      <el-table-column label="调度策略">
        <template slot-scope="scope">
          {{ scope.row.schedulingPolicy }}
        </template>
      </el-table-column>
      <el-table-column label="调度权重" width="60">
        <template slot-scope="scope">
          {{ scope.row.schedulingWeight }}
        </template>
      </el-table-column>
      <el-table-column label="JMX导出" width="60">
        <template slot-scope="scope">
          {{ scope.row.jmxExport }}
        </template>
      </el-table-column>
      <el-table-column label="软CPU限制" width="70">
        <template slot-scope="scope">
          {{ scope.row.softCpuLimit }}
        </template>
      </el-table-column>
      <el-table-column label="硬CPU限制" width="70">
        <template slot-scope="scope">
          {{ scope.row.hardCpuLimit }}
        </template>
      </el-table-column>
      <el-table-column label="父资源组">
        <template slot-scope="scope">
          {{ scope.row.parentName }}
        </template>
      </el-table-column>
      <el-table-column label="环境" width="95">
        <template slot-scope="scope">
          {{ scope.row.environment }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" size="mini" @click.native="editResourceGroup(scope.row.resourceGroupId)">更新</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
    <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button @click.native="addNewSelector()" type="primary">新增选择器</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listSelectorLoading"
      :data="listSelector"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="优先级" width="95">
        <template slot-scope="scope">
          {{ scope.row.priority }}
        </template>
      </el-table-column>
      <el-table-column label="用户过滤器">
        <template slot-scope="scope">
          {{ scope.row.userRegex }}
        </template>
      </el-table-column>
      <el-table-column label="Source过滤器">
        <template slot-scope="scope">
          {{ scope.row.sourceRegex }}
        </template>
      </el-table-column>
      <el-table-column label="查询类型">
        <template slot-scope="scope">
          {{ scope.row.queryType }}
        </template>
      </el-table-column>
      <el-table-column label="标签过滤器">
        <template slot-scope="scope">
          {{ scope.row.clientTags }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" size="mini" @click.native="deleteServerSelector(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="选择器" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" >
        <el-form-item label="优先级" :label-width="formLabelWidth">
          <el-input v-model="form.priority" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户过滤器" :label-width="formLabelWidth">
          <el-input v-model="form.userRegex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Source过滤器" :label-width="formLabelWidth">
          <el-input v-model="form.sourceRegex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="查询类型" :label-width="formLabelWidth">
          <el-input v-model="form.queryType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签过滤器" :label-width="formLabelWidth">
          <el-input v-model="form.clientTags" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSaveSelector">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/resource_group'
import { getListWithResourceGroupId,addSelector,updateSelector,deleteSelector } from '@/api/selector'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'gray'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      useSchema: null,
      currentPage:1,
      pagesize:5,
      total:0,
      listSelectorLoading: false,
      listSelector: [],
      selectResourceGroup: null,
      dialogFormVisible: false,
      form: {
        priority: null,
        userRegex: null,
        sourceRegex: null,
        queryType: null,
        clientTags: null,
        resourceGroupId: null
      },
      formLabelWidth: '120px',
      rules: {
        priority: [
          { required: true, message: '请输入优先级', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.fetchData()
    if (this.$route.query.useSchema) {
      this.useSchema = this.$route.query.useSchema
    }
  },
  methods: {
    handleSizeChange(val) {
        this.pagesize=val;
    },
    handleCurrentChange(val) {
        this.currentPage = val;
    },
    queryData() {
      if (this.useSchema) {
        this.fetchData()
      }else{
        this.$message({
          message: 'no database input',
          type: 'warning'
        })
      }
    },
    getParentById(id){
      let parent = null
      this.list.forEach(ele => {
        if (ele.resourceGroupId == id) {
          parent = ele
        }
      })
      return parent
    },
    fetchData() {
      this.listLoading = true
      getList(this.useSchema).then(response => {
        this.list = response
        this.total = this.list.length

        this.list.forEach(ele => {
          if (ele.parent) {
             let parent  = this.getParentById(ele.parent)
             ele.parentName = parent.name
          }
        })
        this.listLoading = false
      })
    },
    addResourceGroup() {
      if (this.useSchema) {
        this.$router.push({path: "/resourcegroup/edit",query: {useSchema: this.useSchema}})
      }else{
        this.$message({
          message: 'no database input',
          type: 'warning'
        })
      }
    },
    handdleRowClick(row, event, column){
      this.selectResourceGroup = row
      this.fetchSelectorData(row.resourceGroupId)
    },
    fetchSelectorData(id){
      this.listSelectorLoading = true
      getListWithResourceGroupId(this.useSchema, id).then(response => {
        this.listSelector = response
        this.listSelectorLoading = false
      })
    },
    addNewSelector(){
      if (this.useSchema && this.selectResourceGroup)  {
        this.dialogFormVisible = true
      }else{
        this.$message({
          message: 'no database input',
          type: 'warning'
        })
      }
    },
    addSaveSelector(){
      this.form.resourceGroupId = this.selectResourceGroup.resourceGroupId
      const formData = this.form

      addSelector(this.useSchema, JSON.stringify(formData)).then(response => {
        this.$message('Add success')
        this.dialogFormVisible = false
        this.fetchSelectorData(this.selectResourceGroup.resourceGroupId)
      })
    },
    deleteServerSelector(row){
      const formData = row
      deleteSelector(this.useSchema, JSON.stringify(formData)).then(response => {
        this.$message('Delete success')
        this.dialogFormVisible = false
        this.fetchSelectorData(this.selectResourceGroup.resourceGroupId)
      })
    },
    editResourceGroup(id) {
      let rowdata = null
      
      this.list.forEach(ele => {
        
        if (ele.resourceGroupId == id) {
          rowdata = ele
        }
      });

      if (rowdata) {
        this.$router.push({path: "/resourcegroup/edit",query: {resourcegroup:rowdata,useSchema: this.useSchema}})
      }
    }
  }
}
</script>

<style scoped>
  .toolbar{
    display: block;
    margin: 16px;
  }
  .mytbale{
    margin-top: 16px;
  }
  </style>