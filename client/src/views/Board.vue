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
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  components: {
    lists
  },
  props: ["boardId"]
};
</script>
