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
            console.log(response.data)
            router.push({name: 'home'});
            
        } catch (error) {
            console.log("There was a problem");
        }
    }
}