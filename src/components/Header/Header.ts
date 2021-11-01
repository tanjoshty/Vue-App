import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import router from '@/router';
import Search from '../Search/Search.vue';
import Loader from '../Loader/Loader.vue';

@Options({
    components: {
        Search,
        Loader
    }
})

export default class Header extends Vue {

    public loggedIn: boolean = store.getters['getLoggedIn'];
    public avatar: string = store.getters['getUser'].avatar;
    public username: string = '';
    public password: string = '';

    public goHome(): void {
        router.push({name: 'home'});
    }
    public goCreatePost(): void {
        router.push({name: 'createPost'});
    }

    public goToProfile(): void {
        const id = store.getters['getUser'].username;
        router.push({name: 'profile', params: {id}})
    }

    public logOut(): void {
        store.dispatch('logout');
        window.location.reload();
    }

    public openSearch(): void {
        store.dispatch('openSearch');
    }

    public async logIn(): Promise<void> {
        const username = this.username;
        const password = this.password;

        try {
            const response = await Axios.post("/login", { username, password });
            if (response.data) {
                store.dispatch('login', response.data);
                window.location.reload();
            } else {
              console.log("Incorrect username / password");
            }
          } catch (error) {
            console.log("There was a problem.");
          }
    }
}