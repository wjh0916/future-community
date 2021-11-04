<template>
  <div class="login">
    <main class="main">
      <Row type="flex" justify="center">
        <Col span="8" class="loginForm">
          <div class="title">登录未来社区</div>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
            <FormItem prop="phone">
              <Input
                type="text"
                prefix="ios-call-outline"
                v-model="formCustom.phone"
                placeholder="请输入手机号"
                size="large"
              ></Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                type="password"
                prefix="ios-unlock-outline"
                v-model="formCustom.password"
                placeholder="请输入密码"
                size="large"
              ></Input>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formCustom')"
                size="large"
                long
                >登录</Button
              >
            </FormItem>
            <FormItem class="toRegister">
              <router-link :to="{ name: 'Register' }"
                >没有账号？去注册</router-link
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </main>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validatePhone = (rule, value, callback) => {
      let reg = new RegExp(
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      );
      if (value === "") {
        callback(new Error("手机号码不能为空"));
        this.codeIsShow = false;
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
        this.codeIsShow = false;
      } else {
        callback();
      }
    };

    return {
      formCustom: {
        phone: "",
        password: "",
      },
      ruleCustom: {
        phone: [
          {
            required: true,
            type: "string",
            validator: validatePhone,
            trigger: "blur change",
          },
        ],
        password: [
          {
            required: true,
            type: "string",
            message: "密码不能为空",
            trigger: "blur change",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$userApi
            .login(this.formCustom)
            .then((result) => {
              let {
                data: { token },
              } = result;

              if (token) {
                this.$router.push({
                  name: "Home",
                });
                this.$Message.success("登录成功");
              } else {
                this.$Message.error(result.msg.error);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: url("../assets/bg01.jpg") no-repeat;
  background-position: 100%;
  background-size: cover;

  .main {
    padding-top: 200px;

    .title {
      margin-bottom: 40px;
      text-align: center;
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

      .toRegister {
        text-align: center;
      }
    }
  }
}
</style>