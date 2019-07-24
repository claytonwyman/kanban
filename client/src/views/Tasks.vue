<template>
    <div class="tasks">
        <h1>{{list.title}}</h1>
    </div>
</template>

<script>
export default {
    name: 'tasks',
    props: ['listId'],
    computed: {
      list() {
        return this.$store.state.activeList
      }
    },
    mounted(){
        this.$store.dispatch("getActiveList", this.listId)
    }
}
</script>

<style>

</style>
