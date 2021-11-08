import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Watch } from 'vue-property-decorator';
import marked from 'marked';
import { formatDate } from '@/utility/date';

export default class SinglePost extends Vue {
    private postId: any;
    private showButtons: boolean = false;
    private currentUser: any = store.state.user.username;
    private isLoading: boolean = true;
    private post: any = {};
    private postBody: any;

    mounted() {
        this.postId = this.$route.params.id;
        this.fetchPost(this.postId);
    }

    public goToEdit(id: string): void {
        router.push({name: 'editPost', params: {id}})
    }

    public goToProfile(id: string): void {
        router.push({name: 'profile', params: {id}})
    }

    @Watch('$route', {immediate: true, deep: true})
    public onRouteChange (to: any, from: any) {
        this.fetchPost(to.params.id);
    }

    public async fetchPost(id: string): Promise<void> {
        try {
            const response = await Axios.get(`/post/${id}`);
            this.post = response.data;
            this.postBody = marked(this.post.body);
            this.isLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
        this.post.createdDate = formatDate(this.post);

        if (this.currentUser === this.post.author.username) {
            this.showButtons = true;
        } else {
            this.showButtons = false;
        }

    }

    public async deletePost(id: string): Promise<void> {
        const areYouSure = window.confirm("Do you really want to delete this post?");
        if (areYouSure) {
            try {
                const response = await Axios.delete(`/post/${id}`, {data: {token: store.state.user.token} });
                if (response.data == "Success") {
                    alert("Post was successfully deleted.");
                    this.goToProfile(this.currentUser);
                }
                
            } catch (error) {
                console.log("There was a problem");
            }
        } 
    }

}
