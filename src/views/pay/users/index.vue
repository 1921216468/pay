<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="账号" prop="userAccount">
        <el-input
            v-model="queryParams.userAccount"
            placeholder="请输入账号"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账户余额" prop="balance">
        <el-input
            v-model="queryParams.balance"
            placeholder="请输入账户余额"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="会员保证金" prop="deposit">
        <el-input
            v-model="queryParams.deposit"
            placeholder="请输入会员保证金"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input
            v-model="queryParams.weight"
            placeholder="请输入权重"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="佣金" prop="commission">
        <el-input
            v-model="queryParams.commission"
            placeholder="请输入佣金"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="佣金分成比例%" prop="commissionPercent">
        <el-input
            v-model="queryParams.commissionPercent"
            placeholder="请输入佣金分成比例%"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item label="用户昵称" prop="userName">
        <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户昵称"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable
                        v-model="queryParams.createTime"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker clearable
                        v-model="queryParams.updateTime"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="请选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['pay:users:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['pay:users:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['pay:users:remove']"
        >删除
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="warning"-->
      <!--          plain-->
      <!--          icon="Download"-->
      <!--          @click="handleExport"-->
      <!--          v-hasPermi="['pay:users:export']"-->
      <!--        >导出</el-button>-->
      <!--      </el-col>-->
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="usersList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="userId"/>
      <el-table-column label="账号" align="center" prop="userAccount"/>
      <el-table-column label="账户余额" align="center" prop="balance"/>
      <el-table-column label="会员保证金" align="center" prop="deposit"/>
      <el-table-column label="权重" align="center" prop="weight"/>
      <el-table-column label="佣金" align="center" prop="commission"/>
      <el-table-column label="佣金分成比例%" align="center" prop="commissionPercent"/>
      <el-table-column label="最大待支付订单数上限" align="center" prop="maximumOrder"/>
      <el-table-column label="用户昵称" align="center" prop="userName"/>
      <el-table-column label="用户头像" align="center" prop="userAvatar" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.userAvatar" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding " fixed="right" width="180">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['pay:users:edit']">
            修改
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['pay:users:remove']">删除
          </el-button>
          <el-button link type="primary" icon="Edit" @click="handleRecharge(scope.row)" v-hasPermi="['pay:users:edit']">
            充值
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleWithDrawl(scope.row)"
                     v-hasPermi="['pay:users:remove']">提现
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="title" v-model="open" width="800px" append-to-body>
      <el-form ref="usersRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="form.userAccount" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="会员保证金" prop="deposit">
          <el-input v-model="form.deposit" placeholder="请输入会员保证金"/>
        </el-form-item>
        <el-form-item label="权重" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入权重"/>
        </el-form-item>
        <el-form-item label="佣金分成比例%" prop="commissionPercent">
          <el-input v-model="form.commissionPercent" placeholder="请输入佣金分成比例%"/>
        </el-form-item>
        <el-form-item label="最大待支付订单数上限" prop="maximumOrder">
          <el-input v-model="form.maximumOrder" placeholder="请输入最大待支付订单数上限"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户昵称"/>
        </el-form-item>
        <el-form-item label="用户头像" prop="userAvatar">
          <image-upload v-model="form.userAvatar"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>


    <!-- 充值或提现对话框 -->
    <el-dialog :title="title" v-model="openRecharge" width="800px" append-to-body>
      <el-form ref="usersRef" :model="rechargeForm" label-width="120px">
        <el-form-item label="金额" prop="userAccount">
          <el-input v-model="rechargeForm.amount" placeholder="请输入金额"/>
        </el-form-item>
        <el-form-item label="备注" prop="weight">
          <el-input v-model="rechargeForm.comment" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitRechargeForm()">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Users">
import {listUsers, getUsers, delUsers, addUsers, updateUsers} from "@/api/pay/users";
import {recharge, withDrawl} from "@/api/pay/recharge.js";

const {proxy} = getCurrentInstance();

const usersList = ref([]);
const open = ref(false);
const openRecharge = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
/**充值提现表单*/
const rechargeForm = reactive({
  userId: null,
  amount: null,
  comment: null,
  //0充值1提现
  type: 0
});

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userAccount: null,
    userPassword: null,
    balance: null,
    deposit: null,
    userEmail: null,
    agentId: null,
    weight: null,
    commission: null,
    commissionPercent: null,
    maximumOrder: null,
    userName: null,
    userAvatar: null,
    userProfile: null,
    userRole: null,
    createTime: null,
    updateTime: null,
    isDelete: null
  },

  rules: {
    userAccount: [
      {required: true, message: "账号不能为空", trigger: "blur"},
      //不能有中文
      {pattern: /^[^\u4e00-\u9fa5]+$/, message: "不能包含中文", trigger: "blur"}
    ],
    createTime: [
      {required: true, message: "创建时间不能为空", trigger: "blur"}
    ],
    updateTime: [
      {required: true, message: "更新时间不能为空", trigger: "blur"}
    ],
    isDelete: [
      {required: true, message: "是否删除不能为空", trigger: "blur"}
    ]
  }
});

const {queryParams, form, rules} = toRefs(data);

/** 查询用户列表 */
function getList() {
  loading.value = true;
  listUsers(queryParams.value).then(response => {
    usersList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    userId: null,
    userAccount: null,
    userPassword: null,
    balance: null,
    deposit: null,
    userEmail: null,
    agentId: null,
    weight: null,
    commission: null,
    commissionPercent: null,
    maximumOrder: null,
    userName: null,
    userAvatar: null,
    userProfile: null,
    userRole: null,
    createTime: null,
    updateTime: null,
    isDelete: null
  };
  proxy.resetForm("usersRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加用户";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _userId = row.userId || ids.value
  getUsers(_userId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改用户";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["usersRef"].validate(valid => {
    if (valid) {
      if (form.value.userId != null) {
        updateUsers(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addUsers(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _userIds = row.userId || ids.value;
  proxy.$modal.confirm('是否确认删除用户编号为"' + _userIds + '"的数据项？').then(function () {
    return delUsers(_userIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('pay/users/export', {
    ...queryParams.value
  }, `users_${new Date().getTime()}.xlsx`)
}

/**充值方法*/
function handleRecharge(row) {
  const _userId = row.userId || ids.value
  console.log("--充值 + " + _userId)
  rechargeForm.userId = _userId;
  rechargeForm.type = 0;
  openRecharge.value = true;
  }

// /**提现方法*/
function handleWithDrawl(row) {
  const _userId = row.userId || ids.value
  rechargeForm.userId = _userId;
  console.log("--提现 + " + _userId)
  rechargeForm.type = 1;
  openRecharge.value = true;
}

/** 充值提现提交按钮 */
function submitRechargeForm() {
  proxy.$refs["usersRef"].validate(valid => {
    if (valid) {
      if (rechargeForm.type === 0) {
        recharge(rechargeForm).then(response => {
          form.value = response.data;
          openRecharge.value = false;
          title.value = "充值";
          rechargeForm.userId = '';
          rechargeForm.amount = '';
          rechargeForm.comment = '';
          getList();
        });
      } else {
        withDrawl(rechargeForm).then(response => {
          form.value = response.data;
          openRecharge.value = false;
          title.value = "提现";
          rechargeForm.userId = '';
          rechargeForm.amount = '';
          rechargeForm.comment = '';
          getList();
        });
      }
    }
  });
}

getList();
</script>
