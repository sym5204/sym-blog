# 2025-02-25

## 初始化项目

- 1、 初始化项目

```
git init

```

- 2、 连接远程仓库

一般我是先在 github 上建立好一个新仓库，终端直接添加远程仓库

```
git remote add origin https://github.com/xxx/xxx.git
```

- 3、 检查是否连接成功

看到 origin 开头，后面是刚才添加的远程仓库地址，则连接成功

```
git remote -v
```

- 4、 保存修改到本地仓库

```
git add.
```

- 5、 提交修改到远程仓库

```
git commit -m "初始化项目，远程连接测试"
```

- 6、 推送到远程仓库

一般这里会出错，因为远程仓库新建时，初始化有 .gitignore 和 README.md 文件，又因为 nuxt 新建项目时默认会生成这些文件，
所以本地和远程仓库有两个同名文件，造成冲突，解决方法是先把本地仓库的 .gitignore 和 README.md 文件删掉 或者 删掉远程仓库的这两个文件，再推送到远程仓库

```
git push -u origin master
```

- 7、 网页端查看远程仓库，可以看到刚才提交的修改，说明连接成功


## tailwindcss 配置以及第三方组件库的引入

 1、 安装 tailwindcss, 官网： https://www.tailwindcss.cn/docs/guides/nextjs

 2、 安装 shadcn/ui 组件库，官网：https://ui.shadcn.com/docs/installation/next

 3、 安装 reactbits 组件库，官网：https://reactbits.dev/

 - 初始化项目
 ```
    npx jsrepo init https://reactbits.dev/ts/tailwind
```
 - 按需安装组件，例如安装 SplashCursor
 ```
    npx jsrepo add https://reactbits.dev/ts/tailwind/Animations/SplashCursor
```

## 封装动态背景组件 BackgroungVideo

# 2025-3-5

## 调整背景，初步设计首页

# 2025-3-6

## 初步完成首页展示卡片，并添加动态交互

> <img src="/note-doc/img/25-3-6 首页初步完成.png" />

# 2025-3-7

## 完成侧边栏，并添加动态过渡效果

# 2025-3-9

## 制作默认缺省组件 EmptyDefault

> <img src="/note-doc/img/25-3-8 制作缺省组件.png" />
