<template>
  <div class="home">
    <Layout>
      <Content class="content">
        <div class="topBar">
          <div class="topBar-user">
            <div class="topBar-userAvatar">
              <Avatar shape="square" src="https://picsum.photos/100/100/?image=2" class="userAvatar-img" />
            </div>
            <div class="topBar-title">
              <div class="topBar-userName">慕尘</div>
              <div class="topBar-welcome">上午好，欢迎您回来</div>
              <div class="topBar-msg">你发布的话题有11个新的回复</div>
            </div>
          </div>
          <div class="topBar-post">
            <Button type="primary" shape="circle" size="large" @click="toPost">创建新话题</Button>
          </div>
        </div>
        <div class="navBar">
          <Carousel autoplay v-model="value2" :height="height" radius-dot trigger="click" loop>
            <CarouselItem v-for="(item, index) in carouseImg" :key="index">
              <div class="demo-carousel">
                <img :src="item" alt="">
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
              <Col span="8" v-for="(l,index) in list" :key="l.id">
              <Card :bordered="false" :key="l.id">
                <div class="card-img">
                  <img :src="l.imgArr[0]">
                </div>
                <div class="card-title">
                  <p>{{l.title}}</p>
                </div>
                <div class="card-hr"></div>
                <div class="card-info">
                  <div class="card-info-left">
                    <Button type="info" @click="toTopicDetails(l.id)">点击查看</Button>
                  </div>
                  <div class="card-info-right">
                    <div class="card-info-icon">
                      <Icon type="ios-text-outline" />
                      {{l.chat}}
                    </div>
                    <div class="card-info-icon">
                      <Icon type="ios-eye" />
                      {{l.eye}}
                    </div>
                    <div class="card-info-icon">
                      <Icon :type="l.isPraise ? 'md-heart' : 'md-heart-outline'" @click="isActive(index)" />
                      {{l.praise}}
                    </div>
                  </div>
                </div>
              </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        value2: 0,
        height: 'auto',
        carouseImg: [
          'https://picsum.photos/1600/800/?image=10',
          'https://picsum.photos/1600/800/?image=11',
          'https://picsum.photos/1600/800/?image=12',
          'https://picsum.photos/1600/800/?image=13',
          'https://picsum.photos/1600/800/?image=14'
        ],
        list: [{
          id: 1,
          uId: 1,
          title: '发给四个发给四个发给四个发给四个发给四个发给四个发给四个发给四个发给四个',
          imgArr: ['https://picsum.photos/1600/800/?image=10'],
          eye: 1999,
          chat: 789,
          time: '2021-10-22 077:11:33',
          body: '负担加工费负担加工费负担加工费负担加工费负担加工费负担加工费负担加工费负担加工费',
          praise: 5,
          isPraise: false,
          category: [],
          status: 0
        }, {
          id: 2,
          uId: 1,
          title: '发给四个发给四个发给四个发给四个发给四个发给四个发给四个发给四个发给四个',
          imgArr: ['https://picsum.photos/1600/800/?image=12'],
          eye: 1999,
          chat: 789,
          time: '2021-10-22 077:11:33',
          body: '负担加工费负担加工费负担加工费负担加工费负担加工费负担加工费负担加工费负担加工费',
          praise: 5,
          category: [],
          status: 0
        }]
      }
    },
    methods: {
      toPost() {
        this.$router.push({
          name: 'Post'
        })
      },
      toTopicDetails(id) {
        this.$router.push({
          name: 'TopicDetails',
          params: {
            id: id
          }
        })
      },
      isActive(index) {
        console.log(index);
        this.list[index].isPraise = !this.list[index].isPraise
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    .content {
      .topBar {
        min-width: 600px;
        display: flex;
        justify-content: space-between;
        background: url('https://picsum.photos/1600/1000/?image=10') no-repeat;
        background-size: cover;
        background-position: 100%;
        padding: 20px;
        position: relative;

        .topBar-user {
          display: flex;

          .topBar-userAvatar {
            width: 100px;
            height: 100px;
            margin-right: 15px;
          }

          .userAvatar-img {
            width: 100%;
            height: 100%;
          }

          .topBar-title {
            text-align: left;
            color: #fff;

            .topBar-userName {
              font-size: 28px;
              font-weight: 700;
            }

            .topBar-welcome {
              font-size: 20px;
              margin: 5px 0;
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
            height: 500px;
          }
        }
      }

      .recommend {
        text-align: left;
        position: relative;
        background: rgba(235, 235, 235, 0.363);
        padding: 20px;
        border-radius: 10px;

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
          margin: 25px 0;

          .card-img {
            width: 100%;
            height: 200px;
            border-radius: 5px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
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
            }
          }
        }
      }
    }
  }
</style>