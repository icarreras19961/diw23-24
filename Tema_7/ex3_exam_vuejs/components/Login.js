export default {
  name: "Login",
  props: ["succes"],
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  //props
  emits: ["checkCredentials"],
  methods: {
    // Here i just send the variable user with an emit to the index.html
    checkcredentials() {
      // console.log(this.user);
      this.$emit("checkCredentials", this.user);
    },
  },
  watch: {
    loginok(newValue, oldValue) {
      console.log(`loginok changed from ${oldValue} to ${newValue}`);
      //With this watcher you will know if the loginok "variable" has changed its value
    },
  },
  template: `<input type="text" value="username" v-model="user.username">
  <input type="password" value="password" v-model="user.password">
  <input type="button" value="Login" @click="checkcredentials"><div v-if="!succes">
  <h1 style="color: red;">Incorrect credentials</h1>
</div>`,
};
