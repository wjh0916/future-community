<template>
    <div class="post">
        <Layout>
            <Content class="content">
                <div class="main">
                    <div class="mainLeft">
                        <div class="postTitle">发布新话题</div>
                        <Form ref="newTopic" :model="newTopic" :label-width="80" hide-required-mark>
                            <FormItem label="话题标题">
                                <Input v-model="newTopic.title" maxlength="50" show-word-limit></Input>
                            </FormItem>
                            <FormItem label="话题分类">
                                <el-checkbox-group v-model="newTopic.category" size="medium" class="postCheckbox">
                                    <el-checkbox-button v-for="(cate,index) in cateChoise" :label="cate" :key="index">
                                        {{cate}}</el-checkbox-button>
                                </el-checkbox-group>
                            </FormItem>
                            <FormItem label="内容">
                                <Input v-model="newTopic.body" type="textarea" :autosize="{minRows: 6,maxRows: 10}"
                                    maxlength="3000" :rows="6" show-word-limit></Input>
                            </FormItem>
                            <FormItem label="图片">
                                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" class="upImg">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="toHome" long>发布新话题</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="mainRight">
                        <div class="textTitle">{{newTopic.title}}</div>
                        <div class="textBody">{{newTopic.body}}</div>
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
                split1: 0.5,
                cateChoise: ['前端', 'Apple', 'Pineapple', 'Grape'],
                newTopic: {
                    title: '',
                    body: '',
                    category: []
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            toHome() {
                this.$router.push('/')
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
            }

            .mainRight {
                width: 50%;

                .textTitle {
                    text-align: center;
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