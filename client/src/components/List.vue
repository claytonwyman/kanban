<template>
  <div class="list-items bg-light">
    <div class="card border border-secondary" style="width: 90vw;">
      <div class="card-body">
        <h3>{{list.title}}</h3>
        
        <button class="btn btn-danger btn-sm" @click="deleteList(list)">Delete List</button>
        <form class="m-2 border bg-secondary" @submit.prevent="addTask">
          <h4 class="text-light">Create a Task</h4>
          <input type="text" placeholder="title" v-model="newTask.title" required />
          <button class="btn btn-primary btn-sm m-1" type="submit">Create Task</button>
        </form>

        <div class="row">
          <tasks
            class="d-flex flex-row justify-content-around m-2"
            style="width:25vw;"
            :listId="list._id"
            v-for="task in tasks"
            :key="task._id"
            :task="task"
          ></tasks>
        </div>
      </div>
    </div>
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
        listId: this.list._id,
        boardId: this.list.boardId
      }
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    tasks() {
      return this.$store.state.tasks[this.list._id];
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
      this.newTask = {
        title: "",
        listId: this.list._id,
        boardId: this.list.boardId
      };
    }
  }
};
</script>

<style scoped>
</style>
