<template>
  <article>
    <h3>Line Graph</h3>
    <svg :width="width" :height="height">
      <Axis v-for="([key, value], index) of scale" :key="index" :axis="key" />
      <g class="contents" :style="graphStyle"><LineGraph /></g>
    </svg>
  </article>
</template>

<script>
import { mapState } from "vuex";
import LineGraph from "./LineGraph.vue";
import Axis from "./Axis.vue";

export default {
  props: ["width", "height", "graph-style"],
  components: {
    LineGraph,
    Axis
  },
  computed: {
    ...mapState({
      scale: "scale"
    })
  }
};
</script>

<style></style>
