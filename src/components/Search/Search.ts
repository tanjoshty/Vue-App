import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import { Watch } from 'vue-property-decorator';
import Loader from '../Loader/Loader.vue';

@Options({
    components: {
        Loader
    }
})

export default class Search extends Vue {
    public isSearchOpen: boolean = false;
    public keyword: string = '';
    public results: any = [];
    public requestCount: number = 0;
    public show: string = 'neither';

    public closeSearch(): void {
        store.dispatch('closeSearch');
        this.show = 'neither';
        this.keyword = '';
    }

    @Watch(`$store.state.isSearchOpen`)
    function(newVal: any, oldVal: any) {
        this.isSearchOpen = newVal;
    }

    @Watch('keyword')
    increaseReqeust(newVal: any, oldVal: any) {
        if (this.keyword.trim()) {
            this.show = "loading";

            const delay = setTimeout(() => {
                this.requestCount++;
            }, 750);

            return () => clearTimeout(delay);
        } else {
            this.show = "neither";
        }
    }

    @Watch('requestCount')
    async fetchResults(newVal: any, oldVal: any) {
        if (this.keyword === '') {
            return
        } else {
            try {
                const response = await Axios.post("/search", {searchTerm: this.keyword});
    
                this.results = response.data;
                this.show = "results";
            } catch (error) {
                console.log("There was a problem or the request was cancelled");
            }
            [...this.results].forEach((post: any, index: number) => {
                this.results[index].createdDate = this.formatDate(this.results[index]);
            });
        }
    }

    public goToSinglePost(id: string): void {
        router.push({name: 'singlePost', params: {id}});
        this.closeSearch();
    }

    public formatDate(post: any): string {
        const date = new Date(post.createdDate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}