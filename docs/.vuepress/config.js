module.exports = {
    title: '学习笔记',
    description: '知识点记录',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }]
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
      base:'/blog/',
      dest:'public'
  }