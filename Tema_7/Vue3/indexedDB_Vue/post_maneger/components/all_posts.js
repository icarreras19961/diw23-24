import post from "./post.js";
export default {
  name: "all_posts", 
  props: ["posts"],
  // data() {
  //   return {
  //     posts: JSON.parse(localStorage.getItem("posts")),
  //   };
  // },
  components: {
    post,
  },
  methods: {
    newPost() {
      this.$router.push("/formulario");
    },
    showEdit(index) {
      this.$router.push("/formulario/"+index);
    },
  },
  template: `
  <input type="button" value="New post" @click="newPost">
  <ul v-if="posts.length" id="contenedor">
  <post
    v-for="(post,index) in posts"
    v-bind:key="index"
    :post="post"
    :index="index"
    @show-edit="showEdit(index)"
    @velete="velete(index)"
  >
  </post>
</ul>`,
};
