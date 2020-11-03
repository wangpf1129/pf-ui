<template>
    <div id="app">
        <pf-button type="primary">确定</pf-button>
<!--        <pf-switch v-model="switch"></pf-switch>-->
        <pf-switch v-model="switch1"></pf-switch>

    </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                switch1: false
            }
        }
    }
</script>

<style lang="scss">

</style>
