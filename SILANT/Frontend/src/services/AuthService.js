import $api from "../http/index_http.js";

class AuthService {
    // '/login'       '/login/'
    static async login(username, password) {
        return $api.post('/login/',{
            username:username,
            password:password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        // .then(function (response) {
        //     console.log('response - AuthService.js:', response);
        //   })
        //   .catch(function (error) {
        //     console.log('error - AuthService.js:', error);
        //   });
    }
    
    static async logout() {
        console.log('logout');
    }
}

export default AuthService;