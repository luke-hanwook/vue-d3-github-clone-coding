<template>
  <section>
    <InputForm />
    <D3Graph>
      <AreaGraphWrapper :width="width" :height="height" :graph-style="style" />
    </D3Graph>
    <D3Graph>
      <LineGraphWrapper :width="width" :height="height" :graph-style="style" />
    </D3Graph>
    <D3Graph>
      <RectGraphWrapper :width="width" :height="height" :graph-style="style" />
    </D3Graph>
  </section>
</template>

<script>
import D3Graph from "./D3Graph.vue";
import { mapState } from "vuex";
import AreaGraphWrapper from "./AreaGraphWrapper.vue";
import LineGraphWrapper from "./LineGraphWrapper.vue";
import RectGraphWrapper from "./RectGraphWrapper.vue";
import InputForm from "./InputForm.vue";

export default {
  name: "HelloWorld",
  components: {
    D3Graph,
    AreaGraphWrapper,
    LineGraphWrapper,
    RectGraphWrapper,
    InputForm
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    ...mapState({
      area: "area"
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
