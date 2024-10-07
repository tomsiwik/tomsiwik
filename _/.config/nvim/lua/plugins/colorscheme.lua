return {
  {
    "jesseleite/nvim-noirbuddy",
    dependencies = {
      { "tjdevries/colorbuddy.nvim" },
    },
    lazy = false,
    priority = 1000,
    opts = {
      -- All of your `setup(opts)` will go here
    },
  },
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "noirbuddy",
    },
  },
}