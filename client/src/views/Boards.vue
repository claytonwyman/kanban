<template>
  <div class="boards container-fluid" id="boards">
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary d-flex justify-content-around">
      <a class="navbar-brand text-light" href>
        <i class="fas fa-chalkboard"></i>Kanban
      </a>
      <h5
        class="navbar-brand text-light"
      >Logged in as: {{this.$store.state.user.name}} ({{this.$store.state.user.email}})</h5>
      <a class="navbar-brand text-light" @click="logout()">
        Logout
        <i class="fas fa-sign-out-alt"></i>
      </a>
    </nav>
    <div class="row">
      <div class="col-12 m-2">
        <h1 class="text-light">
          <i class="fas fa-chalkboard"></i> My Boards
        </h1>
      </div>
    </div>
    <div class="col-12 mb-4 border d-flex flex-column bg-secondary" style="height:25vh;">
      <form @submit.prevent="addBoard">
        <h4 class="mt-2 text-light">Create a board:</h4>
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
    <div class="row">
      <div
        v-for="board in boards"
        :key="board._id"
        class="card m-1 d-flex flex-row justify-content-around"
        style="width: 18rem;"
        id="board-card"
      >
        <div class="card-body">
          <router-link class="text-light" :to="{name: 'board', params: {boardId: board._id}}">
            <i class="fas fa-chalkboard"></i>
            {{board.title}}
          </router-link>
          <div>
            <p class="font-italic">{{board.description}}</p>
          </div>
          <img
            class="border border-light rounded"
            src="https://picsum.photos/150"
            alt="Board Image"
          />
          <button class="btn btn-sm btn-danger m-2" @click="deleteBoard(board._id)">Delete</button>
        </div>
      </div>
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
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
#boards {
  background-color: rgb(116, 112, 170);
}
#board-card {
  background-color: rgb(166, 165, 170);
}
</style>
