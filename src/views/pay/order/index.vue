<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="150px">
<!--      <el-form-item label="支付通道id" prop="channelId">-->
<!--        <el-input-->
<!--          v-model="queryParams.channelId"-->
<!--          placeholder="请输入支付通道id"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="用户id" prop="userId">-->
<!--        <el-input-->
<!--          v-model="queryParams.userId"-->
<!--          placeholder="请输入用户id"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="商户id" prop="merchantId">
        <el-input
          v-model="queryParams.merchantId"
          placeholder="请输入商户id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单号" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          placeholder="请输入订单号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际支付金额" prop="realAmount">
        <el-input
          v-model="queryParams.realAmount"
          placeholder="请输入实际支付金额"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户拉单金额" prop="businessAmount">
        <el-input
          v-model="queryParams.businessAmount"
          placeholder="请输入商户拉单金额"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="会员区分金额" prop="memberAmount">
        <el-input
          v-model="queryParams.memberAmount"
          placeholder="请输入会员区分金额"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input
          v-model="queryParams.comment"
          placeholder="请输入备注"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编号或卡号或手机号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入编号或卡号或手机号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户银行" prop="bank">
        <el-input
          v-model="queryParams.bank"
          placeholder="请输入开户银行"
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
      <el-form-item label="失效时间" prop="expireTime">
        <el-date-picker clearable
          v-model="queryParams.expireTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择失效时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付时间" prop="payTime">
        <el-date-picker clearable
          v-model="queryParams.payTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择支付时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="Plus"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['pay:order:add']"-->
<!--        >新增</el-button>-->
      </el-col>
      <el-col :span="1.5">
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="Edit"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['pay:order:edit']"-->
<!--        >修改</el-button>-->
      </el-col>
      <el-col :span="1.5">
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="Delete"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['pay:order:remove']"-->
<!--        >删除</el-button>-->
      </el-col>
      <el-col :span="1.5">
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="Download"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['pay:order:export']"-->
<!--        >导出</el-button>-->
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="orderId" />
      <el-table-column label="收款用户" align="center" prop="userId" />
      <el-table-column label="商户id" align="center" prop="merchantId" />
      <el-table-column label="订单号" align="center" prop="orderNum" />
      <el-table-column label="实际支付金额" align="center" prop="realAmount" />
      <el-table-column label="商户拉单金额" align="center" prop="businessAmount" />
      <el-table-column label="会员区分金额" align="center" prop="memberAmount" />
      <el-table-column label="备注" align="center" prop="comment" />
      <el-table-column label="编号或卡号或手机号" align="center" prop="account" />
      <el-table-column label="开户银行" align="center" prop="bank" />
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
      <el-table-column label="失效时间" align="center" prop="expireTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.expireTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" prop="payTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.payTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间戳" align="center" prop="timestamp" />
      <el-table-column label="订单状态" align="center" prop="status" >
        <template #default="scope">
          <dict-tag :options="order_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template #default="scope">
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['pay:order:edit']">修改</el-button>-->
          <el-button link type="primary" icon="Delete" @click="confirmOrder(scope.row)" v-hasPermi="['pay:order:remove']">确认订单</el-button>
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

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" v-model="open" width="800px" append-to-body>
      <el-form ref="orderRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="支付通道id" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入支付通道id" />
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="商户id" prop="merchantId">
          <el-input v-model="form.merchantId" placeholder="请输入商户id" />
        </el-form-item>
        <el-form-item label="订单号" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="实际支付金额" prop="realAmount">
          <el-input v-model="form.realAmount" placeholder="请输入实际支付金额" />
        </el-form-item>
        <el-form-item label="商户拉单金额" prop="businessAmount">
          <el-input v-model="form.businessAmount" placeholder="请输入商户拉单金额" />
        </el-form-item>
        <el-form-item label="会员区分金额" prop="memberAmount">
          <el-input v-model="form.memberAmount" placeholder="请输入会员区分金额" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="编号或卡号或手机号" prop="account">
          <el-input v-model="form.account" placeholder="请输入编号或卡号或手机号" />
        </el-form-item>
        <el-form-item label="开户银行" prop="bank">
          <el-input v-model="form.bank" placeholder="请输入开户银行" />
        </el-form-item>
        <el-form-item label="失效时间" prop="expireTime">
          <el-date-picker clearable
            v-model="form.expireTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-date-picker clearable
            v-model="form.payTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="回调通知地址" prop="notifyUrl">
          <el-input v-model="form.notifyUrl" placeholder="请输入回调通知地址" />
        </el-form-item>
        <el-form-item label="签名" prop="signature">
          <el-input v-model="form.signature" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="时间戳" prop="timestamp">
          <el-input v-model="form.timestamp" placeholder="请输入时间戳" />
        </el-form-item>
        <el-form-item label="随机数" prop="nonce">
          <el-input v-model="form.nonce" placeholder="请输入随机数" />
        </el-form-item>
        <el-form-item label="是否删除" prop="isDelete">
          <el-input v-model="form.isDelete" placeholder="请输入是否删除" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Order">
import { listOrder, getOrder, delOrder, addOrder, updateOrder,confirmOrderApi } from "@/api/pay/order";

const { proxy } = getCurrentInstance();
const { order_status } = proxy.useDict("order_status");
const orderList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    channelId: null,
    userId: null,
    merchantId: null,
    orderNum: null,
    realAmount: null,
    businessAmount: null,
    memberAmount: null,
    comment: null,
    account: null,
    bank: null,
    createTime: null,
    updateTime: null,
    expireTime: null,
    payTime: null,
    notifyUrl: null,
    signature: null,
    timestamp: null,
    nonce: null,
    status: null,
    isDelete: null
  },
  rules: {
    channelId: [
      { required: true, message: "支付通道id不能为空", trigger: "blur" }
    ],
    userId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    orderNum: [
      { required: true, message: "订单号不能为空", trigger: "blur" }
    ],
    createTime: [
      { required: true, message: "创建时间不能为空", trigger: "blur" }
    ],
    updateTime: [
      { required: true, message: "更新时间不能为空", trigger: "blur" }
    ],
    expireTime: [
      { required: true, message: "失效时间不能为空", trigger: "blur" }
    ],
    isDelete: [
      { required: true, message: "是否删除不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单列表 */
function getList() {
  loading.value = true;
  listOrder(queryParams.value).then(response => {
    orderList.value = response.rows;
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
    orderId: null,
    channelId: null,
    userId: null,
    merchantId: null,
    orderNum: null,
    realAmount: null,
    businessAmount: null,
    memberAmount: null,
    comment: null,
    account: null,
    bank: null,
    createTime: null,
    updateTime: null,
    expireTime: null,
    payTime: null,
    notifyUrl: null,
    signature: null,
    timestamp: null,
    nonce: null,
    status: null,
    isDelete: null
  };
  proxy.resetForm("orderRef");
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
  ids.value = selection.map(item => item.orderId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加订单";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _orderId = row.orderId || ids.value
  getOrder(_orderId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改订单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["orderRef"].validate(valid => {
    if (valid) {
      if (form.value.orderId != null) {
        updateOrder(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addOrder(form.value).then(response => {
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
  const _orderIds = row.orderId || ids.value;
  proxy.$modal.confirm('是否确认删除订单编号为"' + _orderIds + '"的数据项？').then(function() {
    return delOrder(_orderIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('pay/order/export', {
    ...queryParams.value
  }, `order_${new Date().getTime()}.xlsx`)
}
getList();

/**手动确认回调*/
function confirmOrder(row) {
  const _orderId = row.orderId || ids.value
  proxy.$modal.confirm('是否确认订单编号为"' + _orderId + '"的数据项？').then(function() {
    return confirmOrderApi({orderId: _orderId});
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("确认成功");
    console.log("确认成功");
  }).catch(() => {});
}
</script>
