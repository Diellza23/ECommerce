<template>
    <section>
        <h1> Hello {{user.data && user.data.email }}, these are the available</h1>
    </section>
</template>

<script>
import apiRequest from '../utility/apiRequest'
import {mapGetters} from "vuex";

export default {
    created(){
        apiRequest.getVueShopList();
    },
    data(){
        return {}
    },
    computed: {
        ...mapGetters({
            user: "user"
        })
    }

}
</script>