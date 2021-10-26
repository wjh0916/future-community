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
            <TabPane label="详情">详情</TabPane>
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
        card: {
          title: "title",
          outline: "维护费春秋五霸分区霸分区我不违法全部霸分区我不违法全部我不违法全部丢去武汉",
          praise: "888",
          eye: "999",
          createTime: "2020-12-12",
          chat: "22",
          category: [{
              id: 1,
              title: "前端",
            },
            {
              id: 2,
              title: "后端",
            },
            {
              id: 3,
              title: "大数据",
            },
          ],
        }
      }
    },
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