<template>
  <div class="products">
      <div class="container">
          <div class="intro h-100">
              <div class="row h-100 justify-content-center align-items-center">
                  <div class="col-md-6">
                      <h3>Overview Page</h3>
                      <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptatem distinctio voluptate iure, sapiente dolorem incidunt! Ipsa assumenda error quia enim reprehenderit ex officiis? Ad soluta iure excepturi ullam natus.
                      </p>
                  </div>
                  <div class="col-md-6">
                    <img src="/img/svg/products.svg" alt="" class="img-fluid">
                  </div>
              </div>
          </div>
    
    <hr>
    <h3>CRUD</h3>
    <div class="product-test">
      <div class="form-group">
        <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
      </div>
      <div class="form-group">
        <input type="text" placeholder="Price" v-model="product.price" class="form-control">
      </div>
      <div class="form-group">
        <button @click="saveData()" class="btn btn-primary">Save Data</button>
      </div>
      <hr>

      <h3>Products list</h3>
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Modify</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product">
              <td>{{product.data().name}}</td>
            <td>{{product.data().price}}</td>
            <td>
              <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
            </td>
          </tr>

        </tbody>
      </table>
      </div>
    </div>
    </div>

    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
              </div>
            <div class="form-group">
              <input type="text" placeholder="Price" v-model="product.price" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../main';
require("firebase/compat/firestore");
import $ from "jquery";


export default {
  name: 'Products',
  props: {
    msg: String
  },
  data(){
    return {
      products: [],
      product: {
         name: null,
         price: null
      },
      activeItem: null
    }
  },
  methods: {
    watcher(){
        db.collection("products").onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
            this.products.push(doc);
          });
        })
    },
    updateProduct(){
      db.collection("products").doc(this.activeItem).update(this.product)
      .then(() => {
        $('#edit').modal('hide');
        this.watcher();
        console.log("Document successfully updated");
      })
      .catch(function(error) {
        console.error("Error updating document", error);
      })
    },

    editProduct(product){
      $('#edit').modal('show');
      this.product = product.data();
      this.activeItem = product.id;
    },
    deleteProduct(doc){
      if(confirm("Are u sure?")){

        db.collection("products").doc(doc).delete().then(function() {
          console.log("Document succesfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      }else{
        alert("Couldn't delete")
      }
    },
    readData(){
      db.collection("products").get().then((querySnapshot) =>
    {
      // this.products = querySnapshot;
      querySnapshot.forEach((doc) => {

         this.products.push(doc);
    });
  });
},
    saveData(){
      db.collection("products").add(this.product)
      .then((docRef) => {
        console.log("Document:",docRef.id)
        this.readData();
      })
      .catch(function(error){
        console.error("Error: ", error);
      });
    },
      reset(){
      //  Object.assign(this.$data, this.$options.data.apply(this));
      }
  },
  created(){
  this.readData();
}
}
</script>

<style scoped lang="scss">

</style>
