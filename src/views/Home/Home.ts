import { Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import { User } from '@/models/user';

export default class Home extends Vue {
    private user: any = store.getters['getUser'];
    private feed: any;
    private isLoading: boolean = true;

    get username(): string {
        return this.user.username;
    }

    mounted() {
        const fetchData = async () => {
            try {
                const response = await Axios.post("/getHomeFeed", { token: this.user.token });

                this.isLoading = false;
                this.feed = response.data;
              } catch (error) {
                console.log("There was a problem.");
              }
        }
        fetchData();
        return this.feed;
    }
}