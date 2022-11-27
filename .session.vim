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
badd +2 src/main.ts
badd +15 src/engine/SceneNode.ts
badd +27 src/scenes/TeturedCube.ts
badd +9 src/engine/ResourceMan.ts
badd +13 src/game.ts
badd +94 src/style.css
badd +16 src/scenes/fpsCounter.ts
badd +100 src/engine/BaseNode.ts
badd +40 src/engine/KeyboardInput.ts
badd +40 src/engine/UI.ts
badd +7 src/engine/utils.ts
badd +9 src/engine/ui/ProgressBar.ts
badd +5 src/engine/ui/Button.ts
badd +120 src/scenes/gamescene/gamescene.ts
badd +12 src/scenes/Asteroid.ts
badd +11 src/scenes/menus/mainmenu.ts
badd +3 src/scenes/menus/gameover.ts
badd +9 src/engine/storage.ts
argglobal
%argdel
edit src/scenes/menus/gameover.ts
argglobal
balt src/style.css
let s:l = 19 - ((18 * winheight(0) + 18) / 37)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 19
normal! 037|
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
