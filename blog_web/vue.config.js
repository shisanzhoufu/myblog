module.exports = {
    devServer: {
        // open: true,
        host: "localhost",
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}