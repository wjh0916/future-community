<template>
  <div class="personal">
    <Layout>
      <Content class="content">
        <div class="personalTitle">个人资料</div>
        <Form
          class="main"
          :label-width="80"
          ref="userList"
          :model="userList"
          :rules="ruleCustom"
          hide-required-mark
        >
          <FormItem prop="username" label="用户名">
            <Input
              type="text"
              v-model="userList.username"
              placeholder="请输入用户名"
              size="large"
            ></Input>
          </FormItem>
          <FormItem label="性别">
            <RadioGroup v-model="userList.gender">
              <Radio label="0" border>女</Radio>
              <Radio label="1" border>男</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="手机号码">
            <Input
              type="text"
              v-model="userList.phone"
              size="large"
              disabled
            ></Input>
          </FormItem>
          <FormItem label="头像">
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
          <FormItem>
            <p class="warn">
              （注意：右上角数据变化仅供参考，请点击确认修改后完成修改）
            </p>
            <Button type="info" @click="handleSubmit('userList')" size="large"
              >确认修改</Button
            >
          </FormItem>
        </Form>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Personal",
  data() {
    return {
      isAuth: false,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleCustom: {
        username: [
          {
            required: true,
            type: "string",
            message: "昵称不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\d]*$/,
            message: "昵称必须以汉字或字母开头,其它可以是中文,字母或数字",
            trigger: "change blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["userList"]),
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 51.2;
      const isImg = file.type.includes("image");

      if (!isImg) {
        this.$Message.error("只能上传图片格式!");
      } else {
        if (!isLt2M) {
          this.$Message.error("只能上传图片格式并且图片大小不能超过 500KB!");
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
      this.userList.avatar = file.url;

      let formData = new FormData();
      formData.append("file", file.raw);
      this.$commonApi.uploadFile(formData).then((res) => {
        if (res.ret === 200) {
          this.userList.avatarUrl = res.data.url;
          this.$Message.success("上传成功");
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {
      this.userList.avatarUrl = "";
      this.userList.avatar = "";
    },
    handleExceed() {
      this.$Message.warning(`当前只能上传 1 张图片`);
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let userData = {
            username: this.userList.username,
            avatarUrl: this.userList.avatarUrl,
            gender: this.userList.gender,
          };
          this.$userApi
            .modifyingCurrentUser(userData)
            .then((result) => {
              if (result.ret === 200) {
                this.$router.push({
                  name: "Home",
                });
                this.$Message.success("修改成功");
              } else {
                this.$Message.error("图片不能为空");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$Message.error("发布失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  height: calc(100vh - 105px);

  .ivu-layout {
    height: 100%;
    overflow-y: auto;
  }

  .content {
    .personalTitle {
      font-size: 26px;
      font-weight: 700;
      padding-top: 20px;
      margin-bottom: 20px;
      text-align: center;
    }

    .main {
      width: 50%;
      margin: 0 auto;

      .ivu-form-item {
        margin: 40px 0;
      }

      .warn {
        color: red;
        margin-bottom: 10px;
      }
    }
  }
}
</style>