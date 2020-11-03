<template>
    <div class="pf-form-item">
        <label class="pf-form-item_label" :style="labelStyle">{{label}}</label>
        <div class="pf-form-item_content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PfFormItem",
        props:{
            label:{
                type:String,
                default:''
            }
        },
        inject:['Form'],
        computed:{
            labelStyle(){
              return  {
                  width: this.Form.labelWidth
              }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pf-form-item {
        margin-bottom: 25px;
    .pf-form-item_label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }
    .pf-form-item_content {
        line-height: 40px;
        position: relative;
        font-size: 14px;
        overflow: hidden;
    }
    }
</style>