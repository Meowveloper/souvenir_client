import axios from "axios";

export default {

    name: 'CustomerForm',

    props: {
        isOrderPage: {
            type: Boolean,
            default: true
        },
    },


    data() {
        return {
            customerList: [],
            newCustomerLoading: false,
            oldCustomerLoading: false,

            appearNewCustomerForm: false,



            orderForm: {
                selectedId: ''
            },


            newCustomer: {
                name: '',
                phone: '',
                address: '',
                fbLink: '',
                nameRepeat: false,
                phoneRepeat: false,
                invalidPhNum: false,
                emptyName: false,
                emptyPhone: false,
                emptyAddress: false,
            }
        }
    },
    //-------
    methods: {

        createCustomer() {

            // if (this.checkRepeats()) return;
            // if (this.isInvalidPhoneNumber(this.newCustomer.phone)) return;
            // if (this.checkEmptyFields()) return;

            if (this.checkRepeats() || this.isInvalidPhoneNumber(this.newCustomer.phone) || this.checkEmptyFields()) return;

            this.newCustomerLoading = true;
            const formData = new FormData();
            formData.append('name', this.newCustomer.name);
            formData.append('phone', this.newCustomer.phone);
            formData.append('address', this.newCustomer.address);
            formData.append('fbLink', this.newCustomer.fbLink);

            axios.post('http://localhost:8000/api/customer/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {

                this.customerList = response.data.customers;
                this.orderForm.selectedId = response.data.autoSelectId;
                this.$emit('newCustomerCreated', true);

            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.newCustomerLoading = false;
                this.appearNewCustomerForm = false;
            })
        },

        checkRepeats() {
            this.newCustomer.nameRepeat = false;
            this.newCustomer.phoneRepeat = false;

            console.log('name check');
            for (let i = 0; i < this.customerList.length; i++) {
                if (this.customerList[i].name.split(" ").join('') == this.newCustomer.name.split(" ").join('')) {
                    this.newCustomer.nameRepeat = true;
                    break;
                }
            }
            console.log(this.newCustomer.nameRepeat);
            console.log('phone check')

            for (let i = 0; i < this.customerList.length; i++) {
                if (this.customerList[i].phone.split(" ").join('') == this.newCustomer.phone.split(" ").join('')) {
                    this.newCustomer.phoneRepeat = true;
                    break;
                }
            }

            console.log(this.newCustomer.phoneRepeat);

            if (this.newCustomer.nameRepeat || this.newCustomer.phoneRepeat) {
                return true;
            } else {
                return false;
            }
        },

        isInvalidPhoneNumber(phoneNumber) {
            this.newCustomer.invalidPhNum = false;
            phoneNumber = phoneNumber.split(' ').join('');
            for (let i = 0; i < phoneNumber.length; i++) {
                if (isNaN(phoneNumber[i]) && phoneNumber[i] !== '+') {
                    this.newCustomer.invalidPhNum = true;
                    break;
                }
            }

            if (this.newCustomer.invalidPhNum) {
                return true;
            } else {
                return false;
            }
        },

        checkEmptyFields() {
            this.newCustomer.emptyName = this.newCustomer.emptyPhone = this.newCustomer.emptyAddress = false;
            if (this.newCustomer.name === '' || this.newCustomer.name === null || this.newCustomer.name === undefined) {
                this.newCustomer.emptyName = true;
            }

            if (this.newCustomer.phone === '' || this.newCustomer.phone === null || this.newCustomer.phone === undefined) {
                this.newCustomer.emptyPhone = true;
            }

            if (this.newCustomer.address === '' || this.newCustomer.address === null || this.newCustomer.address === undefined) {
                this.newCustomer.emptyAddress = true;
            }

            if (this.newCustomer.emptyName || this.newCustomer.emptyPhone || this.newCustomer.emptyAddress) {
                return true;
            } else {
                return false;
            }
        }
    },
    //---------
    mounted() {
        this.oldCustomerLoading = true;
        axios.get('http://localhost:8000/api/customer/list')
            .then((response) => {

                this.customerList = response.data.customers;

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.oldCustomerLoading = false;
            }
            );


    },

    //---------------
    watch: {
        'orderForm.selectedId'(id, oldValue) {
            if (id !== oldValue) {

                const name = this.customerList.find((item) => {
                    return id == item.id;
                }).name;

                this.$emit('customer-id', { id, name: name });
            }
        }
    },

    computed: {

    },
}