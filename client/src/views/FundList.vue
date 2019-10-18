<template>
  <div>
    <DialogForm @added="addItem($event)" />
    <DialogDelete @confirm="confirmDelete()" />
    <DialogEdit @edited="updateItem($event)" :item="edit_item" />
    <div class="header">
      <div class="filter">
        <el-date-picker @pick="filt($event)" v-model="filt_time" type="daterange" align="right" unlink-panels
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="btns">
        <el-button type="success" @click="getFundList">
          <i class="el-icon-refresh"></i>刷新
        </el-button>
        <el-button type="primary" @click="showDialog">
          <i class="el-icon-plus"></i>添加
        </el-button>
      </div>
    </div>
    <div class="list">
      <el-table :data="sliceList" style="width: 100%" :border="true" :stripe="true">
        <el-table-column label="日期" width="260" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope.row._date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="140" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-money"></i> -->
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实收/付金额" width="140" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-money"></i> -->
            <span style="margin-left: 10px;color:#E6A23C;">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="140" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-upload2"></i> -->
            <span style="margin-left: 10px;color:#F56C6C;">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收入" width="140" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-download"></i> -->
            <span style="margin-left: 10px;color:#67C23A;">{{ scope.row.income }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" width="140" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-upload2"></i> -->
            <span style="margin-left: 10px;color:#909399;">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination :hide-on-single-page="true" background layout="prev, pager, next" :total="total" @next-click="next"
        @prev-click="prev" @current-change="changePage($event)" :page-size="9"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import sd from "silly-datetime";
  import {
    mapActions
  } from "vuex";
  import DialogForm from "../components/DialogForm.vue";
  import DialogDelete from "../components/DialogDelete.vue";
  import DialogEdit from "../components/DialogEdit.vue";
  export default {
    data() {
      return {
        edit_item: {},
        delete_index: -1,
        active_id: -1,
        page: 1,
        tableData: [],
        tableData2: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        filt_time: ''
      };
    },
    created() {
      this.setActiveIndex('3')
      this.getFundList();
    },
    methods: {
      ...mapActions(["setActiveIndex", "setDialogFormVisible", "setDialogDeleteVisible", "setDialogEditVisible"]),
      getFundList() {
        axios.get("/api/profiles").then(res => {
          let fundlist = res.data;
          this.tableData = fundlist
            .map(item => {
              return {
                date:item.date,
                income:item.income,
                expend:item.expend,
                cash:item.cash,
                type:item.type,
                desc:item.desc,
                _id: item._id,
                _date: sd.format(
                  new Date(item.date),
                  "YYYY年MM月DD日 HH时mm分ss秒"
                )
              };
            })
            .reverse();
          this.tableData2 = JSON.parse(JSON.stringify(this.tableData))
        });
      },
      handleEdit(index, row) {
        this.edit_item = row;
        this.active_id = row._id
        this.setDialogEditVisible(true);
      },
      handleDelete(index, row) {
        this.active_id = row._id;
        this.delete_index = index;
        this.setDialogDeleteVisible(true);
      },
      confirmDelete() {
        console.log(this.active_id)
        axios
          .delete(`/api/profiles/delete/${this.active_id}`)
          .then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.tableData.splice((this.page - 1) * 9 + this.delete_index, 1);
            if (this.tableData.length % 9 == 0 && this.page != 1) {
              this.page -= 1
            }
          })
          .catch(err => {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          });
      },
      showDialog() {
        this.setDialogFormVisible(true);
      },
      updateItem(item) {
        this.tableData.forEach(i => {
          if (i._id == this.active_id) {
            i = {
              ...item
            }
            return
          }
        })
      },
      addItem(data) {
        this.tableData.unshift({
          ...data,
          _date: sd.format(new Date(), "YYYY年MM月DD日 HH时mm分ss秒")
        });
        this.$message({
          message: "添加成功",
          type: "success"
        });
      },
      next() {
        this.page += 1;
      },
      prev() {
        this.page -= 1;
      },
      changePage(page) {
        this.page = page;
      }
    },
    components: {
      DialogForm,
      DialogDelete,
      DialogEdit,
    },
    watch: {
      filt_time(val) {
        if (val) {
          
          let start_date = +val[0]
          let end_date = +val[1]
          this.tableData = this.tableData2.filter(item=>{
            let time_stamp = + new Date(item.date)
            return +start_date <= time_stamp && time_stamp <= end_date
          })
        }else {
          this.tableData = [...this.tableData2]
        }
      }
    },
    computed: {
      sliceList() {
        if (this.page * 9 > this.tableData.length) {
          return this.tableData.slice((this.page - 1) * 9);
        }
        return this.tableData.slice((this.page - 1) * 9, this.page * 9);
      },
      total() {
        console.log("total===>", this.tableData.length);
        return this.tableData.length;
      }
    }
  };
</script>

<style scoped>
  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pag {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>