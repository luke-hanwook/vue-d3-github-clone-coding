<template>
  <section>
    <div class="form-group">
      <form @submit.prevent="fetchApiData" class="form">
        <div><input type="text" v-model="owner" placeholder="owner" /></div>
        <div>
          <input type="text" v-model="repo" placeholder="repository name" />
        </div>
        <button>search</button>
      </form>
    </div>
    <D3Graph />
  </section>
</template>

<script>
import D3Graph from "./D3Graph.vue";
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  components: { D3Graph },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      owner: "",
      repo: ""
    };
  },
  methods: {
    ...mapActions(["FETCH_DATA"]),
    fetchApiData() {
      this.FETCH_DATA({ owner: this.owner.trim(), repo: this.repo.trim() });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form-group {
  width: 740px;
  margin: 10px;
}
.form {
  display: flex;
  justify-content: center;
}
input {
  margin-right: 10px;
}
</style>
