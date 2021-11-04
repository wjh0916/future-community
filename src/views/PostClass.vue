<template>
  <div class="PostClass">
    <Layout>
      <Content class="content">
        <div class="personalTitle">添加新分类</div>
        <Form
          class="main"
          ref="category"
          :model="category"
          :rules="ruleCustom"
          :label-width="80"
          hide-required-mark
        >
          <FormItem prop="title" label="分类标题">
            <Input
              v-model="category.title"
              maxlength="20"
              show-word-limit
            ></Input>
          </FormItem>
          <FormItem prop="body" label="分类主体">
            <Input
              v-model="category.body"
              maxlength="50"
              show-word-limit
            ></Input>
          </FormItem>
          <FormItem label="图片">
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
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              style="margin-right: 20px"
              size="large"
              @click="backToPost"
              >返回话题发布</Button
            >
            <Button
              type="primary"
              @click="handleSubmit('category')"
              size="large"
              >发布新分类</Button
            >
          </FormItem>
        </Form>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "PostClass",
  data() {
    return {
      category: {
        title: "",
        body: "",
        imgUrl: "",
      },
      isAuth: false,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleCustom: {
        title: [
          {
            required: true,
            type: "string",
            message: "标题不能为空",
            trigger: "blur",
          },
          {
            pattern: /^.*[^\d].*$/,
            message: "标题不能为纯数字",
            trigger: "blur change",
          },
        ],
        body: [
          {
            required: true,
            type: "string",
            message: "内容不能为空",
            trigger: "blur",
          },
          {
            pattern: /^.*[^\d].*$/,
            message: "内容不能为纯数字",
            trigger: "blur change",
          },
        ],
        outline: [
          {
            required: true,
            type: "string",
            message: "简介不能为空",
            trigger: "blur",
          },
          {
            pattern: /^.*[^\d].*$/,
            message: "简介不能为纯数字",
            trigger: "blur change",
          },
        ],
      },
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 51.2;
      const isImg = file.type.includes("image");

      if (!isImg) {
        this.$Message.error("只能上传图片格式!");
      } else {
        if (!isLt2M) {
          this.$Message.error("只能上传图片格式并且图片大小不能超过 50MB!");
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
          this.category.imgUrl = res.data.url;
          this.$Message.success("上传成功");
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {
      this.dialogImageUrl = "";
      this.category.imgUrl = "";
    },
    handleExceed() {
      this.$Message.warning(`当前只能上传 1 张图片`);
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$categoryApi
            .post(this.category)
            .then((result) => {
              if (result.ret === 200) {
                this.$router.push({
                  name: "Post",
                });
                this.$Message.success("发布成功");
              } else {
                console.log(result);
                this.$Message.error(
                  result.msg.title
                    ? result.msg.title
                    : "" + "，" + result.msg.imgUrl
                    ? result.msg.imgUrl
                    : ""
                );
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

    backToPost() {
      this.$router.push({
        name: "Post",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.PostClass {
  height: calc(100vh - 105px);

  .ivu-layout {
    height: 100%;
    overflow-y: auto;
  }

  .content {
    .personalTitle {
      font-size: 26px;
      font-weight: 700;
      padding-top: 5%;
      margin-bottom: 20px;
      text-align: center;
    }

    .main {
      width: 50%;
      margin: 0 auto;

      .ivu-form-item {
        margin: 40px 0;
      }
    }
  }
}
</style>