<template>
  <div class="login">
    <main class="main">
      <Row type="flex" justify="center">
        <Col span="8" class="loginForm">
        <div class="title">登录未来社区</div>
        <Form ref="fromData" :model="fromData" :rules="fromRule">
          <FormItem prop="user">
            <Input type="text" v-model="fromData.user" placeholder="请输入昵称" size="large"></Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="fromData.password" placeholder="请输入密码" size="large"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('fromData')" size="large" long>登录</Button>
          </FormItem>
          <FormItem>
            <router-link :to="{name:'Register'}">没有账号？去注册</router-link>
          </FormItem>
        </Form>
        </Col>
      </Row>

    </main>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        fromData: {
          user: '',
          password: '',
        },
        fromRule: {
          user: [{
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: '密码不能小于6位数',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$router.push('/')
          } else {
            this.$Message.error('');
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;
    background: url('../assets/bg01.jpg') no-repeat;
    background-position: 100%;
    background-size: cover;

    .main {
      padding-top: 200px;

      .title {
        margin-bottom: 40px;
        font-size: 30px;
        font-weight: 700;
        color: rgb(49, 49, 49);
      }

      .loginForm {
        background: rgba(255, 255, 255, 0.7);
        padding: 60px 120px;
        border-radius: 12px;
        min-width: 500px;

        .ivu-form-item {
          margin-bottom: 36px;
        }
      }
    }
  }
</style>