import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import Axios from "axios";
import { response } from 'express';
import { Component, Watch } from 'vue-property-decorator';
import ProfilePosts from '@/components/ProfilePosts/ProfilePosts.vue';
import ProfileFollowers from '@/components/ProfileFollowers/ProfileFollowers.vue';
import ProfileFollowing from '@/components/ProfileFollowing/ProfileFollowing.vue';
import router from '@/router';

@Options({
    components: {
        ProfilePosts,
        ProfileFollowers,
        ProfileFollowing
    }
})

export default class Profile extends Vue {
    private showFollowButton: boolean = false;
    private postsSelected: boolean = true;
    private followersSelected: boolean = false;
    private followingSelected: boolean = false;

    private followActionLoading: boolean = false;
    private startFollowingRequestCount: number = 0;
    private stopFollowingRequestCount: number = 0;
    private profileData = {
        profileUsername: "...",
        profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
        isFollowing: false,
        counts: {postCount: "", followerCount: "", followingCount: ""}
    }

    @Watch('$route', {immediate: true, deep: true})
    public onRouteChange (to: any, from: any) {
        this.fetchProfileData();
    }

    public showProfilePosts(): void {
        this.postsSelected = true;
        this.followersSelected = false;
        this.followingSelected = false;
    }
    public showProfileFollowers(): void {
        this.postsSelected = false;
        this.followersSelected = true;
        this.followingSelected = false;
    }
    public showProfileFollowing(): void {
        this.postsSelected = false;
        this.followersSelected = false;
        this.followingSelected = true;
    }

    public async followUser(): Promise<void> {
        
    }

    public async fetchProfileData(): Promise<void> {
        const username = this.$route.params.id;
        try {
            const response = await Axios.post(`/profile/${username}`, {token: store.state.user.token});
            this.profileData = response.data;
            this.checkUser(response.data.profileUsername);
        } catch (error) {
            console.log("There was a problem");
        }
    }

    public checkUser(profileUsername: string): void {
        const currentUser = store.state.user.username;
        const profileUser = profileUsername;
        if (profileUser !== currentUser) {
            this.showFollowButton = true;
        } else {
            this.showFollowButton = false;
        }
    }
}