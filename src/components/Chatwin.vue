<template>
  <div class="chat-window">
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== '1001'">
            <div class="emoji-container">
              <img src="@/assets/img/emoji/ChatGPT.png" alt="" />
            </div>
            <div class="chat-text" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <!-- <div class="info-time">
              <img src="@/assets/img/emoji/smiling-face.png" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div> -->
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="emoji-container">
              <img src="@/assets/img/emoji/smiling-face.png" alt="" />
            </div>
            <!-- <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img src="@/assets/img/emoji/smiling-face.png" alt="" />
            </div> -->
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <!-- <div class="emoji boxinput" @click="clickEmoji">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div> -->
        <!-- <div class="emoji-content">
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
          ></Emoji>
        </div> -->
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/send.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { animation } from "@/util/util";
import { getChatMsg } from "@/api/getData";

export default {
  //   components: {
  //     HeadPortrait,
  //     Emoji,
  //     FileCard,
  //   },
  props: {
    frinedInfo: Object,
    default() {
      return {};
    },
  },
  watch: {
    frinedInfo() {
      this.getFriendChatMsg();
    },
  },
  data() {
    return {
      defaultChatList: [
        {
          //   headImg: require("@/assets/img/head_portrait.jpg"),
          name: "大毛是小白",
          time: "09：12 AM",
          msg: "Hello! Thanks for using RouteGPT! Hope you can have a wonderful trip!Please input \"OK\" to start",
          chatType: 0, //信息类型，0文字，1图片
          uid: "1000", //uid
          round: 0,
        },
        {
          name: "大毛是小白",
          time: "09：12 AM",
          msg: "Step1: Can you write a few description of yourself?",
          chatType: 0, //信息类型，0文字，1图片
          uid: "1000", //uid
          round: 1,
        },
        {
          name: "大毛是小白",
          time: "09：12 AM",
          msg: "Step2: Can you write your demand of this trip?",
          chatType: 0, //信息类型，0文字，1图片
          uid: "1000", //uid
          round: 2,
        },
        {
          name: "大毛是小白",
          time: "09：12 AM",
          msg: "OK, Thanks",
          chatType: 0, //信息类型，0文字，1图片
          uid: "1000", //uid
          round: 3,
        },
      ],
      chatList: [
        {
          //   headImg: require("@/assets/img/head_portrait.jpg"),
          name: "大毛是小白",
          time: "09：12 AM",
          msg: "Hello! Thanks for using RouteGPT! Hope you can have a wonderful trip!Please input \"OK\" to start",
          chatType: 0, //信息类型，0文字，1图片
          uid: "1000", //uid
          round: 0,
        },
      ],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      userDescription:"",
      demandDescription:""
    };
  },
  mounted() {
    this.getFriendChatMsg();
  },
  watch: {},
  methods: {
    //获取聊天记录
    getFriendChatMsg() {
      let params = {
        frinedId: this.frinedInfo.id,
      };
      getChatMsg(params).then((res) => {
        this.chatList = res;
        this.chatList.forEach((item) => {
          if (item.chatType == 2 && item.extend.imgType == 2) {
            this.srcImgList.push(item.msg);
          }
        });
        this.scrollBottom();
      });
    },
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList);
      // 判断到第几轮对话
      switch (this.chatList.length % 7) {
        // 开始
        case 2: {
          let stepOneText = JSON.parse(JSON.stringify(this.defaultChatList[1]));
          this.chatList.push(stepOneText);
          break;
        }
        case 4: {
          this.userDescription = msgList.msg;
          let stepTwoText = JSON.parse(JSON.stringify(this.defaultChatList[2]));
          this.chatList.push(stepTwoText);
          break;
        }
        case 6: {
          this.demandDescription = msgList.msg;
          let finishText = JSON.parse(JSON.stringify(this.defaultChatList[3]));
          this.chatList.push(finishText);
          //启动动画
          //传值
          this.$emit('setGPTText',{user_description: this.userDescription, demand_description: this.demandDescription})

          break;
        }
      }
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    //发送文字信息
    sendText() {
      if (this.inputMsg) {
        let chatMsg = {
          //   headImg: require("@/assets/img/head_portrait.jpg"),
          name: "大毛是小白",
          time: "09：12 AM",
          msg: this.inputMsg,
          chatType: 0, //信息类型，0文字，1图片
          uid: "1001", //uid
        };
        this.sendMsg(chatMsg);
        // this.$emit('personCardSort', this.frinedInfo.id)
        this.inputMsg = "";
      } else {
        // this.$message({
        //   message: "消息不能为空哦~",
        //   type: "warning",
        // });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  position: relative;

  .botoom {
    width: 100%;
    height: 100%;
    // background-color: rgb(50, 54, 68);
    // border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    .chat-content {
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      padding: 10px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 5px;
          display: flex;
          //   flex-direction: column;
          justify-content: flex-start;
          align-items: flex-end;
          .chat-text {
            font-size: 10px;
            max-width: 90%;
            padding: 10px;
            border-radius: 10px 10px 10px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
          }
          img {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 5px;
          position: relative;
          display: flex;
          //   flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            // float: right;
            font-size: 10px;
            display: inline-block;
            max-width: 90%;
            padding: 10px;
            border-radius: 10px 10px 2px 10px;
            background-color: rgb(179, 181, 182);
            color: #0f0f0f;
            &:hover {
              background-color: rgb(150, 172, 195);
            }
          }
          img {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 5px;
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 100%;
      position: absolute;
      bottom: 7px;
      //   margin: 3%;
      display: flex;
      .boxinput {
        width: 10%;
        // height: 30px;
        background-color: rgb(66, 70, 86);
        border-radius: 5px;
        // border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 80%;
        height: 30px;
        background-color: rgb(246, 246, 246);
        border-radius: 10px;
        box-shadow: 0px 0px 2px 0px rgb(75, 76, 77);
        border: 1px solid rgb(148, 150, 150);
        padding: 5px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 12px;
        color: #0b0b0b;
        font-weight: 100;
        // margin: 0 10px;
        &:focus {
          outline: none;
        }
      }
      .send {
        margin-left: 5px;
        background-color: rgb(207, 210, 213);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgb(75, 76, 77);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgb(57, 57, 58);
        }
      }
    }
  }
}
</style>