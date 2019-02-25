<template>
  <div class="form-group">
    <form @submit.prevent="fetchApiData" class="form">
      <div><input type="text" v-model="owner" placeholder="owner" /></div>
      <div>
        <input type="text" v-model="repo" placeholder="repository name" />
      </div>
      <button>search</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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

<style scoped>
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
