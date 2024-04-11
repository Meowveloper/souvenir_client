

export default {
    name: 'StatusPaidForm',
    
    data () {
        return {
            status: 'pending',

            paid: 'no'
        }
    },

    // watch: {
    //     status (newValue, oldValue) {
    //         if (newValue !== oldValue) {
    //             this.$emit('status', this.newValue);
                
    //         } 
    //     },

    //     paid(newValue, oldValue) {
    //         if (newValue !== oldValue) {
    //             this.$emit('paid', this.newValue);
    //         }
    //     }
    // },
}