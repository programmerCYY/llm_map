<template>
  <div id="kw-container">
    <div id="kw-title">
      <span>Keyword</span>
      <img src="@/assets/img/arrow.png" style="width: 25px; height: 25px" />
    </div>
    <div id="kw_content">
      <div id="current_demand">
        <el-tag
          :key="index"
          v-for="(tag, index) in dynamicTags"
          closable
          type="info"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="mini"
          @click="showInput"
          type="info"
          >+ New Demand</el-button
        >
      </div>
      <div id="default_demand">
        <el-button
          :key="index"
          v-for="(tag, index) in defaultTags"
          size="mini"
          type="info"
          plain
          round
          @click="handleAddTage(tag)"
          >+ {{ tag }}</el-button
        >
      </div>
      <!-- <p>{{ roadDes }}</p> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicTags: ["seafood", "KFC", "shopping"],
      inputVisible: false,
      inputValue: "",
      defaultTags: [
        "Entertainment",
        "Food and dining",
        "Accommodation",
        "Shopping",
        "Healthcare",
        "Education and research",
        "Infrastructure",
        "Financial and business",
        "Tourist attractions",
        "Religious",
        "Government service",
      ],
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleAddTage(tag) {
      console.log("2222", tag);
      console.log(this.dynamicTags.indexOf(tag));
      if (this.dynamicTags.indexOf(tag) === -1) {
        this.dynamicTags.push(tag);
        console.log("333");
      }
    },
  },
};
</script>
<style lang="less" scoped>
#kw-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #kw-title {
    color: #0f0f0e;
    font-weight: 700;
    flex: 1;
    font-size: 17px;
    align-content: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      margin-left: 30px;
    }
    img {
      margin-right: 40px;
    }
  }
  #kw_content {
    flex: 6;
    // height: 896px;
    width: 100%;
    background-color: rgb(239, 244, 244);
    overflow: auto;
    display: flex;
    #current_demand {
      width: 50%;
      background-color: rgb(240, 249, 244);
      border-radius: 10px;
      margin: 0.25rem;
      padding: 1rem;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .el-tag:first-child {
        margin-left: 10px;
      }
    }
    #default_demand {
      width: 50%;
      background-color: rgb(240, 249, 244);
      border-radius: 10px;
      margin: 0.25rem;
      padding: 0.5rem;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .el-button:first-child {
        margin-left: 10px;
      }
      .el-button + .el-button {
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.el-tag + .el-button {
  margin-top: 10px;
}
.el-tag + .el-input {
  margin-top: 10px;
}
.el-tag {
  font-weight: 600;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  font-weight: 600;
  border: #000000;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>