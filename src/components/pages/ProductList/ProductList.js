import axios from "axios";
import ProductCard from '@/components/elements/ForProductListPage/ProductCard/ProductCard.vue';
import ProductForm from '@/components/elements/ForOrderPage/ProductForm/ProductForm.vue';

export default {
    //http://localhost:8000/api/product/listWithCategories
    name: 'ProductList',

    components: {
        ProductCard,
        ProductForm
    },

    data() {
        return {

            testing: false,
            products: {
                list: [],
                loading: false
            },

            categories: {
                list: []
            }
        }
    },
    //-----------------------

    methods: {
        async getProductListWithCategories() {
            this.products.loading = true;
            await axios.get('http://localhost:8000/api/product/listWithCategories').then((response) => {
                this.products.list = response.data.products;
                this.categories.list = response.data.categories;
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.products.loading = false;
            })
        },

        reLoad(boo) {
            if (boo) {
                window.location.reload();
            }
        }
    },

    //-------------------------

    mounted() {
        this.getProductListWithCategories();
    },

    //--------------------------

    computed: {
        // productsForUI() {
        //     return this.products.list.map(obj => ({
        //         ...obj, // Spread the existing properties
        //         ...Object.entries(obj).reduce((acc, [key, value]) => ({
        //             ...acc,
        //             [key]: { data: value, disabled: true } // Wrap each value in a new object
        //         }), {})
        //     }));
        // }
    },
}