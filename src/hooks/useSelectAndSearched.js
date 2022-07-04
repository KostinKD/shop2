import {computed, ref} from 'vue'

export default function sortedAndSearchedPosts(sortedPosts){
    const searchQuery = ref('')
    const sortedAndSearchedPosts = computed(() =>{
        return sortedPosts.value.filter(post => post.title.includes(searchQuery.value))})

        return {
            searchQuery, sortedAndSearchedPosts
        }
}
