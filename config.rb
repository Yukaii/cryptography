##
# Bower
##
 
@bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
ignore @bower_config["directory"].gsub(/source\//, "") + '/*'

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

# Add bower's directory to sprockets asset path
sprockets.append_path File.join "#{root}", @bower_config["directory"]
sprockets.append_path File.join root, 'source/bower_components'
sprockets.import_asset 'jquery/dist/jquery.js'

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }
configure :development do
  activate :livereload, :port => 35729, :apply_css_live => true
end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :haml, { :ugly => false, :format => :html5 }

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # To enable relative paths to assets via compass helper functions. Uncomment:
  relative_assets = true

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
