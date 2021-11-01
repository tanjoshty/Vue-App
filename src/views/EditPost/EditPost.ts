import { Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';

export default class EditPost extends Vue {
    public title: string = '';
    public body: string = '';
    private postId: any;
    private currentUser: any = store.state.user.username;
    private isLoading: boolean = true;
    private post: any = {};

    mounted() {
        this.postId = this.$route.params.id;
        this.fetchPost(this.postId);
    }

    public goToPost(id: string): void {
        router.push({name: 'singlePost', params: {id}})
    }

    public async fetchPost(id: string): Promise<void> {
        try {
            const response = await Axios.get(`/post/${id}`);
            this.title = response.data.title;
            this.body = response.data.body;
            this.isLoading = false;
            if (this.currentUser != response.data.author.username) {
                console.log("No Permissions");
                router.push({name: 'home'});
            }
        } catch (error) {
            console.log("There was a problem");
        }
    }

    public async updatePost(): Promise<void> {
        const title = this.title;
        const body = this.body;

        try {
            const response = await Axios.post(`/post/${this.postId}/edit`, { title, body, token: store.state.user.token });
            console.log("Post was successfully updated");
            this.goToPost(this.postId);
            
        } catch (error) {
            console.log("There was a problem");
        }
    }
}