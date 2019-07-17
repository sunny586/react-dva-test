
## Requirements 要求
```
1. 通过使用html、css、react.js创建一个单页Web应用程序，重新设计应用程序商店列表页面。主要功能有3个：应用列表、应用推荐和搜索。下面提供了一个示例布局供您参考；

App listing 应用程序列表    
2. 显示前100个免费应用程序；    
3. Data source can be found from the API;
   https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json and
   https://itunes.apple.com/hk/lookup?id=[app_id ]
4. 支持垂直滚动和分页（每页10条记录）和延迟加载；
5. 对于每一个奇数行，应用程序图标都用圆角裁剪。为每一个偶数行，应用程序图标被裁剪成圆形；

App recommendation 推荐
6. 显示前10个总收入应用程序；
7. Data source can be found from the API;
   https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json;   
8. 项目水平滚动；
9. 应用程序图标用圆角裁剪；
10. 位于应用程序列表部分上方。当应用列表部分垂直滚动时，应用推荐部分也将一起滚动；

Search
11. 通过匹配关键词搜索应用列表和推荐部分显示的应用；
12. 搜索关键字文本字段位于页面顶部，即使应用程序列表滚动，也保持该位置；
13. 搜索完成后，应用列表和推荐部分只显示应用名称、类别、作者或摘要中包含关键字的应用；
14. 键入关键字后立即执行搜索；

Hints for Bonus
1. 使用Redux进行开发；
2. 采用响应式设计；
3. 对CSS使用sass/less
4. 获取数据时显示loading；
5. 页面滚动--添加animation动画效果
6. 任何其他能显示你技能的有趣特征或事物；
7. PWA为优

质量要求
8. 用数据模型将API响应数据本地存储；
9. 遵循相应平台的最佳实践；
```

## Installation
```shell
npm install
```
cd 进入目录，并启动开发服务器
```shell
npm run dev
```