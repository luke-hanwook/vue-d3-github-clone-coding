<template>
  <article>
    <h3>Rect Graph</h3>
    <svg :width="width" :height="height">
      <Axis v-for="([key, value], index) of scale" :key="index" :axis="key" />
      <g class="contents" :style="graphStyle">
        <RectGraph v-for="(d, index) in weeks" :key="index" :d="d" />
      </g>
    </svg>
  </article>
</template>

<script>
import { mapState } from "vuex";
import RectGraph from "./RectGraph.vue";
import Axis from "./Axis.vue";

export default {
  props: ["width", "height", "graph-style"],
  components: {
    RectGraph,
    Axis
  },
  computed: {
    ...mapState({
      scale: "scale",
      weeks: "weeks"
    })
  }
};
</script>

<style></style>
