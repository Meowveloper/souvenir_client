import axios from "axios";
import CustomerCard from '@/components/elements/ForCustomerListPage/CustomerCard/CustomerCard.vue';
import CustomerForm from "@/components/elements/ForOrderPage/CustomerForm/CustomerForm.vue";

export default {
    name: 'CustomerList',

    components: {
        CustomerCard,
        CustomerForm
    },

    data() {
        return {
            customers: {
                list: [],
                loading: false
            }
        }
    },


    //-----------------------------

    methods: {
        async getCustomerData() {
            this.customers.loading = true;
            await axios.get('http://127.0.0.1:8000/api/customer/listWithOrders').then((response) => {
                console.log(response.data);
                this.customers.list = response.data.customers;
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.customers.loading = false;
                console.log(this.preparedCustomerList);
            })
        }, 

        newCustomerCreated(newCustomer) {
            if (newCustomer) {
                window.location.reload();
            }
        }
    },

    //-------------------------------

    computed: {
        preparedCustomerList() {
            return this.customers.list.map((item) => {
                const { created_at, updated_at, ...rest } = item;
                return rest;
            }).sort((a, b) => b.customer_orders_count - a.customer_orders_count
            )
        }
    },



    //-----------------------------


    mounted() {
        this.getCustomerData();
    }
}