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
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" hide-required-mark>
                    <FormItem prop="username" label="用户名">
                        <Input type="text" v-model="formCustom.username" size="large"></Input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <Input type="password" v-model="formCustom.password" size="large"></Input>
                    </FormItem>
                    <FormItem prop="confirmPassword" label="确认密码">
                        <Input type="password" v-model="formCustom.confirmPassword" size="large"></Input>
                    </FormItem>
                    <FormItem prop="phone" label="手机号码">
                        <Input type="tel" v-model="formCustom.phone" size="large"></Input>
                    </FormItem>
                    <FormItem prop="smsCode" label="手机验证码" v-if="codeIsShow">
                        <Row style="width: 100%" type="flex" justify="space-between">
                            <Col span="16">
                            <Input type="text" v-model="formCustom.smsCode" size="large"></Input>
                            </Col>
                            <Col flex="atuo" style="text-align: right">
                            <Button type="info" size="large" @click="getSmsCode" ghost>获取验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem style="margin-top: 36px">
                        <Row>
                            <Col span="18">
                            <Button type="primary" @click="handleSubmit('formCustom')" size="large">立即注册</Button>
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.confirmPassword !== '') {
                        this.$refs.formCustom.validateField('confirmPassword');
                    }
                    callback();
                }
            };

            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };

            const validatePhone = (rule, value, callback) => {
                let reg = new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
                if (value === '') {
                    callback(new Error('手机号码不能为空'));
                    this.codeIsShow = false
                } else if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号码'));
                    this.codeIsShow = false
                } else {
                    this.$userApi.verifyPhone({
                            phone: value
                        })
                        .then((result) => {
                            if (result.ret === 200) {
                                this.codeIsShow = true
                            }
                            callback(result.msg.phone)
                        }).catch((err) => {
                            console.log(err)
                        });
                }
            }

            return {
                imgSrc: 1,
                screenWidth: document.documentElement.clientWidth,
                imgIsShow: true,
                codeIsShow: false,
                formCustom: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    smsCode: ''
                },
                ruleCustom: {
                    username: [{
                            required: true,
                            type: 'string',
                            message: '昵称不能为空',
                            trigger: 'blur',
                        },
                        {
                            pattern: /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\d]+$/,
                            message: '昵称必须以汉字或字母开头,其它可以是中文,字母或数字',
                            trigger: 'change blur'
                        }
                    ],
                    password: [{
                            required: true,
                            type: 'string',
                            validator: validatePass,
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 16,
                            message: '密码必须为6到16位数',
                            trigger: 'change blur'
                        },
                    ],
                    confirmPassword: [{
                        required: true,
                        type: 'string',
                        validator: validatePassCheck,
                        trigger: 'blur change'
                    }],
                    phone: [{
                        required: true,
                        type: 'string',
                        validator: validatePhone,
                        trigger: 'blur change'
                    }],
                    smsCode: [{
                            required: true,
                            type: 'string',
                            message: '手机验证码不能为空',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 6,
                            message: '手机验证码必须为6位数',
                            trigger: 'change blur'
                        }
                    ]
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
            getSmsCode() {
                this.$userApi.sms({
                        phone: this.formCustom.phone
                    })
                    .then((result) => {
                        console.log(result);
                        if (result.ret === 200) {
                            this.$Message.success({
                                content: '验证码为：' + result.data[0].code,
                                duration: 10,
                                closable: true
                            })
                        } else {
                            this.$Message.warning({
                                content: result.msg.result + ',当前验证码为：' + result.data.smsCode,
                                duration: 10,
                                closable: true
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$userApi.register(this.formCustom)
                            .then((result) => {
                                console.log(result.msg[0]);
                                this.$Message.success('注册成功，正在自动跳转中请勿操作....');
                                setTimeout(() => {
                                    this.$router.push({
                                        name: 'Login'
                                    })
                                }, 2000)
                            }).catch((err) => {
                                console.log(err);
                            });
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
        .left-img {
            width: 480px;
            height: 100vh;
            float: left;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }

        .main {
            overflow: hidden;
            position: relative;
            height: 100%;

            .main-box {
                margin: 0 auto;
                padding-top: 60px;
                width: 480px;

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

        .footer {
            min-width: 480px;
            margin-top: 40px;
            text-align: center;
        }
    }
</style>