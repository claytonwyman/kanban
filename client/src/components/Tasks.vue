<template>
    <div class="tasks">
        <h3>{{task.title}}</h3>
    </div>
</template>

<script>
export default {
    name: 'tasks',
    props: ["listId"],
    mounted() {
        
    },
    computed: {
        tasks() {
            return (
                this.$store.state.tasks
            );
        }
    },
}
</script>

<style>

</style>
