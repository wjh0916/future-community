<template>
    <div class="top">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="home" class="navMenu">
                    <div class="navLeft">
                        <MenuItem name="home" to="/" class="logo">
                        <h1>未来社区</h1>
                        </MenuItem>
                        <MenuItem name="home" to="/">
                        <span>首页</span>
                        </MenuItem>
                        <MenuItem name="topic" :to="{name:'Topic'}">
                        <span>话题</span>
                        </MenuItem>
                        <MenuItem name="3" to="/">
                        <span>我的话题</span>
                        </MenuItem>
                    </div>
                    <div class="navRight">
                        <MenuItem name="navSearch" class="navSearch">
                        <Input search />
                        </MenuItem>
                        <Submenu name="navUser">
                            <template slot="title">
                                <div class="userAvatar">
                                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                </div>
                                {{userName}}
                            </template>
                            <MenuItem name="4-1">个人中心</MenuItem>
                            <MenuItem name="4-2">个人资料</MenuItem>
                            <MenuItem name="4-3" :to="{name:'Login'}">退出登录</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Content class="content">
                <Breadcrumb class="Breadcrumb">
                    <BreadcrumbItem>未来社区</BreadcrumbItem>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                </Breadcrumb>
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: 'Top',
        data() {
            return {
                uid: 1,
                userName: '慕尘'
            }
        },
    }
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