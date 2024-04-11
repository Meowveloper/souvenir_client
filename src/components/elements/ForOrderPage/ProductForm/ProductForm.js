import axios from "axios";

export default {
    name: 'ProductForm',

    props: {
        isOrderPage: {
            type: Boolean,
            default: true
        },
    },

    data() {
        return {

            appearProductForm: false,
            oldProducts: {
                list: [],
                loading: false,
                selectedId: '',
                selectedProductQty: 0
            },

            categories: {
                list: [],
                loading: false
            },

            newProduct: {
                name: '',
                price: '',
                image: '',
                description: '',
                categoryId: '',
                instock: '',
                errors: {
                    emptyName: false,
                    emptyPrice: false,
                    repeatName: false,
                    emptyImage: false,
                    invalidImage: false, 
                    emptyInstock : false
                },
                loading: false
            },

            newCategory: {
                name: '',
                description: '',
                loading: false,
                errors: {
                    emptyName: false
                }
            },

            productsForOrder: {
                list: [],
            }
        }
    },
    //-------------------------------------------------------

    methods: {
        createProduct() {
            
            if (this.checkNewProductValidation) return;
            this.newProduct.loading = true;
            const formData = new FormData();
            formData.append('name', this.newProduct.name);
            formData.append('price', this.newProduct.price);
            formData.append('image', this.newProduct.image);
            formData.append('description', this.newProduct.description);
            formData.append('categoryId', this.newProduct.categoryId);
            formData.append('instock', this.newProduct.instock);

            axios.post('http://localhost:8000/api/product/create', formData)
                .then((response) => {
                    console.log(response.data.status);
                    this.oldProducts.list = response.data.products;
                    this.oldProducts.selectedId = response.data.autoSelectId;
                    this.appearProductForm = false;
                    this.clearNewProductForm();
                    this.$emit('need-reload', !this.isOrderPage);
                }).catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.newProduct.loading = false;
                });
        },

        createCategory() {
            this.newCategory.errors.emptyName = false;
            this.newCategory.loading = true;
            this.newCategory.errors.emptyName = this.newCategory.name == '' ? true : false;
            if (this.newCategory.errors.emptyName) return;
            const data = {
                'name': this.newCategory.name,
                'description': this.newCategory.description
            };

            axios.post('http://localhost:8000/api/category/create', data)
                .then((response) => {
                    this.categories.list = response.data.categories;
                    this.newProduct.categoryId = response.data.autoSelectId;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.newCategory.loading = false;
                });


        },

        addProductToOrder() {
            const theProduct = this.oldProducts.list.find(product => product.id === this.oldProducts.selectedId);

            if (theProduct) {
                if (this.productsForOrder.list.length === 0) {
                    this.productsForOrder.list.push({
                        ...theProduct,
                        qty: this.oldProducts.selectedProductQty
                    });
                } else {
                    let sameProductExist = false;
                    let index = 0;
                    for (const [i, item] of this.productsForOrder.list.entries()) {
                        if (theProduct.id === item.id) {
                            sameProductExist = true;
                            index = i;
                            break;
                        }
                    }
                    if (sameProductExist) {
                        this.productsForOrder.list[index].qty = this.productsForOrder.list[index].qty + this.oldProducts.selectedProductQty
                    } else {
                        this.productsForOrder.list.push({
                            ...theProduct,
                            qty: this.oldProducts.selectedProductQty
                        });
                    }
                }
                this.$emit('products', this.productsForOrder.list);

                this.oldProducts.selectedId = '';
                this.oldProducts.selectedProductQty = 0;
            }


        },



        clearNewProductForm() {

            this.newProduct.name = '';
            this.newProduct.price = '';
            this.newProduct.description = '';
            this.newProduct.categoryId = '';
            this.newProduct.instock = '';
        },

        getImage(e) {
            const allowTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            this.newProduct.errors.invalidImage = false;
            for (const file of e.target.files) {
                if (!allowTypes.includes(file.type)) {
                    this.newProduct.errors.invalidImage = true;
                    break;
                }
            }
            this.newProduct.image = e.target.files[0];

        }


    },

    mounted() {
        this.oldProducts.loading = true;
        axios.get('http://localhost:8000/api/product/list')
            .then((response) => {
                this.oldProducts.list = response.data.products;
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.oldProducts.loading = false;
            })

        this.categories.loading = true;
        axios.get('http://localhost:8000/api/category/list')
            .then((response) => {
                this.categories.list = response.data.categories;
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.categories.loading = false;
            })
    },
    //----------------------------------------------------
    watch: {
        'oldProducts.selectedId'(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.oldProducts.selectedProductQty = 1;
            }
        },

        'productsForOrder.list.length': {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log('changed')
                    this.$emit('products', this.productsForOrder.list);
                }
            }

        },

        // 'productsForOrder.list': {
        //     handler(newVal, oldVal) {
        //         // Iterate through each object in the new array
        //         for (const [index, newObject] of newVal.entries()) {
        //             const oldObject = oldVal[index];

        //             // Check if the qty property changed
        //             if (newObject.qty !== oldObject?.qty) {
        //                 // Handle the change of qty
        //                 console.log(`Quantity changed for object at index ${index}:`, newObject, oldObject);

        //                 this.$emit('get-products', this.productsForOrder.list);

        //                 // You can perform other actions here, like updating your UI or making API calls
        //             }
        //         }
        //     },
        //     deep: true
        // }

    },

    //---------------------
    computed: {
        checkNewProductValidation() {

            this.newProduct.errors.emptyName = (this.newProduct.name === '' || this.newProduct.name === null || this.newProduct.name === undefined) ? true : false;
            this.newProduct.errors.emptyPrice = (this.newProduct.price === '' || this.newProduct.price === null || this.newProduct.price === undefined) ? true : false;

            this.newProduct.errors.emptyImage = (this.newProduct.image === '' || this.newProduct.image === null || this.newProduct.image === undefined) ? true : false;

            this.newProduct.errors.emptyInstock = (this.newProduct.instock === '' || this.newProduct.instock === null || this.newProduct.instock === undefined) ? true : false;

            const repeatProduct = this.oldProducts.list.find((item) => {
                return item.name.split(' ').join('') === this.newProduct.name.split(' ').join('')
            });

            this.newProduct.errors.repeatName = repeatProduct ? true : false;


            if (
                this.newProduct.errors.emptyName ||
                this.newProduct.errors.emptyPrice ||
                this.newProduct.errors.emptyImage ||
                this.newProduct.errors.repeatName ||
                this.newProduct.errors.invalidImage ||
                this.newProduct.errors.emptyInstock
            ) {
                return true;
            } else {
                return false;
            }
        }
    },


}