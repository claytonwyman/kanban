<template>
  <div class="comments-display d-flex">
    <div class="card text-light" style="width: 18rem;" id="comment-card">
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
#comment-card {
  background-color: rgb(166, 165, 170);
}
</style>
