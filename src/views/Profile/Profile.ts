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
    private showFollowingButton: boolean = false;
    private postsSelected: boolean = true;
    private followersSelected: boolean = false;
    private followingSelected: boolean = false;
    private followActionLoading: boolean = false;
    private profileData = {
        profileUsername: "...",
        profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
        isFollowing: false,
        counts: {postCount: 0, followerCount: 0, followingCount: 0}
    };

    public isSearchOpen: boolean = store.state.isSearchOpen;
    
    @Watch(`$store.state.isSearchOpen`)
    function(newVal: any) {
        this.isSearchOpen = newVal;
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

    public async followUser(id: string): Promise<void> {
        try {
            const response = await Axios.post(`/addFollow/${id}`, {token: store.state.user.token});
            this.showFollowButton = false;
            this.profileData.isFollowing = true;
            this.profileData.counts.followerCount++;
            this.followActionLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
    }

    public async unFollowUser(id: string): Promise<void> {
        try {
            const response = await Axios.post(`/removeFollow/${id}`, {token: store.state.user.token});
            this.showFollowButton = true;
            this.showFollowingButton = false;
            this.profileData.isFollowing = false;
            this.profileData.counts.followerCount--;
            this.followActionLoading = false;
        } catch (error) {
            console.log("There was a problem");
        }
    }

    public async fetchProfileData(): Promise<void> {
        const username = this.$route.params.id;
        try {
            const response = await Axios.post(`/profile/${username}`, {token: store.state.user.token});
            this.profileData = response.data;
            this.checkUser(response.data);
        } catch (error) {
            console.log("There was a problem");
        }
    }

    public checkUser(profile: any): void {
        const currentUser = store.state.user.username;
        const profileUser = profile.profileUsername;
        if (profileUser !== currentUser && profile.isFollowing) {
            this.showFollowButton = false;
            this.showFollowingButton = true;
        } else if (profileUser !== currentUser && !profile.isFollowing) {
            this.showFollowButton = true;
            this.showFollowingButton = false;
        } else {
            this.showFollowButton = false;
            this.showFollowingButton = false;
        }
    }
}