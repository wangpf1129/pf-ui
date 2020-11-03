<template>
    <div class="pf-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PfCheckboxGroup",
        props: {
            value: {
                // 注意是一个数组
                type: Array,
            }
        },
        provide() {
            return {
                CheckboxGroup: this
            }
        }
    }
</script>

<style scoped>

</style>