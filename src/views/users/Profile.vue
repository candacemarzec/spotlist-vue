<template>
  <div class="users-profile">

<!-- Profile Info And Update/Destroy -->
    <div class="account-page">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-if="user.household">
            <a href="/household">Home</a>
          </li>  
          <li class="breadcrumb-item" v-if="!user.household"> 
            <a href="/lists">Home</a> 
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
      <div class="row">
        <div class="card col-md text-center w-75">
          <h5 class="card-header">
            My Household
          </h5>
          <div class="card-body">
            <p class="card-text">Household Name: {{ user.household.name }}</p>
            <p class="card-text">Household Members:</p>
            <button class="btn-shadow btn-shadow-sm btn-shadow-dark" data-toggle="modal" data-target="#householdUpdateModal" >Edit</button>
            
          </div>
            <!-- <div class="card-footer text-muted">
            </div> -->
        </div> 
      </div>
    </div> 


    <!-- User without Household -->
    <div v-if="!user.household">
      <div class="row">
      <div class="card col-md text-center w-75">
        <h5 class="card-header">
        </h5>
        <div class="card-body">
          <button type="submit" class="btn-shadow btn-shadow-dark" data-toggle="modal" data-target="#householdCreateModal">Create A Household</button> </div>
          <!-- <div class="card-footer text-muted">
          </div> -->
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
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="updateHousehold()">
              <h1>
                Edit Household
              </h1>
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="user.household.name">
              </div>
              <div class="form-group">
                <label>Add Member(s)</label>
                <input type="text" class="form-control" >
              </div>
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Update Household</button>
              </div>
            </form>
            <button class="btn-shadow btn-shadow-sm btn-shadow-danger float-right" v-on:click="destroyHousehold()">Delete Household</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Household Create Modal -->
    <div class="modal fade" id="householdCreateModal" tabindex="-1" role="dialog">
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
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="createHousehold()">
              <h1>
                Create Household
              </h1>
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="newHouseholdName">
              </div>
              <div class="form-group">
                <label>Add Member(s)</label>
                <input type="text" class="form-control" >
              </div>
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>


<style>
.card {
  border: 0;
  background-color: transparent;
}
</style>


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
          this.user = response.data;
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
        $("#householdCreateModal").modal("hide");
        this.$router.push("/users/" + this.user.id);
      });
    },

    updateHousehold: function() {
      var householdParams = {
        name: this.user.household.name
      };

      axios
        .patch("/api/households/" + this.household.id, householdParams)
        .then(response => {
          console.log("Success!", response.data);
          this.user.household = response.data;
          $("#householdUpdateModal").modal("hide");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    destroyHousehold: function() {
      axios.delete("/api/households/" + this.household.id).then(response => {
        console.log("Success!", response.data);
        $("#householdUpdateModal").modal("hide");
        this.$router.push("/users/" + this.user.id);
      });
    }
  }
};
</script>
