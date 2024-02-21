// import post_header from "./components/post_header.js";
// import post_footer from "./components/post_footer.js";
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
    //  post_header,
    //   post_footer,
       post },
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
      };
      this.posts.push(post);
      this.form.title = "";
      this.form.content = "";
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
}).mount("#app");
