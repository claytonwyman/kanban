<template>
  <div class="tasks">
    <div class="card border-secondary bg-light" style="width: 18rem;">
      <div class="card-body">
        <h4>
          <i class="fas fa-tasks"></i>
          {{task.title}}
        </h4>

        <div class="dropdown" id="list-items">
          <button
            style="display: inline-block;"
            class="btn btn-primary btn-sm btn-outline-light dropdown-toggle"
            type="button"
            id="dropwdownMenuButton"
            data-toggle="dropdown"
          ></button>
          <div class="dropdown-menu">
            <a
              class="dropdown-item"
              :key="list._id"
              v-for="list in lists"
              @click="moveTask(list._id)"
            >
              Move To:
              {{list.title}}
            </a>
          </div>
        </div>

        <br />

        <button class="btn btn-danger btn-sm" @click="deleteTask(task)">Delete Task</button>

        <form class="m-2 border bg-secondary" @submit.prevent="addComment">
          <h4 class="text-light">Comments</h4>
          <input type="text" placeholder="title" v-model="newComment.title" required />
          <button class="btn btn-primary btn-sm m-1" type="submit">Create Comment</button>
        </form>
        <div class="row">
          <comments
            class="d-flex flex-row justify-content-around"
            style="width:23vw;"
            :taskId="task._id"
            v-for="comment in comments"
            :key="comment._id"
            :comment="comment"
          ></comments>
        </div>
      </div>
    </div>
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
        taskId: this.task._id,
        boardId: this.task.boardId,
        listId: this.task.listId
      }
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    comments() {
      return this.$store.state.comments[this.task._id];
    },
    lists() {
      return this.$store.state.lists;
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
      this.newTask = {
        title: "",
        taskId: this.task._id,
        listId: this.task.listId,
        boardId: this.task.boardId
      };
    },
    moveTask(listId) {
      let payload = {
        task: this.task,
        listId: listId
      };
      this.$store.dispatch("moveTask", payload);
    }
  }
};
</script>

<style>
#list-items {
  cursor: pointer;
}
</style>
