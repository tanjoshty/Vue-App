import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Watch } from 'vue-property-decorator';
import { formatDate } from '@/utility/date';
import Post from '../Post/Post.vue';

@Options({
    components: {
        Post
    }
})

export default class Search extends Vue {
    public isSearchOpen: boolean = false;
    public keyword: string = '';
    public posts: any = [];
    public requestCount: number = 0;
    public show: string = 'neither';

    public closeSearch(): void {
        store.dispatch('closeSearch');
        this.show = 'neither';
        this.keyword = '';
    }

    @Watch(`$store.state.isSearchOpen`)
    function(newVal: any, oldVal: any) {
        this.isSearchOpen = newVal;
    }

    @Watch('keyword')
    increaseReqeust(newVal: any, oldVal: any) {
        if (this.keyword.trim()) {
            this.show = "loading";

            const delay = setTimeout(() => {
                this.requestCount++;
            }, 750);

            return () => clearTimeout(delay);
        } else {
            this.show = "neither";
        }
    }

    @Watch('requestCount')
    async fetchPosts(newVal: any, oldVal: any) {
        if (this.keyword === '') {
            return
        } else {
            try {
                const response = await Axios.post("/search", {searchTerm: this.keyword});
    
                this.posts = response.data;
                this.show = "posts";
            } catch (error) {
                console.log("There was a problem or the request was cancelled");
            }
            [...this.posts].forEach((post: any, index: number) => {
                this.posts[index].createdDate = formatDate(this.posts[index]);
            });
        }
    }

    public goToSinglePost(id: string): void {
        router.push({name: 'singlePost', params: {id}});
        this.closeSearch();
    }
}