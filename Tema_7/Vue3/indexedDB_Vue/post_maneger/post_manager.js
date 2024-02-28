import post_header from "./components/post_header.js";
import post_footer from "./components/post_footer.js";
import post from "./components/post.js";
import formulario from "./components/formulario.js";
const { createApp } = Vue;

let app = createApp({
  data() {
    return {
      // Variables
      lista: "Lista de posts",
      posts: [],
      position: 0,
    };
  },
  // Components
  components: {
    post_header,
    post_footer,
    post,
    formulario,
  },
  // Methods
  methods: {
    // Cambia los parametros de insertar post a actualizar los datos del post
    showEdit(position) {
      this.editando = true;
      this.position = position;
      this.form.title = this.posts[position].title;
      this.form.content = this.posts[position].content;
    },
    // Edita el post como tal
    edit(e) {
      e.preventDefault();
      this.posts[this.position] = {
        title: this.form.title,
        content: this.form.content,
        img: this.form.img,
        topics: this.form.topics,
        author: this.form.author,
        publication_date: this.form.publication_date,
      };
      this.form.title = "";
      this.form.content = "";
      this.form.topics = "";
      this.form.author = "";
      this.form.publication_date = "";
      this.editando = false;
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
    if (JSON.parse(localStorage.getItem("posts") === null)) {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    } else if (JSON.parse(localStorage.getItem("posts").length != 0)) {
      this.posts = JSON.parse(localStorage.getItem("posts"));
    } else {
      console.log("No posts");
    }
  },
}).mount("#app");
