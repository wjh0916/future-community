<template>
  <div class="top">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          :active-name="$route.name"
          class="navMenu"
        >
          <div class="navLeft">
            <MenuItem name="Home" to="/" class="logo">
              <h1>未来社区</h1>
            </MenuItem>
            <MenuItem name="Home" to="/">
              <span>首页</span>
            </MenuItem>
            <MenuItem name="Topic" :to="{ name: 'Topic' }">
              <span>话题</span>
            </MenuItem>
            <MenuItem name="TopicClass" :to="{ name: 'TopicClass' }">
              <span>话题分类</span>
            </MenuItem>
          </div>
          <div class="navRight">
            <MenuItem name="navSearch" class="navSearch">
              <Input
                search
                placeholder="请输入要搜索的内容"
                v-model="searchKey"
                @on-search="search"
              />
            </MenuItem>
            <Submenu name="navUser">
              <template slot="title">
                <div class="userAvatar">
                  <Avatar :src="this.userList.avatar" />
                </div>
                {{ userList.username }}
              </template>
              <MenuItem name="4-1">用户中心</MenuItem>
              <MenuItem
                name="4-2"
                :to="{
                  name: 'Personal',
                }"
                >个人资料</MenuItem
              >
              <MenuItem name="4-3" @click.native="modal1 = true">
                修改头像
                <Modal v-model="modal1" width="360">
                  <p slot="header" style="color: #f60; text-align: center">
                    <span>修改头像</span>
                  </p>
                  <div style="text-align: center">
                    <Form hide-required-mark>
                      <FormItem>
                        <el-upload
                          action="#"
                          list-type="picture-card"
                          :before-upload="beforeAvatarUpload"
                          :on-preview="handlePictureCardPreview"
                          :on-change="handleChange"
                          :on-remove="handleRemove"
                          :on-exceed="handleExceed"
                          :limit="1"
                          class="upImg"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="userList.avatarUrl" alt="" />
                        </el-dialog>
                      </FormItem>
                    </Form>
                  </div>
                  <div slot="footer">
                    <Button type="error" size="large" long @click="changeAvatar"
                      >确认修改</Button
                    >
                  </div>
                </Modal>
              </MenuItem>
              <MenuItem name="4-4" @click.native="modal2 = true">
                修改密码
                <Modal
                  title="修改密码"
                  v-model="modal2"
                  :mask-closable="false"
                  @on-ok="changePassword"
                >
                  <Form
                    ref="passwordList"
                    :model="passwordList"
                    :rules="ruleCustom"
                    hide-required-mark
                  >
                    <FormItem prop="originalPassword" label="原密码">
                      <Input
                        type="password"
                        v-model="passwordList.originalPassword"
                      ></Input>
                    </FormItem>
                    <FormItem prop="password" label="设置密码">
                      <Input
                        type="password"
                        v-model="passwordList.password"
                      ></Input>
                    </FormItem>
                    <FormItem prop="confirmPassword" label="确认密码">
                      <Input
                        type="password"
                        v-model="passwordList.confirmPassword"
                      ></Input>
                    </FormItem>
                  </Form>
                </Modal>
              </MenuItem>
              <MenuItem name="4-5" @click.native="loginOut">退出登录</MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Header>
      <Content class="content">
        <Breadcrumb class="Breadcrumb">
          <BreadcrumbItem>未来社区</BreadcrumbItem>
          <BreadcrumbItem>{{ $route.meta.title }}</BreadcrumbItem>
        </Breadcrumb>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Top",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passwordList.confirmPassword !== "") {
          this.$refs.passwordList.validateField("confirmPassword");
        }
        callback();
      }
    };

    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordList.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      searchKey: "",
      modal1: false,
      modal2: false,
      isAuth: false,
      dialogImageUrl: "",
      dialogVisible: false,
      passwordList: {
        originalPassword: "",
        password: "",
        confirmPassword: "",
      },
      ruleCustom: {
        originalPassword: [
          {
            required: true,
            type: "string",
            message: "原密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "密码必须为6到16位数",
            trigger: "blur change",
          },
        ],
        password: [
          {
            required: true,
            type: "string",
            validator: validatePass,
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "密码必须为6到16位数",
            trigger: "blur change",
          },
        ],
        confirmPassword: [
          {
            required: true,
            type: "string",
            validator: validatePassCheck,
            trigger: "blur change",
          },
        ],
      },
    };
  },
  // created() {
  //     if (sessionStorage.getItem("store")) {
  //         this.$store.replaceState(
  //             Object.assign({},
  //                 this.$store.state,
  //                 JSON.parse(sessionStorage.getItem("store"))
  //             )
  //         );
  //         sessionStorage.removeItem("store")
  //     }

  //     window.addEventListener("beforeunload", () => {
  //         sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  //     });
  // },
  computed: {
    ...mapState(["userList"]),

    uid() {
      return JSON.parse(localStorage.getItem("userInfo")).uid;
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      const isImg = file.type.includes("image");

      if (!isImg) {
        this.$message.error("只能上传图片格式!");
      } else {
        if (!isLt2M) {
          this.$message.error("只能上传图片格式并且图片大小不能超过 500KB!");
        }
      }
      this.isAuth = isImg && isLt2M;
      return isImg && isLt2M;
    },
    handleChange(file) {
      if (!this.isAuth) {
        return false;
      }
      this.dialogImageUrl = file.url;

      let formData = new FormData();
      formData.append("file", file.raw);
      this.$commonApi.uploadFile(formData).then((res) => {
        if (res.ret === 200) {
          this.userList.avatarUrl = res.data.url;
          this.$message.success("上传成功");
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {
      this.userList.avatarUrl = "";
    },
    handleExceed() {
      this.$message.warning(`当前只能上传 1 张图片`);
    },
    changeAvatar() {
      this.$userApi
        .upLoadAvatar({
          avatarUrl: this.userList.avatarUrl,
        })
        .then((result) => {
          if (result.ret === 200) {
            this.$store.dispatch("change", this.userList.avatarUrl);
            this.modal1 = false;
            this.$Message.success("头像修改成功");
          } else {
            this.$Message.error(result.msg.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    search() {
      if (this.$route.name !== "Topic") {
        this.$router.push({ name: "Topic" });
      }
      this.$store.commit("getSearchKey", this.searchKey);
    },

    changePassword() {
      this.$userApi
        .modifyingCurrentUserPassword(this.passwordList)
        .then((result) => {
          if (result.ret === 200) {
            this.$Message.success("密码修改成功");
            this.$router.push({
              name: "Login",
            });
          } else {
            this.$Message.error(result.msg.originalPassword);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.passwordList = {
        originalPassword: "",
        password: "",
        confirmPassword: "",
      };
    },

    loginOut() {
      this.$userApi
        .userOut()
        .then(() => {
          localStorage.removeItem("userInfo");
          this.$router.push({
            name: "Login",
          });
          this.$Message.success("已退出登录");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  .logo {
    color: #fff;
  }

  .navMenu {
    display: flex;
    justify-content: space-between;
    min-width: 800px;
  }

  .navRight {
    .navSearch {
      display: inline-block;
    }

    .userAvatar {
      display: inline-block;
      margin-right: 5px;
    }
  }
}
</style>