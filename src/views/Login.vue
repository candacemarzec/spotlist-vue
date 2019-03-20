<template>
  <div class="login"> 
    <div class="container">  
    
<!--     <div class="signin-page">
      <br><br><br>
      <div class="wrapper" style="margin-top: 50px">
        <div class="header">
          <h1>Log In</h1>
        </div>
        <form v-on:submit.prevent="submit()">
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-field">
            <input type="email" placeholder="Email">
          </div>
          <div class="form-field">
            <input type="password" placeholder="Password">
          </div>
          <div class="form-action">
            <input type="submit" class="btn-shadow btn-shadow-primary" value="Submit">
          </div>
        </form>
      </div>
    </div>  -->  




     
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Login">
      </form>



  </div>
  </div>
</template>



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
