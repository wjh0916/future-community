<template>
  <div class="topicDetails">
    <Layout>
      <Content class="content">
        <Card class="content-topBar">
          <div class="topBar-main">
            <div class="welcome">{{card.title}}</div>
            <div class="topBarInfo">
              <div>
                <p>发布人：</p>
                <p>创建时间：{{card.createTime}}</p>
                <p>点赞数：{{card.praise}}</p>
              </div>
              <div>
                <p>
                  话题分类：
                  <Button type="info" v-for="cg in card.category" :key="cg.id">{{cg.title}}</Button>
                </p>
                <p>评论数：{{card.chat}}</p>
                <p>阅读量：{{card.eye}}</p>
              </div>
              <div class="reply">
                <Button type="error" size="large">回复评论</Button>
              </div>
            </div>
          </div>
        </Card>
        <div class="topicInfo">
          <Tabs type="card">
            <TabPane label="详情">{{card.body}}</TabPane>
            <TabPane label="评论">评论</TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: 'TopicDetails',
    data() {
      return {
        card: []
      }
    },
    created() {
      let aid = this.$route.params.id
      this.$artApi.list({
          aid
        })
        .then((result) => {
          this.card = result.data[0]
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
    }
  }
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


    }
  }
</style>