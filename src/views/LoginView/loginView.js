import axios from 'axios';


export default {
    name: "LoginView",

    data() {
        return {
            email: '',
            password: '',
            loadingStatus: false,
            loginErrors: {
                noUser: false,
                wrongPassword: false
            }
        }
    },
    //--------------

    methods: {
        async funcLogin(event) {
            event.preventDefault();
            this.loadingStatus = true;
            await axios.post('http://localhost:8000/api/authenticate/login', {
                email: this.email,
                password: this.password
            }).then((response) => {
                const loginStatus = response.data.loginStatus;

                console.log(loginStatus);

                if (loginStatus === null) {
                    this.loginErrors.noUser = true;
                    
                } else if (loginStatus === false) {
                    this.loginErrors.wrongPassword = true;
                    this.loginErrors.noUser = false;
                    
                } else if (loginStatus === true) {

                    
                    
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    this.$router.push('/souvenir');
                    
                }

                this.loadingStatus = false;

            }).catch((err) => {
                console.log(err);
            });
        }
    }, 

    //---------------
    mounted () {
        document.title = 'Login';
    }

};