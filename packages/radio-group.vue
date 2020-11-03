<template>
    <div class="pf-radio-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PfRadioGroup",
        provide(){
            return {
                RadioGroup:this
            }
        },
        props:{
            value:null
        }
    }
</script>

<style scoped>

</style>