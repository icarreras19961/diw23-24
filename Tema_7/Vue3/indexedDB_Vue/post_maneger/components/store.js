const store = Pinia.defineStore("Posts", {
  // Es el equivalente a las variables => data en vue
  state: () => ({
    posts: [],
  }),
  // Un geter de java para leer info
  getters: {
    showPosts() {
      console.log(this.posts);
    },
  },
  // Metodos que queremos que haga nuestro store
  actions: {
    postsLocalSave() {
      if (JSON.parse(localStorage.getItem("posts") === null)) {
        this.posts = [];
        // localStorage.setItem("posts", JSON.stringify(this.posts));
      } else if (JSON.parse(localStorage.getItem("posts").length != 0)) {
        this.posts = JSON.parse(localStorage.getItem("posts"));
      } else {
        console.log("No posts");
        this.posts = [];
      }
    },
  },
});
export default store;
