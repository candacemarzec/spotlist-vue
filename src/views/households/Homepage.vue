<template>
  <div class="households-homepage">

  <h1>Spotlist</h1>  

  <h2>Household Name: {{ household.name }}</h2>
    
  
  <div v-for="list in household.lists">
    <h2>{{ list.store_name }}</h2>
    <p>Notes: {{ list.notes }}</p>
    <div v-for="item in list.items">
        <h2>{{ item.name }}</h2>
    </div>    
  </div>


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
        <textarea v-model="newListNotes"></textarea>
      </div>
      <button v-bind:to="'/lists/new'">Create</button><br>
    </form>
  </div>


  <div v-for="list in household.lists">
    <form v-on:submit.prevent="updateList()">
        <h2>Edit List</h2>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Store Name: </label> 
          <input type="text" class="form-control" v-model="list.store_name"><br>
          <label>Notes: </label>
          <textarea v-model="list.notes"></textarea> 
        </div>
        <button v-bind:to="'/lists/' + list.id + '/edit'">Update</button><br>
      </form>
      <button v-on:click="destroyList()">Delete List</button><br>
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
      axios.post("/api/lists", listParams).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/households/" + this.household.id);
      });
    },

    updateList: function(list) {
      var listParams = {
        store_name: this.list.store_name,
        notes: this.list.notes
      };
      axios
        .patch("/api/lists/" + this.list.id, listParams)
        .then(response => {
          console.log("Success!", response.data);
          this.$router.push("/lists/" + this.list.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    destroyList: function() {
      axios.delete("/api/lists/" + this.list.id).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/");
      });
    }

    // Item Methods
  }
};
</script>
