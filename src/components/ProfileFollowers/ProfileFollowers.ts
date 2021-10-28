import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Watch, Prop } from 'vue-property-decorator';

export default class ProfileFollowers extends Vue {
    private username: any;
    private isLoading: boolean = true;
    private followers: any = [];

    @Prop() testProp: any;

    mounted() {
        console.log(this.testProp);
        this.username = this.$route.params.id;
        this.fetchFollowers(this.username);
    }

    public goToProfile(id: string): void {
        router.push({name: 'profile', params: {id}})
    }

    @Watch('testProp')
    function(newVal: any, oldVal: any) {
        this.fetchFollowers(this.username);
    }

    @Watch('$route', {immediate: true, deep: true})
    public onRouteChange (to: any, from: any) {
        this.fetchFollowers(to.params.id);
    }

    public async fetchFollowers(username: string): Promise<void> {
        try {
            const response = await Axios.get(`/profile/${username}/followers`);
            this.followers = response.data;
            this.isLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
    }

}
