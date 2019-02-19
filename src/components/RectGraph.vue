<template>
  <rect class="rect" ref="rect"></rect>
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";

export default {
  props: ["d"],
  computed: {
    ...mapState({
      weeks: "weeks",
      scale: "scale",
      area: "area"
    })
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      d3.select(this.$refs.rect)
        .datum(this.d)
        .attr("height", d => this.area.height - this.scale.get("y")(d.c))
        .attr("width", this.area.width / this.weeks.length - 1)
        .attr("x", d => this.scale.get("x")(new Date(d.w * 1000)))
        .attr("y", d => this.scale.get("y")(d.c))
        .attr("fill", _ => "rgb(65, 184, 131)");
    }
  }
};
</script>

<style></style>
