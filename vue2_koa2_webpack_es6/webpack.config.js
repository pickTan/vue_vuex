/**
 * Created by girl on 16/5/19.
 */
var path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'), //拿到路径
    ExtractTextPlugin = require('extract-text-webpack-plugin'), //css处理
    HtmlWebpackPlugin = require('html-webpack-plugin'), //生成页面
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');
    TransferWebpackPlugin = require('transfer-webpack-plugin'), //复制文件
    CleanPlugin = require('clean-webpack-plugin'),  //清理文件
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    dir = process.env.WEBPACK_DIR,   //build区
    rootUrl = 'app/'+dir+'/htmlJs/*.js',
    deletUrl='app/'+dir+'/htmlJs/',
    entries = getEntry(rootUrl,deletUrl),   //入口路径
    chunks = Object.keys(entries),
    prod = process.env.NODE_ENV === 'production' ? true : false,
    outPath =path.resolve(__dirname, prod ? "./dist/"+dir : "./build/"+dir),
    config = {
    entry: entries,
    // entry: { index: path.resolve(__dirname,'./app/PC/htmlJs/index.js')},
    output: {
        path: outPath,
        filename: prod ? "js/[name].min.js" : "js/[name].js",
        chunkFilename: 'js/[name].chunk.js',
        publicPath: prod ? "" : ""  //此处区分生产的路径和测试路径http:cdn.mydomain.com
    },
    //externals: {
    //    // require("jquery") is external and available
    //    //  on the global var jQuery
    //    'jquery': 'jquery',
    //    'react': 'react',
    //    //"es5-shim": "es5-shim",
    //    //"console-polyfill": "console-polyfill",
    //    //"es5-sham": "es5-shim/es5-sham"
    //},
    resolve: {
        //配置项,设置忽略js后缀
        extensions: ['', '.js', '.less', '.css', '.png', '.jpg','.woff', '.svg', '.eot', '.woff2', '.ttf'],
        root: './app',
        // 模块别名
        alias: {
            // 'vux-components': 'vux/src/components'
        }
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|woff2|ttf)$/,
                loader: 'url?limit=10000&name=/images/[name].[ext]?v=[hash]'
             },
            //{
            //    test: /\.less$/,
            //    loader: 'style!css!less'
            //},
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /vux.src.*?js$/,
                loader: 'babel',
                query:{
                    "presets": ["es2015","stage-2"],
                    "plugins": ["transform-runtime"],
                    "comments": false
                }
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract('vue-style-loader','css-loader','less-loader')
            //loaders: ['style', 'css']
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.js[x]?$/,
                //loaders:['es3ify-loader', 'babel-loader'],
                loader: 'babel',
                query:{
                    "presets": ["es2015", "stage-2"],
                    "plugins": ["transform-runtime"],
                    "comments": false
                },
                exclude: /node_modules/

            },
            {
                test: /\.vue$/,
                loader: 'vue'
                // exclude: /node_modules/
            },
            //,{
            //test: /\.html$/,
            //loader: 'html?attrs=img:src img:srcset'
            //}
        ]
    },
    plugins: [
        //new CleanPlugin(['dist', 'build']),
        new CleanPlugin(outPath),
        // 启动热替换
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin(),
        //new OpenBrowserPlugin({
        //    url: 'http://localhost:8080'
        //}),
        /* 公共库 */
        //把指定文件夹下的文件复制到指定的目录
        new TransferWebpackPlugin([
            {from: path.resolve(__dirname,'./app/'+dir+'/base/')}
        ], path.resolve(__dirname,outPath)),

        new CommonsChunkPlugin({
            name: 'public',
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        })
    ]
};

chunks.forEach(function(pathname) {
    var template ='./templates/index.ejs';
    template = dir=='PC' && pathname == 'useCar_index' ?  path.resolve(__dirname,'./templates/BDplan.ejs') :  path.resolve(__dirname,template);
    var conf = {
            title: '星星打车',
            favicon:path.resolve(__dirname, './app/'+dir+'/images/favicon.ico'), //favicon路径
            filename: pathname+'.html',
            template: template,
            inject: 'body',
            hash:true,
            chunks:['public', pathname]

        }
    config.plugins.unshift(new HtmlWebpackPlugin(conf));
});

// 判断开发环境还是生产环境,添加uglify等插件
if (prod) {
    config.plugins = (config.plugins || [])
        .concat([
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
            }),
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            //new UglifyJsPlugin({ minimize: true }),
            new webpack.optimize.OccurenceOrderPlugin()
        ]);
} else {
    config.devtool = 'source-map';  //开启调试模式
    config.devServer = {
        contentBase:  path.resolve(__dirname,'./build'+dir+'/'),
        hot: true,
        historyApiFallback: true,
        publicPath: "",
        proxy: {
            '/doAction/*': {
                target: 'http://localhost:/',
                secure: false
            }
        },
        stats: {
            colors: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    };
}

module.exports=config;
/**
 * 获取文件名
 * @param globPath
 * @param pathDir
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = path.resolve(__dirname, './' + entry);
    }
    console.log(entries)
    return entries;
}
