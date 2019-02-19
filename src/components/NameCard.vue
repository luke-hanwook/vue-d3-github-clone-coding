<template>
  <div class="name-card" v-show="show">
    <div class="header">
      <a :href="author.html_url" target="_blank"
        ><img :src="author.avatar_url" alt=""
      /></a>
      <div class="text-content">
        <a :href="author.html_url" target="_blank">{{ author.login }}</a>
        <div class="text-addition">
          <span class="commit">{{ selectedValue.c }} commit</span>
          <span class="add">{{ selectedValue.a }} ++</span>
          <span class="delete">{{ selectedValue.d }} --</span>
        </div>
      </div>
    </div>
    <div class="card-graph">
      <svg :width="width" :height="height">
        <Axis
          v-for="([key, value], index) of cscale"
          :key="index"
          :axis="key"
          :t="`c`"
        />
        <g class="contents" :style="style"><AreaGraph :t="`c`" /></g>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AreaGraph from "./AreaGraph.vue";
import Axis from "./Axis.vue";

export default {
  components: { AreaGraph, Axis },
  data() {
    return {
      type: "c",
      show: false,
      selectedValue: {}
    };
  },
  computed: {
    ...mapState({
      author: "author",
      carea: "carea",
      cscale: "cscale",
      selectedWeeks: "selectedWeeks"
    }),
    width() {
      return this.carea.width + this.carea.margin;
    },
    height() {
      return this.carea.height + this.carea.margin;
    },
    style() {
      const areaMargin = this.carea.margin / 2;
      return {
        transform: `translate(${areaMargin}px, ${areaMargin}px)`
      };
    }
  },
  watch: {
    selectedWeeks: {
      deep: true,
      handler(after, before) {
        const selectedValue = after.reduce((acc, cur, i) => {
          return {
            a: acc.a + cur.a,
            d: acc.d + cur.d,
            c: acc.c + cur.c
          };
        });
        this.selectedValue = this.formatNumber(selectedValue);
        this.show = selectedValue.c > 0;
      }
    }
  },
  methods: {
    formatNumber(obj) {
      for (let prop in obj) {
        obj[prop] = new Intl.NumberFormat().format(obj[prop]);
      }
      return obj;
    }
  }
};
</script>

<style scoped>
.name-card {
  width: 390px;
}
img {
  width: 38px;
  height: 38px;
  border-radius: 5px;
  margin: 5px;
}
a {
  font-size: 20px;
}
.header {
  display: flex;
}
.text-content {
  text-align: left;
  margin: 5px;
  width: 100%;
}
.text-addition {
  font-size: 12px;
  width: 70%;
}
.text-addition span {
  margin-right: 10px;
}
.add {
  color: #28a745 !important;
}
.delete {
  color: #cb2431 !important;
}
.commit {
  color: #586069 !important;
}
</style>
