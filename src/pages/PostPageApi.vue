<template>
  <div>
    <h2>{{likes}}</h2>
    <my-button @click="addLike">add</my-button>
    <my-button @click="minusLike">minus</my-button>
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
import {ref} from 'vue';
import useSortedPost from "@/hooks/useSortedPost";
import sortedAndSearchedPosts from "@/hooks/useSelectAndSearched";

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  data(){
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    }
  },
  setup(props){
    const {posts,totalPage,isPostLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPost(posts);
    const {searchQuery,sortedAndSearchedPosts} = sortedAndSearchedPosts(sortedPosts)

    return {
      posts,totalPage,isPostLoading,sortedPosts,selectedSort,searchQuery
    }
  }
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
