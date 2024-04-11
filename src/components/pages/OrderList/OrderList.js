import axios from "axios";
import moment from "moment";
import OrderDetails from '@/components/elements/ForOrderListPage/OrderDetails/OrderDetails.vue';
import { mapGetters } from "vuex";

export default {
    name: 'OrderList',
    components: {
        OrderDetails
    },
    data() {
        return {

            showDetailsPage: false,
            orders: {
                loading: false,
                list: [],
            },

            orderProducts: {
                list: [],
            },

            dataForOrderDetailsPage: {

            }
        }
    },

    methods: {
        async getOrderData() {
            this.orders.loading = true;
            //http://localhost:8000/api/order/list
            await axios.get('http://localhost:8000/api/order/list').then((response) => {
                this.orders.list = response.data.orders;
                this.orderProducts.list = response.data.orderProducts;

            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.orders.list = this.orders.list.map((item) => {

                    const timeStamp = moment(item.created_at);
                    const forHowLong = new Date(Date.parse(item.created_at));
                    const timeDifferent = new Date().getTime() - forHowLong.getTime();
                    return {
                        ...item,

                        created_at: timeStamp.format("DD-MMMM-YYYY"),

                        howLong: `${Math.floor(timeDifferent / (1000 * 60 * 60 * 24))} day ${Math.ceil((timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours`,

                    }

                });

                this.orders.loading = false;
            });


        },
        //---------
        async generateDetails(order) {

            this.dataForOrderDetailsPage = await {
                ...order,
                orderProducts: this.orderProducts.list.filter((item) => {
                    return item.order_id == order.id;
                })
            };

            this.showDetailsPage = true;
            console.log(this.dataForOrderDetailsPage);

        }, 

        closeDetailsPage(boo) {
            this.showDetailsPage = boo;
        }, 

        closeDetailsAndReload(boo) {
            this.showDetailsPage = boo;
            this.getOrderData();
        }
    },

    computed: {
        ...mapGetters({ headerHeight: 'headerHeight' }),
        unpaids() {
            return this.orders.list.filter((item) => {
                return item.paid == 'no'
            });
        },

        paids() {
            return this.orders.list.filter((item) => {
                return item.paid == 'yes'
            });
        },

        
    },

    mounted() {
        this.getOrderData();
        document.title = 'Order Lists'
    }
}