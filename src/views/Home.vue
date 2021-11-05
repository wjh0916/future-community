<template>
  <div class="home">
    <Layout>
      <Content class="content">
        <div
          class="topBar"
          :style="
            'background-image:url(' + require('@/assets/navbg01.jpg') + ')'
          "
        >
          <div class="topBar-user">
            <div class="topBar-userAvatar">
              <Avatar
                shape="square"
                :src="this.userList.avatar"
                class="userAvatar-img"
              />
            </div>
            <div class="topBar-title">
              <div class="topBar-userName">{{ userList.username }}</div>
              <div class="topBar-welcome">{{ date }}好，欢迎您回来</div>
              <div class="topBar-msg">你发布的话题有0个新的回复</div>
            </div>
          </div>
          <div class="topBar-post">
            <Button type="primary" shape="circle" size="large" @click="toPost"
              >创建新话题 / 分类</Button
            >
          </div>
        </div>
        <div class="navBar">
          <Carousel autoplay v-model="imgNum" :autoplay-speed="2400" radius-dot trigger="click" loop>
            <CarouselItem v-for="(img, index) in carouseImg" :key="index">
              <div class="demo-carousel">
                <img :src="img.url" alt="" />
              </div>
            </CarouselItem>
          </Carousel>
        </div>
        <div class="recommend">
          <div class="recommend-title">
            <span>话题推荐</span>
          </div>
          <div class="recommend-main">
            <Row :gutter="50">
              <Col
                span="8"
                v-for="l in showList"
                :key="l.aid"
                style="margin: 20px 0"
              >
                <Card :bordered="false" :key="l.aid">
                  <div class="card-img">
                    <img :src="l.imgUrl" />
                  </div>
                  <div class="card-title">
                    <p>{{ l.title }}</p>
                  </div>
                  <div class="card-hr"></div>
                  <div class="card-info">
                    <div class="card-info-left">
                      <Button type="info" @click="toTopicDetails(l.aid)"
                        >点击查看</Button
                      >
                    </div>
                    <div class="card-info-right">
                      <div class="card-info-icon">
                        <Icon type="ios-text-outline" />
                        {{ l.chat }}
                      </div>
                      <div class="card-info-icon">
                        <Icon type="ios-eye" />
                        {{ l.eye }}
                      </div>
                      <div class="card-info-icon praise">
                        <Icon
                          :type="
                            praiseList[l.aid] ? 'md-heart' : 'md-heart-outline'
                          "
                          @click="isPraise(l.aid)"
                        />
                        {{ l.praise }}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <Page
              class="page"
              :total="list.length"
              :current="page.pageNumber"
              :page-size="page.pageSize"
              :page-size-opts="[9, 15, 30, 60]"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              show-total
              show-sizer
              show-elevator
            />
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  created() {
    this.$userApi
      .currentUser()
      .then((result) => {
        if (result.ret === 200) {
          this.$store.commit("add", result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.$artApi
      .list()
      .then((result) => {
        this.list = result.data.reverse();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      imgNum: 0,
      carouseImg: [
        {
          url: require("@/assets/banner01.jpg"),
        },
        {
          url: require("@/assets/banner02.jpg"),
        },
        {
          url: require("@/assets/banner03.jpg"),
        },
        {
          url: require("@/assets/banner04.jpg"),
        },
      ],
      list: [],
      praiseList: [],
      page: {
        pageNumber: 1,
        pageSize: 9,
        start: 1,
        end: 9,
      },
    };
  },
  computed: {
    ...mapState(["userList"]),

    date() {
      let date = new Date(this.userList.loginTime);
      let hours = date.getHours();
      if (hours >= 0 && hours < 12) {
        return "上午";
      } else {
        return "下午";
      }
    },

    showList() {
      let start = (this.page.pageNumber - 1) * this.page.pageSize;
      let end = this.page.pageNumber * this.page.pageSize;
      let showList = this.list.slice(start, end);
      return showList;
    },
  },
  methods: {
    toPost() {
      this.$router.push({
        name: "Post",
      });
    },
    toTopicDetails(id) {
      this.$router.push({
        name: "TopicDetails",
        params: {
          id: id,
        },
      });
    },
    isPraise(index) {
      if (this.praiseList[index]) {
        this.praiseList[index] = !this.praiseList[index];
      } else {
        this.praiseList[index] = true;
      }

      this.list.filter((value) => {
        if (value.aid === index) {
          if (this.praiseList[index]) {
            value.praise++;
          } else {
            value.praise--;
          }
        }
      });
    },
    changePage(pageNumber) {
      this.page.pageNumber = pageNumber;
    },
    changePageSize(pageSize) {
      this.page.pageSize = pageSize;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .content {
    .topBar {
      min-width: 600px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 100%;
      padding: 20px;
      height: 215px;
      position: relative;

      .topBar-user {
        display: flex;

        .topBar-userAvatar {
          width: 90px;
          height: 90px;
          margin-right: 15px;
        }

        .userAvatar-img {
          width: 100%;
          height: 100%;
        }

        .topBar-title {
          color: #fff;

          .topBar-userName {
            font-size: 28px;
            font-weight: 700;
          }

          .topBar-welcome {
            font-size: 20px;
          }

          .topBar-msg {
            font-size: 14px;
          }
        }
      }

      .topBar-post {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
    }

    .navBar {
      margin: 40px 0;

      .demo-carousel {
        img {
          width: 100%;
          height: 580px;
        }
      }
    }

    .recommend {
      text-align: left;
      position: relative;
      background: rgba(235, 235, 235, 0.363);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;

      .recommend-title {
        span {
          position: relative;
          font-size: 24px;
          font-weight: 700;
          line-height: 36px;
          color: #ee6666;
          display: inline-block;
          background-color: rgb(241, 241, 241);
        }

        span::after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          background: #ee6666;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      .recommend-main {
        margin-top: 20px;

        .card-img {
          width: 100%;
          height: 200px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
            transition: all 500ms;
          }

          img:hover {
            transform: scale(1.2);
          }
        }

        .card-title {
          margin-top: 15px;

          p {
            font-size: 18px;
            font-weight: 700;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .card-hr::after {
          content: "";
          display: block;
          width: 100%;
          height: 1px;
          background: rgba(209, 209, 209, 0.541);
          margin: 15px 0;
        }

        .card-info,
        .card-info-right {
          display: flex;
        }

        .card-info {
          justify-content: space-between;
          align-items: center;

          .card-info-right {
            .card-info-icon {
              margin-right: 10px;

              .ivu-icon {
                font-size: 18px;
                vertical-align: middle;
              }
            }

            .praise {
              .ivu-icon {
                color: red;
              }
            }
          }
        }

        .page {
          text-align: right;
          margin: 20px 0;
        }
      }
    }
  }
}
</style>