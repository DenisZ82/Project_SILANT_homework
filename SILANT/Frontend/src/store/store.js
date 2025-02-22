import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService.js';

class Store {
    isAuth = false;
    isLoading = false;
    isUser = null;
    // isUser = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.initializeAuth();
    }

    initializeAuth() {
        const token = localStorage.getItem('token');
        this.isAuth = Boolean(token);
        const user = localStorage.getItem('user');
        this.isUser = user ? JSON.parse(user) : null;
        // this.isUser = user ? Number(user) : null;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setUser(id) {
        this.isUser = id;
    }

    async login(username, password) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(username, password);
            console.log('login-response - store.js:', response);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log('usergroup: ', response.data.user.group_name)
        } catch (e) {
            console.log('login-message - store.js:', e.response?.data?.message);
            console.log(e);
            alert(`${e.response?.data?.message} Повторите попытку входа.`);
            this.setLoading(false);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.setAuth(false);
            this.setUser(null);
            console.log('logout-response', response);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}

export default Store;