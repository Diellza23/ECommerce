import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart:[]
    },
    mutations:{
        addToCart(state, item){

            let found = state.cart.find(product => product.productId == item.productId );
            if(found){
                found.productQuantity++;
            }
            else{
                state.cart.push(item)
            }
        }
    }

})