<template>
    <div class="tasks">
        <h4>{{task.title}}</h4>
        <button @click="deleteTask(task)">Delete Task</button>
    </div>
</template>

<script>
export default {
    name: 'tasks',
    props: ["task"],
    mounted() {
        
    },
    computed: {
        tasks() {
            return (
                this.$store.state.tasks
            );
        }
    },
    methods: {
        deleteTask(task) {
            this.$store.dispatch('deleteTask', task)
        }
    }
}
</script>

<style>

</style>
