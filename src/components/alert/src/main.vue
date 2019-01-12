<template>
    <div class="ec">
        <slot></slot>
        守护
        {{text}}
    </div>
</template>
<script>
    export default {
        name: 'ec-alert',
        props:{
            text:{
                type:String
            }
        },
        data () {
            return {
                
            }
        },
        
        computed: {},
        mounted () {
        },
        methods: {
        }
    }
</script>
