import {
    post
} from './index'

// 用户接口
export const userApi = {
    /**
     * 手机号码验证接口
     * @param {*} data 
     * @returns 
     */
    verifyPhone(data) {
        return post('/user/verifyPhone.php', {
            data
        })
    },

    /**
     * 获取验证码接口
     * @param {*} data 
     * @returns 
     */
    sms(data) {
        return post('/user/sms.php', {
            data
        })
    },

    /**
     * 注册接口
     * @param {*} data 
     * @returns 
     */
    register(data) {
        return post('/user/register.php', {
            data
        })
    },

    /**
     * 登录接口
     * @param {*} data 
     * @returns 
     */
    login(data) {
        return post('/login.php', {
            data
        }).then((result) => {
            if (result.ret === 200) {
                localStorage.setItem('userInfo', JSON.stringify(result.data))
            }
            return Promise.resolve(result)
        }).catch(() => {})
    },

    /**
     * 获取当前用户信息接口
     * @returns 
     */
    currentUser() {
        return post('/user/currentUser.php')
    },

    /**
     * 修改当前用户信息接口
     * @param {*} data 
     * @returns 
     */
    modifyingCurrentUser(data) {
        return post('/user/modifyingCurrentUser.php', {
            data
        })
    },

    /**
     * 修改当前用户头像接口
     * @param {*} data 
     * @returns 
     */
    upLoadAvatar(data) {
        return post('/user/upLoadAvatar.php', {
            data
        })
    },

    /**
     * 退出登录接口
     * @returns 
     */
    userOut() {
        return post('/user/userOut.php')
    },

    /**
     * 修改密码接口
     * @param {*} data 
     * @returns 
     */
    modifyingCurrentUserPassword(data) {
        return post('/user/modifyingCurrentUserPassword.php', {
            data
        })
    }
}

// 文章话题接口
export const artApi = {
    /**
     * 文章列表接口
     * @param {*} data 
     * @returns 
     */
    list(data) {
        return post('/art/list.php', {
            data
        })
    },
    /**
     * 发布新话题/文章接口
     * @param {*} data 
     * @returns 
     */
    post(data) {
        return post('/art/post.php', {
            data
        })
    }
}

// 公共接口
export const commonApi = {
    /**
     * 图片上传接口
     * @param {*} data 
     * @returns 
     */
    uploadFile(data) {
        return post('/common/filesUpload.php', {
            data,
            processData: false
        })
    }
}

// 分类接口
export const categoryApi = {
    /**
     * 添加分类接口
     * @param {*} data 
     * @returns 
     */
    post(data) {
        return post('/category/post.php', {
            data
        })
    },

    /**
     * 分类列表接口
     * @param {*} data 
     * @returns 
     */
    list(data) {
        return post('/category/list.php', {
            data
        })
    }
}