import post_header from "./components/post_header.js";
import post_footer from "./components/post_footer.js";
import post from "./components/post.js";
const { createApp } = Vue;

let app = createApp({
  data() {
    return {
      // Variables
      form: {
        img: null,
        title: "",
        status: "Draft",
        topics: "",
        author: "",
        content: "",
        creation_date: "",
        publication_date: null,
      },
      lista: "Lista de posts",
      titulo_creacion: "Crear post",
      titulo_Upgreacion: "Actualizar post",
      posts: [],
      position: 0,
      editando: false,
    };
  },
  // Components
  components: {
    post_header,
    post_footer,
    post,
  },
  // Methods
  methods: {
    // Insertar post
    insert: function (e) {
      e.preventDefault();
      // Esto ne devuelve solo el dd/mm/yyyy de la fecha
      let date = new Date().toLocaleDateString("en-GB");
      let post = {
        title: this.form.title,
        content: this.form.content,
        creation_date: date,
        author: this.form.author,
      };
      this.posts.push(post);
      localStorage.setItem("posts", JSON.stringify(this.posts));
      this.form.title = "";
      this.form.content = "";
      this.form.author = "";
      this.form.creation_date = "";

      return;
    },
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
