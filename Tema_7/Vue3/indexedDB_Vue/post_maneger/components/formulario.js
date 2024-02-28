export default {
  name: "formulario",
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
      editando: false,
      titulo_Upgreacion: "Actualizar post",
    };
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
      this.form.title = "";
      this.form.content = "";
      this.form.author = "";
      this.form.creation_date = "";
      return;
    },
  },
  template: `<!-- Titulos -->
  <h1 v-if="editando==false">{{titulo_creacion}}</h1>
  <h1 v-else>{{titulo_Upgreacion}}</h1>
  <hr>
  <!-- El formulario -->
  <form id="formulario">
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
    <button class="btn gris p-1" v-on:click=" insert">Inserta post</button>
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
