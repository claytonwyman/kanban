<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <router-link to="/">Return to boards</router-link>

    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>
    
    <list :boardId="boardId"></list>
  </div>
</template>

<script>
import list from "../components/List"

export default {
  name: "board",
  props: ["boardId"],
  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    }
  },
  mounted(){
    this.$store.dispatch("getActiveBoard", this.boardId),
    this.$store.dispatch("getLists", this.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard
    },
    lists() {
      return (
        this.$store.state.lists
      );
    }
  },
  components: {
    list
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "", boardId: this.boardId };
    }
  }
};
</script>
