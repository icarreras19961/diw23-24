export default {
  name: "formulario",
  props: ["post"],
  emits: ["postSend", "update_post"],
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
      posts: [],
      titulo_creacion: "Crear post",
      titulo_Upgreacion: "Actualizar post",
    };
  },
  computed: {
    editando() {
      return this.post !== null;
    },
  },
  watch: {
    // Con el nombre de la variable en cuanto cambie saltara esta funcion
    post(value) {
      console.log(value);
      if (value === null) {
        return;
      }
      this.form.title = value.title;
      this.form.topics = value.topics;
      this.form.author = value.author;
      this.form.content = value.content;
      this.form.publication_date = value.publication_date;
      this.form.img = value.img;
    },
  },
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
      console.log(this.posts);
      let envia = this.posts;
      console.log(envia);
      this.$emit("postSend", envia);
      this.form.title = "";
      this.form.content = "";
      this.form.author = "";
      this.form.creation_date = "";
      return;
    },
    // Edita el post como tal
    edit(e) {
      e.preventDefault();
      const new_post = {
        title: this.form.title,
        content: this.form.content,
        img: this.form.img,
        topics: this.form.topics,
        author: this.form.author,
        publication_date: this.form.publication_date,
      };
      this.$emit("update_post", new_post);
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
  },
  mounted(){
    console.log(this.$route.params.id);
  },
  template: `<!-- Titulos -->
  <h1 v-if="editando==false">{{titulo_creacion}}</h1>
  <h1 v-else>{{titulo_Upgreacion}}</h1>
  <hr>
  <!-- El formulario -->
  <form class="formulario" ref="post_insert">
  <div v-if="editando==false">
    <!-- El contenido para insertar un post -->
    <!-- Title -->
    <input v-model="form.title" type="text" name="title" placeholder="Title"><br>
    <!-- Content -->
    <textarea v-model="form.content" type="text" name="content" placeholder="content"></textarea><br>
    <!-- Author -->
    <input v-model="form.author" type="text" name="author" placeholder="Author"><br>
    
    <!-- The date its instantly aplied -->
    <p>Title: {{form.title}}</p>
    <p>Content: {{form.content}}</p>
    <button class="btn gris p-1" v-on:click="insert">Inserta post</button>
  </div>
  <div v-else>
    <!-- EL div en caso de actualizar el contenido de los posts -->
    <!-- Title -->
    <input v-model="form.title" type="text" name="title" placeholder="Title"><br>
    <!-- Content -->
    <textarea v-model="form.content" type="text" name="content" placeholder="content"></textarea><br>
    <!-- Author -->
    <input v-model="form.author" type="text" name="author" placeholder="Author"><br>
    <!-- Img -->

    <input @change="updatePhoto($event.target.files)" type="file" name="img" placeholder="Image"><br>
    <!-- Publication date -->
    <input v-model="form.publication_date" type="date" name="publication_date" placeholder="Publication Date"><br>

    <!-- topics -->
    Topics: <select name="topics" v-model="form.topics">
      <option value="Amarres">Amarres</option>
      <option value="Nudos">Nudos</option>
      <option value="Navegacion">Navegacion</option>
      <option value="RIPA">RIPA</option>
      <option value="Veleros">Veleros</option>
      <option value="Barco a motor">Barco a motor</option>
    </select>

    <p>Title: {{form.title}}</p>
    <p>Content: {{form.content}}</p>

    <button class="btn gris p-1" @click="edit">Update</button>
  </div>

</form>`,
};
