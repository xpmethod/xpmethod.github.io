" This is a minimal .vimrc to be used as a starter kit
" for Columbia's Group for Experimental Methods in the Humanities
" It ensures sane default with an emphasis on Markdown and softwrap
" to help in collaboration.

" Sets and lets {{{

set clipboard=unnamedplus       " Better copy & paste, needs v. 7.3.74+
set confirm                     " safer file override
set encoding=utf-8              " force utf encoding
set expandtab                   " expand tabs to spaces
set foldcolumn=3
set formatoptions=l             " needed for softwrap
set linebreak textwidth=0 wrapmargin=0    " softwrap mode
set list                        " Place a discreet snowman in the trailing whitespace
set listchars=tab:→\ ,trail:¤
set nocompatible                " we don't need to be compat with vi
set mouse=a                     " Enable mouse usage (all modes)
let loaded_matchparen = 1       " disable matching [{(
set shiftwidth=4 softtabstop=4 tabstop=4 " expand tabs to 4 spaces
set showcmd                     " Show (partial) command in status line.
set showmode
set synmaxcol=800               " Don't try to highlight lines longer than 800 characters.
set t_Co=256                    " set mode to 256 colors
set ttyfast                     " better screen update
set wrap

" }}}
" File types and auto commands {{{

" Force markdown for .md
autocmd BufRead,BufNew *.md set filetype=markdown

" Spell-check by default for markdown
autocmd BufRead,BufNewFile *.md setlocal spell spelllang=en_us
autocmd FileType markdown set foldmethod=syntax

" Set foldmethod to marker for .vimrc
autocmd BufRead,BufNew *.vimrc set foldmethod=marker

" Make sure Vim returns to the same line when you reopen a file.
augroup line_return
    au!
    au BufReadPost *
        \ if line("'\"") > 0 && line("'\"") <= line("$") |
        \     execute 'normal! g`"zvzz' |
        \ endif
augroup END

" }}}
" Custom keybindings {{{

" F1 is annoying, map to esc
" ZQ is dangerous, quits without saving

nnoremap <F1> <Esc>
nnoremap ZQ <nop>

" This unsets the "last search pattern" register by hitting return
nnoremap <CR> :noh<CR><CR>

" Use sane regexes.
nnoremap / /\v
vnoremap / /\v

" Keep search matches in the middle of the window. Brilliant!
nnoremap n nzzzv
nnoremap N Nzzzv

" better jk navigation for softwrap mode
nnoremap k gk
nnoremap j gj
nnoremap gk k
nnoremap gj j
nnoremap 0 g0
nnoremap $ g$
nnoremap g0 0
nnoremap g$ $

" Colors and Gutters {{{

highlight! link FoldColumn Normal
hi NonText ctermfg=DarkBlue
hi FoldColumn ctermbg=Black ctermfg=Black
hi SignColumn ctermbg=Black ctermfg=Yellow
hi Folded ctermbg=Black
highlight LineNr ctermfg=DarkGrey

" Spell check colors
if version >= 700
    hi clear SpellBad
    hi clear SpellCap
    hi clear SpellRare
    hi clear SpellLocal
    hi SpellBad ctermfg=red cterm=underline
    hi SpellCap ctermfg=3 cterm=underline
    hi SpellRare ctermfg=13 cterm=underline
    hi SpellLocal  cterm=None
endif

" }}}
