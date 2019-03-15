<template>
  <div class="users-profile">

    <h1>My Profile</h1>  

    <h2>{{ user.formatted.full_name }}</h2>
    <p>First Name: {{ user.first_name }}</p>
    <p>Last Name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <!-- <p>Password: {{ user.Password }}</p> -->
      
      <div>
        <form v-on:submit.prevent="updateUser()">
            <h2>Edit Profile</h2>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Name: </label> 
              <input type="text" class="form-control" v-model="user.first_name">
              <input type="text" class="form-control" v-model="user.last_name">
              <input type="text" class="form-control" v-model="user.email">
             <!--  <input type="text" class="form-control" v-model="user.password"> -->
            </div>
            <button v-bind:to="'/users/' + user.id + '/edit'">Update</button><br>
          </form>
      </div>
      <button v-on:click="destroyUser()">Delete Account</button><br>
    


    

    <!-- User with household   -->
    <div v-if="user.household">
      <h2><router-link to="/household">My Household</router-link></h2> 
        <p>Household Name: {{ user.household.name }}</p>

      <div>
        <form v-on:submit.prevent="updateHousehold()">
            <h2>Edit Household</h2>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Name: </label> 
              <input type="text" class="form-control" v-model="household.name">
            </div>
            <button v-bind:to="'/households/' + household.id + '/edit'">Update</button><br>
            <!-- show other members here -->
          </form>
      </div>
     <button v-on:click="destroyHousehold()">Delete</button><br>
    </div>
    

    <!-- User without household -->
    <div v-if="!user.household">
      <form v-on:submit.prevent="createHousehold()">
        <h1>New Household</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name: </label> 
          <input type="text" class="form-control" v-model="newHouseholdName">
        </div>
        <input type="submit" class="btn btn-primary" value="Create">
      </form>
      <h2><router-link to="/lists">My Lists</router-link></h2>
    </div>


   
    


      
    </div>
</template>


<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      user: {},
      household: {},
      newHouseholdName: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function() {
      var userParams = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
        // password: this.user.password
      };

      axios
        .patch("/api/users/me", userParams)
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
      axios.delete("/api/users/me").then(response => {
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
    },

    updateHousehold: function() {
      var householdParams = {
        name: this.household.name
      };

      axios
        .patch("/api/households/" + this.household.id, householdParams)
        .then(response => {
          console.log("Success!", response.data);
          this.$router.push("/users/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    destroyHousehold: function() {
      axios.delete("/api/households/" + this.household.id).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/users/" + this.user.id);
      });
    }
  }
};
</script>
