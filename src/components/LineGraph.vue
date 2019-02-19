<template>
  <path :d="line" />
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";

export default {
  data() {
    return {
      line: ""
    };
  },
  computed: {
    ...mapState({
      scale: "scale",
      weeks: "weeks"
    })
  },
  watch: {
    weeks(w) {
      this.render(w);
    }
  },
  methods: {
    render(weeks) {
      const path = d3
        .line()
        .curve(d3.curveBasis)
        .x(d => this.scale.get("x")(new Date(d.w * 1000)))
        .y(d => this.scale.get("y")(d.c));
      this.line = path(weeks);
    }
  }
};
</script>

<style scoped>
path {
  fill: none;
  stroke: rgb(65, 184, 131);
  stroke-width: 3px;
}
</style>
