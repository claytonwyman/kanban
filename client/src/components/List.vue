<template>
  <div class="list-items">
    <div v-for="list in lists" :key="list._id">
      <h3>{{list.title}}</h3>
      <button @click="deleteList(list)">Delete</button>
      <form class="m-2" @submit.prevent="addTask">
        <h4>Create a Task</h4>
        <input type="text" placeholder="title" v-model="newTask.title" required />
        <button class="btn btn-primary m-1" type="submit">Create Task</button>
      </form>
    </div>
  </div>
</template>

<script>
import tasks from './Tasks'

export default {
  name: 'list',
  props: ["boardId", "listId"],
  mounted() {
    this.$store.dispatch("getLists", this.boardId);
  },
  data() {
    return {
      newTask: {
        title: "",
        listId: this.listId
      }
    };
  },
  computed: {
    lists() {
      return (
        this.$store.state.lists
      );
    },
    tasks() {
      return (
        this.$store.state.tasks
      );
    }
  },
  components: {
    tasks
  },
  methods: {
    deleteList(list) {
      this.$store.dispatch('deleteList', list)
    },
    addTask() {
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = { title: "", listId: this.listId };
    }
  }
}
</script>

<style scoped>
</style>
