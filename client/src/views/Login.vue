<template>
  <div class="login">
    <h4 class="text-light">
      <i class="fas fa-chalkboard"></i>Kanban
    </h4>
    <form v-if="loginForm" @submit.prevent="loginUser">
      <input type="email" v-model="creds.email" placeholder="email" />
      <input type="password" v-model="creds.password" placeholder="password" />
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name" />
      <input type="email" v-model="newUser.email" placeholder="email" />
      <input type="password" v-model="newUser.password" placeholder="password" />
      <button class="btn btn-primary" type="submit">Create Account</button>
    </form>
    <div class="action text-light" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
    <h2 class="text-light">Kanban is a project built in the Vue.js framework</h2>
    <h5
      class="m-2"
    >This project was constructed by Clayton Wyman and Christopher O'Berry utilizing Vue.js, Bootstrap, Javascript, CSS, HTML5, MongoDB, Node.js, Axios, ESM, and Mongoose.</h5>
    <p class="mb-4">Register or Login to start making boards!</p>
    <p
      class="fixed-bottom"
    >Constructed for Boise CodeWorks Full Stack Development Bootcamp, Late Summer 2019</p>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.action {
  cursor: pointer;
}
#login {
  background-color: rgb(116, 112, 170);
}
</style>