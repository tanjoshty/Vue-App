import { Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';

export default class CreatePost extends Vue {
    public title: string = '';
    public body: string = '';

    public async createPost(): Promise<void> {
        const title = this.title;
        const body = this.body;

        try {
            // API Call to register
            const response = await Axios.post("/create-post", { title, body, token: store.state.user.token });
            console.log("Post was successfully created");
            this.goToSinglePost(response.data);
            
        } catch (error) {
            console.log("There was a problem");
        }
    }

    public goToSinglePost(id: string): void {
        router.push({name: 'singlePost', params: {id}});
    }
}