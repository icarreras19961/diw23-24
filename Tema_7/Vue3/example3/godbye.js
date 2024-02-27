export default {
  name: "godbye",
  template: `
    <div>
    godbye 
      <input type="button" value="send" @click="sendgodbye"/>
    </div>
  `,
  methods: {
    sendgodbye: function () {
      this.$emit("eduirado")
      // console.log("bye");
      this.$router.push("/bye");
      this.$router.push({ name: "/bye", params: { username } });

      // console.log(this.$route.params.message);
    },
  },
};
