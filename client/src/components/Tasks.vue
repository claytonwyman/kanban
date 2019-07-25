<template>
  <div class="tasks">
    <h4>{{task.title}}</h4>
    <button @click="deleteTask(task)">Delete Task</button>

    <form class="m-2 border" @submit.prevent="addComment">
      <h4>Create a Comment</h4>
      <input type="text" placeholder="title" v-model="newComment.title" required />
      <button class="btn btn-primary m-1" type="submit">Create Comment</button>
    </form>

    <comments :taskId="task._id" v-for="comment in comments" :key="comment._id" :comment="comment"></comments>
  </div>
</template>

<script>
import comments from "./Comments";

export default {
  name: "tasks",
  props: ["task"],
  mounted() {
    this.$store.dispatch("getComments", this.task._id);
  },
  data() {
    return {
      newComment: {
        title: "",
        taskId: this.task._id
      }
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    comments() {
      return this.$store.state.comments;
    }
  },
  components: {
    comments
  },
  methods: {
    deleteTask(task) {
      this.$store.dispatch("deleteTask", task);
    },
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
      this.newTask = { title: "", taskId: this.task._id };
    }
  }
};
</script>

<style>
</style>
