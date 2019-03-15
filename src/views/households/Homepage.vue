<template>
  <div class="households-homepage">

    <h1>Spotlist</h1>  

    <h2>Household Name: {{ household.name }}</h2>
    


    <!-- List Actions   -->
    <div>
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
    </div>  



    <div v-for="list in household.lists">
      <h2>{{ list.store_name }}</h2>
      <p>Notes: {{ list.notes }}</p>



      <form v-on:submit.prevent="updateList(list)">
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
      </form>

      <button v-on:click="destroyList(list)">Delete List</button><br>  


      <div>
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
    </div>

  </div>
</template>


<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      household: {},
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
