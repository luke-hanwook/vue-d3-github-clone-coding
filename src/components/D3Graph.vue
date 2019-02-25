<template>
  <article><slot></slot></article>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      area: "area",
      selectedWeeks: "selectedWeeks"
    })
  },
  created() {
    this.FETCH_DATA({});
  },
  methods: {
    ...mapActions(["FETCH_DATA"])
  }
};
</script>

<style scoped></style>
