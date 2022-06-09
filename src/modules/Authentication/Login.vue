<template>
  <div>
    <Login_Page @login-handler="loginHandler" />
  </div>
</template>

<script>
import Login_Page from "./LoginContent.vue";
import router from "../../router";
import auth from "../../gql/auth.gql";

export default {
  name: "Login",
  components: {
    Login_Page,
  },
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    loginHandler(data) {
      this.$apollo.mutate({
        mutation: auth,
        variables: data,
        update: (cache, { data }) => {
          console.log(data);
          if (!data.tokenAuth.errors) {
            localStorage.setItem("token", data.tokenAuth.token);
            if (data.tokenAuth.user.isStaff) {
              router.push("/home");
            } else if (!data.tokenAuth.user.isStaff) {
              router.push("/students");
            } else {
              router.push("/admin_page");
            }
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
          } else {
            let errors = [];
            for (let e of data.tokenAuth.errors.nonFieldErrors) {
              errors.push(e);
            }
            this.errors = errors;
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "warning",
              title: "Credential didn't match!",
            });
          }
        },
      });
    },
  },
};
</script>
<style scoped>
.no-uppercase {
  text-transform: unset !important;
}
</style>
