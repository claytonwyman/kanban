<template>
  <div class="list-items">
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>

    <div v-for="list in lists" :key="list._id">
      <router-link :to="{name: 'tasks', params: {listId: list._id}}">{{list.title}}</router-link>
      <button @click="deleteList(list)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lists',
  props: ["boardId"],
  mounted() {
      this.$store.dispatch("getLists", this.boardId);
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
      this.newList = { title: "", boardId: this.boardId };
    },
    deleteList(list) {
      this.$store.dispatch('deleteList', list)
    }
  }
}
</script>

<style scoped>
</style>
