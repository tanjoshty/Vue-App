import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import { User } from '@/models/user';
import ProfilePosts from '@/components/ProfilePosts/ProfilePosts';
import router from '@/router';

@Options({
    components: {
        ProfilePosts
    }
})

export default class Home extends Vue {
    private user: any = store.getters['getUser'];
    private feed: any;
    private showFeed: boolean = false;
    private isLoading: boolean = true;
    private posts: any = [];
    

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
        this.posts.forEach((post: any, index: number) => {
            this.posts[index].createdDate = this.formatDate(this.posts[index]);
        });
    }

    public formatDate(post: any): string {
        const date = new Date(post.createdDate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    public goToSinglePost(id: string): void {
        router.push({name: 'singlePost', params: {id}});
    }
}