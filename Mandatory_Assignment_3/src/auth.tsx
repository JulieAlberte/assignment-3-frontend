
export const Auth = {

    isAuthenticated: false,
    authenticate() {
        console.log('authenticate');
        this.isAuthenticated = true;
    },

    signout() {
        console.log('signout');
        localStorage.clear();
    },

    getAuth(): boolean {
        var token = localStorage.getItem('token');
        if (token !== null) {
            return true;
        }
        else {
            return false;
        }
    }
};
export default Auth;