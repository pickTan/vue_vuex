<template>
<h3 class="u-fs20 g-tc">张三的离职申请</h3>
    <p>提示：请xxx审批</p>
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">申请人：</label>
            <div class="col-sm-4">
                <span class="writing">张三</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">合同到期时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">人力资源部</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">申请部门：</label>
            <div class="col-sm-4">
                <span class="writing">人事专员</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">入职日期：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">2016/7/7</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">职务：</label>
            <div class="col-sm-4">
                <span class="writing">人事专员</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="申请资料">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">编号：</label>
            <div class="col-sm-4">
                <span class="writing">MUI201607181234</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">合同会审</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">拟定离职日期：</label>
            <div class="col-sm-4">
                <span class="writing">紧急</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">所属项目：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">（试用期）￥4000.00  /  （转正后）￥4000.00</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">离职类型：</label>
            <div class="col-sm-4">
                <span class="writing">人事专员</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="离职原因">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">离职类别：</label>
            <div class="col-sm-4">
                <span class="writing">MUI201607181234</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">联系方式：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">合同会审</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">公司原因：</label>
            <div class="col-sm-4">
                <span class="writing">紧急</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">外部原因：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">（试用期）￥4000.00  /  （转正后）￥4000.00</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">其他原因：</label>
            <div class="col-sm-4">
                <span class="writing">人事专员</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">离职申请报告：</label>
            <div class="col-sm-4">
                <span class="writing">人事专员</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="审批意见">
        <table class="m-pro g-tc">
            <thead>
            <th>办理人</th>
            <th>办理意见</th>
            <th>办理时间</th>
            </thead>
            <tbody>
            <tr>
                <td>李四</td>
                <td>合同</td>
                <td>2016</td>
            </tr>
            </tbody>
        </table>
    </Tip-border>
</template>

<script>
//    import Crumb from './public/Crumb.vue';
    import TipBorder from './public/TipBorder.vue';
    export default{
        components: {
//            Crumb,
            TipBorder
        }
    }
</script>
