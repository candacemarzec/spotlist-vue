<template>
  <div class="households-homepage">

 <!-- Image -->
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
    </div><br>


<!-- Create List Button  -->
    <div class="tickets container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p class="m-md-0">
        </p>
        <button href="#" class="btn-pill btn-pill-lg create-button" data-toggle="modal" data-target="#createListModal">
          Make A List
        </button>
        <p class="m-0">
        </p>
      </div>
    </div>
 

    <!-- Card -->
    <div class="event-tickets">
      <div class="container">
        <div class="row">
          <div v-for="list in household.lists" class="col-md-6">
            <div class="ticket">
              <p class="ticket-title">
                <i data-toggle="modal" data-target="#updateListModal" v-on:click="setCurrentList(list)" class="fa fa-pencil float-right"></i><br>
                {{ list.store_name }} 
              </p>
              <div class="text-center pb-4 mb-4">
                <a href="#" class="btn-pill btn-pill-sm create-button" data-toggle="modal" data-target="#createItemModal" v-on:click="setCurrentList(list)">
                  Add Item
                </a>
              </div>
              <hr>


        <!-- Accordion -->
        
              <div id="accordion">
                <div v-for="item in list.items" class="card">
                  <div class="card-header accordion" :id="'heading' + item.id" >
                    <h5 class="mb-0">
                      <div class="form-check-inline float-right">
                        <label class="form-check-label">
                           <input type="radio" class="form-check-input" v-on:click="destroyItem(item, list)"/>
                        </label>
                      </div>
                      <a class="collapsed" data-toggle="collapse" data-parent="#accordion" :href="'#collapse' + item.id">
                          {{ item.name }}  
                      </a>
                    </h5>
                  </div>

                  <div :id="'collapse' + item.id" class="collapse" role="tabpanel">
                    <div class="card-body">
                      <button type="button" class="btn-pill btn-pill-sm edit-button float-right" data-toggle="modal" data-target="#updateItemModal" v-on:click="setCurrentItem(item)">
                        Edit
                      </button> 
                      <div v-if="item.need_by_date">
                        {{ calendarDate(item.need_by_date) }}
                      </div>
                        <p>{{ item.coupon_url }}</p>
                      <div class="col-md-6 mt-3 pt-2">
                        <div class="view z-depth-1">
                          <img :src="item.image_url" alt="" class="img-fluid">
                        </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </div><br>
              
              <div class="card-footer note-footer">
                <h4>Notes:</h4>
                <textarea type="text" class= "form-control card-footer textarea" v-model="list.notes"></textarea>
              </div><br>
                <button class="btn-pill btn-pill-sm delete-button float-right" v-on:click="destroyList(list)">Delete List</button><br>

            </div>
          </div>
        </div>
      </div>
    </div>
    


   

<!-- New List Modal -->
<!--  <button type="button" class="btn-pill btn-pill-primary" data-toggle="modal" data-target="#createListModal">
   Create A List
 </button> -->

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
    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateListModal">
      Edit List
    </button> -->

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
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="updateList(currentList)">
             <h1>
               Edit {{ currentList.store_name }} List
             </h1>
             <div class="form-group">
               <label>Store Name</label>
               <input type="text" class="form-control" v-model="currentList.store_name">
             </div>
             <div class="form-group">
               <label>Notes</label>
               <textarea type="text" class="form-control" v-model="currentList.notes"></textarea>
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
    <!-- <button type="button" class="btn btn-primary btn-shadow-sm" data-toggle="modal" data-target="#createItemModal">
      Add Item
    </button> -->

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
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="createItem(currentList)">
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
                 <input type="date" class="form-control" v-model="newItemNeedByDate">
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
    <!-- <button type="button" class="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#updateItemModal">
      Edit Item
    </button> -->

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
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="updateItem(currentItem)">
               <h1>
                 Edit {{ currentItem.name }}
               </h1>
               <div class="form-group">
                 <label>Name</label>
                 <input type="text" class="form-control" v-model="currentItem.name">
               </div>
               <div class="form-group">
                 <label>Coupon</label>
                 <input type="text" class="form-control" v-model="currentItem.coupon_url">
               </div>
               <div class="form-group">
                 <label>Image</label>
                 <input type="text" class="form-control" v-model="currentItem.image_url">
               </div>
               <div class="form-group">
                 <label>Need by date</label>
                 <input type="date" class="form-control" v-model="currentItem.need_by_date">
               </div>             
               <div class="form-action">
                 <button type="submit" class="btn-shadow btn-shadow-dark">Update Item</button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   

    </div>     
</template>


<style>
.career-post-header {
  min-height: 350px;
  position: relative;
  background-size: cover;
  background-position: center top;
  background-image: url(/images/unsplash/evie-calder-857249-unsplash.jpg);
}

.event-tickets .ticket {
  background: #ffffff;
  border-style: solid;
  border-color: #d3d3d3;
  border-width: thin;
  border-radius: 10px;
}

.event-tickets .ticket-title {
  color: #626567;
}

.tickets-container {
  background: #white;
}

/* Style the buttons that are used to open and close the accordion panel */
.accordion {
  background-color: #ffffff;
  color: #ffffff;
  cursor: pointer;
  padding: 0px;
  width: 100%;
  text-align: left;
  text-indent: 25px;
  border: none;
  outline: none;
  transition: 0.4s;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active-panel,
.accordion:hover {
  background-color: #f5f5f5;
}

/* Style the accordion panel. Note: hidden by default */
.panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
}

.collapsed {
  color: #626567;
}

.note-footer {
  background: #ffffff;
  color: #626567;
}

.textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background-color: #ffffff;
  resize: none;
}
/*buttons*/
.create-button {
  background-color: #4682b4;
}

.edit-button {
  background-color: #66cdaa;
}

.delete-button {
  background-color: #556b2f;
}
</style>


<script>
/* global $ */
var axios = require("axios");
import moment from "moment";

export default {
  data: function() {
    return {
      household: {},
      list: {},
      item: {},
      currentList: {},
      currentItem: {},
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
    setCurrentList: function(list) {
      this.currentList = list;
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
    setCurrentItem: function(item) {
      this.currentItem = item;
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
    },
    calendarDate: function(date) {
      return moment(date).format("MM/DD/YYYY");
    }
  }
};
</script>
