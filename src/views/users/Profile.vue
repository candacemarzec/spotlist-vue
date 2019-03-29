<template>
  <div class="users-profile">

<!-- Profile Info And Update/Destroy -->
    <div class="account-page">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-if="user.household">
            <router-link v-bind:to="'/household'">Home</router-link>
          </li>  
          <li class="breadcrumb-item homepage" v-if="!user.household"> 
            <a href="/lists">Home</a> 
          </li>
          <li class="breadcrumb-item active">My Profile</li>
        </ol>

        <div class="account-wrapper">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="nav-item">
              <div class="text" role="tab"><h2>{{ user.first_name}} {{ user.last_name }}</h2></div>
            </li>
          </ul>



                    <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="profile">
              <div class="row profile-form">
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>



        <div>
          <div id="checkout">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <section>
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
                        <!-- <div class="form-group">
                          <label>Password</label>
                          <input type="password" class="form-control" v-model="user.password">
                        </div> -->
                        <button type="submit" class="btn-pill button-main">Update My Info</button>
                        <button class="btn-pill btn-pill-sm float-right button-delete" v-on:click="destroyUser()">Delete My Profile</button>
                      </form>
                  </section>
                </div>


                  <!-- User with Household Card-->
                  <div class="col-md-6"  v-if="user.household">
                    <div id="checkout-cart-summary" class="clearfix float-right">
                     <div class="line-items">
                       <div class="item clearfix">
                         <div class="details">
                           <div class="name" >
                            <h3>My Household Info</h3> 
                           </div>
                         </div>
                         <i class="icon-edit float-right" data-toggle="modal" data-target="#householdUpdateModal" v-on:click="updateHousehold()"></i>
                       </div>
                     </div>

                      <div class="line-items">
                        <div class="item clearfix">
                          <div class="details">
                            <span class="name">
                              <h6>Household Name</h6>
                              <div class="price float-center">
                                <h6><b>{{ user.household.name }}</b></h6>
                              </div>
                            </span>
                          </div>
                          
                        </div>
                      </div> 
                        <div class="line-items">
                          <div class="item clearfix">
                              <div class="details">
                                <span class="name">
                                  <h6>Household Members</h6>
                                </span>
                              </div>
                              <div class="price float-right">
                                 <h6 v-for="userFullName in user.household.members">
                                   <li>{{ userFullName }}</li>
                                 </h6>
                              </div>
                          </div>
                        </div>
                      
                    </div>
                  </div>


                  <!-- User without Household Card -->
                  <div class="col-md-6" v-else>
                    <div id="checkout-cart-summary" class="clearfix">
                     <div class="line-items">
                       <div class="item clearfix">
                         <div class="details">
                           <div class="name" >
                            Have anyone else you share list making with? Click below to have a shared list page with other members of Spotlist.
                           </div><br>
                           <button type="submit" class="btn-pill btn-pill-sm button-main float-right" data-toggle="modal" data-target="#householdCreateModal">Get Started</button>
                         </div>
                         
                       </div>
                     </div>
                      
                    </div>
                  </div>

              </div>
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
                <input v-if="user.household" type="text" class="form-control" v-model="user.household.name">
              </div>
              <div class="form-group">
                <label>Add Member(s)</label>
                <input v-model="updateMemberEmail" type="email" class="form-control">
                 <small class="form-text text-muted">Please enter the new member's email</small>
              </div>
              <div class="form-action">
                <button type="submit" class="btn-pill btn pill-lg button-modal">Update Household</button>
              </div>
            </form>
            <button class="btn-shadow btn-shadow-sm button-delete float-right" v-on:click="destroyHousehold()">Delete Household</button>
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
                <input v-model="newMemberEmail" type="email" class="form-control form-text text-muted">
                 <small class="form-text text-muted">Please enter the new member's email</small>
              </div>
              <div class="form-action">
                <button type="submit" class="btn-pill btn pill-lg button-modal">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>


<style scoped>
.profile-form {
  background-color: #ffffff;
  font-weight: bold;
}
/*Homepage link */
.account-page .breadcrumb-item a {
  color: #800080;
}

/*Padding above cards*/
.account-page .tab-content {
  padding: 0px 10px;
}

/*Household Card*/
.clearfix {
  background-color: #d8e0e46b;
  word-wrap: break-word;
}

/*Title*/
#checkout-cart-summary .line-items .item .details {
  float: left;
  margin-left: 5px;
  margin-top: 8px;
  max-width: 360px;
}

#checkout-cart-summary .clearfix h3 {
  font-size: 22px;
  padding: 15px 30px;
  border-bottom: none;
}

/*Items*/
#checkout-cart-summary .line-items .item .price {
  margin-top: 10px;
  font-weight: 500;
  font-size: 20px;
  word-wrap: break-word;
  color: #442f69;
}

/*buttons*/
.button-main {
  background-color: #4682b4;
}

.button-modal {
  background-color: #442f69;
}

.button-edit-item {
  background-color: #66cdaa;
}

.button-delete {
  background-color: #5f9ea0;
}
</style>


<script>
/* global $ */
var axios = require("axios");

export default {
  data: function() {
    return {
      user: {},
      newHouseholdName: "",
      updateMemberEmail: "",
      newMemberEmail: "",
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
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("jwt");
        this.$router.push("/");
      });
    },

    // Household Methods
    createHousehold: function() {
      var householdParams = {
        name: this.newHouseholdName
      };
      if (this.newMemberEmail) {
        householdParams.new_member_email = this.newMemberEmail;
      }
      axios.post("/api/households", householdParams).then(response => {
        this.user.household = response.data;
        this.newHouseholdName = "";
        $("#householdCreateModal").modal("hide");
      });
    },

    updateHousehold: function() {
      var householdParams = {
        name: this.user.household.name
      };
      if (this.updateMemberEmail) {
        householdParams.update_member_email = this.updateMemberEmail;
      }
      axios
        .patch("/api/households/" + this.user.household.id, householdParams)
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
      axios.delete("/api/households/" + this.user.household.id).then(response => {
        console.log("Success!", response.data);
        this.user.household = "";
        $("#householdUpdateModal").modal("hide");
      });
    }
  }
};
</script>
