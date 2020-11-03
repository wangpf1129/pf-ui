<template>
    <div class="pf-form">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "PfForm",
        props:{
            model:{
                type:Object,
                required:true
            },
            labelWidth:{
                type:String,
                default:'80px'
            }
        },
        provide(){
            return{
                Form:this
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>