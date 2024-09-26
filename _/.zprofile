eval "$(/opt/homebrew/bin/brew shellenv)"
eval "$(oh-my-posh init zsh --config ~/.theme.omp.json)"
eval "$(fnm env --use-on-cd)"
eval "$(zoxide init zsh)"
eval "$(fzf --zsh)"

alias cd="z"
alias vim="nvim"

export PATH=$PATH:/opt/homebrew/bin

export LC_ALL=en_US.UTF-8                                                                                          
export LANG=en_US.UTF-8                                                                                            
export LC_CTYPE=UTF-8
export CXXFLAGS="-stdlib=libc++"

export PNPM_HOME="/Users/tom/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
