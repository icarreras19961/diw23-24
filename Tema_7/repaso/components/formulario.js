export default {
  name: "formulario",
  emits: ["setName"],
  data() {
    return { nombre: "" };
  },
  methods: {
    setName() {
      this.$emit("setName", this.nombre);
    },
  },
  template: `
  <form action="">
        <input type="text" v-model="nombre">
        <button @click="setName">Crear user</button>
      </form>
      `,
};
