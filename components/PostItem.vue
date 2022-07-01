<template>
  <div class="post">
    <div>
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong> {{ post.body }}</div>
    </div>
    <div class="post_btns">
      <MyButton
        @click="$emit('remove', post)"
      >Удалить
      </MyButton>

    </div>
  </div>

</template>

<script>
import MyButton from "./UI/MyButton";
export default {
  components: {MyButton},
  props:{
    post: {
      type: Object,
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>