<template>
  <div class="login">  


    <div class="account-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="submit()">
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
                <button type="submit" class="btn-pill btn pill-lg button-modal">Log in</button>
              </div>
              <div class="form-bottom">
                <!-- <router-link v-bind:="'sign-up.html'" class="btn-forgot-password">Forgot your password?</router-link > -->
                Don't have an account yet? <router-link v-bind:to="'/users/new'">Sign up</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>




  </div>
</template>

<style>
.button-modal {
  background-color: #442f69;
}
</style>



<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
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
