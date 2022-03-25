<template>
  <div class="login">
    <!-- <el-button @click="$store.commit('login')">Login</el-button> -->
    <div class="logo-wrapper">
      <img class="logo-img" src="../../public/assets/images/aspis_logo.png" />
    </div>
    <el-card class="card">
      <el-form>
        <el-form-item label="email">
          <el-input clearable v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input
            clearable
            type="password"
            v-model="formData.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        :icon="isLoading ? 'el-icon-loading' : ''"
        @click="login"
        plain
        type="success"
        >{{ isLoading ? "Please wait" : "Log in" }}</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase.js";

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      auth,
      isLoading: false,
    };
  },

  methods: {
    login() {
      // let auth = getAuth(app);
      this.isLoading = true;
      signInWithEmailAndPassword(
        this.auth,
        this.formData.email,
        this.formData.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log({ user });
          this.$store.commit("login", { email: user.email, id: user.uid });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          let customErrorMessage = "";
          console.log(errorCode, errorMessage);

          switch (errorCode) {
            case "auth/user-not-found":
              customErrorMessage = "User not found";
              break;
            case "auth/wrong-password":
              customErrorMessage = "Wrong password";
              break;
          }

          this.$notify.error({
            title: "Error",
            message: customErrorMessage,
          });

          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.logo-img {
  width: 200px;
  height: 200px;
}

.card {
  max-width: 400px;
  margin: auto;
}

@media (max-width: 330px) {
  .logo-img {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 450px) {
  .card {
    margin: 0px 15px;
  }
}
@media (min-width: 600px) {
  .login {
    margin-top: 10em;
  }
}
</style>
