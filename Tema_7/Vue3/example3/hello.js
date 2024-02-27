export default {
  name: "hello",
  template: `
    <div>
      Hello {{$route.params.message}}
      <input type="button" value="send" @click="sendhello"/>
    </div>
  `,methods: {
    sendhello:function () {
      this.$router.push("/")
      console.log(this.$route.params.message);
    }
  },
};
