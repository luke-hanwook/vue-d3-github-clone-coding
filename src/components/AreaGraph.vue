<template>
  <path :d="area_" :fill="fill" />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as d3 from "d3";

export default {
  props: ["t"],
  data() {
    return {
      area_: ""
    };
  },
  computed: {
    ...mapState({
      weeks: "weeks",
      scale: "scale",
      area: "area",
      cscale: "cscale",
      carea: "carea",
      selectedWeeks: "selectedWeeks"
    }),
    fill() {
      return this.t ? "rgb(255, 150, 150)" : "rgb(65, 184, 131)";
    }
  },
  watch: {
    weeks(w) {
      if (!this.t) this.render(w);
    },
    selectedWeeks(sw) {
      if (this.t) {
        this.SET_SCALE(sw);
        this.render(sw);
      }
    }
  },
  methods: {
    ...mapMutations(["SET_SCALE"]),
    render(weeks) {
      const scaleType = this.t ? this.t + "scale" : "scale";
      const areaType = this.t ? this.t + "area" : "area";
      const area = d3
        .area()
        .curve(d3.curveBasis)
        .x(d => this[scaleType].get("x")(new Date(d.w * 1000)))
        .y0(this[areaType].height)
        .y1(d => this[scaleType].get("y")(d.c));
      this.area_ = area(weeks);
    }
  }
};
</script>

<style scoped></style>
