<template>
  <div class="households-homepage">

  <h1>Spotlist</h1>  

  <h2>Household Name: {{ household.name }}</h2>

    
    <button v-on:click="'/households/' + household.id + '/edit'">Edit</button><br>
  <!--   <button v-on:click="'/lists/' + list.id + '/edit'">Edit List</button><br> -->
    <button v-on:click="createList()">New List</button><br>
    
  <!-- <div>
    Display lists- loop?
  </div> -->


  </div>
</template>


<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      household: {},
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
        // users: this.household.users
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
    destroyhousehold: function() {
      axios.delete("/api/households/" + this.household.id).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/");
      });
    }
  }
};
</script>
