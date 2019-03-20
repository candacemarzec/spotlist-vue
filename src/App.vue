<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light fixed-top" role="navigation">
      <div class="container no-override">
        <a class="navbar-brand" href="/">Spotlist</a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbar-collapse">
          <ul class="navbar-nav">

            <li class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                Blogs
                <i class="ion-chevron-down"></i>
              </a>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-item" href="blog.html">Blog list</a>
                <a class="dropdown-item" href="blog-3-cols.html">Blog columns</a>
                <a class="dropdown-item" href="blog-grid.html">Blog grid</a>
                <a class="dropdown-item" href="blog-sidebar.html">Blog sidebar</a>
                <a class="dropdown-item" href="blog-masonry.html">Blog masonry</a>
                <a class="dropdown-item" href="blog-timeline.html">Blog timeline</a>
                <a class="dropdown-item" href="blog-post.html">Single blog post</a>
                <a class="dropdown-item" href="blog-post-alt.html">Single blog post 2</a>
                <a class="dropdown-item" href="blog-post-3.html">Single blog post 3</a>
              </div>
            </li>


            <li class="nav-item" v-if="isLoggedIn()">
              <a class="nav-link nav-link--rounded" href="/logout">Logout</a>
            </li>

            <li class="nav-item" v-if="!isLoggedIn()" data-toggle="modal" data-target="#loginModal">
              <a class="nav-link">Login</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn()" data-toggle="modal" data-target="#signupModal">
              <a class="nav-link nav-link--rounded">Signup</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <div class="pt-75">
      <router-view/>
    </div>


    <!-- Footer -->
    <footer class="footer footer--light" id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="title">
              Spotlist
            </div>
            <ul class="menu">
              <li>
                <a href="/">Home Page</a>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
          
          </div>
          <div class="col-md-4 newsletter">
            <div class="title">
              Get awesome updates
            </div>
            <p>
              Enter your email address for news and product launches in the Awesome Space.
            </p>
          </div>
        </div>
        <div class="bottom">

        </div>
      </div>
    </footer>




    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="account-page">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <ul>
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                    <form class="ecommerce-sign-up-form" v-on:submit.prevent="login()">
                      <h1>
                        Log in to your account
                      </h1>
                      <div class="form-group">
                        <label>Email address</label>
                        <input type="email" class="form-control" v-model="email">
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="password">
                      </div>
                      <div class="checkbox">
                        <label>
                          <input type="checkbox"> Remember me
                        </label>
                      </div>
                      <div class="form-action">
                        <button type="submit" class="btn-shadow btn-shadow-dark">Sign in</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Signup Modal -->
    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="signup()">
              <h1>
                Create your account
              </h1>
              <div class="form-group">
                <label>First name</label>
                <input type="text" class="form-control" v-model="first_name">
              </div>
              <div class="form-group">
                <label>Last name</label>
                <input type="text" class="form-control" v-model="last_name">
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="passwordConfirmation">
              </div>
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Create account</button>
              </div>
              <div class="form-bottom">
                Already have an account? <a href="/login">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style>
.pt-75 {
  padding-top: 75px;
}
</style>


<script>
/* global $ */
import axios from "axios";
export default {
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    login: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          console.log(response.data);
          $("#loginModal").modal("hide");
          this.$router.push("/users/me");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    signup: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          $("#signupModal").modal("hide");
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          // this.errors = ["Invalid email or password."];
          // this.email = "";
          // this.password = "";
        });
    }
  }
};
</script>
