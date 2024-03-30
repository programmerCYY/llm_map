<template>
  <!-- <div id="card-container"> -->
  <el-card id="card-container" :class="cardContainerClass">
    <div id="card-title">
      <div id="card-distance">
        <img
          src="@/assets/img/leaderboard/distance.png"
          style="width: 15px; height: 15px"
        /><span>{{ routeInfoItem.route_distance }}</span>
      </div>
      <div id="card-drive-time">
        <img
          src="@/assets/img/leaderboard/sports-car.png"
          style="width: 15x; height: 15px"
        />
        <span>{{ routeInfoItem.route_drive_time }}</span>
      </div>
      <div id="card-walk-time">
        <img
          src="@/assets/img/leaderboard/person.png"
          style="width: 15x; height: 15px"
        />
        <span>{{ routeInfoItem.route_walk_time }}</span>
      </div>
      <div id="card-score">
        <img
          src="@/assets/img/leaderboard/rating-stars.png"
          style="width: 15px; height: 15px"
        /><span> {{ routeInfoItem.route_score }}</span>
      </div>
    </div>
    <div id="card_content" :class="cardContainerClass">
      <template v-if="routeLength <= 4">
        <div
          v-for="(tag, index) in dynamicTags"
          :key="index"
          style="display: inline-block"
        >
          <el-tag
            :disable-transitions="false"
            type="success"
            :effect="selected ? 'dark' : 'light'"
          >
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
      </template>
      <template v-else>
        <div
          v-for="(tag, index) in dynamicTags"
          :key="index"
          style="display: inline-block"
        >
          <el-tag
            :disable-transitions="false"
            type="success"
            :effect="selected ? 'dark' : 'light'"
          >
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
          <span v-if="index === dynamicTags.length / 2 - 1">...</span>
        </div>
      </template>
    </div>
  </el-card>
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    routeInfoItem: Object,
    selected: Boolean,
  },
  watch: {
    routeInfoItem: {
      handler() {
        this.setCardContent();
      },
      deep: true,
    },
  },
  computed: {
    cardContainerClass() {
      return {
        "selected-class": this.selected,
        "normal-class": !this.selected,
      };
    },
  },
  data() {
    return {
      routeLength: 0,
      dynamicTags: [],
    };
  },
  created() {
    this.setCardContent();
  },
  // mounted(){
  //   this.setCardContent();
  // },
  methods: {
    changeRouteKey() {
      this.roadMsg = this.routeInfoList.map((routeItem) => {
        let points = routeItem.poi_list.map((pointItem) => {
          let positionPoint = {
            position: {
              lng: pointItem.poi_coordinate[0],
              lat: pointItem.poi_coordinate[1],
            },
            positionId: pointItem.poi_id,
            positionTag: pointItem.poi_tags,
            positionName: pointItem.poi_name,
          };
          this.addPositionPoint(positionPoint);
          return positionPoint;
        });
        return { points };
      });
    },
    setCardContent() {
      this.routeLength = this.routeInfoItem.poi_list.length;
      this.dynamicTags = this.routeInfoItem.poi_list;
      if (this.routeLength > 4) {
        this.dynamicTags = this.routeInfoItem.poi_list.filter((_, index) => {
          return (
            index === 0 ||
            index === 1 ||
            index === this.routeLength - 2 ||
            index === this.routeLength - 1
          );
        });
      }
      console.log("this.dynamicTags", this.dynamicTags);
    },
  },
};
</script>
<style lang="less" scoped>
#card-container {
  width: 99.5%;
  // height: 20%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  // overflow: hidden;
  margin-top: 5px;
  // background-color: rgb(211, 240, 230);
  // background-color: rgb(228, 246, 243);

  #card-title {
    color: #0f0f0e;
    font-weight: 700;
    flex: 1;
    font-size: 15px;
    align-content: center;
    display: flex;
    align-items: center;
    span {
      margin-right: 20px;
      margin-left: 3px;
    }
    #card-distance,
    #card-drive-time,
    #card-walk-time,
    #card-score {
      display: flex;
      align-items: center;
    }
    #card-distance {
      margin-left: 15px;
    }
  }
  #card_content {
    flex: 5;
    // height: 896px;
    width: 100%;
    // background-color: rgb(194, 233, 220);
    // padding: 10px;
    overflow: auto;
    p {
      //   padding: 10px 10px;
      line-height: 200%;
      margin: 10px 10px;
      font-size: 60%;
    }
  }
  .el-tag {
    font-weight: 600;
    margin-left: 10px;
    margin-top: 10px;
  }
}
/* 定义选中状态和普通状态的样式 */
.selected-class {
  background-color: rgb(194, 233, 220);
  /* 其他样式 */
}
.normal-class {
  background-color: rgb(228, 246, 243);
  /* 其他样式 */
}
</style>