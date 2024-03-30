<template>
  <div class="outer-card">
    <div class="outer-title">
      <div id="title-left">
        <img id="logo" src="@/assets/img/emoji/route.png" alt="" /><span
          id="text"
          >RouteGPT: </span
        ><span>route recommendation based on user preferences </span>
      </div>
      <div id="user-case">case | note</div>
    </div>
    <div class="outer-row">
      <section class="left-column">
        <!-- <div id="left-top">左栏</div> -->
        <div id="left-bottom"><chatwin @setGPTText="setGPTText"></chatwin></div>
      </section>
      <section class="center-column">
        <div id="center-top">
          <!-- <div id="map-title"><span>Map Title</span></div>
          <div id="map-content"> -->
          <mapcontent
            :routeInfoList="routeInfoList"
            :pickPointItem="pickPointItem"
            @setChooseRoadIndex="setChooseRoadIndex"
          ></mapcontent>
          <!-- </div> -->
        </div>
        <div id="center-bottom"><keywordcontent></keywordcontent></div>
      </section>
      <section class="right-column">
        <div id="right-top">
          <leaderboard
            :routeInfoList="routeInfoList"
            :homeRoadIndex="homeRoadIndex"
          ></leaderboard>
        </div>
        <div id="right-center">
          <tagcontent
            :dynamicTags="poiList"
            :distanceList="distanceList"
            @pickPoint="setPickPoint"
          ></tagcontent>
        </div>
        <div id="right-bottom">
          <descontent :roadDes="roadDes"></descontent>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Chatwin from "@/components/Chatwin.vue";
import Mapcontent from "@/components/Mapcontent.vue";
import Descontent from "@/components/Descontent.vue";
import Tagcontent from "@/components/Tagcontent.vue";
import Keywordcontent from "@/components/Keywordcontent.vue";
import Leaderboard from "@/components/Leaderboard.vue";
import { getRecomRouteMsg } from "@/api/getData";
export default {
  components: {
    Chatwin,
    Mapcontent,
    Descontent,
    Tagcontent,
    Keywordcontent,
    Leaderboard,
  },
  data() {
    return {
      routeInfoList: [],
      homeRoadIndex: 0,
      poiList: [],
      distanceList: [],
      pickPointItem: {},
      roadDes:
        "This is the route Description. You can get some text description from this box!Starting from Times Square, head south on Broadway Avenue towards 42nd Street. Turn left onto 7th Avenue and continue until you reach 34th Street. Turn right onto 34th Street and walk west towards the Hudson River. Cross over the Hudson River via the Lincoln Tunnel and continue onto NJ-495 West. Follow signs for New Jersey Turnpike/I-95 South. Merge onto I-95 South and continue for approximately 10 miles. Take exit 16E towards Lincoln Tunnel/NJ-495 East and merge onto NJ-495 East. Cross back over the Hudson River via the Lincoln Tunnel and follow signs for 42nd Street. Exit the tunnel and turn right onto 42nd Street. Continue east on 42nd Street until you reach Times Square.",
    };
  },
  methods: {
    async setGPTText(GPTText) {
      let { data: res } = await getRecomRouteMsg(GPTText);
      // if (res.code !== 200){
      //   console.error("getRecomRouteMsg error")
      //   return
      // }
      this.routeInfoList = res.data.route_list;
      this.updateText();
      this.updateTag();
      this.updateDistance();
      console.log("routeInfoList", this.routeInfoList);
    },
    setChooseRoadIndex(chooseRoadIndex) {
      this.homeRoadIndex = chooseRoadIndex;
      // 更新文本
      this.updateText();
      this.updateTag();
      this.updateDistance();
    },
    setPickPoint(pickPointItem) {
      this.pickPointItem = JSON.parse(JSON.stringify(pickPointItem));
    },
    updateText() {
      this.roadDes = this.routeInfoList[this.homeRoadIndex].route_description;
    },
    updateTag() {
      this.poiList = this.routeInfoList[this.homeRoadIndex].poi_list;
    },
    updateDistance() {
      this.distanceList = this.routeInfoList[this.homeRoadIndex].distance_list;
    },
  },
};
</script>
<style  lang="less" scoped>
.outer-card {
  width: 100%;
  height: 100%;
  padding: 0 0.25rem;
  // background-color: #5cb350;
  color: #060606;
  box-sizing: border-box;
  // border-radius: 2px 2px 2px 2px rgba(0, 0, 0, .3);
}
.outer-title {
  height: 5%;
  background-color: rgb(244, 243, 243);
  margin-top: 5px;
  border-radius: 3px;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  #title-left {
    margin-left: 30px;
    // text-align: center;
    display: flex;
    align-items: center;
    #logo {
      width: 30px;
      height: 30px;
    }
    #text {
      text-align: center;
      margin: auto 10px;
      color: rgb(23, 22, 22);
      font-weight: 700;
      font-size: 120%;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  }
  #user-case {
    margin-right: 50px;
    font-weight: 600;
  }
}
.outer-row {
  width: 100%;
  height: 100%;
  margin: 0.125rem;
  display: flex;
  .left-column {
    width: 20%;
    height: 100%;
    #left-top {
      height: 30%;
      position: relative;
      background-color: #5a4c75;
      margin: 0.25rem;
      box-sizing: border-box;
    }
    #left-bottom {
      background-color: #fff;
      height: 93%;
      position: relative;
      background-color: rgb(228, 228, 228);
      margin: 0.25rem;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
  .center-column {
    height: 100%;
    width: 50%;
    overflow: hidden;
    #center-top {
      height: 70%;
      position: relative;
      background-color: #e7e5ed;
      margin: 0.25rem;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      #map-title {
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
      #map-content {
        flex: 20;
        background-color: #e66f6f;
      }
    }
    #center-bottom {
      background-color: #e7e5ed;
      height: 22.3%;
      margin: 0.3125rem;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .right-column {
    height: 100%;
    // display: flex;
    // flex-direction: column;
    width: 30%;
    #right-top {
      background-color: #e7e5ed;
      margin: 0.25rem;
      // flex: 4;
      height: 35%;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
    }
    #right-center {
      background-color: #e7e5ed;
      height: 34%;
      margin: 0.3125rem;
      position: relative;
      border-radius: 10px;
    }
    #right-bottom {
      background-color: #e7e5ed;
      height: 23%;
      // flex: 6;
      margin: 0.3125rem;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
