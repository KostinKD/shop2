<template>
  <div v-if="posts.length > 0">
    <h3>Списки постов</h3>
    <transition-group name="post-list">
    <post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </transition-group>
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

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move{
  transition: transform 0.4s ease;
}

</style>