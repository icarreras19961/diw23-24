export default {
  name: "post",
  props: ["post"],
  template: `<div>
  <h1>
    Title: {{post.title}}
  </h1>
  <h6>
    Date: {{post.creation_date}}
  </h6>
  <img src="/Vue3/ejercicio1/img/{{post.img}}" alt="">
  <span class="texto">
    {{post.content}}
  </span>
  <p>

    <button v-on:click="showEdit(index)">Edit</button>
    <button @click="velete(index)">Delete</button>
  </p>
</div>`,
};
