import { mapGetters } from "vuex";
import axios from "axios";
export default {
    name: 'OrderDetails',
    props: {
        allData: {
            type: Object,

        },

    },

    data () {
        return {
            updateData: {
                status: '', 
                paid: '', 
                loading: false
            }
        }
    },

    methods: {
        closePage() {
            this.$emit('close-page', false);
        }, 

        async updateOrder() {

            //http://localhost:8000/api/order/update
            this.updateData.loading = true;
            if (confirm(`Are you sure you want to update this order?`)) {
                await axios.post('http://localhost:8000/api/order/update', {
                    orderId: this.allData.id,
                    status: this.updateData.status, 
                    paid: this.updateData.paid, 
                }).then((response) => {
                    console.log(response.data.status);
                    this.$emit('reload', false);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    this.updateData.loading = false;
                });
            } else {
                return;
            }
            
            
            
        }
    },

    computed: {
        ...mapGetters({ headerHeight: 'headerHeight' }),

        showUpdateButton() {
            return !(this.updateData.status === '' && this.updateData.paid === '') 
        }
    },

    mounted() {
        console.log(this.allData);
    }

}