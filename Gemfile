source 'https://rubygems.org'

# The site is built by our own GitHub Actions workflow (.github/workflows/jekyll.yml),
# not by GitHub's legacy Pages builder, so we use plain Jekyll rather than the
# `github-pages` gem. That gem force-sets `safe: true` and randomizes `plugins_dir`,
# which silently disables everything in _plugins/ (including split_modules.rb).
gem 'jekyll', '~> 4.3'

group :jekyll_plugins do
  gem 'jekyll-remote-theme'   # fetches just-the-docs (see remote_theme in _config.yml)
  gem 'jekyll-seo-tag'
  gem 'jekyll-include-cache'  # required by just-the-docs layouts
  gem 'jemoji'
end

gem 'webrick', '~> 1.8'
