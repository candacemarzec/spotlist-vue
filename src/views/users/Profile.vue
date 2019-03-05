<template>
  <div class="users-profile">

    <h1>My Profile</h1>  

    <h2>{{ user.formatted.full_name }}</h2>
    <p>First Name: {{ user.first_name }}</p>
    <p>Last Name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <!-- <p>Password: {{ user.Password }}</p> -->

    <button v-bind:to="'/users/' + user.id + '/edit'">Edit</button><br>
    <button v-on:click="destroyUser()">Delete Account</button><br>
    
      
    <div v-if="user.household">
      <h2><router-link v-bind:to="'/households/' + user.household.id">My Household</router-link><br></h2>  
        <p>Household Name: {{ user.household.name }}</p>
    </div>

        <!-- Household Create -->
      <div v-if="!user.household">
        <form v-on:submit.prevent="createHousehold()">
          <h1>New Household</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Name:</label> 
            <input type="text" class="form-control" v-model="name">
          </div>
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
      </div>

          <button v-on:click="'/households/' + household.id + '/edit'">Edit</button><br>
          <button v-on:click="destroyHousehold()">Delete</button><br>
    <!-- show other members here -->


      
    </div>
</template>


<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    submit: function() {
      var userParams = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
        // password: this.user.password
      };

      axios
        .patch("/api/users/" + this.user.id, userParams)
        .then(response => {
          console.log("Success!", response.data);
          this.$router.push("/users/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    destroyUser: function() {
      axios.delete("/api/users/" + this.user.id).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/");
      });
    },
    // Household Methods

    createHousehold: function() {
      var householdParams = {
        name: this.newHouseholdName
      };
      axios.post("/api/households", householdParams).then(response => {
        this.household = response.data;
        this.newHouseholdName = "";
      });
    }

    // editHousehold: function() {
    //   var householdParams = {
    //     name: this.household.name
    //   };

    //   axios
    //     .patch("/api/households/" + this.household.id, householdParams)
    //     .then(response => {
    //       console.log("Success!", response.data);
    //       this.$router.push("/households/" + this.household.id);
    //     })
    //     .catch(error => {
    //       this.errors = error.response.data.errors;
    //       this.status = error.response.status;
    //     });
    // },

    // destroyHousehold: function() {
    //   axios.delete("/api/households/" + this.household.id).then(response => {
    //     console.log("Success!", response.data);
    //     this.$router.push("/");
    //   });
    // }
  }
};
</script>
