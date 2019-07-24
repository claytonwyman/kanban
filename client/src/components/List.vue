<template>
  <div class="list-items">
    <div v-for="list in lists" :key="list._id">
      <h3>{{list.title}}</h3>
      <button @click="deleteList(list)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getLists", this.boardId);
  },
  data() {
    return {
      
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
    deleteList(list) {
      this.$store.dispatch('deleteList', list)
    }
  }
}
</script>

<style scoped>
</style>
