<template>
  <section>
    <h3>Area Graph (Insight of Github Contributor Clone coding)</h3>
    <h4>{{ period }}</h4>
    <svg :width="width" :height="height">
      <Axis v-for="([key, value], index) of scale" :key="index" :axis="key" />
      <g class="contents" :style="style"><AreaGraph /></g>
      <GraphSelection />
    </svg>
    <NameCard />
    <h3>Line Graph</h3>
    <svg :width="width" :height="height">
      <Axis v-for="([key, value], index) of scale" :key="index" :axis="key" />
      <g class="contents" :style="style"><LineGraph /></g>
    </svg>

    <h3>Rect Graph</h3>
    <svg :width="width" :height="height">
      <Axis v-for="([key, value], index) of scale" :key="index" :axis="key" />
      <g class="contents" :style="style">
        <RectGraph v-for="(d, index) in weeks" :key="index" :d="d" />
      </g>
    </svg>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RectGraph from "./RectGraph.vue";
import LineGraph from "./LineGraph.vue";
import AreaGraph from "./AreaGraph.vue";
import Axis from "./Axis.vue";
import GraphSelection from "./GraphSelection.vue";
import NameCard from "./NameCard.vue";

export default {
  components: {
    RectGraph,
    LineGraph,
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
      weeks: "weeks",
      scale: "scale",
      area: "area",
      selectedWeeks: "selectedWeeks"
    }),
    width() {
      return this.area.width + this.area.margin;
    },
    height() {
      return this.area.height + this.area.margin;
    },
    style() {
      const areaMargin = this.area.margin / 2;
      return {
        transform: `translate(${areaMargin}px, ${areaMargin}px)`
      };
    }
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
  },
  created() {
    this.FETCH_DATA({});
  },
  methods: {
    ...mapActions(["FETCH_DATA"])
  }
};
</script>

<style scoped>
h4 {
  font-size: 24px;
  text-align: left;
}
</style>
