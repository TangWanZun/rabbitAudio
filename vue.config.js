module.exports = {
        // 修改的配置
        devServer: {
                proxy: {
                        '/api': {
                                target: 'http://www.kugou.com/yy/index.php',
                                pathRewrite: {
                                        '^/api': ''
                                }
                        }
                }
        },
        baseUrl: './',
        pwa: {
                themeColor: '#000000'
        }
}
