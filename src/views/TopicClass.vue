<template>
  <div class="topicClass">
    <Layout>
      <Content class="content">
        <div class="topicClass-title">所有分类</div>
        <div class="topicClass-main">
          <Row :gutter="50">
            <Col
              span="8"
              v-for="l in showList"
              :key="l.cid"
              style="margin: 20px 0"
            >
              <Card :bordered="false" :key="l.cid">
                <div class="card-img">
                  <img :src="l.imgUrl" />
                </div>
                <div class="card-title">
                  <p>{{ l.title }}</p>
                </div>
                <div class="card-hr"></div>
                <div class="card-info">
                  <p>{{ l.body }}</p>
                </div>
              </Card>
            </Col>
          </Row>
          <Page
            class="page"
            :total="cateGoryList.length"
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
  name: "TopicClass",
  created() {
    this.asyncGetCateGoryList();
    console.log(this.cateGoryList);
  },
  data() {
    return {
      page: {
        pageNumber: 1,
        pageSize: 9,
        start: 1,
        end: 9,
      },
    };
  },
  computed: {
    ...mapState(["cateGoryList"]),

    showList() {
      let start = (this.page.pageNumber - 1) * this.page.pageSize;
      let end = this.page.pageNumber * this.page.pageSize;
      let allList = this.cateGoryList
      let showList = allList.reverse().slice(start, end);
      return showList;
    },
  },
  methods: {
    asyncGetCateGoryList() {
      this.$store.dispatch("asyncGetCateGoryList");
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
.topicClass {
  .topicClass-title {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin: 10px 0;
  }

  .topicClass-main {
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

    .page {
      text-align: right;
      margin: 20px 0;
    }
  }
}
</style>