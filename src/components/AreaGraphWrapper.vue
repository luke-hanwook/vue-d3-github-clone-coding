<template>
  <article>
    <h3>Area Graph (Github Contributor of Insight Clone coding)</h3>
    <h4>{{ period }}</h4>
    <svg :width="width" :height="height">
      <Axis v-for="([key, value], index) of scale" :key="index" :axis="key" />
      <g class="contents" :style="graphStyle"><AreaGraph /></g>
      <GraphSelection />
    </svg>
    <NameCard />
  </article>
</template>

<script>
import { mapState } from "vuex";
import AreaGraph from "./AreaGraph.vue";
import Axis from "./Axis.vue";
import GraphSelection from "./GraphSelection.vue";
import NameCard from "./NameCard.vue";
export default {
  props: ["width", "height", "graph-style"],
  components: {
    AreaGraph,
    Axis,
    GraphSelection,
    NameCard
  },
  data() {
    return {
      period: ""
    };
  },
  computed: {
    ...mapState({
      scale: "scale",
      selectedWeeks: "selectedWeeks"
    })
  },
  watch: {
    selectedWeeks(sw) {
      const start = new Date(sw[0].w * 1000).toDateString().slice(3);
      const last = new Date(sw[sw.length - 1].w * 1000).toDateString().slice(3);
      this.period =
        start.replaceAt(start.lastIndexOf(" "), ", ") +
        " - " +
        last.replaceAt(last.lastIndexOf(" "), ", ");
    }
  }
};
</script>

<style scoped>
h4 {
  font-size: 24px;
  text-align: left;
}
</style>
