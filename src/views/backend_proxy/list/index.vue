<template>
  <div class="app-container">
    <div>
      <el-button @click.native="addProxy" type="primary">新增代理</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="代理地址">
        <template slot-scope="scope">
          {{ scope.row.proxyTo }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | statusFilter">{{ scope.row.active }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="路由组" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.routingGroup }}
        </template>
      </el-table-column>
      <el-table-column label="外部链接">
        <template slot-scope="scope">
          {{ scope.row.externalUrl }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" size="mini" @click.native="editProxy(scope.row.name)">更新</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/backend_proxy'

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
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response    
        this.listLoading = false
      })
    },
    addProxy() {
      console.log("add proxy")
      this.$router.push({path: "/backend/edit"})
    },
    handdleRowClick(row, event, column){
      debugger
    },
    editProxy(name) {
      let rowdata = null
      
      this.list.forEach(ele => {
        
        if (ele.name == name) {
          rowdata = ele
        }
      })

      if (rowdata) {
        this.$router.push({path: "/backend/edit", query: rowdata})
      }
    }
  }
}
</script>
