<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <router-link to="/">Return to boards</router-link>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "board",
  mounted() {
      this.$store.dispatch("getLists");
    },
    data() {
      return {
        newList: {
          title: ""
        }
      };
    },
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
  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "" };
    }
  },
  props: ["boardId"]
};
</script>
