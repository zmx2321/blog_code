# Git 提交代码规范

## Git Flow常用的分支

* **Master 分支**

  这个分支最近发布到生产环境的代码，最近发布的Release， 这个分支只能从其他分支合并，不能在这个分支直接修改

* **Hotfix分支** 

  当我们在Production发现新的Bug时候，我们需要创建一个Hotfix, 完成Hotfix后，我们合并回Master和Develop分支，所以Hotfix的改动会进入下一个Release

* **Release分支**

  当你需要一个发布一个新Release的时候，我们基于Develop分支创建一个Release分支，完成Release后，我们合并到Master和Develop分支

* **Develop 分支**

  这个分支是我们是我们的主开发分支，包含所有要发布到下一个Release的代码，这个主要合并与其他分支，比如Feature分支

* **Feature 分支**

  这个分支主要是用来开发一个新的功能，一旦开发完成，我们合并回Develop分支进入下一个Release

### 1.3 git 提交信息规范

  每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。
  <type>(<scope>): <subject>// 空一行<body>// 空一行<footer>
  其中，Header 是必需的，Body 和 Footer 可以省略。
  不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。


**Header**
  Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

**type**

  Type用于说明 commit 的类别，只允许使用下面7个标识。

  - feat：新功能（feature）
  - fix：修补bug
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动
    如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（ docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。



**scope**
  Scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

**subject**
  Subject是 commit 目的的简短描述，不超过50个字符。

  - 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
  - 第一个字母小写
  - 结尾不加句号（.）

**例子**

  `【fix】我的人才- 列表对不齐`

