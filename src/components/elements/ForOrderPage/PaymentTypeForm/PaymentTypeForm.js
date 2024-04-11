import axios from "axios";

export default {
    //http://localhost:8000/api/paymentType/list
    name: 'PaymentTypeForm',
    data() {
        return {

            appearCreateForm: false,
            paymentTypes: {
                list: [],
                loading: false,
                selectedId: '1'
            },
            newPaymentType: {
                name: '',
                loading: false,
                errors: {
                    emptyName: false
                }
            }

        }
    },
    //--------------------------------------

    methods: {
        toggle() {
            this.appearCreateForm = !this.appearCreateForm;
        },

        createPaymentType() {
            this.newPaymentType.errors.emptyName = this.newPaymentType.name === '' ? true : false;

            if (this.newPaymentType.errors.emptyName) return;
            this.newPaymentType.loading = true;
            axios.post('http://localhost:8000/api/paymentType/create', {
                name: this.newPaymentType.name
            }).then((response) => {
                this.paymentTypes.list = response.data.paymentTypes;
                this.paymentTypes.selectedId = response.data.selectedId;
                this.newPaymentType.name = '';
                this.appearCreateForm = false;
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.newPaymentType.loading = false;
            });
        },

        async getPaymentTypeData() {
            this.paymentTypes.loading = true;
            await axios.get('http://localhost:8000/api/paymentType/list').then((response) => {
                this.paymentTypes.list = response.data.paymentTypes;
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.paymentTypes.loading = false;
            });
            setTimeout(() => {
                this.$emit('payment-type-id', {
                    id: this.paymentTypes.selectedId,
                    name: this.getPaymentName
                });
            }, 0)
        }
    },
    //-----------------------------------------------
    computed: {
        getPaymentName() {
            const item = this.paymentTypes.list.find((item) => {
                return this.paymentTypes.selectedId == item.id
            });

            if (item) {
                return item.name;
            } else {
                return 'not found'
            }
        }
    },
    //---------------------------------
    mounted() {
        this.getPaymentTypeData();
    },
    //-------------------------------

    watch: {
        'paymentTypes.selectedId'(id, oldValue) {
            if (id !== oldValue) {

                const name = this.getPaymentName;

                this.$emit('payment-type-id', { id, name });
            }
        }
    },
}