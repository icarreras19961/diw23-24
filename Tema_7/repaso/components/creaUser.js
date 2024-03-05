export default {
  // El nombre del componente
  name: "crearUser",
  // Lo que le envia el padre al componente
  props: ["nombres"],
  // Lo que le envia eñ hijo al padre
  emits: ["deleteName"],
  methods: {
    mostraForm() {
      // redirige con el router a la pagina que este especificado dentro del ()
      this.$router.push("/formulario");
    },
    deleteUser(index) {
      // Un emit para el padre con un parametro
      this.$emit("deleteName", index);
    },
  },
  // Lo que se mostrara por pantalla
  // el @click es un evento on click y el v-for="(nombre,index) in nombres" es como un for each
  template: `
  <button @click="mostraForm">Crear user</button>
  <h1 v-for="(nombre,index) in nombres">
    {{nombre}}
    <button @click="deleteUser(index)">delete user</button>
  </h1>
  `,
};
