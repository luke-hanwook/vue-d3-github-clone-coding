<template>
  <g class="selection" :style="style">
    <rect
      class="overlay"
      ref="overlay"
      :width="width"
      :height="height"
      :cursor="overlayCursor"
      @mousedown="mousedown"
    ></rect>
    <rect
      class="selection-rect"
      ref="selection"
      v-if="isShow"
      :x="selectedX"
      y="0"
      :width="selectedWidth"
      :height="height"
      :cursor="selectCursor"
      @mousedown="selectionMousedown"
    ></rect>
    <rect
      class="handle-right"
      data-handle-type="selectedRightX"
      ref="selection"
      v-if="isShow"
      :x="handleRight"
      y="0"
      width="6"
      :height="height"
      :cursor="handleCursor"
      @mousedown="handleRightMousedown"
    ></rect>
    <rect
      class="handle-left"
      data-handle-type="selectedLeftX"
      ref="selection"
      v-if="isShow"
      :x="handleLeft"
      y="0"
      width="6"
      :height="height"
      :cursor="handleCursor"
      @mousedown="handleLeftMousedown"
    ></rect>
  </g>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as d3 from "d3";

export default {
  data() {
    return {
      isShow: false,
      selectedX: 20,
      selectedRightX: 0,
      selectedLeftX: 0,
      selectedWidth: 0,
      overlayCursor: "crosshair",
      selectCursor: "move",
      handleCursor: "ew-resize"
    };
  },
  computed: {
    ...mapState({
      area: "area",
      scale: "scale",
      weeks: "weeks",
      selectedWeeks: "selectedWeeks"
    }),
    width() {
      return this.area.width;
    },
    height() {
      return this.area.height;
    },
    style() {
      const areaMargin = this.area.margin / 2;
      return {
        transform: `translate(${areaMargin}px, ${areaMargin}px)`,
        fill: "rgba(0, 0, 0, 0)"
      };
    },
    handleRight() {
      return this.selectedRightX - 3;
    },
    handleLeft() {
      return this.selectedLeftX - 3;
    }
  },
  watch: {
    weeks() {
      this.isShow = false;
    }
  },
  methods: {
    ...mapMutations(["SET_SELECTED_WEEKS"]),
    mousedown(e) {
      this.isShow = false;
      this.selectedX = 0;
      this.selectedWidth = 0;
      this.selectedRightX = 0;
      this.selectedLeftX = 0;
      this.SET_SELECTED_WEEKS(this.weeks);
      const w = d3.select(window);
      const defaultX = e.offsetX - this.area.margin / 2;
      w.on("mousemove", () => {
        let x = d3.mouse(this.$refs.overlay)[0];
        let moveX = x <= 0 ? 0 : x > this.area.width ? this.area.width : x;
        if (defaultX < moveX) {
          this.selectedX = defaultX;
          this.selectedRightX = moveX;
          this.selectedLeftX = defaultX;
          this.selectedWidth = moveX - defaultX;
        } else {
          this.selectedX = moveX;
          this.selectedRightX = defaultX;
          this.selectedLeftX = moveX;
          this.selectedWidth = defaultX - moveX;
        }
        this.isShow = true;
      }).on("mouseup", () => {
        if (this.selectedRightX - this.selectedLeftX < 3) {
          this.isShow = false;
        }
        this.getData(
          this.getDataIndex(this.selectedLeftX),
          this.getDataIndex(this.selectedRightX)
        );
        w.on("mousemove", null).on("mouseup", null);
      });
      e.preventDefault();
    },
    selectionMousedown(e) {
      const w = d3.select(window);
      const defaultX = e.offsetX - this.area.margin / 2;
      const addX = this.selectedX;
      w.on("mousemove", () => {
        this.overlayCursor = "move";
        let x = d3.mouse(this.$refs.overlay)[0];
        let moveX = x <= 0 ? 0 : x > this.area.width ? this.area.width : x;
        if (defaultX < moveX) {
          const maxX = this.area.width - this.selectedWidth;
          let x_ =
            addX + moveX - defaultX >= maxX ? maxX : addX + moveX - defaultX;
          this.selectedRightX = x_ + this.selectedWidth;
          this.selectedLeftX = x_;
          this.selectedX = x_;
        } else {
          let x__ =
            addX - (defaultX - moveX) <= 0 ? 0 : addX - (defaultX - moveX);
          this.selectedRightX = x__ + this.selectedWidth;
          this.selectedLeftX = x__;
          this.selectedX = x__;
        }
      }).on("mouseup", () => {
        this.getData(
          this.getDataIndex(this.selectedLeftX),
          this.getDataIndex(this.selectedRightX)
        );
        this.overlayCursor = "crosshair";
        w.on("mousemove", null).on("mouseup", null);
      });
      e.preventDefault();
    },
    handleLeftMousedown(e) {
      const w = d3.select(window);
      const handleType = e.target.dataset.handleType;
      const addWidth = this.selectedWidth;
      const rightX = this.selectedRightX;
      w.on("mousemove", _ => {
        this.overlayCursor = "ew-resize";
        this.selectCursor = "ew-resize";
        let x = d3.mouse(this.$refs.overlay)[0];
        let moveX = x <= 0 ? 0 : x > this.area.width ? this.area.width : x;
        const handleX = this[handleType];
        if (handleX < moveX) {
          if (rightX < moveX) {
            this.selectedX = rightX;
            this.selectedWidth = moveX - rightX;
          } else {
            this.selectedX = moveX;
            this.selectedWidth = addWidth - (moveX - handleX);
          }
        } else {
          this.selectedX = moveX;
          this.selectedWidth = addWidth + (handleX - moveX);
        }
      }).on("mouseup", () => {
        this.selectedRightX = this.selectedX + this.selectedWidth;
        this.selectedLeftX = this.selectedX;
        this.getData(
          this.getDataIndex(this.selectedLeftX),
          this.getDataIndex(this.selectedRightX)
        );
        this.overlayCursor = "crosshair";
        this.selectCursor = "move";
        w.on("mousemove", null).on("mouseup", null);
      });
      e.preventDefault();
    },
    handleRightMousedown(e) {
      const w = d3.select(window);
      const handleType = e.target.dataset.handleType;
      const addWidth = this.selectedWidth;
      const leftX = this.selectedLeftX;
      w.on("mousemove", () => {
        this.overlayCursor = "ew-resize";
        this.selectCursor = "ew-resize";
        let x = d3.mouse(this.$refs.overlay)[0];
        let moveX = x <= 0 ? 0 : x > this.area.width ? this.area.width : x;
        const handleX = this[handleType];
        if (handleX < moveX) {
          this.selectedWidth = addWidth + (moveX - handleX);
        } else {
          if (leftX > moveX) {
            this.selectedX = moveX;
            this.selectedWidth = leftX - moveX;
          } else {
            this.selectedX = leftX;
            this.selectedWidth = addWidth - (handleX - moveX);
          }
        }
      }).on("mouseup", () => {
        this.selectedRightX = this.selectedX + this.selectedWidth;
        this.selectedLeftX = this.selectedX;
        this.getData(
          this.getDataIndex(this.selectedLeftX),
          this.getDataIndex(this.selectedRightX)
        );
        this.overlayCursor = "crosshair";
        this.selectCursor = "move";
        w.on("mousemove", null).on("mouseup", null);
      });
      e.preventDefault();
    },
    getDataIndex(x) {
      const bisectDate = d3.bisector(d => {
        return new Date(d.w * 1000);
      }).left;
      const x0 = this.scale.get("x").invert(x);
      return bisectDate(this.weeks, x0, 1);
    },
    getData(defaultI, lastI) {
      if (defaultI !== lastI) {
        const start = Math.min(defaultI, lastI);
        const last = Math.max(defaultI, lastI);
        this.SET_SELECTED_WEEKS(this.weeks.slice(start - 1, last + 1));
      }
    }
  }
};
</script>

<style scoped>
.selection-rect {
  fill: #24292e;
  fill-opacity: 0.1;
  shape-rendering: crispedges;
  stroke: #24292e;
  stroke-dasharray: 3 3;
  stroke-opacity: 0.4;
  stroke-width: 1px;
}
</style>
