export default {
  name: "Number",
  props: ["nombre"],
  methods: {
    clickNumber: function (item) {
      console.log(item);
      this.$emit("clicked-number", item);
    },
  },
  template: `
    <div>
      <input type="button" v-bind:value="nombre"  @click="clickNumber()">
    </div>
  `,
};
