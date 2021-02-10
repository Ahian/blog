module.exports = {
  base:'/blog/',
  // host: '0.0.0.0',  // 生成网页地址（本地调试使用）
  // port: '22335',  // 生成网页端口（本地调试使用）
  title: "Tsanfer's Blog", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "现居住于猎户臂上的一个碳基生命", // meta 中的描述文字，用于SEO
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }], //浏览器的标签栏的网页图标,基地址/docs/.vuepress/public
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ], //在移动端，搜索框在获得焦点时会放大
  ],

    themeConfig: {
        logo: '/img/novel.png',
      // 	在下方修改添加
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' },
          ]
      // 	在上方修改添加
      },
      // dest:'public'
      sidebar: "auto", //在所有页面中启用自动生成侧栏
      record: "蜀ICP备20005033号-1",

  }