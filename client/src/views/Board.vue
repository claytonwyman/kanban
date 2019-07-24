<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <router-link to="/">Return to boards</router-link>
    
    <lists :boardId="boardId"></lists>
  </div>
</template>

<script>
import lists from "../components/List"

export default {
  name: "board",
  props: ["boardId"],
  mounted(){
    this.$store.dispatch("getActiveBoard", this.boardId)
  },
  computed: {
    board() {
      return this.$store.state.activeBoard
    }
  },
  components: {
    lists
  },
};
</script>
