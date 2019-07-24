<template>
    <div class="comments-display">
        <p>{{comment.title}}</p>
    </div>
</template>

<script>
export default {
    name: 'comments',
    props: ['comment'],
    mounted() {
        
    },
    computed: {
        comments() {
            return (
                this.$store.state.comments
            );
        }
    },
    methods: {
        deleteComment(comment) {
            this.$store.dispatch('deleteComment', comment)
        }
    }
}
</script>

<style>

</style>
