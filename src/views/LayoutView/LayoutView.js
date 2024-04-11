import LogoutButton from '../../components/elements/LogoutButton/LogoutButton.vue';
import CreateOrder from '../../components/pages/CreateOrder/CreateOrder.vue';
import OrderList from '@/components/pages/OrderList/OrderList.vue';
import ProductList from '@/components/pages/ProductList/ProductList.vue';
import CustomerList from '@/components/pages/CustomerList/CustomerList.vue';
import ProfilePage from '@/components/pages/ProfilePage/ProfilePage.vue';

import { mapGetters } from 'vuex'; 

export default {
    name: 'LayoutView',
    components: {
        
        CreateOrder, 
        OrderList,
        LogoutButton, 
        ProductList, 
        CustomerList, 
        ProfilePage
    },
    //---------
    data() {
        return {
            user: {},
            
            currentPageComponent: 'ProfilePage', 

            customer: {
                id : ''
            }
        };
    },
    //-----------
    methods: {
        async funcLogout() {
            await localStorage.removeItem('auth');
            this.$router.push({ name: 'LoginView' });
        }, 
    },
    //-------------
    mounted() {
        document.title = "Souvenir";
        this.$store.dispatch('setHeaderHeight', this.$refs.mainHeader.offsetHeight);
        this.$store.dispatch('setStorageUser', JSON.parse(localStorage.getItem('user')));
    },
    //----------
    created() {
        this.user = this.storage_user;
    },
    //----------
    computed: {
        ...mapGetters(['storage_user'])
    },
};