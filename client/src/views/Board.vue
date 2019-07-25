<template >
  <div class="board container-fluid bg-light">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-secondary text-light d-flex justify-content-around"
    >
      <a class="navbar-brand text-light" href>Kanban</a>
      <a
        class="navbar-brand"
      >Logged in as: {{this.$store.state.user.name}} ({{this.$store.state.user.email}})</a>
      <a class="text-light" @click="logout()">Logout</a>
    </nav>
    <router-link class="d-flex flex-row-left" to="/">&#x2190; Return to boards</router-link>
    <h1>{{board.title}}</h1>
    <p class="font-italic">{{board.description}}</p>
    <div class="col-12 mb-4 mt-2 border bg-secondary d-flex flex-column">
      <form class="m-2" @submit.prevent="addList">
        <h4 class="text-light">Create a List</h4>
        <input type="text" placeholder="title" v-model="newList.title" required />
        <button class="btn btn-primary m-1" type="submit">Create List</button>
      </form>
    </div>
    <div class="row">
      <list
        class="m-2 d-flex flex-row justify-content-around"
        :boardId="boardId"
        v-for="list in lists"
        :key="list._id"
        :list="list"
      ></list>
    </div>
  </div>
</template>

<script>
import list from "../components/List";

export default {
  name: "board",
  props: ["boardId"],
  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getActiveBoard", this.boardId),
      this.$store.dispatch("getLists", this.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: {
    list
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "", boardId: this.boardId };
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
