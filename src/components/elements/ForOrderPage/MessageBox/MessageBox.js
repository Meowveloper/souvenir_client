import axios from "axios";
import html2pdf from '../../../../../node_modules/html2pdf.js/dist/html2pdf';
import html2canvas from '../../../../../node_modules/html2canvas/dist/html2canvas';

export default {
    name: 'MessageBox',
    props: {
        orderRecord: {
            type: Object,
        },
    },
    data() {
        return {
            orderCreateLoading: false,
            togglePdf: false,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            currentDate: ''
        }
    },

    methods: {
        async recordOrder() {
            //http://localhost:8000/api/paymentType/list
            this.orderCreateLoading = true;
            await axios.post('http://localhost:8000/api/order/create', this.orderRecord).then((response) => {
                console.log(response.data);
                this.currentDate = this.myanmarDate;
            }).catch((err) => { console.log(err) }).finally(() => {
                this.orderCreateLoading = false;
                this.togglePdf = true;
            })
        },

        downloadPdf() {
            var opt = {
                margin: 1,
                filename: `Order by ${this.orderRecord.customer.name}`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(this.$refs.forPdf).set(opt).save();
        }
    },

    mounted() {
        console.log(this.orderRecord);
        console.log(this.checkOrderValidation)
        console.log(this.myanmarDate);
    },

    computed: {

        checkOrderValidation() {

            if (
                (this.orderRecord.customer.name == '' || this.orderRecord.customer.name === null || this.orderRecord.customer.name === undefined) ||
                (this.orderRecord.customer.id == '' || this.orderRecord.customer.id === null || this.orderRecord.customer.id === undefined) ||
                this.orderRecord.products.length === 0

            ) {
                console.log('false')
                return false;
            } else {
                console.log('true')
                return true;
            }
        },
        classesForStatus() {
            return [
                'fw-bold',
                'capitals',
                this.orderRecord.status == 'pending' ? 'text-warning' : '',
                this.orderRecord.status == 'delivered' ? 'text-success' : '',
                this.orderRecord.status == 'reject' ? 'text-danger' : ''

            ]
        },
        classesForPaid() {
            return [
                'fw-bold',
                'capitals',
                this.orderRecord.paid == 'yes' ? 'text-success' : '',
                this.orderRecord.paid == 'no' ? 'text-danger' : ''

            ]
        },
        myanmarDate() {
            const current = new Date();
            return `${current.getDate()}-${this.months[current.getMonth()]}-${current.getFullYear()}`; // '12-January-2024'
        }
    },


}