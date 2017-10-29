# git 合并多个 Commit

> 在使用 Git 作为版本控制的时候，我们可能会由于各种各样的原因提交了许多临时的 commit，而这些 commit 拼接起来才是完整的任务。那么我们为了保证Master主分支上提交注释的可读性，需要在本地分支Push远程server之前合并你自己的多次提交注释日志，原则上3条以上就需要合并。

## 指定合并commit

### 方法一

最近提交commit指定数量的合并

```bash
	git rebase -i HEAD~3
```
![002](/static/img/git-commits-merge/002.png)

`HEAD~3`中的3指的是合并最近3次commit

### 方法二

指定的commit hash，hash之前的提交合并

```bash
	git log
```
![001](/static/img/git-commits-merge/001.png)

获取不需要合并的 commit 的 hash 值

```bash
	git rebase -i b09ce93e4bb
```
![002](/static/img/git-commits-merge/002.png)

## 合并commit

可以看到其中分为两个部分，上方未注释的部分是填写要执行的指令，而下方注释的部分则是指令的提示说明。指令部分中由前方的命令名称、commit hash 和 commit message 组成。

+ `pick` 是最终合并后的 commit

+ `squash`和`fixup` 是将当前 commit 合并到前一个commit

我们将`cab88d7`和`fb8c714`前缀改成`squash`或`fixup`；按`esc`退出编辑，输入`:wq`保存

#### 注意：

+ `fixup`会自动将当前commit与前一个合并，并放弃当前commit的注释等内容。
+ `squash` 会在退出当前编辑状态后，进入新的编辑状态，允许我们再次编辑注释等提交信息，再次退出才结束操作。
+ 第一个commit不可以改成`squash`或者`fixup`，否则会报错。
+ 报错之后可以使用 `git rebase --abort` 来撤销修改，回到没有开始操作合并之前的状态。


如果是输入的`squash`，会再次进入一个编辑页面，可以直接`:wq`保存退出。

再次输入`git log`

![003](/static/img/git-commits-merge/003.png)

#### 合并成功！




