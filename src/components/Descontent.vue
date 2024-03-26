<template>
  <div id="des-container">
    <div id="des-title"><span>Route Description</span></div>
    <div id="des_text">
      <p>{{ roadDes }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    roadDes: String,
    default() {
      return   "This is the route Description. You can get some text description from this box!Starting from Times Square, head south on Broadway Avenue towards 42nd Street. Turn left onto 7th Avenue and continue until you reach 34th Street. Turn right onto 34th Street and walk west towards the Hudson River. Cross over the Hudson River via the Lincoln Tunnel and continue onto NJ-495 West. Follow signs for New Jersey Turnpike/I-95 South. Merge onto I-95 South and continue for approximately 10 miles. Take exit 16E towards Lincoln Tunnel/NJ-495 East and merge onto NJ-495 East. Cross back over the Hudson River via the Lincoln Tunnel and follow signs for 42nd Street. Exit the tunnel and turn right onto 42nd Street. Continue east on 42nd Street until you reach Times Square."
    }
  },
  watch: {
    roadDes() {
      this.setTextContent
    }

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
      console.log("set right")
    }
  }
};
</script>
<style lang="less" scoped>
#des-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #des-title {
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
  #des_text {
    flex: 10;
    // height: 896px;
    width: 100%;
    background-color: rgb(239, 244, 244);
    padding: 10px;
    overflow: auto;
    p {
    //   padding: 10px 10px;
      line-height: 200%;
      margin: 10px 10px;
    }
  }
}
</style>