<template>
  <g :class="axis" :style="style" ref="axis"></g>
</template>

<script>
import * as d3 from "d3";
import { mapState } from "vuex";

export default {
  props: ["axis", "t"],
  computed: {
    ...mapState({
      area: "area",
      carea: "carea",
      scale: "scale",
      cscale: "cscale"
    }),
    style() {
      const { x, y } = this.getAxisTransform();
      return {
        transform: `translate(${x}px, ${y}px)`
      };
    },
    areaType() {
      return this.t ? this.t + "area" : "area";
    },
    scaleType() {
      return this.t ? this.t + "scale" : "scale";
    }
  },
  watch: {
    cscale(s) {
      this.render(this[this.scaleType]);
    }
  },
  mounted() {
    this.render(this[this.scaleType]);
  },
  methods: {
    render(scale) {
      const $axis = d3.select(this.$refs.axis);
      $axis.call(this.generatorAxis(scale));
    },
    generatorAxis(scale) {
      const axis = {
        x: d3
          .axisBottom(scale.get("x"))
          .ticks(4)
          .tickSize(-this[this.areaType].height),
        y: d3
          .axisLeft(scale.get("y"))
          .ticks(4)
          .tickSize(-this[this.areaType].width)
      };
      return axis[this.axis];
    },
    getAxisTransform() {
      let { margin, height } = this[this.areaType];
      margin /= 2;
      const axisOffset = {
        x: { x: margin, y: height + margin },
        y: { x: margin, y: margin }
      };
      return axisOffset[this.axis];
    }
  }
};
</script>

<style>
.y line {
  stroke: lightgrey;
  stroke-opacity: 1;
  shape-rendering: crispEdges;
}
.y path,
.x path,
.x line {
  stroke-opacity: 0;
}
</style>
