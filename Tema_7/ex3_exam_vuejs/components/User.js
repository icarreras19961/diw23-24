export default {
  name: "User",
  props: ["loged_user"],
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$router.push("/");
    },
  },
  template: `<div>
  <h1>{{loged_user.login}}</h1>
  <p>First Name: {{loged_user.firstName}}</p>
  <p>Last Name: {{loged_user.lastName}}</p>
  <p>Email: {{loged_user.email}}</p>
  <button @click="logOut">Back to menu</button>
</div>`,
};
