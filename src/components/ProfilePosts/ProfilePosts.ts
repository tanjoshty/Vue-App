import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Prop, Watch } from 'vue-property-decorator';
import { formatDate } from '@/utility/date';
import Post from '../Post/Post.vue';

@Options({
    components: {
        Post
    }
})

export default class ProfilePosts extends Vue {
    private username: any;
    private user: any = store.getters['getUser'];
    private isLoading: boolean = true;
    private posts: any = [];

    mounted() {
        this.username = this.$route.params.id;
        this.fetchPosts(this.username);
    }

    public async fetchPosts(username: string): Promise<void> {
        try {
            const response = await Axios.get(`/profile/${username}/posts`);
            this.posts = response.data;
            this.isLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
        [...this.posts].forEach((post: any, index: number) => {
            this.posts[index].createdDate = formatDate(this.posts[index]);
        });
    }

    @Watch('$route', {immediate: true, deep: true})
    public onRouteChange (to: any, from: any) {
        this.fetchPosts(to.params.id);
    }

}
