import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Watch } from 'vue-property-decorator';

export default class ProfileFollowing extends Vue {
    private username: any;
    private isLoading: boolean = true;
    private following: any = [];

    mounted() {
        this.username = this.$route.params.id;
        this.fetchFollowing(this.username);
    }

    public goToProfile(id: string): void {
        router.push({name: 'profile', params: {id}})
    }

    @Watch('$route', {immediate: true, deep: true})
    public onRouteChange (to: any, from: any) {
        this.fetchFollowing(to.params.id);
    }

    public async fetchFollowing(username: string): Promise<void> {
        try {
            const response = await Axios.get(`/profile/${username}/following`);
            this.following = response.data;
            this.isLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
    }
    
}
