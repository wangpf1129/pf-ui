<template>
    <!--@click.self  self修饰符阻止冒泡 代表只有点击自己才能触发-->
    <transition name="dialog-fade">
        <div class="pf-dialog__wrapper" v-show="visible" @click.self="handleClose">
            <div class="pf-dialog" :style="{width,marginTop:top}">
                <div class="pf-dialog__header">
                    <slot name="title">
                        <!--将span放到slot内，这样不仅可以定义title文本，还可以定义样式等-->
                        <span class="pf-dialog__title">{{title}}</span>
                    </slot>
                    <button class="pf-dialog__headerbtn">
                        <i class="pf-icon-close" @click="handleClose"></i>
                    </button>
                </div>
                <div class="pf-dialog__body">
                    <slot></slot>
                </div>
                <!--当有 footer 插槽传入时 才显示该标签-->
                <div class="pf-dialog__footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "PfDialog",
        props: {
            title: {
                type: String,
                default: '提示'
            },
            width: {
                type: String,
                default: '50%'
            },
            top: {
                type: String,
                default: '15vh'
            },
            visible: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleClose() {
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pf-dialog__wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        margin: 0;
        z-index: 2001;
        background-color: rgba(0, 0, 0, .5);

        .pf-dialog {
            position: relative;
            margin: 15vh auto 50px;
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
            width: 30%;

            &__header {
                padding: 20px 20px 10px;

                .pf-dialog__title {
                    line-height: 24px;
                    font-size: 18px;
                    color: #303133;
                }

                .pf-dialog__headerbtn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    font-size: 16px;

                    .el-icon-close {
                        color: #909399;
                    }
                }
            }

            &__body {
                padding: 30px 20px;
                color: #606266;
                font-size: 14px;
                word-break: break-all;
            }

            &__footer {
                padding: 10px 20px 20px;
                text-align: right;
                box-sizing: border-box;

                .pf-button:first-child {
                    margin-right: 20px;
                }
            }
        }
    }

    .dialog-fade-enter-active {
        animation: fade 0.3s;
    }

    .dialog-fade-leave-active {
        animation: fade 0.3s reverse;

    }

    @keyframes fade {
        0% {
            opacity: 0;
            transform: translateY(-30px);

        }

        100% {
            opacity: 1;
            transform: translateY(0px);

        }
    }
</style>