# Hello VuePress!





[TOC]

# gitflow规范





### 实际开发

```bash
签出版本
git checkout -b feature/xxx

提交commit
git commit -a -m "feat: do something"

推送
git push -u origin feature/xxx
```





[git - 简明指南](https://rogerdudler.github.io/git-guide/index.zh.html)



## 原理

本地仓库（三棵“树”）

- 工作目录（持有实际文件）
- 暂存区（缓存区域，临时保存变动）
- HEAD（指向最后一次的提交）



# base git

## create & clone

```bash
初始化
git init

克隆仓库（本地或远程）
git clone <path>(克隆目标仓库)
```

## add & remove

```bash
暂存更改到暂存区
git add <filename>
git add *

移除暂存的更改
git remove <filename>
```

## commit & synchronize

```bash
提交变更到HEAD
git commit -m "代码提交信息"

推送到远程
git push origin <branch>

添加远程仓库
git remote add origin <server>

更新本地仓库（拉取远程仓库）pull = 获取（fetch）+ 合并（merge） 
git pull
```

## branches

default local branch: `master`



开发新特性时，签出一个新分支，开发完成再合并回master

```bash
create branch“feature_x”，and switch：
git checkout -b feature_x

switch branch
git checkout master

delete branch
1.delete local
1.1 -d：short of --delete，
git branch -d <branch>
git branch -D <branch>

1.2

2. delete remote
```



## merge

```bash
合并其他分支到当前分支
git merge <branch>


after fix confict,need add changes：
git add <filename>

diff
git diff <source_branch> <target_branch>
```



## tag

```bash
tag a commit
git tag <tag> <commit ID>

(get commit ID)
git log
```





## log

```bash
glg
git log

only watch target author
git log --author=songyuehang

display single line
git log --pretty=oneline

glgp树形结构显示
git log --graph --oneline --decorate --all

看哪些文件改变了
git log --name-status

git log --help

```





## restore

```bash
从HEAD 签出单文件
git checkout --<filename>

丢弃本地改动
git fetch origin

回退（丢弃，彻底消失）
git reset --hard origin/master

丢弃提交（丢弃指针、暂存区）
git reset <SHA>

加hard 可以让工作区文件也丢弃
git reset --hard [last good SHA]

reset找回
git reflog


full：
彻底回退
git reset --hard  origin/master

only reset commit message
git reset --soft

git reset --mixed

### 
撤销（创建一个新的commit来抵消上次commit）
git revert HEAD

撤销多次提交
git revert [倒数第一个提交] [倒数第二个提交]

还有两个参数
--no-commit（只抵消暂存区和工作区变化，不产生新的提交）
--no-edit（执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。）

commit消息替换
git commit --amend -m "Fixes bug #42"
```



## 放错分支

把应该放另一个分支的东西，放错了放在当前分支上

```bash
新建一个feature 分支，他会指向最新提交
git branch feature/xxx
 
把当前分支的提交切回更改前版本
git reset --hard [当前分支此前的最后一次提交]

切到feature 的分支
git checkout feature/xxx
```



reset vs revert

- git revert 后多出一条commit ，提醒同事，这里有回撤操作

    创建逆向commit 来抵消提交（不会改变已存在的提交）



- git reset 直接删commit，不留痕迹。

    直接把之前 commit 删掉，非git reset --hard的操作是不会删掉修改代码，如果远程已经有之前代码，需要强推 git push -f

    

1. 提交不要，代码要（默认）

2. 提交和代码都不要，加hard

    git reset commit/xxx --hard

    推送远程

    git push -f

参数

--soft 回退后a分支修改的代码被保留并标记为add的状态（git status 是绿色的状态） 

--mixed （默认）重置索引，但不重置工作树，还原文件为未提交（add）。

--hard 提交、变更、暂存区都清空

--merge 和--hard类似，只不过如果在执行reset命令之前你有改动一些文件并且未提交，merge会保留你的这些修改，hard则不会。【注：如果你的这些修改add过或commit过，merge和hard都将删除你的提交】 

--keep 和--hard类似，执行reset之前改动文件如果是a分支修改了的，会提示你修改了相同的文件，不能合并。如果不是a分支修改的文件，会移除缓存区。git status还是可以看到保持了这些修改。 





# 系统学习

## 基本概念

### origin

在了解`origin/master`和`master`之前,我们需要先了解一下`git clone`做了什么.
 假设有一个服务器`git.mycompany.com`,执行`git clone`指令后

> 1.自动将远程服务器命名为`origin`
> 2.下载该服务下的所有数据
> 3.创建一个指向master分支的指针,并将该分支命名为origin/master
> 4.创建名为master的本地分支,并且和远程分支在同一个提交节点



tips:`origin`并不特别,就像分支名`master`在git中没有任何特殊意义一样.当执行`git init`时,`master`会作为初始分支的默认名字,因此使得`master`分支名被广泛使用.而`origin`是执行`git clone`时的默认服务器名称,当然可以通过指令`git clone -o cat`,使得默认服务器名称为`cat`,而默认远程分支为`cat/master`.





#### master & origin/master

`master` is local copy of the remoter branch `origin/master`

> (remote & branch names are inspecial, like:  `cat/main`)



#### 追踪分支

从**远程分支**`check out`签出一个**本地分支**,该本地分支被称为**追踪分支**(tracking branch),被追踪的分支被称为上游分支(upstream branch),

追踪分支可以理解为是和远程分支有直接关联的本地分支.

> 如果我们在追踪分支时执行`git pull`,git会自动知道需要获取和merge的分支的服务器.
>
> 执行`git clone`创建了本地仓库后,会自动创建一个追踪`origin/master`分支的本地追踪分支`master`,当然我们也可以根据需求添加其他的追踪分支.



##### 创建新的追踪分支

`git checkout -b [branch] [remotename]/[branch]`

 git还提供了通用的`--track`简写操作: `git checkout --track origin/dev`,

它做了什么呢?

1. 分支`dev`被设定为追踪服务器为`origin`上的远程分支`dev`
2. 切换到`dev`分支上

 如果`checkout`的分支本地不存在,但是和远程分支名一样,git会自动创建追踪分支,并且切换到该分支 :  `git checkout [branch]`
 本地分支必须和远程分支同名吗?当然不是,我们也可以为本地分支设置不同于远程分支的名字 :  `git checkout -b aaa origin/bbb`,这样本地`aaa`为远程`bbb`的追踪分支.



```bash
查看分支
git branch -a

创建追踪分支
git checkout -b <branch> <remote>/<branch> # 从远程分支签出一个分支到本地
git checkout --track origin/dev # 缩写
git checkout <branch> # 如果本地没有该分支但是远程有，也会签出对应的追踪分支

给一个分支设置上游分支（生成新的追踪分支）
git <branch> -u oringin/master
git <branch> --set-upstream-to oringin/master

git push --set-upstream origin master

查看上游分支
git branch -vv

删除本地分支
git branch -d <branch>

删除远程分支（只移除指针）
git push origin -d <branch>

删除追踪分支
git branch -d --remotes origin/<branch>

上游分支缩写
git merge @{u}
git merge @{upstream}
# 等价于
git merge origin/master

分支重命名

git branch -m 
```







## alias（zsh git plugin）

https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git



|      |
| ---- |
|      |