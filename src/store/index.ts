import { createStore } from 'vuex';

export default createStore ({
    state: {
        loggedIn: Boolean(localStorage.getItem("complexappToken")),
        flashMessages: [],
        user: {
            token: localStorage.getItem("complexappToken"),
            username: localStorage.getItem("complexappUsername"),
            avatar: localStorage.getItem("complexappAvatar"),
        },
        isSearchOpen: false,
        isChatOpen: false,
        unreadChatCount: 0,
    }, 
    mutations: {
        login: (state, user) => {
            state.loggedIn;
            state.user = user;
        },
        logout: (state) => {
            state.loggedIn = !state.loggedIn;
        },
        openSearch: (state) => {
            state.isSearchOpen = true;
        },
        closeSearch: (state) => {
            state.isSearchOpen = false;
        }
    },
    getters: {
        getLoggedIn: (state) => state.loggedIn,
        getFlashMessages: (state) => state.flashMessages,
        getUser: (state) => state.user,
        getIsSearchOpen: (state) => state.isSearchOpen,
        getIsChatOpen: (state) => state.isChatOpen,
        getUnreadChatCount: (state) => state.unreadChatCount
    },
    actions: {
        logout ({commit}) {
            localStorage.removeItem("complexappToken");
            localStorage.removeItem("complexappUsername");
            localStorage.removeItem("complexappAvatar");
            commit('logout');
        },
        login ({commit}, payload) {
            const newUser = {
                token: payload.token,
                username: payload.username,
                avatar: payload.avatar
            }

            localStorage.setItem("complexappToken", newUser.token);
            localStorage.setItem("complexappUsername", newUser.username);
            localStorage.setItem("complexappAvatar", newUser.avatar);
            
            commit('login', newUser);
        }, 
        openSearch({commit}) {
            commit('openSearch');
        },
        closeSearch({commit}) {
            commit('closeSearch');
        }
    }
});