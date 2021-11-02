<template>
    <div class="post">
        <Layout>
            <Content class="content">
                <div class="main">
                    <div class="mainLeft">
                        <div class="postTitle">发布新话题</div>
                        <Form ref="newTopic" :model="newTopic" :rules="ruleCustom" :label-width="80" hide-required-mark>
                            <FormItem prop="title" label="话题标题">
                                <Input v-model="newTopic.title" maxlength="50" show-word-limit></Input>
                            </FormItem>
                            <FormItem label="话题分类">
                                <CheckboxGroup v-model="cid">
                                    <Checkbox :label="cate.cid" border v-for="cate in category" :key="cate.cid">
                                        {{cate.title}}</Checkbox>
                                    <Button type="info" icon="md-add" @click="toPostClass" ghost></Button>
                                </CheckboxGroup>
                            </FormItem>
                            <FormItem prop="body" label="内容">
                                <Input v-model="newTopic.body" type="textarea" :autosize="{minRows: 6,maxRows: 10}"
                                    maxlength="3000" :rows="6" show-word-limit></Input>
                            </FormItem>
                            <FormItem prop="outline" label="简介">
                                <Input v-model="newTopic.outline" maxlength="20" show-word-limit></Input>
                            </FormItem>
                            <FormItem label="图片">
                                <el-upload action="#" list-type="picture-card" :before-upload="beforeAvatarUpload"
                                    :on-preview="handlePictureCardPreview" :on-change="handleChange"
                                    :on-remove="handleRemove" :on-exceed="handleExceed" :limit="1" class="upImg">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="post" long>发布新话题</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="mainRight">
                        <div class="textTitle">{{newTopic.title}}</div>
                        <div class="textOutline" v-show="newTopic.outline !== ''">简介：{{newTopic.outline}}</div>
                        <div class="textBody">{{newTopic.body}}</div>
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </div>
                </div>
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: 'Post',
        data() {
            return {
                category: [],
                cid: [],
                newTopic: {
                    title: '',
                    body: '',
                    outline: '',
                    imgUrl: ''
                },
                isAuth: false,
                dialogImageUrl: '',
                dialogVisible: false,
                ruleCustom: {
                    title: [{
                        required: true,
                        type: 'string',
                        message: '标题不能为空',
                        trigger: 'blur'
                    }, {
                        pattern: /^.*[^\d].*$/,
                        message: '标题不能为纯数字',
                        trigger: 'blur change'
                    }],
                    body: [{
                        required: true,
                        type: 'string',
                        message: '内容不能为空',
                        trigger: 'blur'
                    }, {
                        pattern: /^.*[^\d].*$/,
                        message: '内容不能为纯数字',
                        trigger: 'blur change'
                    }],
                    outline: [{
                        required: true,
                        type: 'string',
                        message: '简介不能为空',
                        trigger: 'blur'
                    }, {
                        pattern: /^.*[^\d].*$/,
                        message: '简介不能为纯数字',
                        trigger: 'blur change'
                    }]
                }
            }
        },
        created() {
            this.$categoryApi.list()
                .then((result) => {
                    if (result.ret === 200) {
                        this.category = result.data
                    }
                }).catch((err) => {
                    console.log(err);
                });
        },
        methods: {
            toPostClass() {
                this.$router.push({
                    name: 'PostClass'
                })
            },

            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 51.2;
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
                            this.newTopic.imgUrl = res.data.url;
                            this.$message.success('上传成功');
                        }
                    })
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove() {
                this.dialogImageUrl = ''
                this.newTopic.imgUrl = ''
            },
            handleExceed() {
                this.$message.warning(`当前只能上传 1 张图片`);
            },
            post() {
                let list = this.newTopic
                let cid = []
                this.cid.forEach((element, index) => {
                    if (index > 0) {
                        cid += ',' + element
                    } else {
                        cid = element
                    }
                })
                list.cid = cid
                this.$artApi.post(list)
                    .then((result) => {
                        if (result.ret === 200) {
                            this.$router.push('/')
                            this.$message.success('发布成功')
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .post {
        .content {
            padding-bottom: 40px;
            height: calc(100vh - 105px);

        }

        .main {
            display: flex;
            margin-top: 20px;
            height: 100%;

            .mainLeft,
            .mainRight {
                padding: 40px 80px;
                overflow-y: auto;
            }

            .postTitle,
            .textTitle {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 20px;
            }

            .mainLeft {
                width: 50%;
                border-right: 1px solid rgb(226, 226, 226);

                .ivu-checkbox-group-item {
                    margin-bottom: 10px;
                }
            }

            .mainRight {
                width: 50%;

                .textTitle,
                .textOutline {
                    text-align: center;
                }

                .textOutline,
                .textBody {
                    margin-bottom: 20px;
                }

                .textOutline {
                    font-size: 14px;
                }

                .textBody {
                    width: 100%;
                    font-size: 16px;
                    word-wrap: break-word;
                    word-break: break-all;
                    text-indent: 2em;
                }
            }
        }
    }
</style>