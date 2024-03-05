export default {
  name: "formulario",
  emits: ["setName"],
  methods: {
    setName() {
      this.$emit("setName", nombre);
    },
  },
  template: `
  <form action="">
        <input type="text" v-model="nombre">
        <button @click="setName">Crear user</button>
      </form>
      `,
};
