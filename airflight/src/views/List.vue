<template>
    <section>

        <h1 > Hello {{email}}, these are the available</h1>


        <div class="row justify-content-center">
            <div class="col-4 col-md-2 p-5 p-md-4 justify-content-center">
                <table>
                    <tr>
                        <th>Property type</th>
                        <th>Rooms</th>
                        <th>Sqr meters</th>
                        <th>Price</th>
                    </tr>
                    <tr v-for="entry in vueshopList" :key="entry.id">
                        <td>
                            {{entry.type}}
                        </td>
                        <td>
                            {{entry.rooms}}
                        </td>
                        <td>
                            {{entry.squareMeters}}
                        </td>
                        <td>
                            {{entry.price}}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
import apiRequest from '../utility/apiRequest'
// import {mapGetters} from "vuex";
import firebase from 'firebase/compat/app'

export default {
    /*created(){
       this.fetchVueshop();
       
    },*/
    data(){
        return {
            email: "null"
        }
    },
    created(){
      var user = firebase.auth().currentUser;
      this.email = user.email;
    },
    computed: {
        // ...mapGetters({
        //     user: "user",
        // })
    }, 
    
    methods:{
        async fetchVueshop(){
            const result = await apiRequest.getVueShopList()
            this.$store.dispatch("fetchVueShop", result)
        },

    }

}
</script>