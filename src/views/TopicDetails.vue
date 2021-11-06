<template>
  <div class="topicDetails">
    <Layout>
      <Content class="content">
        <Card class="content-topBar">
          <div class="topBar-main">
            <div class="welcome">{{ toplicList[0].title }}</div>
            <div class="topBarInfo">
              <div class="topBarInfo-left">
                <p>
                  发布人：<a>{{ toplicList[0].username }}</a>
                </p>
                <p>创建时间：{{ toplicList[0].createTime }}</p>
                <p>点赞数：{{ toplicList[0].praise }}</p>
              </div>
              <div class="topBarInfo-right">
                <div>
                  <p style="display: inline-block">话题分类：</p>
                  <div style="display: inline-block">
                    <Button
                      style="margin-right: 10px"
                      type="info"
                      v-for="(item, index) in cateGory"
                      :key="index"
                      >{{ item }}</Button
                    >
                  </div>
                </div>
                <p>评论数：{{ toplicList[0].chat }}</p>
                <p>阅读量：{{ toplicList[0].eye }}</p>
              </div>
            </div>
          </div>
        </Card>
        <div class="topicInfo">
          <Tabs type="card">
            <TabPane label="详情">
              <div class="topicBody">
                <div class="outline">简介：{{ toplicList[0].outline }}</div>
                <p class="topicText">{{ toplicList[0].body }}</p>
                <div class="imgBox">
                  <img :src="toplicList[0].imgUrl" />
                </div>
              </div>
            </TabPane>
            <TabPane label="评论">评论</TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TopicDetails",
  created() {
    // 文章详情
    this.getDetail();
    // 浏览量
    this.getView();
  },
  computed: {
    ...mapState(["toplicList", "cateGoryList", "commentList"]),
    // 当前文章分类
    cateGory() {
      let cateGory = [];
      [...this.toplicList[0].cid.split(",")].forEach((element) => {
        this.cateGoryList.some((item) => {
          if (item.cid === element) {
            cateGory.push(item.title);
          }
        });
      });
      return cateGory;
    },
  },
  methods: {
    // 文章详情
    getDetail() {
      this.$store.dispatch("asyncGetTopicList", {
        aid: this.$route.params.id,
      });
      this.$store.dispatch("asyncGetCateGoryList");
      this.$store.dispatch("asyncGetCommentList", {
        aid: this.$route.params.id,
      });
    },
    // 浏览量
    getView() {
      setTimeout(() => {
        this.$store.dispatch("asyncGetArticleViews", {
          aid: parseInt(this.$route.params.id),
        });
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.topicDetails {
  .content-topBar {
    min-width: 600px;

    .topBar-main {
      padding: 20px 40px;

      .welcome {
        font-size: 30px;
        font-weight: 700;
      }

      .topBarInfo {
        display: flex;
        justify-content: space-between;

        .topBarInfo-left,
        .topBarInfo-right {
          width: 50%;
        }

        p {
          font-size: 18px;
          padding: 5px 0;

          button {
            margin-right: 10px;
          }
        }
      }
    }
  }

  .topicInfo {
    margin: 40px 0;
    background: #e3e8ee;
    padding: 16px;

    .topicBody {
      .outline {
        margin-bottom: 10px;
        font-size: 14px;
        color: rgb(255, 100, 100);
      }

      .topicText {
        text-indent: 2em;
        font-size: 16px;
      }

      .imgBox {
        margin-top: 20px;
        max-width: 500px;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>