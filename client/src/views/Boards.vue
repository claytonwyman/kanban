<template>
  <div class="boards container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
      <a class="navbar-brand" href="#">Kanban</a>
      <a class="navbar-brand">Logged in as: (Username)</a>
      <a class="navbar-brand" href>Logout</a>
    </nav>
    <div class="row">
      <div class="col-12">
        <h1>My Boards</h1>
      </div>
    </div>
    <div class="col-12 mb-4 border d-flex flex-column" style="height:25vh;">
      <form @submit.prevent="addBoard">
        <h4 class="mt-2">Create a board:</h4>
        <input
          class="m-2"
          type="text"
          placeholder="Enter a board title"
          v-model="newBoard.title"
          required
        />
        <input
          class="m-2"
          type="text"
          placeholder="Enter a board description"
          style="width: 40vw;"
          v-model="newBoard.description"
        />
        <button class="btn btn-primary m-2" type="submit">Create Board</button>
      </form>
    </div>
    <div
      class="d-flex flex-column align-items-center border m-1 text-left"
      v-for="board in boards"
      :key="board._id"
    >
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <div>
        <p class="font-italic">{{board.description}}</p>
      </div>
      <button class="btn btn-sm btn-danger m-2" @click="deleteBoard(board._id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(delId) {
      this.$store.dispatch("deleteBoard", delId);
    }
  }
};
</script>