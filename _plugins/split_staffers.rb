# frozen_string_literal: true

require "fileutils"

# Regenerates _staffers/NN-<slug>.md from a single master file
# (_staffers_source.md) every time the site builds, so editing the whole Staff
# page is a one-file job. Mirrors _plugins/split_modules.rb.
#
# The numeric prefix preserves the order people are listed in the source file
# (Jekyll sorts a collection by filename).
Jekyll::Hooks.register :site, :after_reset do |site|
  source_path = File.join(site.source, "_staffers_source.md")
  staffers_dir = File.join(site.source, "_staffers")

  next unless File.exist?(source_path)

  FileUtils.mkdir_p(staffers_dir)

  # Clear out previously generated files so removed/renamed people don't linger.
  Dir.glob(File.join(staffers_dir, "*.md")).each { |f| File.delete(f) }

  content = File.read(source_path, :encoding => "UTF-8")

  # Split on marker lines like: ## lucy
  parts = content.split(/^## ([\w-]+)[ \t]*$/)
  parts.shift # discard the comment header before the first marker

  parts.each_slice(2).with_index do |(slug, body), index|
    file_path = File.join(staffers_dir, format("%02d-%s.md", index, slug))
    # The body already contains its own front matter, so write it through as-is.
    File.write(file_path, body.strip + "\n", :encoding => "UTF-8")
  end

  Jekyll.logger.info "split_staffers:", "generated #{parts.length / 2} staffer file(s) from _staffers_source.md"
end
