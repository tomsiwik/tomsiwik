local function plugins(use)
  use {
    "jesseleite/nvim-noirbuddy",
    requires = { "tjdevries/colorbuddy.nvim", branch = "dev" }
  }
end

return plugins
