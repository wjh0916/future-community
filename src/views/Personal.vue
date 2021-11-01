<template>
    <div class="personal">
        <Layout>
            <Content class="content">
                <div class="personalTitle">个人资料</div>
                <Form class="main">
                    <FormItem label="用户名">
                        <Input type="text" v-model="userList.username" placeholder="请输入用户名" size="large"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="userList.gender">
                            <Radio label="1" border>男</Radio>
                            <Radio label="2" border>女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="手机号码">
                        <Input type="text" v-model="userList.phone" placeholder="请输入用户名" size="large" disabled></Input>
                    </FormItem>
                    <FormItem label="头像">
                        <el-upload action="#" list-type="picture-card" :before-upload="beforeAvatarUpload"
                            :on-preview="handlePictureCardPreview" :on-change="handleChange" :on-remove="handleRemove"
                            :on-exceed="handleExceed" :limit="1" class="upImg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="userList.avatarUrl" alt="">
                        </el-dialog>
                    </FormItem>
                    <FormItem>
                        <Button type="info" @click="toHome" size="large" style="margin-right: 20px">返回首页</Button>
                        <Button type="info" @click="updateUser" size="large">确认修改</Button>
                    </FormItem>
                </Form>
            </Content>
        </Layout>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        name: 'Personal',
        data() {
            return {
                isAuth: false,
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created() {
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(
                    Object.assign({},
                        this.$store.state,
                        JSON.parse(sessionStorage.getItem("store"))
                    )
                );
                sessionStorage.removeItem("store")
            }

            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state));
            });
        },
        computed: {
            ...mapState(['userList'])
        },
        methods: {
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 0.5;
                const isImg = file.type.includes('image');

                if (!isImg) {
                    this.$message.error("只能上传图片格式!");
                } else {
                    if (!isLt2M) {
                        this.$message.error("只能上传图片格式并且图片大小不能超过 500KB!");
                    }
                }
                this.isAuth = isImg && isLt2M
                return isImg && isLt2M
            },
            handleChange(file) {
                if (!this.isAuth) {
                    return false
                }
                this.dialogImageUrl = file.url;

                let formData = new FormData();
                formData.append("file", file.raw);
                this.$commonApi.uploadFile(formData)
                    .then((res) => {
                        if (res.ret === 200) {
                            this.userList.avatarUrl = res.data.url;
                            this.$message.success('上传成功');
                        }
                    })
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove() {
                this.userList.avatarUrl = ''
            },
            handleExceed() {
                this.$message.warning(`当前只能上传 1 张图片`);
            },
            toHome() {
                this.$router.push({
                    name: 'Home'
                })
            },
            updateUser() {
                let userData = {
                    username: this.userList.username,
                    avatarUrl: this.userList.avatarUrl,
                    gender: this.userList.gender
                }
                this.$userApi.modifyingCurrentUser(userData)
                    .then((result) => {
                        if (result.ret === 200) {
                            this.$router.push({
                                name: 'Home'
                            })
                            this.$Message.success('修改成功')
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .personal {
        height: 100vh;

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