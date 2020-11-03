<template>
    <label class="pf-checkbox" :class="{'is-checked': isChecked}">
    <span class="pf-checkbox_input">
      <span class="pf-checkbox_inner"></span>
      <input type="checkbox" class="pf-checkbox_original"
             :name="name"
             :value="label"
             v-model="model"
      >
    </span>
        <span class="pf-checkbox_label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
    </label>
</template>

<script>
    export default {
        name: "PfCheckbox",
        props: {
            label: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            value: null
        },
        inject: {
            CheckboxGroup: {
                default: ''
            }
        },
        computed: {
            model: {
                get() {
                    return this.isCheckGroup ? this.CheckboxGroup.value : this.value
                },
                set(value) {
                    return this.isCheckGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
                }
            },
            isCheckGroup() {
                return !!this.CheckboxGroup
            },
            isChecked() {
                // 如果有group包裹，判断label是否在model中
                // 如果没有group包裹,直接使用model
                return this.isCheckGroup ? this.model.includes(this.label) : this.model
            }

        }
    }
</script>

<style lang="scss" scoped>
    .pf-checkbox {
        color: #606266;
        font-weight: 500;
        font-size: 14px;
        position: relative;
        cursor: pointer;
        display: inline-block;
        white-space: nowrap;
        user-select: none;
        margin-right: 30px;

        .pf-checkbox_input {
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            display: inline-block;
            line-height: 1;
            position: relative;
            vertical-align: middle;

            .pf-checkbox_inner {
                display: inline-block;
                position: relative;
                border: 1px solid #dcdfe6;
                border-radius: 2px;
                box-sizing: border-box;
                width: 14px;
                height: 14px;
                background-color: #fff;
                z-index: 1;
                transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);

                &:after {
                    box-sizing: content-box;
                    content: "";
                    border: 1px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 7px;
                    left: 4px;
                    position: absolute;
                    top: 1px;
                    transform: rotate(45deg) scaleY(0);
                    width: 3px;
                    transition: transform .15s ease-in .05s;
                    transform-origin: center;
                }
            }

            .pf-checkbox_original {
                opacity: 0;
                outline: none;
                position: absolute;
                left: 10px;
                margin: 0;
                width: 0;
                height: 0;
                z-index: -1;
            }
        }

        .pf-checkbox_label {
            display: inline-block;
            padding-left: 10px;
            line-height: 19px;
            font-size: 14px;
        }
    }

    .pf-checkbox.is-checked {
        .pf-checkbox_input {
            .pf-checkbox_inner {
                background-color: #409eff;
                border-color: #409eff;

                &:after {
                    transform: rotate(45deg) scaleY(1);
                }
            }
        }

        .pf-checkbox_label {
            color: #409eff;
        }
    }
</style>