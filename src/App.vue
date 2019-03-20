<template>
  <div id="app">

  <!--Navbar -->
  <nav class="navbar navbar-dark navbar-expand-lg fixed-top" role="navigation">
    <button class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse">
      <span class="navbar-toggler-icon"></span>
    </button>

    <a class="navbar-brand" href="/">Spotlist</a>

    <div class="collapse navbar-collapse justify-content-end" id="navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="isLoggedIn()">
          <a class="nav-link nav-link--rounded" href="/logout">Logout</a>
        </li>
        <div v-else>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
              Start Listing
              <i class="ion-chevron-down"></i>
            </a>
            <div class="dropdown-menu" role="menu">
              <a class="dropdown-item" data-toggle="modal" data-target="#exampleModal">Login</a>
              <a class="dropdown-item" href="/users/new">Create Account</a>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </nav>



  <div class="wrapper">
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


  </div>
</template>

<style>
</style>


<script>
import axios from "axios";
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    submit: function() {
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
          this.$router.push("/users/me");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
