<template>
  <div id="tag-container">
    <div id="tag-title"><span>Route Brif Message</span></div>
    <div id="tag_text">
      <div
        v-for="(tag, index) in dynamicTags"
        :key="index"
        style="display: inline-block"
      >
        <el-tag :disable-transitions="false">
          <img
            src="@/assets/img/location.png"
            style="width: 12px; height: 12px"
          />
          {{ tag.poi_id }}
        </el-tag>
        <img
          src="@/assets/img/right-arrow.png"
          style="width: 12px; height: 12px; margin-left: 5px"
          v-if="index !== dynamicTags.length - 1"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dynamicTags: Array
  },
  data() {
    return {
      // dynamicTags: [
      //   "Postion1",
      //   "Position2",
      //   "Position3",
      //   "Position4",
      //   "Position5",
      //   "Position6",
      //   "Position7",
      //   "Position8",
      //   "Position9",
      //   "Position10",
      //   "Postion11",
      //   "Position12",
      //   "Position13",
      //   "Position14",
      //   "Position15",
      //   "Position16",
      //   "Position17",
      //   "Position18",
      //   "Position19",
      //   "Position20",
      //   "Postion21",
      //   "Position22",
      //   "Position23",
      //   "Position24",
      //   "Position25",
      //   "Position26",
      //   "Position27",
      //   "Position28",
      //   "Position29",
      //   "Position30",
      //   "Postion31",
      //   "Position32",
      //   "Position33",
      //   "Position34",
      //   "Position35",
      //   "Position36",
      //   "Position37",
      //   "Position38",
      //   "Position39",
      //   "Position40",
      // ],
    };
  },
};
</script>
<style lang="less" scoped>
#tag-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #tag-title {
    color: #0f0f0e;
    font-weight: 700;
    flex: 1;
    font-size: 20px;
    align-content: center;
    display: flex;
    align-items: center;
    span {
      margin-left: 30px;
    }
  }
  #tag_text {
    overflow-y: scroll;
    flex: 6;
    // height: 896px;
    width: 100%;
    background-color: rgb(239, 244, 244);
    padding: 10px 0;
  }
  .el-tag {
    font-weight: 600;
    margin-left: 10px;
    margin-top: 10px;
  }
}
</style>