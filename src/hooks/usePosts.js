import axios from "axios";
import {onMounted, ref} from 'vue';

export function usePosts(limit) {
    const posts = ref([])
    const totalPage = ref(0)
    const isPostLoading = ref(true)
    const fetching = async () =>{
        try {
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: this.page,
                    _limit: this.limit
                }
            });
            totalPage.value = Math.ceil(responce.headers['x-total-count'] / limit)
            posts.value = responce.data;
        } catch (e){
            alert('Ошибка')
        } finally {
            isPostLoading.value = false
        }
    }

    onMounted(fetching)
    return {
        posts, isPostLoading, totalPage
    }

}