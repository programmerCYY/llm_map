<template>
  <div id="board-container">
    <div id="board-title"><span>Route List</span></div>
    <div id="board_content">
      <leaderboard-card
        v-for="(routeInfoItem, index) in routeInfoList"
        :key="index"
        :routeInfoItem="routeInfoItem"
        :selected="isSelected(index)"
      ></leaderboard-card>
    </div>
  </div>
</template>
<script>
import LeaderboardCard from "./Leaderboard/LeaderboardCard.vue";

export default {
  props: {
    routeInfoList: Array,
    homeRoadIndex: Number,
  },
  components: {
    LeaderboardCard,
  },
  watch: {
    routeInfoList: {
      handler() {
        this.setTextContent();
      },
      deep: true, // 使用深度监视
    },
  },
  computed: {
    isSelected() {
      return (index) => index === this.homeRoadIndex;
    },
  },
  data() {
    return {
      textContent:
        "This is the route Description. You can get some text description from this box!Starting from Times Square, head south on Broadway Avenue towards 42nd Street. Turn left onto 7th Avenue and continue until you reach 34th Street. Turn right onto 34th Street and walk west towards the Hudson River. Cross over the Hudson River via the Lincoln Tunnel and continue onto NJ-495 West. Follow signs for New Jersey Turnpike/I-95 South. Merge onto I-95 South and continue for approximately 10 miles. Take exit 16E towards Lincoln Tunnel/NJ-495 East and merge onto NJ-495 East. Cross back over the Hudson River via the Lincoln Tunnel and follow signs for 42nd Street. Exit the tunnel and turn right onto 42nd Street. Continue east on 42nd Street until you reach Times Square.",
    };
  },
  methods: {
    setTextContent() {
      this.textContent = this.roadDes;
      console.log("set right");
    },
  },
};
</script>
<style lang="less" scoped>
#board-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #board-title {
    color: #0f0f0e;
    font-weight: 700;
    flex: 1;
    font-size: 15px;
    align-content: center;
    display: flex;
    align-items: center;
    span {
      margin-left: 30px;
    }
  }
  #board_content {
    flex: 8;
    // height: 896px;
    width: 100%;
    background-color: rgb(239, 244, 244);
    padding: 2px 4px;
    overflow: auto;
    p {
      //   padding: 10px 10px;
      line-height: 200%;
      margin: 10px 10px;
      font-size: 60%;
    }
  }
}
</style>