<template>
  <div class="topicDetails">
    <Layout>
      <Content class="content">
        <Card class="content-topBar">
          <div class="topBar-main">
            <div class="welcome">{{ info.title }}</div>
            <div class="topBarInfo">
              <div>
                <p>
                  发布人：<a>{{ user.username }}</a>
                </p>
                <p>创建时间：{{ info.createTime }}</p>
                <p>点赞数：{{ info.praise }}</p>
              </div>
              <div>
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
                <p>评论数：{{ info.chat }}</p>
                <p>阅读量：{{ info.eye }}</p>
              </div>
              <div class="reply">
                <Button type="error" size="large">回复评论</Button>
              </div>
            </div>
          </div>
        </Card>
        <div class="topicInfo">
          <Tabs type="card">
            <TabPane label="详情">
              <div class="topicBody">
                <div class="outline">简介：{{ info.outline }}</div>
                <p class="topicText">{{ info.body }}</p>
                <div class="imgBox">
                  <img :src="info.imgUrl" />
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
export default {
  name: "TopicDetails",
  data() {
    return {
      aid: "",
      info: {},
      user: {},
      cateGory: [],
    };
  },
  created() {
    this.aid = this.$route.params.id;
    // 获得当前详情
    this.$artApi
      .list({
        aid: this.aid,
      })
      .then((result) => {
        this.info = result.data[0];
        // 用户数据
        this.$userApi
          .userPublicInfo({
            uid: this.info.uid,
          })
          .then((result) => {
            if (result.ret === 200) {
              this.user = result.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        // 分类列表
        this.$categoryApi
          .list()
          .then((result) => {
            if (result.ret === 200) {
              // 获得所有分类
              let classes = [];
              for (let i = 0; i < result.data.length; i++) {
                classes.push(result.data[i].body);
              }
              // 获得当前文章的分类
              [...this.info.cid.split(",")].forEach((element) => {
                this.cateGory.push(classes[element]);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      this.$artApi
        .articleViews({
          aid: parseInt(this.aid),
        })
        .then((result) => {
          if (result.ret === 400) {
            console.log(result.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
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

        p {
          font-size: 18px;
          padding: 5px 0;

          button {
            margin-right: 10px;
          }
        }

        .reply {
          button {
            position: absolute;
            right: 40px;
            bottom: 40px;
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