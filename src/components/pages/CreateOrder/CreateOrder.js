import CustomerForm from "@/components/elements/ForOrderPage/CustomerForm/CustomerForm.vue";
import ProductForm from "@/components/elements/ForOrderPage/ProductForm/ProductForm.vue";
import PaymentTypeForm from "@/components/elements/ForOrderPage/PaymentTypeForm/PaymentTypeForm.vue";
import StatusPaidForm from "@/components/elements/ForOrderPage/StatusPaidForm/StatusPaidForm.vue";
import MessageBox from "@/components/elements/ForOrderPage/MessageBox/MessageBox.vue";



export default {
    name: "CreateOrder",
    components: {
        CustomerForm,
        ProductForm,
        PaymentTypeForm,
        StatusPaidForm,
        MessageBox
    },
    data() {
        return {
            appearMessageBox : false,

            orderRecord: {
                customer: {},
                products: [],
                paymentType: "",
                status: "pending",
                paid: "no",
                total: 0
            },

        };
    },

    methods: {
        getCustomer(id) {
            this.orderRecord.customer = id;

        },

        getProductsForOrder(products) {
            this.orderRecord.total = this.calculateTotal;
            this.orderRecord.products = products;
        },

        getPaymentType(paymentType) {
            this.orderRecord.paymentType = paymentType;
        },

        getStatus(status) {
            this.orderRecord.status = status;
        },

        getPaid(paid) {
            this.orderRecord.paid = paid;
        },

        toggleMessageBox() {
            this.appearMessageBox = !this.appearMessageBox;
        }
    },

    computed: {
        calculateTotal() {
            let result = 0;
            this.orderRecord.products.forEach(item => {
                result += (item.price * item.qty);
            });
            return result;
        }
    },
};