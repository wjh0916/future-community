<template>
    <div class="register">
        <div class=" left-img"
            :style="`background-image: url(https://cdn-go.cn/qq-web/zc.qq.com/latest/v3/img/01-${imgSrc}.jpg)`"
            v-show="imgIsShow">
        </div>
        <main class="main">
            <div class="main-box">
                <div class="welcome">欢迎注册未来社区</div>
                <div class="header">每一天，乐在沟通。</div>
                <Form ref="fromData" :model="fromData" :rules="fromRule">
                    <FormItem prop="user" label="昵称">
                        <Input type="text" v-model="fromData.user" size="large"></Input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <Input type="password" v-model="fromData.password" size="large"></Input>
                    </FormItem>
                    <FormItem prop="tel" label="手机号码">
                        <Input type="tel" v-model="fromData.tel" size="large"></Input>
                    </FormItem>
                    <FormItem prop="tel" label="手机验证码">
                        <Row style="width: 100%" type="flex" justify="space-between">
                            <Col span="16">
                            <Input type="text" v-model="fromData.VerificationCode" size="large"></Input>
                            </Col>
                            <Col flex="atuo" style="text-align: right">
                            <Button type="info" size="large" ghost>获取验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem style="margin-top: 36px">
                        <Row>
                            <Col span="18">
                            <Button type="primary" @click="handleSubmit('fromData')" size="large">立即注册</Button>
                            </Col>
                            <Col span="6">
                            <router-link :to="{name:'Login'}">已有账号？去登陆</router-link>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
        </main>
        <footer class="footer">
            <p>版权所有 &copy; 未来社区</p>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                imgSrc: 1,
                screenWidth: document.documentElement.clientWidth,
                imgIsShow: true,
                fromData: {
                    user: '',
                    password: '',
                    tel: '',
                    VerificationCode: ''
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
                    ],
                    tel: [{
                        required: true,
                        message: '手机号码不能为空',
                        trigger: 'blur'
                    }],
                    VerificationCode: [{
                        required: true,
                        message: '验证码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            changeImgSrc() {
                setInterval(() => {
                    if (this.imgSrc < 4) {
                        this.imgSrc++
                    } else {
                        this.imgSrc = 1
                    }
                }, 2800)
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('注册成功');
                        this.$router.push({
                            name: 'Login'
                        })
                    } else {
                        this.$Message.error('注册失败');
                    }
                })
            }
        },
        watch: {
            screenWidth() {
                if (this.screenWidth <= 960) {
                    this.imgIsShow = false
                } else {
                    this.imgIsShow = true
                }
            }
        },
        mounted() {
            this.changeImgSrc()
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
    }
</script>

<style lang="scss" scoped>
    .register {
        .footer {
            min-width: 480px;
            margin-top: 40px;
        }

        .main {
            overflow: hidden;
            position: relative;
            height: 100%;

            .main-box {
                margin: 0 auto;
                padding-top: 60px;
                width: 480px;
                text-align: left;

                .welcome {
                    font-size: 44px;
                    margin-bottom: 20px;
                }

                .header {
                    font-size: 28px;
                    margin-bottom: 50px;
                    line-height: 1.2;
                    color: #333;
                }
            }
        }

        .left-img {
            width: 480px;
            height: 100vh;
            float: left;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
    }
</style>