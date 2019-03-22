<template>
  <div class="households-homepage">

 
    <div class="career-post-header">    
      <section class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="display-3">
              {{ household.name }} Household
            </h1>
          </div>
        </div>
      </section>
    </div>




    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createListModal">
      Create A List
    </button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateListModal">
      Update List
    </button>
    <button class="btn-shadow btn-shadow-sm btn-shadow-danger" v-on:click="destroyList(list)">Delete List</button>
    <button type="button" class="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#updateItemModal">
      Edit Item
    </button>
    <button type="button" class="btn btn-primary btn-shadow-sm" data-toggle="modal" data-target="#createItemModal">
      Add Item
    </button>
    <button class="btn-shadow btn-shadow-sm btn-shadow-danger" v-on:click="destroyItem(item, list)">Delete Item</button>

    

  
  <div v-for="list in household.lists">
      <div class="card border-success mb-3 text-center">
          <div class="card-body col-md-6">
            <h4 class="card-title">{{ list.store_name }}</h4>
          </div>
        </div>
        <div v-for="item in list.items">
          <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                    <p>{{ item.name }}</p>
                  </a>
                </h5>
              </div>

              <div id="collapseOne" class="collapse show" role="tabpanel">
                <div class="card-body">
                  <p>{{ item.need_by_date }}</p>
                  <p>{{ item.coupon_url }}</p>
                  <img :src="item.image_url">
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                    Collapsible Group Item #2
                  </a>
                </h5>
              </div>
              <div id="collapseTwo" class="collapse">
                <div class="card-body">
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
 






   



<!-- New List Modal -->
    <div class="modal fade" id="createListModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="createList()">
               <h1>
                 New List
               </h1>
               <div class="form-group">
                 <label>Store Name</label>
                 <input type="text" class="form-control" v-model="newListStoreName">
               </div>
               <div class="form-group">
                 <label>Notes</label>
                 <textarea type="text" class="form-control" v-model="newListNotes"></textarea>
               </div>
               <div class="form-action">
                 <button type="submit" class="btn-shadow btn-shadow-dark">Add List</button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    <!--  Update List Modal -->
    <div class="modal fade" id="updateListModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="updateList(list)">
             <h1>
               Edit List
             </h1>
             <div class="form-group">
               <label>Store Name</label>
               <input type="text" class="form-control" v-model="list.store_name">
             </div>
             <div class="form-group">
               <label>Notes</label>
               <textarea type="text" class="form-control" v-model="list.notes"></textarea>
             </div>
             <div class="form-action">
               <button type="submit" class="btn-shadow btn-shadow-dark">Update</button>
             </div>
            </form>
          </div>
        </div>
      </div>
    </div> 
    



   <!--  Create Item Modal  -->
    <div class="modal fade" id="createItemModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="createItem(list)">
               <h1>
                 Add Item
               </h1>
               <div class="form-group">
                 <label>Name</label>
                 <input type="text" class="form-control" v-model="newItemName">
               </div>
               <div class="form-group">
                 <label>Coupon</label>
                 <input type="text" class="form-control" v-model="newItemCouponUrl">
               </div>
               <div class="form-group">
                 <label>Image</label>
                 <input type="text" class="form-control" v-model="newItemImageUrl">
               </div>
               <div class="form-group">
                 <label>Need by date</label>
                 <input type="text" class="form-control" v-model="newItemNeedByDate">
               </div>             
               <div class="form-action">
                 <button type="submit" class="btn-shadow btn-shadow-dark">Add Item to List</button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>  



      <!-- Update Item Modal --> 
      <div class="modal fade" id="updateItemModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <form class="ecommerce-sign-up-form" v-on:submit.prevent="updateItem(item)">
                 <h1>
                   Edit Item
                 </h1>
                 <div class="form-group">
                   <label>Name</label>
                   <input type="text" class="form-control" v-model="item.name">
                 </div>
                 <div class="form-group">
                   <label>Coupon</label>
                   <input type="text" class="form-control" v-model="item.coupon_url">
                 </div>
                 <div class="form-group">
                   <label>Image</label>
                   <input type="text" class="form-control" v-model="item.image_url">
                 </div>
                 <div class="form-group">
                   <label>Need by date</label>
                   <input type="text" class="form-control" v-model="item.need_by_date">
                 </div>             
                 <div class="form-action">
                   <button type="submit" class="btn-shadow btn-shadow-dark">Update Item</button>
                 </div>
              </form>
            </div>
          </div>
        </div>
      </div> 
        
          

    






    <!-- List Actions   -->
<!--     <div>
      <form v-on:submit.prevent="createList()">
        <h2>New List</h2>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Store Name: </label> 
          <input type="text" class="form-control" v-model="newListStoreName"><br>
          <label>Notes: </label>
          <textarea v-model="newListNotes"></textarea><br>
        </div>
        <input type="submit" value="Add List">
      </form>
    </div>   -->



  <!--   <div v-for="list in household.lists">
      <h2>{{ list.store_name }}</h2>
      <p>Notes: {{ list.notes }}</p> -->



<!--       <form v-on:submit.prevent="updateList(list)">
        <h2>Edit List</h2>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Store Name: </label>
          <input type="text" class="form-control" v-model="list.store_name"><br>
          <label>Notes: </label>
          <textarea class="form-control" v-model="list.notes"></textarea><br> 
          <input type="submit" value="Update List">        
        </div>
      </form> -->

        


<!--       <div>
        <form v-on:submit.prevent="createItem(list)">
          <h2>New Item</h2>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Name: </label>
            <input type="text" class="form-control" v-model="newItemName"><br>
            <label>Coupon: </label>
            <input type="text" class="form-control" v-model="newItemCouponUrl"><br>
            <label>Image: </label>
            <input type="text" class="form-control" v-model="newItemImageUrl"><br>
            <label>Need by: </label>
            <input type="text" class="form-control" v-model="newItemNeedByDate"><br>
            <input type="submit" value="Add New Item">
          </div> 
        </form>


        <div v-for="item in list.items">
          <p>{{ item.name }}</p>
          <p>{{ item.coupon_url }}</p>
          <p>{{ item.image_url }}</p>
          <p>{{ item.need_by_date }}</p>


        <div>
          <form v-on:submit.prevent="updateItem(item)">
            <h2>Edit Item</h2>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Name: </label>
              <input type="text" class="form-control" v-model="item.name"><br>
              <label>Coupon: </label>
              <input type="text" class="form-control" v-model="item.coupon_url"><br>
              <label>Image: </label> 
              <input type="text" class="form-control" v-model="item.image_url"><br> 
              <label>Need by: </label> 
              <input type="text" class="form-control" v-model="item.need_by_date"><br> 
              <input type="submit" value="Edit Item">
            </div> 
          </form> 
          <button v-on:click="destroyItem(item, list)">Delete Item</button><br> 
        </div>
        </div>


        
      </div>      
    </div> -->





  </div>
</template>


<style>
.career-post-header {
  min-height: 380px;
  position: relative;
  background-size: cover;
  background-position: center top;
  background-image: url(/images/unsplash/evie-calder-857249-unsplash.jpg);
}

/*.career-post-header {
  background-image: url("/images/unsplash/evie-calder-857249-unsplash.jpg");
}*/
</style>


<script>
/* global $ */
var axios = require("axios");

export default {
  data: function() {
    return {
      household: {},
      list: {},
      item: {},
      newListStoreName: "",
      newListNotes: "",
      newItemName: "",
      newItemCouponUrl: "",
      newItemImageUrl: "",
      newItemNeedByDate: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/household").then(response => {
      console.log(response.data);
      this.household = response.data;
    });
  },
  methods: {
    submit: function() {
      var householdParams = {
        name: this.household.name
      };

      axios
        .patch("/api/households/" + this.household.id, householdParams)
        .then(response => {
          console.log("Success!", response.data);
          this.$router.push("/households/" + this.household.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    // List Methods
    createList: function() {
      var listParams = {
        store_name: this.newListStoreName,
        notes: this.newListNotes
      };
      axios
        .post("/api/lists", listParams)
        .then(response => {
          console.log("Success!", response.data);
          $("#createListModal").modal("hide");
          this.household.lists.push(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    updateList: function(list) {
      console.log(list);
      var listParams = {
        store_name: list.store_name,
        notes: list.notes
      };
      axios
        .patch("/api/lists/" + list.id, listParams)
        .then(response => {
          console.log("Success!", response.data);
          $("#updateListModal").modal("hide");
          this.$router.push("/household");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    destroyList: function(list) {
      axios.delete("/api/lists/" + list.id).then(response => {
        console.log("Success!", response.data);
        var index = this.household.lists.indexOf(list);
        this.household.lists.splice(index, 1);
      });
    },

    // Item Methods
    createItem: function(list) {
      var itemParams = {
        name: this.newItemName,
        coupon_url: this.newItemCouponUrl,
        image_url: this.newItemImageUrl,
        need_by_date: this.newItemNeedByDate,
        list_id: list.id
      };
      axios
        .post("/api/items", itemParams)
        .then(response => {
          console.log("Success!", response.data);
          $("#createItemModal").modal("hide");
          list.items.push(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    updateItem: function(item) {
      var itemParams = {
        name: item.name,
        coupon_url: item.coupon_url,
        image_url: item.image_url,
        need_by_date: item.need_by_date
      };
      axios
        .patch("/api/items/" + item.id, itemParams)
        .then(response => {
          console.log("Success!", response.data);
          $("#updateItemModal").modal("hide");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    destroyItem: function(item, list) {
      axios.delete("/api/items/" + item.id).then(response => {
        console.log("Success!", response.data);
        var index = list.items.indexOf(item);
        list.items.splice(index, 1);
      });
    }
  }
};
</script>
