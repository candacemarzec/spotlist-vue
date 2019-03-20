<template>
  <div class="users-profile">

<!-- Profile Info And Update/Destroy -->
    <div class="account-page">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb-item active">My Profile</li>
        </ol>

        <div class="account-wrapper">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="nav-item">
              <a class="nav-link active" href="account-profile.html" role="tab">{{ user.formatted.full_name }}</a>
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="profile">
              <div class="row profile-form">
                <div class="col-md-3">
                  <!-- <img src="../images/uifaces/10.jpg" class="avatar" />
                  <a href="#" class="btn-upload-avatar">
                    Upload new avatar
                  </a> -->
                </div>
                <div class="col-md-8">
                  <form v-on:submit.prevent="updateUser()">
                    <div class="form-group">
                      <label>First name</label>
                      <input type="text" class="form-control" v-model="user.first_name">
                    </div>
                    <div class="form-group">
                      <label>Last name</label>
                      <input type="text" class="form-control" v-model="user.last_name">
                    </div>
                    <div class="form-group">
                      <label>Email address</label>
                      <input type="email" class="form-control" v-model="user.email">
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="user.password">
                    </div>
                    <button type="submit" class="btn-shadow btn-shadow-dark">Update My Info</button><br>
                  </form>
                  <button class="btn-shadow btn-shadow-sm btn-shadow-danger float-right" v-on:click="destroyUser()">Delete My Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- User with Household -->
    <div v-if="user.household">
      <div class="card">
        <h5 class="card-header">
          My Household
        </h5>
        <div class="card-body">
          <p class="card-text">Household Name: {{ user.household.name }}</p>
          <p class="card-text">Household Members:</p>
          <button class="btn-shadow btn-shadow-sm btn-shadow-dark" data-toggle="modal" data-target="#householdUpdateModal" >Edit</button>
          <button class="btn-shadow btn-shadow-sm btn-shadow-danger float-right" v-on:click="destroyHousehold()">Delete</button>
          </div>
          <div class="card-footer text-muted">
          </div>
      </div> 
    </div> 


    <!-- Household Edit Modal -->
    <div class="modal fade" id="householdUpdateModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="updateHousehold()">
              <h1>
                Edit Household
              </h1>
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="household.name">
              </div>
              <div class="form-group">
                <label>Add Member</label>
                <input type="text" class="form-control" >
              </div>
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Update Household</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    


    <!-- User with household   -->
    <div v-if="user.household">
      <h2><router-link to="/household">My Household Page</router-link></h2> 
        <p>Household Name: {{ user.household.name }}</p>

      <div><br>
        <form v-on:submit.prevent="updateHousehold()">
            <h3>Edit Household</h3>
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
      </form><br>
      <h2><router-link to="/lists">My Lists</router-link></h2>
    </div>


   
    


     
    
  </div>
</template>


<script>
/* global $ */
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
        email: this.user.email,
        password: this.user.password
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
          $("#householdUpdateModal").modal("hide");
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
