<template>
  <div v-if="posts.length > 0">
    <h3>Списки постов</h3>
    <post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)">

    </post-item>
  </div>
  <div v-else>
    <h2>Постов нету</h2>
  </div>
</template>

<script>
import PostItem from "./PostItem";
export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 15px;
}

</style>