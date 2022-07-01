<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btn">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm
          @create="createPost"
      />
    </my-dialog>

    <PostList
        :posts="posts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>


<script>
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyDialog from "../components/UI/MyDialog";
import MyButton from "../components/UI/MyButton";
import axios from 'axios';
import MySelect from "../components/UI/MySelect";

export default {
    components: {MySelect, MyButton, MyDialog, PostList, PostForm},
    data(){
      return {
        posts: [],
        dialogVisible: false,
        isPostLoading: false,
        selectedSort: '',
        sortOptions: [
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'},
        ]
      }
    },
    methods: {
      createPost(post){
        this.posts.push(post)
        this.dialogVisible = false
      },
      removePost(post){
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog(){
        this.dialogVisible = true;
      },
       async fetchPost(){
        try {
          this.isPostLoading = true;
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            this.posts = responce.data;
        } catch (e){
          alert('Ошибка')
        } finally {
        this.isPostLoading = false
        }
      }
    },
    mounted() {
      this.fetchPost();
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .app{
    padding: 20px;
  }

  .app__btn{
    display: flex;
    justify-content: space-between;
  }
</style>
