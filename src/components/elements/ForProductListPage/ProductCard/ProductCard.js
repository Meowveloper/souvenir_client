import axios from "axios";

export default {
    name: 'ProductCard',

    props: {
        propsProduct: {
            type: Object,

        },
    },

    

    data() {
        return {

            deleted: false,
            deleteLoading: false,
            product: {},
            productForUpdate: {
                data: {},
                image: '',
                loading: false
            },
            showUpdate: false,
        }
    },

    //---------------------------

    methods: {
        //http://localhost:8000/api/product/update
        async funcUpdateProduct() {
            this.productForUpdate.loading = true;
            const formData = new FormData();
            formData.append('image', this.productForUpdate.image);
            formData.append('id', this.productForUpdate.data.id);
            formData.append('name', this.productForUpdate.data.name);
            formData.append('price', this.productForUpdate.data.price);
            formData.append('categoryId', this.productForUpdate.data.category_id);
            formData.append('instock', this.productForUpdate.data.instock);


            await axios.post('http://localhost:8000/api/product/update', formData).then((response) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.productForUpdate.loading = false;
            })
        }, 

        emitDelete() {
            this.deleteLoading = true;
            axios.post('http://localhost:8000/api/product/delete', {
                id : this.propsProduct.id
            }).then(response => {
                console.log(response.data.status);
                //window.location.reload();  
            }).catch(err => {
                
                console.log(err)
            }).finally(() => {
                this.deleteLoading = false;
                this.deleted = true;
            }) 
        }
    },

    //---------------------------

    computed: {
        instockClassList() {
            return [
                'fw-bolder',
                'fs-5',
                this.product.instock <= 3 ? 'text-danger' : '',
                3 < this.product.instock < 8 ? 'text-warning' : '',
                this.product.instock >= 8 ? 'text-success' : ''
            ]
        }, 


        isValidate() {
            if (
                this.productForUpdate.data.name == '' ||
                this.productForUpdate.data.price == '' ||
                this.productForUpdate.data.instock == ''
            ) {
                return false;
            } else {
                return true;
            }  
            
        }, 
        
    },

    //-------------------------------------

    mounted() {
        this.product = this.propsProduct;
        this.productForUpdate.data = { ...this.product };
    }
}