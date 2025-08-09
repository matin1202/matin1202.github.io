require 'cgi'

module Jekyll
  class WandboxTag < Liquid::Block
    @@index = 0
    attr_reader :title_text, :stdin_placeholder_text, :stdin_default_value, :stdin_visible, :is_runnable, :explicit_folded_setting, :lang, :file

    def initialize(tag_name, markup, parse_context)
      super
      stripped_markup = markup.strip

      if stripped_markup =~ /lang=(?:"([^"]*)"|'([^']*)')/
        @lang = ($1 || $2)&.strip&.downcase
      end
      @lang ||= "cpp"
      
      if stripped_markup =~ /file=(?:"([^"]*)"|'([^']*)')/
        @file = ($1 || $2)&.strip
      end

      if stripped_markup =~ /title=(?:"([^"]*)"|'([^']*)')/
        @title_text = ($1 || $2)&.strip
      else
        if @file
          @title_text = @file
        else
            case @lang
            when "python", "py"
              @title_text = "Python Code"
              @lang = "python"
            when "cpp", "c++"
              @title_text = "C++ Code"
              @lang = "cpp"
            else
              @title_text = "Code"
            end
        end
      end

      placeholder_markup_match = stripped_markup.match(/stdin_placeholder=(?:"([^"]*)"|'([^']*)')/)
      if placeholder_markup_match
        @stdin_placeholder_text = (placeholder_markup_match[1] || placeholder_markup_match[2])&.strip
      else
        @stdin_placeholder_text = "Enter standard input here (if any)..."
      end

      value_markup_match = stripped_markup.match(/stdin_value=(?:"([^"]*)"|'([^']*)')/)
      if value_markup_match
        @stdin_default_value = (value_markup_match[1] || value_markup_match[2])
      else
        @stdin_default_value = ""
      end

      visibility_param_match = stripped_markup.match(/stdin_visible=(?:"([^"]*)"|'([^']*)')/i)
      if visibility_param_match
        visibility_param_value = (visibility_param_match[1] || visibility_param_match[2])&.strip&.downcase
        if visibility_param_value == "true"
          @stdin_visible = true
        elsif visibility_param_value == "false"
          @stdin_visible = false
        else
          @stdin_visible = (placeholder_markup_match || value_markup_match)
        end
      else
        @stdin_visible = (placeholder_markup_match || value_markup_match)
      end

      @is_runnable = true
      if runnable_markup_match = stripped_markup.match(/runnable=(?:"([^"]*)"|'([^']*)')/i)
        runnable_val = (runnable_markup_match[1] || runnable_markup_match[2])&.strip&.downcase
        if runnable_val == "false"
          @is_runnable = false
        end
      end

      @explicit_folded_setting = nil
      if folded_markup_match = stripped_markup.match(/folded=(?:"([^"]*)"|'([^']*)')/i)
        folded_val = (folded_markup_match[1] || folded_markup_match[2])&.strip&.downcase
        if folded_val == "true"
          @explicit_folded_setting = true
        elsif folded_val == "false"
          @explicit_folded_setting = false
        end
      end
    end

    def render(context)
      # 1. Get the raw content inside the wandbox block (this could be code + STDIN or just code)
      block_content_raw = super
      stdin_marker = "---STDIN---"

      code_to_compile_and_display = ""
      stdin_for_textarea = @stdin_default_value # Initialize from attribute, if present

      # 2. Parse the block_content_raw for STDIN marker
      if block_content_raw.include?(stdin_marker)
        parts = block_content_raw.split(stdin_marker, 2)
        code_content_from_block = parts[0].strip
        stdin_content_from_block = parts[1].strip

        # If stdin_value attribute was NOT explicitly set, use content from block
        if @stdin_default_value.empty?
          stdin_for_textarea = stdin_content_from_block
          @stdin_visible = true # Make stdin visible if content is provided in block
        end
      else
        # No STDIN marker in block, so the whole block content is potential code
        code_content_from_block = block_content_raw.strip
      end

      # 3. Determine the final code content (from file or from block)
      if @file
        begin
          source = context.registers[:site].source
          file_path_full = ""

          if @file && !(@file.include?('/') || @file.include?(File::SEPARATOR))
            file_path_full = File.join(source, "_cpps", @file)
          else
            file_path_full = File.join(source, @file)
          end

          if File.exist?(file_path_full)
            code_to_compile_and_display = File.read(file_path_full).strip
          else
            Jekyll.logger.error "WandboxTag Error:", "File not found at '#{file_path_full}'"
            return "<p style='color: red; font-weight: bold;'>Wandbox Error: File '#{@file}' not found.</p>"
          end
        rescue => e
          Jekyll.logger.error "WandboxTag Error:", "Could not read file '#{@file}'. Details: #{e.message}"
          return "<p style='color: red; font-weight: bold;'>Wandbox Error: Could not read file '#{@file}'.</p>"
        end
      else
        # If no file attribute, code comes from the block (before STDIN marker if present)
        code_to_compile_and_display = code_content_from_block
      end

      # ... rest of the HTML generation logic ...
      @@index += 1
      id_prefix = "wandbox-#{@@index}"
      marker = "/* ** Start Here ** */"
      if @lang == "python"
        marker = "# ** Start Here **"
      end

      code_for_api_attr_processing = code_to_compile_and_display.dup
      code_for_api_attr_processing.gsub!("\t", "__WANDBOX_TAB__")
      code_for_api_attr_processing.gsub!("\n", "__WANDBOX_NEWLINE__")
      code_for_api_attr_processing.gsub!("\r", "")
      escaped_code_for_api_attr = CGI.escapeHTML(code_for_api_attr_processing)

      code_for_display = code_to_compile_and_display
      if code_for_display.include?(marker)
        code_for_display = code_for_display.split(marker, 2).last
      end
      code_for_display = code_for_display.gsub(/^\s*[\r\n]+/, '')
      escaped_code_for_display = code_for_display.gsub('<', '&lt;').gsub('>', '&gt;')
      code_display_line_count = code_for_display.lines.count

      should_be_initially_folded = false
      if @explicit_folded_setting == true
        should_be_initially_folded = true
      elsif @explicit_folded_setting == false
        should_be_initially_folded = false
      else
        should_be_initially_folded = (code_display_line_count > 30)
      end

      current_title_escaped = @title_text.gsub('<', '&lt;').gsub('>', '&gt;').gsub('"', '&quot;')
      current_stdin_placeholder_escaped = @stdin_placeholder_text.gsub('"', '&quot;')
      # Escape newlines for textarea value to ensure they render correctly in HTML
      current_stdin_default_value_escaped = stdin_for_textarea.gsub('<', '&lt;').gsub('>', '&gt;').gsub("\n", "&#x0A;")

      stdin_section_html = ""
      if @is_runnable && @stdin_visible
        stdin_section_html = <<~STDIN_HTML
          <div class="wandbox-stdin-container">
            <label for="#{id_prefix}-stdin" class="wandbox-stdin-label">Standard Input (stdin):</label>
            <textarea id="#{id_prefix}-stdin" class="wandbox-stdin-input" rows="3" placeholder="#{current_stdin_placeholder_escaped}" aria-label="Standard Input">#{current_stdin_default_value_escaped}</textarea>
          </div>
        STDIN_HTML
      end

      controls_and_output_html = ""
      if @is_runnable
        display_lang_name = @lang.dup
        if display_lang_name == "cpp"
          display_lang_name = "C++"
        else
          display_lang_name = display_lang_name.capitalize
        end

        controls_and_output_html = <<~CONTROLS_OUTPUT_HTML
          <div class="wandbox-controls">
            <button id="#{id_prefix}-run" onclick="runWandbox('#{id_prefix}')">▶ Run Code</button>
            <span id="#{id_prefix}-loading" class="wandbox-loading" style="display: none;">⏳ Running...</span>
            <span class="wandbox-lang-display">#{CGI.escapeHTML(display_lang_name)}</span>
          </div>
          <div id="#{id_prefix}-type" class="wandbox-type"></div>
          <pre id="#{id_prefix}-output" class="wandbox-output"></pre>
        CONTROLS_OUTPUT_HTML
      end

      pre_code_id = "#{id_prefix}-code-pre"
      pre_initial_class = should_be_initially_folded ? 'folded' : ''
      copy_button_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>'
      code_language_class = "language-#{@lang}"

      html_output = <<~HTML
        <div class="wandbox-block" id="#{id_prefix}" data-line-count="#{code_display_line_count}" data-code-for-api='#{escaped_code_for_api_attr}' data-lang="#{@lang}">
          <div class="wandbox-header">
            <span class="wandbox-title">#{current_title_escaped}</span>
            <div class="wandbox-header-buttons">
              <button class="wandbox-fold-btn" id="#{id_prefix}-fold-btn" onclick="toggleWandboxCode('#{id_prefix}')" aria-controls="#{pre_code_id}" aria-label="Toggle code visibility">
              </button>
            </div>
          </div>
          <div class="wandbox-code-wrapper">
            <button class="wandbox-copy-btn" id="#{id_prefix}-copy-btn" onclick="copyWandboxCode('#{id_prefix}')" aria-label="Copy code to clipboard">
              #{copy_button_svg}
            </button>
            <pre id="#{pre_code_id}" class="#{pre_initial_class}"><code class="#{code_language_class}" data-lang="#{@lang}" id="#{id_prefix}-code">#{escaped_code_for_display}</code></pre>
          </div>
          #{stdin_section_html}
          #{controls_and_output_html}
        </div>
      HTML
      return html_output.strip
    end
  end
end

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)