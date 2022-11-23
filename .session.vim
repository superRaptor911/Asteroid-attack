let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/store/program/ts/game
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +5 index.html
badd +5 src/main.ts
badd +19 src/engine/SceneNode.ts
badd +37 src/scenes/TeturedCube.ts
badd +1 src/engine/TextureMan.ts
badd +42 src/game.ts
badd +38 src/scenes/testMenu.ts
badd +39 src/style.css
badd +15 src/scenes/fpsCounter.ts
badd +1 src/engine/BaseNode.ts
badd +40 src/engine/KeyboardInput.ts
badd +45 src/engine/UI.ts
badd +1 src/engine/utils.ts
badd +31 src/engine/ui/ProgressBar.ts
argglobal
%argdel
edit src/engine/UI.ts
argglobal
let s:l = 45 - ((18 * winheight(0) + 18) / 37)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 45
normal! 024|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
