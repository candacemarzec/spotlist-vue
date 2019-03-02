<template>
  <div class="users-profile">

    <h1>My Profile</h1>  

    <h2>{{ user.formatted.full_name }}</h2>
    <p>First Name: {{ user.first_name }}</p>
    <p>Last Name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <!-- <p>Password: {{ user.Password }}</p> -->

    <button v-on:click="'/users/' + user.id + '/edit'">Edit</button><br>
    <button v-on:click="destroyUser()">Delete Account</button><br>
    <button v-on:click="createHousehold()">Create a Household</button><br>
      
    <div v-if="user.household">
      <h1>My Household</h1>  
      <p>Household Name: {{ user.household.name }}</p>
      <button v-on:click="'/households/' + household.id + '/edit'">Edit</button><br>
      <button v-on:click="destroyHousehold()">Delete</button><br>
    <!-- show other members here -->



    </div>
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
    }
  }
};
</script>
