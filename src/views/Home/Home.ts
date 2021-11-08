import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import { User } from '@/models/user';
import router from '@/router';
import { Watch } from 'vue-property-decorator';
import { formatDate } from '@/utility/date';
import Post from '../../components/Post/Post.vue';

@Options({
    components: {
        Post
    }
})

export default class Home extends Vue {
    private user: any = store.getters['getUser'];
    private feed: any;
    private showFeed: boolean = false;
    private isLoading: boolean = true;
    private posts: any = [];
    public isSearchOpen: boolean = store.state.isSearchOpen;
    
    @Watch(`$store.state.isSearchOpen`)
    function(newVal: any) {
        this.isSearchOpen = newVal;
    }

    get username(): string {
        return this.user.username;
    }

    mounted() {
        this.fetchPosts();
    }

    public async fetchPosts() {
        try {
            const response = await Axios.post("/getHomeFeed", { token: this.user.token });
            if (response.data) {
                this.showFeed = true;
            }
            this.posts = response.data;
            this.isLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
        [...this.posts].forEach((post: any, index: number) => {
            this.posts[index].createdDate = formatDate(this.posts[index]);
        });
    }

    public goToSinglePost(id: string): void {
        router.push({name: 'singlePost', params: {id}});
    }
}