<template>
  <div class="users-profile">

<!-- Profile Info And Update/Destroy -->
    <div class="account-page">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-if="user.household">
            <a href="/household">Home</a>
          </li>  
          <li class="breadcrumb-item homepage" v-if="!user.household"> 
            <a href="/lists">Home</a> 
          </li>
          <li class="breadcrumb-item active">My Profile</li>
        </ol>

        <div class="account-wrapper">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="nav-item">
              <a class="nav-link active" href="account-profile.html" role="tab">{{ user.first_name}} {{ user.last_name }}</a>
            </li>
          </ul>



                    <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="profile">
              <div class="row profile-form">
                <!-- <div class="col-md-3">
                  <img src="../images/uifaces/10.jpg" class="avatar" />
                  <a href="#" class="btn-upload-avatar">
                    Upload new avatar
                  </a>
                </div> -->
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>



        <!-- User with Household -->

        <div v-if="user.household">
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
                        <div class="form-group">
                          <label>Password</label>
                          <input type="password" class="form-control" v-model="user.password">
                        </div>
                        <button type="submit" class="btn-pill button-main">Update My Info</button>
                        <button class="btn-pill btn-pill-sm float-right button-delete" v-on:click="destroyUser()">Delete My Profile</button>
                      </form>
                  </section>
                </div>


                  <!-- Household Card -->
                  <div class="col-md-6">
                    <div id="checkout-cart-summary" class="clearfix float-right">
                     <div class="line-items">
                       <div class="item clearfix">
                         <div class="details">
                           <div class="name" >
                            <h3>My Household Info</h3> 
                           </div>
                         </div>
                         <i data-toggle="modal" data-target="#householdUpdateModal" class="icon-edit float-right"></i>
                       </div>
                     </div>

                      <div class="line-items">
                        <div class="item clearfix">
                          <div class="details">
                            <span class="name">
                              <h6>Household Name:</h6>
                            </span>
                          </div>
                          <div class="price float-right">
                            <b>{{ user.household.name }}</b>
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
                                  <!-- Member Names -->
                              </div>
                          </div>
                        </div>
                      
                    </div>
                  </div>

             </div>
           </div>
         </div>
        </div>  


         <!-- User without Household -->
          <div v-if="!user.household">
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
                          <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" v-model="user.password">
                          </div>
                          <button type="submit" class="btn-pill button-main">Update My Info</button>
                          <button class="btn-pill btn-pill-sm float-right button-delete" v-on:click="destroyUser()">Delete My Profile</button>
                        </form>
                    </section>
                  </div>


                    <!-- Create Household Card -->
                    <div class="col-md-6">
                      <div id="checkout-cart-summary" class="clearfix float-right">
                       <div class="line-items">
                         <div class="item clearfix">
                           <div class="details">
                             <div class="name" >
                              <h3>Create A Household</h3>
                              <button type="submit" class="btn-pill btn-pill-sm button-main" data-toggle="modal" data-target="#householdCreateModal">Create A Household</button>  
                             </div>
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
                <input type="text" class="form-control" >
              </div>
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Update Household</button>
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
.profile-form {
  background-color: #ffffff;
  font-weight: bold;
}
/*Homepage link */
.account-page .breadcrumb-item a {
  color: #4b0082;
}

/*Padding above cards*/
.account-page .tab-content {
  padding: 0px 10px;
}

/*Household Card*/

.clearfix {
  background-color: #e3efea;
}

/*Title*/
#checkout-cart-summary .line-items .item .details {
  float: center;
  margin-left: 15px;
  margin-top: 12px;
  max-width: 400px;
}

#checkout-cart-summary .clearfix h3 {
  font-size: 22px;
  padding: 15px 30px;
  border-bottom: none;
}

/*Items*/
#checkout-cart-summary .line-items .item .price {
  margin-top: 12px;
  font-weight: 500;
  font-size: 20px;
  color: #4b0082;
}

/*buttons*/
.button-main {
  background-color: #4682b4;
}

.button-modal {
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
      household: {},
      newHouseholdName: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log(response.data);
      this.user = response.data;
      this.household = response.data.household;
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
