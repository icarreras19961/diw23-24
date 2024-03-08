import post_header from "./components/post_header.js";
import post_footer from "./components/post_footer.js";
import router from "./router.js";
const { createApp } = Vue;

import store from "./components/store.js";
const { createPinia } = pinia;

const pinia = createPinia();
let app = createApp({
  data() {
    return {
      // Variables
      editando: false,
      lista: "Lista de posts",
      posts: [],
      position: 0,
      editing_post: null,
    };
  },
  // Components
  components: {
    post_header,
    post_footer,
  },
  computed: {
    // la variable se actualiza sola en el componente en el que estoy
    form() {
      return this.$refs.post_insert;
    },
  },
  // Methods

  methods: {
    postSend(envia) {
      // console.log(envia);
      this.posts = envia;
      this.$router.push("/");
      // console.log(this.posts);
    },
    // Cambia los parametros de insertar post a actualizar los datos del post
    showEdit(position) {
      console.log("hola");
      // console.log(position);
      // console.log(this.position);
      // this.editando = true;
      this.position = position;
      this.editing_post = this.posts[this.position];
      // console.log(this.editando);
    },
    // Edita el post como tal
    edit(new_post) {
      this.position = this.$route.params.id;
      this.posts[this.position] = {
        title: new_post.title,
        content: new_post.content,
        img: new_post.img,
        topics: new_post.topics,
        author: new_post.author,
        publication_date: new_post.publication_date,
      };

      localStorage.setItem("posts", JSON.stringify(this.posts));
      this.editing_post = null;
      this.$router.push("/");
    },
    // Eliminar post (Esta con v porque me hizo gracia ya que escribir delete me salia como palabra reservada)
    velete(index) {
      this.posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    updatePhoto(files) {
      if (!files.length) return;
      // Store the file data
      this.form.img = {
        name: files[0].name,
        data: files[0],
      };
    },
  },
  mounted() {
    Pinia.mapActions(store, ["postsLocalSave"]);
    Pinia.mapState(store, ["posts"]);
    this.$router.push("/");
  },
});
app.use(pinia);
app.use(router);
app.mount("#app");
