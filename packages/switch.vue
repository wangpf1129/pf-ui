<template>
    <div class="pf-switch"
         :class="{'is-checked':value}"
         @click="handleClick">
        <span class="pf-switch_core" ref="core">
            <span class="pf-switch_button"></span>
        </span>

        <input class="pf-switch_input" type="checkbox"
               :name="name"
               ref="input"
        >
    </div>
</template>

<script>
    export default {
        name: "PfSwitch",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            activeColor: {
                type: String,
                default: ''
            },
            inactiveColor: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            }
        },
        methods: {
            async handleClick() {
                // 要传input事件 因为是用 v-model 来双向绑定的
                this.$emit('input', !this.value)
                this.$refs.input.checked = this.value
                //  当 value 值发生改变时，调用这个函数 改变开关颜色
                // 这样做会有一个BUG， 当value 第一次发生改变时，颜色不会改变
                // 这时 需要等待value 发生改变后在调用 setColor
                // 也就是 数据修改后， 等待DOM更新完毕后，在调用setColor 需要涉及到 $this.nextTick()
                // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
                //  this.$nextTick() 是基于 promise 封装的
                await this.$nextTick()

                this.setColor()
            },
            setColor() {
                if (this.activeColor || this.inactiveColor) {
                    let color = this.value ? this.inactiveColor : this.activeColor
                    this.$refs.core.style.borderColor = color
                    this.$refs.core.style.backgroundColor = color
                }
            }
        },
        mounted() {
            // 当挂载DOM 时 调用这个函数， 修改开关默认颜色
            this.setColor()

            //
            this.$refs.input.checked = this.value
        }
    }
</script>

<style lang="scss" scoped>
    .pf-switch {
        display: inline-block;
        align-items: center;
        position: relative;
        font-size: 14px;
        line-height: 20px;
        vertical-align: middle;

        /* 隐藏input标签*/
        .pf-switch_input {
            position: absolute;
            width: 0;
            height: 0;
            opacity: 0;
            margin: 0;
        }

        .pf-switch_core {
            margin: 0;
            display: inline-block;
            position: relative;
            width: 40px;
            height: 20px;
            border: 1px solid #dcdfe6;
            outline: none;
            border-radius: 10px;
            box-sizing: border-box;
            background: #dcdfe6;
            cursor: pointer;
            transition: border-color .3s, background-color .3s;
            vertical-align: middle;

            .pf-switch_button {
                position: absolute;
                top: 1px;
                left: 1px;
                border-radius: 100%;
                transition: all .3s;
                width: 16px;
                height: 16px;
                background-color: #fff;
            }
        }
    }

    .pf-switch.is-checked {
        .pf-switch_core {
            border-color: #409eff;
            background-color: #409eff;

            .pf-switch_button {
                transform: translateX(20px);
            }
        }
    }
</style>
