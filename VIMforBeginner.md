# Vim 101: 菜鳥學習VIM教程 A Beginner’s Guide to Vim
## 打文字例子
```
                              
I have a little brain.
I like HUUNY.
Piglet is my good friend.
He is brave.
Tigger is naughty,he like eating cookies.
And he likes bouncing,and likes playing.
Roo is Tigger's friend,he is smart and small.
kanga is Roo's mother,she can cooking.
And Dodo is so big ,and Roo is his friend.
Er likes eating grass, sometime his house falls down.
Gugu can swimming and catch lots of fish.
Rabbit is work hard, he don't know how to play with friends.

```
## 來一個簡單例子 ex01
```cmd
 Open file: vim filename
 Press i (for insert mode) and start to add some text .
 Press Esc(return command mode) and Save file [:w]
 Press Esc(return command mode) and quite [:q]
```
## 介紹模式 The Modes 
* insert mode
* command mode
* last-line mode.
command mode:
delete an entire line, rather than inserting "dd".
delete one charecter "x"
### switch mode
To enter the insert mode, type i (for “insert”) 
To get out of insert mode, hit the Escape key.

* When you run vim filename to edit a file, Vim starts out in command mode. 
* enter the insert mode, type i (for “insert”) and now the keys will behave as you’d expect. To get out of insert mode, hit the Escape key.
* Once you press Escape, you’re in command mode again. What if you’d like to save your file or search through your document? No problem, press : and Vim will switch to last-line mode. Vim is now waiting for you to enter a command like :w to write the file or :q to exit the editor.
### ex02
```
vim filename
i (switch to insert mode, and type charcters "xxxxx xxxx \n xxx \n xxxxx xxxx \n xxx \n")
esc(switch to command mode, and "x" delete)
i (switch to insert mode, and type charcters "foo foo \n foo \n dd dd \n foo \n")
esc(switch to command mode, "dd" delete one line)
esc
:wq
```

## The Basics Of Moving In Vim
The first thing you’ll want to learn is how to move around a file. When you’re in command mode, you’ll want to remember the following keys and what they do:
*	h moves the cursor one character to the left.
*	j moves the cursor down one line.
*	k moves the cursor up one line.
*	l moves the cursor one character to the right.
*	0 moves the cursor to the beginning of the line.
*	$ moves the cursor to the end of the line.
*	w move forward one word.
*	b move backward one word.
*	G move to the end of the file.
*	gg move to the beginning of the file.
*	`. move to the last edit.
tips: prefacing a movement command with a number will execute that movement multiple times. 
So, if you want to move up six lines, enter 6k and Vim will move the cursor up six lines. 
If you want to move over five words, enter 5w. To move 10 words back, use 10b.
### ex03
5w 
6j (down 6 lines) 
6k(up 6 lines) 
10b
```cmd
goto line.3
:3
:set number
:set nonumber
```
## Editing Vim Style
Now that you know how to move around a bit, let’s try editing. Move the cursor to the beginning of a word. Now type x. What happened? You shuould have deleted the character that the cursor was on. Want to undo it? No problem. Type u (for undo) and it will be restored.
Want to delete an entire word? Move your cursor to the beginning of a word again. Use dw. Note that this will only delete the word from the cursor on–so if you have the cursor in the middle of a word, it will only delete from that point on. Again, u will undo it. Note that Vim has multiple levels of undo, so you can undo the change before that and the change before that, etc.
Want to undo your undo? Hit Ctrl-r. That will redo your last undo.
Again, here’s a longer list of the commands you’ll definitely want to know starting out:
*	d starts the delete operation.
*	dw will delete a word.
*	d0 will delete to the beginning of a line.
*	d$ will delete to the end of a line.
*	dgg will delete to the beginning of the file.
*	dG will delete to the end of the file.
*	u will undo the last operation.
*	Ctrl-r will redo the last undo.
You may have noticed that several commands combine a text operation and movement key. gg takes you to the end of a file, and d is used to delete. Combining them gives you something more powerful. Vim’s like that. If you’re working in Vim and think “hey, I wonder if I can combine two things I know to make something easier,” the answer is often (but not always) yes.
Let’s move on a bit and talk briefly about searching and replacing.
### ex03

## Searching And Replacing
```cmd
Searching  :/foo  n next  N pre  :?/  
Replace :%s/foo/replace text/g   gc
```
Now that you know how to enter text, make some changes and so forth, it’s time to learn how to use search and replace in Vim. It’s really pretty easy. If you want to search through the document from command mode, use / followed by the text you want to search for. So, if I want to search for “bunny” I can enter / and then bunny and hit enter.
If I want to find it again, I hit n. If I want to look for a previous instance of the text, I’ll use N instead, which will search the opposite direction through the document.
Want to reverse the direction of your search? Use ? instead of / and Vim will move backwards through the document. Using n and N as above will reverse the direction of the search.
*	/text search for text in the document, going forward.
*	n move the cursor to the next instance of the text from the last search. This will wrap to the beginning of the document.
*	N move the cursor to the previous instance of the text from the last search.
*	?text search for text in the document, going backwards.
*	:%s/text/replacement text/g search through the entire document for text and replace it with replacement text.
*	:%s/text/replacement text/gc search through the entire document and confirm before replacing text.
That’s all pretty easy, isn’t it? Now to move on to an important operation: Cutting and pasting text.
Copying And Pasting
```cmd
dd Delete entire line .  p paste it back
```
You’ve already learned to delete text. The last text that you’ve deleted is stored in the buffer ready to be pasted back into the document. So if you’ve run dd and deleted an entire line, you can now hit p or P to paste it back into the document. This goes for single lines, multiple lines, and even entire documents.
Want to select text? In command mode, hit V and you’ll be able to move the cursor using the arrow keys or the standard movement keys (h, k, j, l) to highlight text. This is pretty easy, but can be slow. Want to copy entire lines at a time? Use V instead of v and you’ll highlight entire lines at a time. Again, you can use the movement keys to highlight additional lines.
Vim has a really cool trick as well. You can highlight in columns. Use Ctrl-v and you’ll be able to highlight a column instead of an entire line. This can be useful when working with some text files that have data in columns and you want to select an entire column, but not an entire line.
When you’ve highlighted what you want, hit y and it will “yank” the text into the buffer to be pasted later. So a usual paste operation might look like this:
Hit v to highlight some text. Then hit y to yank it into the buffer. Then move the cursor where you want it, and use p in command mode. There you go–you’ve just pasted some text!
The commands you most need to start out:
*	v highlight one character at a time.
*	V highlight one line at a time.
*	Ctrl-v highlight by columns.
*	y yank text into the copy buffer.
*	p paste text after the current line.
*	P paste text on the current line.
### ex04
* copy line and paste after the current line.
```cmd
command mode
V
y
p
```
* copy region and paste on the current line.
``` cmd
commnad mode
v
y
P
```

## Quit
You’ve done enough editing for one day and you’re ready to pack it in. No problem. Here’s how you can save the file and quit Vim.
### ex05 Saving And Quitting
```cmd
:w
:w filename
:q
:q!
```

```cmd
ZZ
```
If you’re in insert mode, hit Escape. Then enter : and you’ll see a line at the bottom of the screen with a cursor ready to take input.

To write the file you’re editing, enter w. (So, you’ll have :w.) That will write the file to the existing filename. If you don’t have a filename or want to write out to a different filename, use :w filename.

To quit Vim after you’ve finished, hit :q. Since Vim is your friend, it won’t just pop out on you if you haven’t saved your file. It will say “no write since last change,” and suggest that you add ! to override.

If you really want to quit, go ahead and use :q! to leave without being nagged.

### ZZ 
You can also exit Vim using ZZ, which will save and quit the file. 

## Source
* https://www.linux.com/training-tutorials/vim-101-beginners-guide-vim/
* https://www.cs.cmu.edu/~15131/f17/topics/vim/vim-cheatsheet.pdf
![GITHUB]( https://people.csail.mit.edu/vgod/vim/vim-cheat-sheet-en.png "vim cheat sheet")
## 參考指令表 VIM SHEET
### Navigation
* h Move left
* j Move down 
* k Move up
* l Move right
* 10j Move down 10 lines

* H Top line on screen
* M Middle line on screen
* L Bottom line on screen

* gg First line of the file 
* G Last line of the file 
* :20 Line 20 of the file 

* e The end of the current word
* b Beginning of current word
* w Beginning of next word

* 0 Beginning of current line (Number Zero)
* ^ First non-whitespace character of current line
* $ End of current line
* % Move to matching parenthesis, bracket or brace
The left, right, up and down arrow keys can also be used to navigate.
### Editing
* i Insert before current character
* a Insert after current character
* I Insert at the first non-whitespace character of the line
* o Insert a line below the current line, then enter insert mode
* O Insert a line above the current line, then enter insert mode
* r Overwrite one character and return to command mode
* U Undo
* Ctrl+R Redo
### Opening, closing and saving files
* :w Save the current file
* :wq Save the current file and close it; exits vim if no open files remain
* :w newname Save a copy of the current file as ‘newname,’ but continue editing the original file
* :sav newname Save a copy of the current file as ‘newname’ and continue editing the file ‘newname’
* :q! Close a file without saving
* :e somefile Opens file in the current buffer
* :x Write any changes to the file and close the file

### Mode switching
* i Enter insert mode
* : Enter command mode
* R Enter replace mode
* v Enter visual mode (highlighting)
* V Enter visual line mode (highlighting lines)
* esc Return to normal mode from insert or replace mode
* esc+esc Return to normal mode from command or visual mode
### Copy/pasting
Within vim
* y Yank
* c ‘Change’; cut and enter insert mode
* C Change the rest of the current line
* d Delete; cut but remain in normal mode
* D Delete the rest of the current line
* p Paste after the cursor
* P Paste before the cursor
* x Delete characters after the cursor
* X Delete characters before the cursor
Copy/paste commands operate on the specified range. If in visual mode, that range is the
highlighted text. If in normal mode, that range is specified by a series of modifiers to the
commands:
* cw Change one word
* c4w Change four words
* c4l Change four letters
* cc Change current line
* 4x Change four characters after the cursor
* 4p Paste five times after the cursor.
Modifiers work similarly for cut, delete, yank and paste.
### From system clipboard
* :set paste Enter paste mode
* :set nopaste Exit paste mode
* Ctrl+Shift+V Paste into file, if in paste mode; Command+Shift+V for Mac

### Replace
* :s/foo/bar/ Replace the first occurrence of foo on the current line with bar
* :[range]s/foo/bar/[flags] Replace foo with bar in range according to flags
### Ranges
* % The entire file
* ’<,’> The current selection; the default range while in visual mode
* 25 Line 25
* 25,50 Lines 25-50
* $ Last line; can be combined with other lines as in ‘50,$’
* . Current line; can be combined with other lines as in ‘.,50’
* ,+2 The current lines and the two lines therebelow
* -2, The current line and the two lines thereabove Flags
* g Replace all occurrences on the specified line(s)
* i Ignore case
* c Confirm each substitution
### Regular expressions
Both vim’s find and replace functions accept regular expressions. By default, vim assumes
that some characters are part of a regular expression and these characters must be escaped
with ‘\’ to be searched for literally; these characters include (, ), *, ., ^, $. Other
regular expression patterns are interpreted literally by default and must be escaped to be used
as a part of a regular expression; these include +.
### Search
```cmd
 * Find the next instance of the current word
 # Find the previous instance of the current word
 n Find the next instance of the word being searched for, in the direction specified by the last use of {*,#}
 N Find the previous instance of the word being searched for, in the direction specified by the last use of {*,#}
 /word Find the next occurrence of ‘word’
 /word\c Find the next occurrence of ‘word’, ignoring case (‘\c’ can appear anywhere in the sequence being searched for)
 /\<word\> Find the next occurrence of the word ‘word’, where ‘word’ is bounded by word boundaries (ex. space, dash)
 :noh Un-highlight words
``` 
### Handy tricks
* ~ Toggle case of character beneath the cursor
* xp Transpose current character with that to its right
* J Join the current line and the line beneath it
* :Ni! Receive inquiry about shrubberies
* :help View vim help file
* :help foo View vim help entry on ‘foo’
### Resources (other than google.com)
* http://www.arl.wustl.edu/~fredk/Courses/Docs/vim/  The vim manual, online.
* http://www.stackoverflow.com/ Good general-purpose programming questions site.
* http://vim.wikia.com/ A wiki dedicated to vim.

## vim 我最常用的 regular expression
Character set:
```
\s	空白	             \a	[A-Za-z]
\S	非空白	           \l	小寫字[a-z]
\d	數字, 也等於[0-9]	\u	大寫字母[A-Z]
\D	非數字	           \_x	以上所有與換行符號
\x	16進位數	         \n	換行
\o	10進位數	         \r	Carriage Return
\w	[0-9A-Za-z_]	    \e	Escape
\h	[A-Za-z_]	       \t	Tab
```
### Example:
```
(1) :%s/\s\+$// 將每行後面多餘的空白去掉 ($代表一行的尾巴)。
(2) :%s/^\n// 將空白行去掉，也就是一行的開頭就接著換行符號的行(^代表一行的開端) 。
(3) :%s#//.*## 將"//..." 這樣的註解刪除; 這邊原本是要寫":%s/\/\/.*//g", 但vi可以讓你把/換成#,這樣pattern 的/就不用寫成\/來簡略寫法並提昇pattern可讀性; 當然，其他pattern你也可以用如":%s#like#love#"。
(4) /\d\+\.\d\+ 尋找浮點數, 例如 2.99, 0.1.
(5) :10, 521s/\[\(\d\+\\)]/_reg_\1/g ,行10到行521，將例如[33]換成_reg_33
(6) /\w\+_i 尋找例如, test_i, a9_tck_i...
(7) :%s/\t/ /g 將TAB換成空白
```
^	一行的開始
$	一行的結尾
.	任何字元
\_.	任何字元與換行符號
\<	一個單字的開頭字母, 例如moon的m
\>	一個單字的結束, 例如¨beach.¨的.
\%23l	第23行
\%<23l	第23行之前,即是第1到第22行
\%>23l	第23行之後, 即第24行到最後行
\%93c	第93欄 (column)
\%>93c	第93欄之前
\%<93c	第93欄之後

### Example:
```
:exe '%s/\%' . col(".") .'c\w\+/lemon/' 在目前游標所在的欄全換成 lemon, 假設目前游標在第7欄, 這個命令就等於執行 "%s/\%7c\w\+/lemon/"。
```

### Multi items:
```
*	match 0次或多次;
例如, .* 代表match任何字元除了換行符號;
z*代表match 0個z到無限多個z
\+	match 至少1次
例如, a\+可match到"a", "aa", "aaa"...etc
\=	match 0次或1次
例如,foo\= 可match到"fo" 與 "foo"
\?	跟\=一樣, 只是用?往回search時不能使用
\{n,m}	match n到m個
\{n}	match n 個
\{n,}	match 至少n個
\{,m}	match 0 到m個
\{}	跟 * 一樣
\{-n,m}	non-greedy mode. match n 到 m個, 但match 到最少數目.
例如, I'm sooooooo in love with you 用 o\{-2,7}只會match到oo, 但用 o\{2,7}會match到ooooooo.
\{-n,}	non-greedy. match 至少n個, 但是match最少.
\{-,m}	non-greedy, match 0 到m, as few as possible.
\{-}	match 0 到無限多個, as few as possible.
```

### Example:
```
(1) :%s#/\*\_.\{-}\*/##g 將 /*...*/註解拿掉, 包括/*與*/在不同行。
/\*代表/*, \_.代表任何字包括換行符號, \{-}代表match 0 到無限個但as few as possible, \*/代表 */; 如果你寫":%s#/\*\_.*\*/##g" ，也就是用greedy 的 * (match 0 到 無限多，as more as possible)，那以下的內容:
/*
*comment a
*/
code a
/* comment b*/
```

取代完後，會整個區塊連 "code a" 都被刪除。
https://learnbyexample.gitbooks.io/vim-reference/content/Regular_Expressions.html
http://www.study-area.org/tips/vim/Vim-10.html

### 基本的匹配
```
*  指前所綁住的字元或字元集合，出現 0 次或 0 次以上。
\+ 和 * 作用相同，但不包括出現 0 次。
\= 指前所綁住的字元恰好出現 0 或 1 次。
\| 這是多選，就是 or 的意思，被 \| 隔開的 pattern，任一個符
   合的話就算符合。
•	\+, \=, \| 會加上一個 \，是因原字元在 vi(m) 就具有特殊意義，在一般的 regexp 中是 +，?，| 就可以了，只是提醒您一下，以免搞混了！
•	記住 *　\+ 是不可數的！用辭不是是精確，只是幫助您記憶啦！
•	在 elvis 及 ed 中是使用 \? 來匹配出現 0 或 1 次，而不是 \=，這裡要非常小心！
```
[實例] dg*
```
指 * 前所綁住的字元 g 出現 0 次或 0 次以上。也就是說 d(出現 0 次)，dg，dgggg，dgggggggg 都是符合這個 pattern。如果您下尋找指令 /dg*，那符合這個 pattern 的字串都會被找出來。如果用在代換就要非常小心了，像 extended 中的 d 也是會被置換掉的。例如您下 :%s/dg*/test/g 的話，那 extended 這個字會換成 extentestetest。
•	shell 中使用的通用字元為 pattern matching notation 和 regexp 不同的。dg* 在 shell 中是解為以 dg 開頭的任意字串，這就不包括 d 在內了，也就是說在 shell 中，* 是代表任一字元或字串。
```
[實例] dg\+
```
dg, dgg, dgggggg 皆符合，但 d 則不符合。如果是 dg\= 的話，就只有 d、dg 這兩個符合了。
```
[實例] :%s/The\|All/test/g
```
全文中只要是 The 或 All 都會被替換成 test。注意，如果文中有 There 也是會被替換成 testre！要如何避免這種情形呢？下面會另述及限定使用法。
```
[實例] /123-\=4567
```
這樣會找出，123-4567 及 1234567。當然 123-456789 也是會被找出來。
[...]  字元集合，表示中括號中所有字元中的其中一個。
[^..]  這是上述 [...] 的補集，表非中括號內字元的其中一個。
.      除換行字元外的任一單一字元。指本身，非指前所綁之字元。
       就好像 shell 中的 ? 一樣。如果要指定真正的英文句點，要
       用 \ 來 escape，就是說 \. 這時的 . 是代表真正句點，而不
       是 regexp 中的特殊意義。其他如 \* 亦同。
```
[實例]
```
[Aa]
A 或 a 其中的一個。
[12345]
12345 其中的一個數目字。可用 [1-5] 來表示。連續性的數目字或字元可用 - 來隔開，寫出頭尾來代表就可以了。[0-9] 就表 0 到 9 的數目字，[a-d] 就代表 abcd 四個英文字母
```
[實例] W[0-9]*\.cc
```
這個例子是說以 W 開頭，後接 0-9 其中一個或多個數目字或不接什麼，然後是一個句點，最後是 cc。所以 W.cc，W1.cc，W2.cc，W345.cc，W8976543287.cc 皆符合。如果要表示 W 及 .cc 間夾一個以上的數目字，要寫成 W[0-9][0-9]*\.cc。
```
[實例] .*
```
這代表任意字元或字串，或什麼都沒有，腦筋急轉彎，對照前面的定義想一下。當然這是不包括換行字元的。
```
[實例]
```
[^M]　表除 M 以外的任意字元。
[^Tt]　表 T 及 t 以外的任意字元。
[^0-9]　表非數目字之字元。
[^a-zA-Z]　表非英文字母之字元。
•	注意，^ 要在中括號內，且在最開頭的地方，否則另有含意。
^  匹配行首，指其後綁住的字串，出現在行首才符合。
$  匹配行尾，指其前綁住的字串，出現在行尾才符合。含換行字元。
•	不是在行首的 ^ 指的是 ^ 這個字元。不是在行尾的 $ 是指 $ 本身這個字元。
```
[實例] /^What
```
這樣只有在行首的 What 才會被找出來。注意！ Whatever, What's 也是會被找出來。如果是 /What$ 則是在行尾的 What 才會被找出來。
```
[實例] ^$
```
這是什麼東東？行首也是行尾的行。ㄚ，就是空白行嘛！當然也不能說這個行是沒有什麼東東啦！空白行至少也是會有個換行字元。在後面會詳述如何消除全文的空白行。
\(...\)  記憶 pattern，可由 \1, \2...\9 來叫出。
```
[實例] :%s/\([a-z]\)\1/test/g
```
這樣 aa, bb, cc, dd, ..., zz 都會被 test 替換掉。這和 :%s/[a-z][a-z]/test/g 是不一樣的意思，後者會把 aa, ab, ac... ba, bb, bc...zz 都換成 test。也就是說 \(...\) 由 \1 叫出時會有對稱性的配對出現。
```
[實例] :%s/\(.\)\(.\)r\2\1/test/g
```
會將中間為 r，前有二個任一字元，後有兩個具對稱性的字元所組成的字串替換成 test。\2 是呼叫第二組 \(.\)，而 \1 是呼叫第一組 \(.\)。例如：12r21，cfrfc，7grg7 等都會被替換成 test。
\<  匹配字（word）首。所謂 word 包括文數字及底線。
\>  匹配字尾。這就是前所提及的限定用法，被 \<，或 \> 括住的
    pattern 就會被限制住，使 regexp 不能再向右（左）擴充解釋。
•	ed 及 perl 中可以 \b 來表示這兩個符號，perl 中只支援 \b，ed 則 \b 及 \<, \>皆支援。但在 perl 可多加個 ? 來限制 regexp 的擴充解譯。
•	功能上而言，這是和 ^ $ 一樣的定位樣式（anchor pattern）指所綁住的字串必須是單字邊界（word boundary），前或後或前後除了空白字元及標點符號外不可再有其它字元。
•	在 vim 中 \b 是表示 <BS> 即 backspace 鍵。
```
[實例] :%s/\<abbbc\>/test/g
```
這樣只有 abbbc 才會被替換成 test。如果沒有這樣限定，:%s/abbbc/test/g，那 deabbbcly 中的 "abbbc" 亦會被替換成 test。所以前面 :%s/The\|All/test/g 可換成 :%s/\<The\>\|\<All\>/test/g 這樣一來，There 就不會被替換成 testre 了！
```
[實例] :%s/\<abbbc/test/g
```
這樣的話，只要是以 abbbc 為首的字(word)，其中的 abbbc 的部份都會被 test 所替換。注意！是指字首，而不是指行首。所以 abbbc，abbbcerd，abbbckijuds 都符合。
\{n,m}  指前所綁住的字元或字元集合最少出現 n 次，最多出現 m 次。
•	這在一般的 regexp 表示成 \{n,m\}。vim 及 elvis 兩種表示法皆支援。perl 則直接使用 {}。以下會舉四種不同的例子，請大家發揮一下想像力。:-)
```
[實例] \{最小值，最大值}
```
如 [0-9]\{3,4} 匹配至少三位數，但不可多於四位數的數目字。如：
  123
  12
  1
  123456
  1234567
  12345678
  1234
  12345
如果下 :%s/[0-9]\{3,4}/test/g 的話，那 1，12 這兩組不會被替換，因為不滿 3 位數。而 12345，則會換成 test5。123456，則會換成 test56。12345678，則會換成 testtest。1234567 也是會換成 testtest。123，1234 這兩組則會被替換成 test。您可以親自操作一次就知道怎麼一回事了。操作時最後加 gc 來 confirm，這樣您會更瞭解實際替換的內容。ㄟ，別忘了 u 可以回複您的編輯動作。
```
[實例] \{數目字}
```
xy\{20}　表示 x 後接 20 個 y。
e[x-z]\{4}　表示 e 後接有四個字元，是 x,y,z 的其中一個的
　　　　　 組合。如：exxxx, exyyz, ezzyz, exyzz 皆符合。
```      
[實例] \{最小值，}
```
xy\{2,}　表 x 後接至少二個的 y。相當於 xyyy* 或 xyy\+ 。
```
[實例] \{，最大值}
```
xy\{,4}　表 x 後接至多四個或更少的 y （可能沒有）。
　　　　 因此 x, xy, xyy ,xyyy, xyyyy 皆符合。
 
中介字元（metacharacter, or character classes）
主要是簡化 regexp 的書寫。
\s  表空白字元，即 <Space> 或 <Tab>。
•	不含換行字元，這是編輯器的特性使然。在 perl 的 \s 是包含換行字元的。而且 vim 及 elvis 皆不支援 \n 這種換行中介字元。
\S  表非空白字元。
\d  表數目字（digits），即 [0-9]。
\D  表非數目字，即 [^0-9]。
\w  表一般字元（word character），包括底線。即 [0-9a-zA-Z_]。
\W  表非一般字元，即 [^0-9a-zA-Z_]。
\a  表英文字母（alphabetic character），即 [a-zA-Z]。
\A  表非英文字母，即 [^a-zA-Z]。
\l  表小寫字母（lowercase character），即 [a-z]。
\L  表非小寫字母，即 [^a-z]。
\u  表大寫字母（uppercase），即 [A-Z]。
\U  表非大寫字母，即 [^A-Z]。
•	原始 vi 不支援此種中介字元。
•	使用中介字元的比對速度將會比使用字元集合 [] 的快。
 ```
### 全域性的指令
```
:[range]g/pattern/[cmd]
cmd 是 ed 可用的指令，預設是 p(print)，您可查一下 man ed，就可以知道有什麼指令可用。這個小節裡主要是說明 d(delete) 的功能。因為是要說明如何消除空白行。需注意的是，d 是行刪除指令，凡含 pattern 的整行都會被刪掉，而且 range 不指定的話，預設是全篇文章，因為 g 就是代表 globe。
•	在 vim 的 help 檔裡說的是 ex 指令，但 ex 實際上是和 vim 連結的，因此這裡特別指出 ed。但 ed 的指令少數可能會和 vim 的 ex 不同，這是因為 ed 和 vim 並非同步在發展，作者也非同一人。
:g/^$/d
這樣就會刪除全文的空白行。前面已提過 ^$ 代表的是空白行。但這裡有個問題，如果空白行裡包含了其它空白字元（即 Space 或 Tab）的話。表面看起來是和一般空白行一模一樣，但卻暗藏玄機，用上面的方法就無法刪除這種空白行了！怎麼辦？來！看招！
:g/^[<Space><Tab>]*$/d
在 vim 或 elvis 裡您可以如此照打，也就是 <Space> 代表空白字元，<Tab> 代表按 Tab 鍵的結果。在原始 vi 則不行，得自行按出特殊字元出來，就是 Ctrl-v Space 及 Ctrl-v Tab。或採更簡單的打法：
:g/^\s*$/d
還記得中介中元嗎？好用吧！少打了不少字。:-) 意思就是刪除含 0 或 1 個以上空白字元的行。
有些書中寫成 :%s/^$//g 可以刪除空白行，這是錯誤的，因為 :s 這 個指令只更動一行裡的內容物，但不會做刪除一行的動作。
 
& 替代變數
代表置換時合於 patern 的字元或字串。
```
[實例] :%s/\u\d\d\d\d\d\d\d\d\d\>/ID:&/g
```
這樣全文中的身份證字號前就會加上 ID: 字樣，也就是說 T123456789 會被換成 ID:T123456789。還記得嗎？ \d 就是 [0-9]，\u 代表大寫的英文字母。加個 \> 是防止 T12345678999 也被換掉。當然前面再加個 \< 更保險。ID: 字樣您用中文也行！
另一個好用的例子是電話號碼前加上 TeL:，就請您自行練習了！
```
[實例] 將檔案 3 至 7 行的資料向右移 2 個空白
```
  :3,7s/.*/  &/
但這樣連空白行也是會插入空白字元，較高明的做法是：
  :3,7s/.\+/  &/
這樣空白行就不會去動它了！想通了 .* 及 .\+ 的意思了嗎？往前翻一下 . * \+ 的定義。
```
[實例] 將檔案 3 至 7 行的資料向左移 2 個空白
```
  :3,7s/^  //
就是刪去行首的二個空白啦！
```
[實例] 將全文的 Edward 這個單字，前後加上中括號
```
  :%s/\<Edward\>/[&]/g
```
[實例] 將全文的 Edward 這個單字，改成大寫的。
 ```
 :%s/\<Edward\>/\U&/g
•	ㄟ！\U 不是代表非大寫字母嗎？喔！您搞錯位置了。\U 在 pattern 的位置的時候是指非大寫字母的樣式，即 [^A-Z]，但如果是在置換字串位置的時候是指將其後的字串通通改成大寫。與其相對的是 \L，會將其後的字串改為小寫。詳細請 :h sub-replace-special。
```
[實例] 將全文每行最後加上 <BR> 這個 HTML tag。
```
  :%s/.*/&<BR>/g
怎麼樣，是否已感覺到 regexp 威力無窮了呢？還是您已經快睡著了呢？:-) 不過也請您想想，如果是在沒有 regexp 功能的編輯器裡，範例中的一些動作您會怎麼做呢？一個一個去改？
```
### greedy 陷阱
```
regexp 會有貪心的傾向，什麼意思呢？就是說在同一行內，如果有多個符合 pattern 的情形，會找最長的那一個。
•	注意！greedy 的特性是針對會反覆比對的 regexp 而言，例如：*, \=, \+, \{} 等。前面所舉的 .* 的例子，由於 greedy 的關係，在整篇文章中做替換時，會被當成是每一行整行，因為 regexp 會去找每一行最長符合的那一個。
```
[實例] This is a test. Test for regexp.
```
如果您下 :%s/[Tt].*t/program/g 原意是想把所有的 Test 或 test 換成 program 的，結果由於 regexp 的貪心，整個 "This is a test. Test" 會換成 program。結果原文就變成了 program for regexp. 因此在全文替換時要非常小心，避免使用彈性太大的 regexp。像此例，只要下 :%s/\<[Tt]est\>/program/g 就可以了！

最後提醒您，這可不是 regexp 的全部，礙於篇幅及在下功力的問題，當然是沒辦法全面詳盡的向各位做介紹，在下只是將各位領進門，修行就得看各位了！如果還想更深入的研究 regexp，可參考： Mastering 
```

## Regular Expressions(O'Reilly & Associates) 一書。
### Regular Expressions
*	Flags for Search and Replace
*	Pattern atom
*	Pattern Qualifiers
*	Character Classes
*	Multiple and Saving Patterns
*	Word Boundary
*	Search Pattern modifiers
*	Changing Case using Search and Replace
*	Delimiters in Search and Replace
*	Further Reading

### Flags for Search and Replace
*	g replace all occurrences within line
*	c ask for confirmation before each replacement
*	i ignore case for searchpattern
*	I don't ignore case for searchpattern
Flags can be combined
*	s/cat/Dog/gi replace every occurrence of cat (ignoring case, so it matches Cat, cAt, etc) with Dog (note that i doesn't affect the replacement string Dog)
For more info, :h :s_flags

### Pattern atom
*	^ start matching from beginning of a line
*	/^This match This only at beginning of line
*	$ match pattern should terminate at end of a line
*	/)$ match ) only at end of line
*	/^$ match empty line
*	. match any single character, excluding new line
*	/c.t match 'cat' or 'cot' or 'c2t' or 'c^t' but not 'cant'
For more info, :h pattern-atoms

### Pattern Qualifiers
*	*greedy match preceding character 0 or more times
*	/abc* match 'ab' or 'abc' or 'abccc' or 'abcccccc' etc
*	\+ greedy match preceding character 1 or more times
*	/abc\+ match 'abc' or 'abccc' but not 'ab'
*	\? match preceding character 0 or 1 times (\= can also be used)
*	/abc\? match 'ab' or 'abc' but not 'abcc'
*	\{-} non-greedy match preceding character 0 or more times
*	Consider this line of text 'This is a sample text'
*	/h.\{-}s will match: 'his'
*	/h.*s will match: 'his is a s'
*	Read more on non-greedy matching
*	\{min,max} greedy match preceding character min to max times (including min and max)
*	min or max can be left unspecified as they default to 0 and infinity respectively
*	greedy match, tries to match as much as possible
*	\{-min,max} non-greedy match, tries to match as less as possible
*	\{number} match exactly with specified number
*	/c\{5} match exactly 'ccccc'
For more info, :h pattern-overview

### Character Classes
*	[abcde] match any of 'a' or 'b' or 'c' or 'd' or 'e' ONE time
*	use [a-e] as shortform
*	[^abcde] match any character other than 'a' or 'b' or 'c' or 'd' or 'e'
*	use [^a-e] as shortform
*	[aeiou] match vowel character
*	[^aeiou] match consonant character
*	\a matches alphabet character, short-cut for [a-zA-Z]
*	\A matches other than alphabet [^a-zA-Z]
*	\l matches lowercase alphabets [a-z]
*	\L matches other than lowercase alphabets [^a-z]
*	\u matches uppercase alphabets [A-Z]
*	\U matches other than uppercase alphabets [^A-Z]
*	\d matches digit character [0-9]
*	\D matches other than digit [^0-9]
*	\x matches hexademical character [0-9a-fA-F]
*	\X matches other than hexademical [^0-9a-fA-F]
*	\w matches any alphanumeric character or underscore [a-zA-Z0-9_]
*	\W match other than alphanumeric character or underscore [^a-zA-Z0-9_]
*	\s matches white-space characters space and tab
*	\S matches other than white-space characters
*	\t used in replacestring to insert a Tab character
*	\r used in replacestring to insert a newline character
For more info, :h /character-classes

### Multiple and Saving Patterns
*	\| allows to specify two or more patterns to be matched
*	/min\|max match 'min' or 'max'
### •	\(pattern\) allows to group matched patterns and use special variables \1, \2, etc to represent them in same searchpattern and/or replacestring when using substitute command
*	/hand\(y\|ful\) match 'handy' or 'handful'
*	/\(\a\)\1 match repeated alphabets

### Word Boundary
*	\<pattern Bind the searchpattern to necessarily be starting characters of a word
*	/\<his matches 'his' and 'history' but not 'this'
*	pattern\> Bind the searchpattern to necessarily be ending characters of a word
*	/his\> matches 'his' and 'this' but not 'history'
*	\<pattern\> Bind the searchpattern to exactly match whole word
*	/\<his\> matches 'his' and not 'this' or 'history'

### Search Pattern modifiers
*	\v helps to avoid \ for pattern qualifiers, grouping pattern, etc
*	/\vc{5} match exactly 'ccccc'
*	/\vabc+ match 'abc' or 'abccc' but not 'ab'
*	/\vabc? match 'ab' or 'abc' but not 'abcc'
*	/\v<his> match whole word 'his', not 'this' or 'history'
*	/\vmin|max match 'min' or 'max'
*	/\vhand(y|ful) match 'handy' or 'handful'
*	/\v(\a)\1 match repeated alphabets
*	s/\v(\d+) (\d+)/\2 \1/ swap two numbers separated by space
*	\V no need to use \ when trying to match special characters
*	/V^.*$ match the exact sequence ^.*$
*	\c case insensitive search
*	/\cthis matches 'this', 'This', 'thiS', etc
*	\C case sensitive search
*	/\Cthis match exactly 'this', not 'This', 'thiS', etc
*	\%V only inside visually selected area
*	s/\%Vcat/dog/g replace 'cat' with 'dog' only in visually selected region
### For more info
*	:h /magic
*	Magicness in Vim regex
*	Excellent examples and other Vim settings on case sensitivity

### Changing Case using Search and Replace
These are used in the replacestring section
*	\u uppercases the next character
*	\U UPPERCASES the following characters
*	\l and \L are equivalent for lowercase
*	use \e and \E to end further case changes
Example:
```
*	:% s/\v(\a+)/\u\1/g will Capitalize all the words in current file (i.e only first character of word is capitalized)
*	:% s/\v(\a+)/\U\1/g will change to all letters to UPPERCASE in current file
*	:% s/\v(\w)_(\a+)/\1\u\2/g change variable_name to camelCase
*	for ex: 'min_max' will change to 'minMax', 'array_sum' will change to 'arraySum' and so on
*	Changing case with regular expressions

Delimiters in Search and Replace
*ne can also use other characters like #^$ instead of /
*	:% s#/project/adder/#/verilog/project/high_speed_adder/#g this avoids mess of having to use \/ for every / character
```

### Further Reading
*	:h regular-expression
*	vimregex
*	What does this regex mean?

https://people.csail.mit.edu/vgod/vim/vim-cheat-sheet-en.pdf


