<template>
  <div class="signup">


    <div class="account-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="submit()">
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
                <button type="submit" class="btn-pill btn pill-lg button-modal">Create account</button>
              </div>
              <div class="form-bottom">
                Already have an account? <router-link v-bind:to="'/login'">Log in</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>




    </div>
</template>


<style>
#app,
.body {
  background-color: #d8e0e46b;
}

.button-modal {
  background-color: #442f69;
}
</style>

<script>
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
    submit: function() {
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
