<template>
  <div>
    <form @submit.prevent>
      <h4>Название поста</h4>
      <my-input v-model:modelvalue="post.title" type="text" placeholder="Название"/>
      <my-input v-model:modelvalue="post.body"  type="text" placeholder="Описание"/>
      <MyButton
          class="button-28"
          role="button"
          @click="createPost"
      >
          Создать
      </MyButton>
    </form>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton";
import MyInput from "./UI/MyInput";
export default {
  components: {MyInput, MyButton},
  data(){
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost(){
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>



form {
  display: flex;
  flex-direction: column;
}


/*  BUTTON*/
.button-28 {
  align-self: flex-end;
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 10px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 5px;
  min-width: 0;
  outline: none;
  padding: 2px 4px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100px;
  will-change: transform;
  margin-top: 5px;
}

.button-28:disabled {
  pointer-events: none;
}

.button-28:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-28:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>