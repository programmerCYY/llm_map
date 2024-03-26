<template>
  <div id="map-container">
    <div id="map-title"><span>Map &amp Route</span></div>
    <div id="map_canvas"></div>
  </div>
</template>

<script>
export default {
  name: "GGMap",
  props: {
    routeInfoList: Array,
  },
  watch: {
    routeInfoList() {
      this.clearPositionInfoList();
      this.changeRouteKey();
      this.changePoints();
      this.mapBuild();
      this.drawRoad(0);
    },
  },
  data() {
    return {
      mapInstance: null,
      show: false,
      center: { lng: -74.00816, lat: 40.74213 },
      roadColor: ["red", "orange", "yellow", "green", "blue"],
      roadMsg: [
        {
          points: [
            {
              position: { lng: -74.00816, lat: 40.74213 },
              name: "pos1",
            },
            { position: { lng: -74.00703, lat: 40.74161 }, name: "pos2" },
            { position: { lng: -74.00536, lat: 40.74096 }, name: "pos3" },
            { position: { lng: -74.00484, lat: 40.74164 }, name: "pos4" },
            { position: { lng: -74.0043, lat: 40.74226 }, name: "pos5" },
          ],
        },
        {
          points: [
            {
              position: { lng: -74.00816, lat: 40.74213 },
              name: "pos1",
            },
            { position: { lng: -74.00771, lat: 40.7428 }, name: "pos2" },
            { position: { lng: -74.00484, lat: 40.74164 }, name: "pos3" },
            { position: { lng: -74.0043, lat: 40.74226 }, name: "pos4" },
          ],
        },
        // {
        //   points: [
        //     {
        //       position: { lng: -74.00816, lat: 40.74213 },
        //       name: "pos1",
        //     },
        //     { position: { lng: -74.00771, lat: 40.7428 }, name: "pos2" },
        //     { position: { lng: -74.00719, lat: 40.7435 }, name: "pos3" },
        //     { position: { lng: -74.0043, lat: 40.74226 }, name: "pos4" },
        //   ],
        // },
      ],
      chooseRoadIndex: 0,
      roadPathObj: [],
      markers: [
        {
          position: { lng: -74.00816, lat: 40.74213 },
          name: "Start Point",
        },
        { position: { lng: -74.0043, lat: 40.74226 }, name: "End Point" },
      ],
      icon: "../assets/location.svg",
      positionPointInfoList: [],
    };
  },
  mounted() {
    this.mapBuild(); //初始化实例之后调用
    this.drawRoad(0);
  },
  methods: {
    //  地图实例
    mapBuild() {
      var MarkerWithLabel = require("markerwithlabel")(google.maps);
      //地图实例，zoom：缩放比例
      this.mapInstance = new google.maps.Map(
        document.getElementById("map_canvas"),
        {
          zoom: 17,
          center: this.center,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
      );
      //遍历this.markers 创建标记(起点和终点)
      this.markers.map((item) => {
        let marker = new MarkerWithLabel({
          position: item.position,
          // icon: require("@/assets/img/logo.png"), //标记自定义图标
          draggable: false, //不可拖动
          map: this.mapInstance, //地图实例
          labelContent: item.name, //label的内容
          // 调整框框
          labelAnchor: new google.maps.Point(40, 0),
          labelStyle: {
            padding: "5px 10px",
            // 此处的中划线需要合并并大写，例如：backgroundColor
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            fontWeight: 600,
            width: "30px",
            opacity: 1,
          },
        });
        // 此处可以为marker添加事件
        google.maps.event.addListener(marker, "click", function (e) {
          console.log("点击事件");
        });
      });
      //地点绘制
      this.positionPointInfoList.map((positionPointInfoItem) => {
        let marker = new MarkerWithLabel({
          position: positionPointInfoItem.position,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
          }, //标记自定义图标
          draggable: false, //不可拖动
          map: this.mapInstance, //地图实例
        });
        let infowindow = new google.maps.InfoWindow({
          content: this.buildContent(positionPointInfoItem),
          // ariaLabel: "Uluru",
        });
        google.maps.event.addListener(marker, "click", function (e) {
          //console.log("点击事件", e);
          infowindow.open({
            anchor: marker,
            map:this.mapInstance
          })
        });
      });
    },
    drawRoad(clickRoadId = -1) {
      this.roadMsg.forEach((roadElement, index) => {
        let roadPointMsg = roadElement.points.map(
          (pointElement, pointIndex) => {
            return pointElement.position;
          }
        );
        let roadPath = new google.maps.Polyline({
          path: roadPointMsg,
          geodesic: true,
          // editable: true,
          strokeColor: this.roadColor[index],
          strokeOpacity:
            clickRoadId !== -1 && clickRoadId !== index ? 0.3 : 1.0,
          strokeWeight: 15,
        });
        roadPath.setMap(this.mapInstance);
        this.roadPathObj.push(roadPath);
        // 删除原有监听器
        this.removeRoadListener(roadPath);
        // 给每一条路设置点击监听
        google.maps.event.addListener(roadPath, "click", (e) => {
          // Check if click was on a vertex control point
          this.removeAllRoadObj();
          this.drawRoad(index);
          this.chooseRoadIndex = index;
          this.$emit("setChooseRoadIndex", this.chooseRoadIndex);
          console.log(this.roadMsg[index]);
          // console.log(roadPath);
        });
        //     deleteMenu.open(map, flightPath.getPath(), e.vertex);
        //   });
        // this.mapInstance.addListener('click', (e) => {
        //   console.log("eee", e)
        // });
      });
    },
    removeRoadListener(roadPath) {
      google.maps.event.clearInstanceListeners(roadPath, "click");
    },
    removeAllRoadObj() {
      this.roadPathObj.forEach((roadPathObjItem) => {
        roadPathObjItem.setMap(null);
      });
      this.roadPathObj = [];
    },
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
    changePoints() {
      // 更换起点终点和视野中心
      let firstPointsList = this.roadMsg[0].points;
      let newStartingPoint = JSON.parse(
        JSON.stringify(firstPointsList[0].position)
      );
      let newEndingPoint = JSON.parse(
        JSON.stringify(firstPointsList[firstPointsList.length - 1].position)
      );
      this.markers[0].position = newStartingPoint;
      this.markers[1].position = newEndingPoint;
      this.center = newStartingPoint;
    },
    addPositionPoint(positionPoint) {
      let ifExit = this.positionPointInfoList.find((positionPointItem) => {
        return (
          positionPointItem.position.lng === positionPoint.position.lng &&
          positionPointItem.position.lat === positionPoint.position.lat
        );
      });
      if (!ifExit) {
        this.positionPointInfoList.push(positionPoint);
      }
    },
    clearPositionInfoList() {
      this.positionPointInfoList = [];
    },
    buildContent(property) {
      const content = document.createElement("div");

      content.classList.add("property");
      content.innerHTML = `
    <div class="icon">
        <img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png">
    </div>
    <div class="details">
        <div class="positionId">${property.positionId}</div>
        <div class="address">${property.position.lng} ${property.position.lat}</div>
        <div class="features">
        <div>
            <img src="https://cdn-icons-png.flaticon.com/512/372/372827.png">
            <span>${property.positionTag[0]}</span>
        </div>
        <div>
            <img src="https://cdn-icons-png.flaticon.com/512/372/372827.png">
            <span>${property.positionTag[1]}</span>
        </div>
        <div>
            <img src="https://cdn-icons-png.flaticon.com/512/372/372827.png">
            <span>${property.positionTag[2]} </span>
        </div>
        </div>
    </div>
    `;
      return content;
    },
  },
};
</script>
<style lang="less" scoped>
#map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  #map_canvas {
    flex: 16;
    // height: 896px;
    width: 100%;
  }
}
</style>
