<template>
  <div class="list-items">
    <h3>{{list.title}}</h3>
    <button @click="deleteList(list)">Delete List</button>
    <form class="m-2 border" @submit.prevent="addTask">
      <h4>Create a Task</h4>
      <input type="text" placeholder="title" v-model="newTask.title" required />
      <button class="btn btn-primary m-1" type="submit">Create Task</button>
    </form>

    <tasks :listId="list._id" v-for="task in tasks" :key="task._id" :task="task"></tasks>
  </div>
</template>

<script>
import tasks from "./Tasks";

export default {
  name: "list",
  props: ["list"],
  mounted() {
    this.$store.dispatch("getTasks", this.list._id);
  },
  data() {
    return {
      newTask: {
        title: "",
        listId: this.list._id
      }
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    tasks
  },
  methods: {
    deleteList(list) {
      this.$store.dispatch("deleteList", list);
    },
    addTask() {
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = { title: "", listId: this.list._id };
    }
  }
};
</script>

<style scoped>
</style>
