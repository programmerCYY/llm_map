<template>
  <div id="tag-container">
    <div id="tag-title">
      <span>Route Brif Message</span>
      <img src="@/assets/img/arrow.png"
      style="width: 25px; height: 25px"/>
      </div>
    <div id="tag_content">
      <div id="tag_text">
        <el-checkbox-group v-model="checkboxGroup">
          <div
            v-for="(tag, index) in dynamicTags"
            :key="index"
            style="display: inline-block"
          >
            <el-checkbox
              :label="tag.poi_id"
              :key="tag.poi_id"
              border
              size="mini"
              v-show="isModefied"
            >
              <img
                src="@/assets/img/location.png"
                style="width: 12px; height: 12px"
              />
              {{ tag.poi_id }}</el-checkbox
            >
            <el-button
              type="primary"
              plain
              size="mini"
              :disable-transitions="false"
              v-show="!isModefied"
              @click="selectPoint(tag)"
            >
              <img
                src="@/assets/img/location.png"
                style="width: 12px; height: 12px"
              />
              {{ tag.poi_id }}
            </el-button>
            <el-tag
              size="mini"
              type="success"
              v-if="index !== dynamicTags.length - 1"
            >
              <img
                src="@/assets/img/right-arrow.png"
                style="width: 8px; height: 8px; margin-left: 5px"
              />
              {{ distanceList[index] }}km
              <img
                src="@/assets/img/right-arrow.png"
                style="width: 8px; height: 8px; margin-right: 5px"
              />
            </el-tag>
            <!-- <img
            src="@/assets/img/right-arrow.png"
            style="width: 12px; height: 12px; margin-left: 5px"
            v-if="index !== dynamicTags.length - 1"
          /> -->
          </div>
        </el-checkbox-group>
      </div>
      <div id="tag_button">
        <div class="tag_buttton-item">
          <el-button
            type="success"
            icon="el-icon-location"
            :plain = "isModefied"
            circle
            @click="changeMode(0)"
          ></el-button>
        </div>
        <div class="tag_buttton-item">
          <el-button
            type="success"
            icon="el-icon-check"
            :plain = "!isModefied"
            circle
            @click="changeMode(1)"
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dynamicTags: Array,
    distanceList: Array,
  },
  data() {
    return {
      checkboxGroup: [],
      isModefied: false,
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
  methods: {
    changeMode(signs) {
      this.isModefied = signs;
    },
    selectPoint(pointItem) {
      console.log("llll")
      let copyPointItem = JSON.parse(JSON.stringify(pointItem))
      this.$emit('pickPoint', copyPointItem)
    }
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
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      margin-left: 30px;
      margin-top:10px
    }
    img{
      margin-right: 15px;
      margin-top:10px
    }
  }
  #tag_content {
    // overflow-y: scroll;
    flex: 8;
    // height: 896px;
    width: 100%;
    // background-color: rgb(239, 244, 244);
    // padding: 10px 0;
    display: flex;
    #tag_text {
      flex: 9;
      // background-color: rgb(239, 244, 244);
      background-color: rgba(248, 251, 246, 0.916);
      // background-color: rgb(255, 255, 255);
      border-radius: 10px;
      margin: 10px;
      padding: 5px 0;
      overflow: auto;
      .el-button,
      .el-checkbox {
        font-weight: 600;
        margin-left: 10px;
        margin-top: 10px;
      }
      .el-tag {
        margin-left: 6px;
      }
    }
    #tag_button {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      .el-button {
        margin-top: 10px;
      }
      // background-color: rgb(239, 244, 244);
    }
  }
}
</style>