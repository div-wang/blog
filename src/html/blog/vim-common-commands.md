# vim常用操作命令

> vi 是 unix/linux 下极为普遍的一种文本编辑器. 记录一些比较常用的命令

## 一般模式
|  命令 | 操作详情 |
|----|-----
| `x,X`    | `x`为向后删除一个字符，`X`为先前删除一个字符
| `nx`     | 向后删除n个字符
| `dd`     | 删除当前行
| `D`      | 删除当前行所有字符，试成为空行
| `ndd`    | 删除光标所在行的向下`n`列
| `d1G`    | 删除光标所在行到第一行的所有数据
| `dG`     | 删除光标所在行到最后一行的所有数据
| `yy`     | 复制光标所在行
| `y1G`    | 复制光标所在行到第一行的所有数据
| `yG`     | 复制光标所在行到最后一行的所有数据
| `ynj`    | 复制光标所在行向下`n+1`行
| `dnj`    | 删除光标所在行向下`n+1`行
| `p,P`    | `p`为复制的数据粘贴在光标的下一行，`P`为复制的数据粘贴在光标的上一行
| `J`      | 将光标所在行与下一行的数据结合成一行
| `u`      | 命令取消最近一次的操作，可以使用多次来恢复原有的操作
| `U`      | 取消所有操作
| `h`      | 光标向左移一个字符
| `j`      | 光标向下移一个字符
| `k`      | 光标向上移一个字符
| `l`      | 光标向右移一个字符
| `Ctrl+f` | 屏幕向下翻一页
| `Ctrl+b` | 屏幕向上翻一页
| `Ctrl+d` | 屏幕向下翻半页
| `Ctrl+u` | 屏幕向上翻半页
| `0`      | 光标移动到当前行的第一个字符
| `$`      | 光标移动到当前行的最后一个字符
| `H`      | 光标移动到当前屏幕最上方的那一行的第一个非空字符
| `M`      | 光标移动到当前屏幕最中间那一行的第一个非空字符
| `L`      | 光标移动到当前屏幕最下方的那一行的第一个非空字符
| `GG`     | 光标移动到该文章第一行的第一个非空字符
| `G`      | 光标移动到该文章最后一行的第一个非空字符
| `nG`     | 光标移动到该文章第n行的第一个非空字符
| `/word`  | 在光标之后查找word字符串
| `?word`  | 在光标之前查找word字符串

## 末行模式
|  命令 | 操作详情 |
|----|-----
| `:s/word1/word2/g`      | 在光标当前行查找word1，并替换成word2
| `:n1,n2s/word1/word2/g` | 在第n1行与第n2行之间查找word1，并替换成word2
| `:%s/word1/word2/g`     | 整个文章查找word1，并替换成word2
| `:w`                    | 将编辑的数据保存到硬盘文件中
| `:w [filename]`         | 将编辑后的数据保存到硬盘的另一个文件中
| `:r [filename]`         | 在编辑数据时，读入另一个文件中的数据，即将filename文件中的内容加到光标所在行下一行
| `:wq或:x`                | 保存并退出
| `:q`                    | 退出，适用于未修改的文件
| `:q!`                   | 强制退出，适用于修改文件后不保存退出
| `:set nu`               | 显示行号
| `:set nonu`             | 取消行号
| `:n1,n2 w [filename]`   | 将n1到n2行的内容保存到名为filename的文件中


## 编辑模式命令
|  命令 | 操作详情 |
|----|-----
| `i,I` | `i`为在当前光标所在处插入输入的文字，`I`为在光标所在行第一个非空字符插入输入的文字
| `a,A` | `a`为在当前光标所在处下一个字符插入输入的文字，`A`为在光标所在行最后一个字符的下一个字符处插入输入的文字
| `o,O` | `o`为在光标所在行的下一行行首开始插入字符，`O`为在光标所在行的上一行行首开始插入字符
| `r,R` | `r`为替换光标所在那一个字符，`R`为一直替换光标所指的文字，直到退出
| `Esc` | 退出，回到一般模式


## js命令说明

> ctrl+s是一个古老的shell控制键，在输入ctrl+q就可以恢复了

```javascript
// First Level
i → Insert mode. Type ESC to return to Normal mode.
x → Delete the char under the cursor
:wq → Save and Quit (:w save, :q quit)
dd → Delete (and copy) the current line
p → Paste
Recommended:

hjkl (highly recommended but not mandatory) → basic cursor move (←↓↑→). Hint: j looks like a down arrow.
:help <command> → Show help about <command>. You can use :help without a <command> to get general help.

// Second Level

/*** Insert mode variations: ***/

a → insert after the cursor
o → insert a new line after the current one
O → insert a new line before the current one
cw → replace from the cursor to the end of the word

/*** Basic moves ***/
0 → go to the first column(number zero)
^ → go to the first non-blank character of the line
$ → go to the end of line
g_ → go to the last non-blank character of line
/pattern → search for pattern

/*** Copy/Paste ***/
P → paste before, remember p is paste after current position.
yy → copy the current line, easier but equivalent to ddP

/*** Undo/Redo ***/
u → undo
<C-r> → redo

/*** Load/Save/Quit/Change File (Buffer) ***/
:e <path/to/file> → open
:w → save
:saveas <path/to/file> → save to <path/to/file>
:x, ZZ or :wq → save and quit (:x only save if necessary)
:q! → quit without saving, also: :qa! to quit even if there are modified hidden buffers.
:bn (resp. :bp) → show next (resp. previous) file (buffer)


// 3rd Level – Better. Stronger. Faster.
/*** Vim Command (normal Model)-help you to repeat ***/
2dd → will delete 2 lines
3p → will paste the text 3 times
100idesu [ESC] → will write “desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu desu”
. → Just after the last command will write again the 100 “desu”.
3. → Will write 3 “desu” (and not 300, how clever).


/*** Vim Command (normal Model)-how to move efficiently with vim ***/
NG → Go to line N
gg → shortcut for 1G - go to the start of the file
G → Go to last line

/*** Vim Command (normal Model)-how to move word move efficiently with vim ***/

w → go to the start of the following word,
e → go to the end of this word.
By default, words are composed of letters and the underscore character. Let’s call a WORD a group of letter separated by blank characters. If you want to consider WORDS, then just use uppercase characters:

W → go to the start of the following WORD,
E → go to the end of this WORD.

/*** /Pattern find Next by #(*) or find ( then % to next ) ***/
% : Go to the corresponding (, {, [.
* (resp. #) : go to next (resp. previous) occurrence of the word under the cursor

/*** <start position><command><end position> ***/

For example : 0y$ means

0 → go to the beginning of this line
y → yank from here
$ → up to the end of this line

// Tip with postition-comand-position
But what was true for y (yank), is also true for d (delete), v (visual select), gU (uppercase), gu (lowercase), etc…


```
