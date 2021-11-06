module.exports = {
    devServer: {
        open: true,
        port: 1020,
        proxy: {
            '/': {
                target: 'http://fc.php800.cn/api',
                ws: false,
            },
        }
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }, ],
        },
    }
}