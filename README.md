# SSL_CLIENT_CERT_AUTH

## Self Signed Certificate CA Cert, Server Cert and Client Cert p.12 .
## 建立安全TLS通道.

    我使用GIT自帶OPENSSL簽CA證書.HTTPS SEVER只有分派 4096 bit CLIENT CA的用戶才能訪問,否則拒絶連接.書寫一些實作和應用場景.以下先提供一些實作代碼,往後補充操作具体內容,和支持不同WEB Site(Apahce,Ngnix)及程式例如對PYTHON支授.我認為有一定應為空間,及安全性求要高程式應用提供一種方案.

* 1.PATH
```js
md CA
md CA\PRIVATE
md SERVER
md SERVER\PRIVATE
md CLIENT
md CLIENT\PRIVATE
```
* 2.實作如下:
### Make Certificates
```js
rem CA

openssl req -x509 -nodes -days 3650 -newkey rsa:4096 -keyout ca/private/ca_key.pem -out ca/ca_cert.pem -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=ca.mbc.edu.mo"

rem Server Cert

openssl genrsa -out server/private/server_key.pem 4096
openssl req -new -key server/private/server_key.pem -out server/server.csr -config ssl.conf 
openssl x509 -req -days 1460 -in server/server.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out server/server_cert.pem -extensions v3_req -extfile ssl.conf

rem Client Cert

openssl genrsa -out client/private/client_key.pem 4096
openssl req -new -key client/private/client_key.pem -out client/client.csr -subj "/C=CN/ST=MACAU State/L=MACAU City/O=MBC EDU./CN=client.d8.mbc.edu.mo"  
openssl x509 -req -days 1460 -in client/client.csr -CA ca/ca_cert.pem -CAkey ca/private/ca_key.pem -CAcreateserial -out client/client_cert.pem -extfile client_cert_ext.cnf
openssl pkcs12 -export -inkey client/private/client_key.pem -in client/client_cert.pem -out clientd8.p12
```

### NodeJS Server實作
```js
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('server/private/server_key.pem'),
  cert: fs.readFileSync('server/server_cert.pem'),
  ca:fs.readFileSync('ca/ca_cert.pem'),
  requestCert: true, 
  rejectUnauthorized: true
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8443); 

```
### tls
```js
const tls = require('tls');
const fs = require('fs');
const options = {
  key: fs.readFileSync('server/private/server_key.pem'),
  cert: fs.readFileSync('server/server_cert.pem'),
  ca:fs.readFileSync('ca/ca_cert.pem'),
  requestCert: true, 
  rejectUnauthorized: true
};
const server = tls.createServer(options, (socket) => {
    console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');    
    socket.on('error', (error) => {
        console.log(error);
    });
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(process.stdout);
    socket.pipe(socket);
});
server.listen(8443, () => {    console.log('server bound');});
```
# Client Connect
```js
const tls = require('tls');
const fs = require('fs');
const options = {
    ca: fs.readFileSync('ca/ca_cert.pem'),
    key: fs.readFileSync('client/private/client_key.pem'),
    cert: fs.readFileSync('client/client_cert.pem'),
    host: 'd8.mbc.edu.mo',
    port: 8443,
    rejectUnauthorized:true,
    requestCert:true
};
const socket = tls.connect(options, () => {
    console.log('client connected', 
        socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
    console.log(data);
});
socket.on('error', (error) => {
    console.log(error);
});
socket.on('end', (data) => {
    console.log('Socket end event');
});
```
# 參考資料未作實
```python
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain('server/server_cert.pem', 'server/private/server_key.pem')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0) as sock:
    sock.bind(('127.0.0.1', 8443))
    sock.listen(5)
    
    with context.wrap_socket(sock, server_side=True) as ssock:
        conn, addr = ssock.accept()
        ...

import requests
resp = requests.get('https://d8.mbc.edu.mo:8443', cert=('client/client_cert.pem', 'client/private/client_key.pem'))

print resp.status_code
print resp.text
```
# 參考 Markdown 寫法
粗體
**bold**
標題字
# This is an <h1> tag
次標題字
## This is an <h2> tag
小標題字
###### This is an <h6> tag

列表

    在同一個主題之下要一一列出內容時，我們常用列表來表示，例如：討論專案中需要哪些功能，或是說明要修改的內容有哪些。

* Item 1
* Item 2
  * Item 2a
  * Item 2b
- [x] This is a complete item
- [ ] This is an incomplete item

區塊

`Format one word or one line`

    code (4 spaces indent)

插入圖片語法
```code
![GITHUB]( http://icoffeebread.appspot.com/static/logo.PNG "coffee bread")
```
![GITHUB]( http://icoffeebread.appspot.com/static/logo.PNG "coffee bread")

階層式區塊
   階層式區塊在表現結構或功能關係上是相當好用的呈現形式

階層式區塊語法：

> Quote one sentences
>>Quote two sentences
>>Quote two sentences
>>>Quote three sentences

https://guides.github.com/features/mastering-markdown/

# Vim 101: A Beginner’s Guide to Vim
## simple ex01
```cmd
 Open file: vim filename
 Press i (for insert mode) and start to add some text .
 Press Esc and Save file [:w]
 Press Esc and quite [:q]
```
## The Modes 
define three: insert mode, command mode, and last-line mode.
command mode:
delete an entire line, rather than inserting “dd.”
delete one charter "X"
To enter the insert mode, type i (for “insert”) 
To get out of insert mode, hit the Escape key.

* When you run vim filename to edit a file, Vim starts out in command mode. 
* enter the insert mode, type i (for “insert”) and now the keys will behave as you’d expect. To get out of insert mode, hit the Escape key.
* Once you press Escape, you’re in command mode again. What if you’d like to save your file or search through your document? No problem, press : and Vim will switch to last-line mode. Vim is now waiting for you to enter a command like :w to write the file or :q to exit the editor.
### ex02
```
i
esc
:q
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
## VIM SHEET
### Navigation
* h Move left H Top line on screen
* * j Move down M Middle line on screen
* k Move up L Bottom line on screen
* l Move right
* 10j Move down 10 lines
* gg First line of the file e The end of the current word
* G Last line of the file b Beginning of current word
* :20 Line 20 of the file w Beginning of next word
* 0 Beginning of current line
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
* * Find the next instance of the current word
* # Find the previous instance of the current word
* n Find the next instance of the word being searched for, in the direction specified by the last use of {*,#}
* N Find the previous instance of the word being searched for, in the direction specified by the last use of {*,#}
* /word Find the next occurrence of ‘word’
* /word\c Find the next occurrence of ‘word’, ignoring case (‘\c’ can appear anywhere in the sequence being searched for)
* /\<word\> Find the next occurrence of the word ‘word’, where ‘word’ is bounded by word boundaries (ex. space, dash)
* :noh Un-highlight words
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
