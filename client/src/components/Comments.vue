<template>
  <div class="comments-display d-flex">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <p>{{comment.title}}</p>
        <button class="btn btn-danger btn-sm" @click="deleteComment(comment)">Delete Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
  props: ["comment"],
  mounted() {},
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    deleteComment(comment) {
      this.$store.dispatch("deleteComment", comment);
    }
  }
};
</script>

<style>
</style>
