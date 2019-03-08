<template>
  <div class="lists-homepage">

    <h1>Spotlist</h1>  

    <h2>My Lists</h2>
      
    
    <div v-for="list in lists">
      <h2>Store: {{ list.store_name }}</h2>
      <p>Notes: {{ list.notes }}</p>
      <!-- <div v-for="item in list.items">
          <h2>{{ item.name }}</h2>
      </div>  -->   
    </div>


  </div>
</template>


<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      lists: [],
      newListStoreName: "",
      newListNotes: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/lists").then(response => {
      console.log(response.data);
      this.lists = response.data;
    });
  },
  methods: {
    // List Methods
    createList: function() {
      var listParams = {
        store_name: this.newListStoreName,
        notes: this.newListNotes
      };
      axios.post("/api/lists", listParams).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/lists/" + this.list.id);
        // this.lists.push(response.data);
        // this.newListNotes = "";
        // this.newListStoreName = "";
      });
    },

    updateList: function() {
      var listParams = {
        store_name: this.list.store_name,
        notes: this.list.notes
      };
      axios
        .patch("/api/lists/" + this.list.id, listParams)
        .then(response => {
          console.log("Success!", response.data);
          this.$router.push("/lists/" + this.list.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    destroyList: function() {
      axios.delete("/api/lists/" + this.list.id).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/");
      });
    }

    // Item Methods
  }
};
</script>
