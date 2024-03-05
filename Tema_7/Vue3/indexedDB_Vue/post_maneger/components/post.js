export default {
  name: "post",
  props: ["post", "index"],
  emits:["showEdit","velete"],
  methods: {
    showEdit: function (index) {
      this.$emit("showEdit", index);
    },
    velete: function (index) {
      this.$emit("velete", index);
    },
  },
  template: `
  <div id="post_body">
  <h1 id="post_title">
    Title: {{post.title}}
  </h1>
  <h6>
    Date: {{post.creation_date}}
  </h6>
  <img src="/Vue3/ejercicio1/img/{{post.img}}" alt="">
  <span class="texto">
    {{post.content}}
  </span>
  <h6>
    Author: {{post.author}}
  </h6> 

  <p>
    <button class="btn gris p-1"  v-on:click="showEdit(index)">Edit</button>
    <button class="btn gris p-1"  @click="velete(index)">Delete</button>
  </p>
</div>
`,
};
