<template>
    <label class="pf-radio" :class="{'is-checked': label == model}">
    <span class="pf-radio_input">
      <span class="pf-radio_inner"></span>
        <!-- input 中的 :value 它只是展示父组件中 label的值 进行双向绑定 不是父组件（props）传过来的value -->
      <input
              type="radio"
              class="pf-radio_original"
              :value="label"
              :name="name"
              v-model="model"
      >
    </span>
        <span class="pf-radio_label">
            <slot></slot>
            <!--  如果不传默认插槽 那么 这个组件就默认显示label的值-->
            <template v-if="!this.$slots.default">{{label}}</template>
        </span>
    </label>

</template>

<script>
    export default {
        name: "PfRadio",
        props: {
            label: {
                type: [String, Number, Boolean],
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            // 这个 value 和 v-model 绑定的值有关系
            value: null,
        },
        inject: {
            RadioGroup: {
                // 如果不被 radio-group 就让默认为空
                default: ''
            }
        },
        computed: {
            // 因为是单向数据流， 子组件不能直接修改父组件的值， 所以这里进行双向绑定需要用到计算属性
            // 首先， 我们需要获取到 父组件的 value 值， 然后通过 input 的事件来修改value
            model: {
                get() {

                    return this.isGroup ? this.RadioGroup.value : this.value
                },
                set(value) {
                    // 如果有  radio-group 就把input事件发送给它， 如果没有就发送给自己
                    return this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
                }
            },
            // 判断 radio 是否被 radio-group 包裹
            isGroup() {
                // 把它变为 布尔类型
                return !!this.RadioGroup
            }
        },

    }
</script>

<style lang="scss" scoped>
    .pf-radio {
        color: #606266;
        font-weight: 500;
        line-height: 1;
        position: relative;
        cursor: pointer;
        display: inline-block;
        white-space: nowrap;
        outline: none;
        font-size: 14px;
        margin-right: 30px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;

        .pf-radio_input {
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            display: inline-block;
            line-height: 1;
            position: relative;
            vertical-align: middle;

            .pf-radio_inner {
                border: 1px solid #dcdfe6;
                border-radius: 100%;
                width: 14px;
                height: 14px;
                background-color: #fff;
                position: relative;
                cursor: pointer;
                display: inline-block;
                box-sizing: border-box;

                &:after {
                    width: 4px;
                    height: 4px;
                    border-radius: 100%;
                    background-color: #fff;
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    transition: transform .15s ease-in;
                }
            }

            .pf-radio_original {
                opacity: 0;
                outline: none;
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0px;
                right: 0;
                bottom: 0;
                margin: 0;
            }
        }

        .pf-radio_label {
            font-size: 14px;
            padding-left: 10px;
        }
    }

    .pf-radio.is-checked {
        .pf-radio_input {
            .pf-radio_inner {
                border-color: #409eff;
                background: #409eff;

                &:after {
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        }

        .pf-radio_label {
            color: #409eff;
        }
    }
</style>