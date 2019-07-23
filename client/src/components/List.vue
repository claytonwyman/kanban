<template>
  <div class="list-items">
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>

    <div v-for="list in lists" :key="list._id">
      <h3>{{list.title}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lists',
  mounted() {
      this.$store.dispatch("getLists");
  },
  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    };
  },
  computed: {
    lists() {
      return (
        this.$store.state.lists
      );
    }
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "" };
    }
  }
}
</script>

<style scoped>
</style>
