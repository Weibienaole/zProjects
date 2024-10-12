### 新建分支

```
git init

<!-- 关联远程分支 -->
git remote add origin https://github.com/Weibienaole/zProjects.git

git add .

git commit -m 'init'

<!-- 新建本地分支 -->
git checkout -b newBranch

<!-- 推送本地分支到远端（远端没有此分支会新建分支） -->
git push -u origin newBranch
```
