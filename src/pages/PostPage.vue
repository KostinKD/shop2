<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput
        v-model="searchQuery"
        placeholder="Поиск..."
    />
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
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div class="observer" v-intersection="loadMorePosts"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          class="page"-->
    <!--          v-for="pageNumber in totalPage"-->
    <!--          :key="pageNumber"-->
    <!--          :class="{-->
    <!--            'current__page': page === pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--      </div>-->
  </div>
</template>


<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  data(){
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,
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
    // changePage(pageNumber){
    //   this.page = pageNumber
    // },
    async fetchPost(){
      try {
        this.isPostLoading = true;
        const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(responce.headers['x-total-count'] / this.limit)
        this.posts = responce.data;
      } catch (e){
        alert('Ошибка')
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts(){
      try {
        this.page += 1;
        const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(responce.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...responce.data];
      } catch (e){
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchPost();
    // console.log(this.$refs.observer);
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   /* Content excerpted, show below */
    //   if(entries[0].isIntersecting && this.page < this.totalPage){
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
    },
  },
  // watch: {
  //   page(){
  //     this.fetchPost()
  //   }
  // },
}
</script>

<style>


.app__btn{
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page{
  border: 1px solid black;
  padding: 15px;
  margin-right: 10px;
  border-radius: 5px;
}
.current__page{
  border: 2px solid teal;
}

.observer{
  height: 30px;
  background: green;
}
</style>
