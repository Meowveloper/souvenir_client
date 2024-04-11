import axios from "axios";

export default {
    name: 'ProfilePage',

    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            userForUpdate: {
                data: {},
                loading: false,
                errors: {
                    emptyName: false,
                    emptyEmail: false
                }
            },

            changePassword: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '', 
                wrongOldPassword: false,
                shortNewPassword: false,
                weakNewPassword: false,
                wrongConfirmPassword: false,
                loading: false, 
                showForm: false

            },

            showUpdateButton: false, 
            showChangePasswordButton: false
        }
    },

    //-------------------------


    methods: {
        watchUpdate() {

            this.checkNameAndEmail();

            this.showUpdateButton = false;
            for (const updateKey in this.userForUpdate.data) {

                if (this.showUpdateButton) break;
                for (const originalKey in this.user) {
                    if (updateKey === originalKey && this.userForUpdate.data[updateKey] !== this.user[originalKey]) {

                        this.showUpdateButton = true;
                        break;


                    }
                }
            }

        },

        checkNameAndEmail() {
            if (this.userForUpdate.data.name === '' || this.userForUpdate.data.name === null) {
                this.userForUpdate.errors.emptyName = true;
            }

            if (this.userForUpdate.data.email === '' || this.userForUpdate.data.email === null) {
                this.userForUpdate.errors.emptyEmail = true;
            }
        },


        async updateUser() {
            this.userForUpdate.loading = true;
            await axios.post('http://127.0.0.1:8000/api/authenticate/update', this.userForUpdate.data).then((response) => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                localStorage.setItem('user', JSON.stringify(this.userForUpdate.data));
                this.userForUpdate.loading = false;
                window.location.reload();
            })
        }, 


        async checkChangePasswordValidation() {
            this.changePassword.weakNewPassword = await this.strongPassword ? false : true;
            this.changePassword.shortNewPassword = await this.changePassword.newPassword.length < 8 ? true : false;

            this.changePassword.wrongConfirmPassword = await this.changePassword.newPassword === this.changePassword.confirmPassword ? false : true;

            if (this.changePassword.weakNewPassword || this.changePassword.shortNewPassword || this.changePassword.wrongConfirmPassword) {
                this.showChangePasswordButton = false;
            } else {
                this.showChangePasswordButton = true;
            }
        }, 

        async updatePassword() {
            this.changePassword.wrongOldPassword = false;
            this.changePassword.loading = true;
            await axios.post('http://127.0.0.1:8000/api/authenticate/changePassword', {
                id: this.user.id,
                oldPassword: this.changePassword.oldPassword, 
                newPassword: this.changePassword.newPassword, 
            }).then(response => {
                if (response.data.status == 'failed') {
                    this.changePassword.wrongOldPassword = true;
                }

                if (response.data.status == 'success') {
                    localStorage.clear();
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.changePassword.loading = false;
            })
        }
    },

    //----------------------
    computed: {
        strongPassword() {
            const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/; // Ensure at least 8 characters
            return regex.test(this.changePassword.newPassword);
        }
    },

    //----------------------

    mounted() {
        this.userForUpdate.data = { ...this.user };
    },
}