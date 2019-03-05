<template>
  <div class="households-homepage">

  <h1>Spotlist</h1>  

  <h2>Household Name: {{ household.name }}</h2>

    
    <button v-on:click="'/households/' + household.id + '/edit'">Edit</button><br>
    
    
  <div v-for="list in household.lists">
    <h2>{{ list.store_name }}</h2>
    <p>Notes: {{ list.notes }}</p>
    <div v-for="item in list.items">
        <h2>{{ item.name }}</h2>
    </div>    
  </div>
  
    <button v-on:click="createList()">New List</button><br>
    <button v-on:click="'/lists/' + list.id + '/edit'">Edit List</button><br>
    <button v-on:click="destroyList()">Delete List</button><br>


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
    axios.get("/api/households/" + this.$route.params.id).then(response => {
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
        this.lists.push(response.data);
        this.newListNotes = "";
        this.newListStoreName = "";
      });
    },

    editList: function() {
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
