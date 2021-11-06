<template>
  <div class="topic">
    <Layout>
      <Content class="content">
        <div class="topic-title">所有话题</div>
        <div class="topic-main">
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
            :total="toplicList.length"
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
      </Content>
    </Layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Topic",
  created() {
    this.asyncGetTopicList();
  },
  data() {
    return {
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
    ...mapState(["toplicList", "searchKey"]),

    showList() {
      let start = (this.page.pageNumber - 1) * this.page.pageSize;
      let end = this.page.pageNumber * this.page.pageSize;
      let showList = this.toplicList.slice(start, end);
      return showList;
    },
  },
  methods: {
    asyncGetTopicList() {
      this.$store.dispatch("asyncGetTopicList", { body: this.searchKey });
      this.$store.commit("getSearchKey", '');
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

      this.toplicList.filter((value) => {
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
.topic {
  .topic-title {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin: 10px 0;
  }

  .topic-main {
    .ivu-card:hover img {
      transform: scale(1.2);
    }

    .card-img {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 100%;
        transition: all 500ms;
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
</style>