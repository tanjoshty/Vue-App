import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Prop, Watch } from 'vue-property-decorator';

export default class Post extends Vue {
    @Prop() posts: any = [];
    @Prop() username: any;
    @Prop() search: boolean = false;

    public goToSinglePost(id: string): void {
        router.push({name: 'singlePost', params: {id}});
        this.$emit("close-search");
    }
}
