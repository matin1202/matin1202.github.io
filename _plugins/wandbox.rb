module Jekyll
  class WandboxTag < Liquid::Block
    @@index = 0
    attr_reader :title_text, :stdin_placeholder_text

    def initialize(tag_name, markup, parse_context)
      super
      stripped_markup = markup.strip

      if stripped_markup =~ /title=(?:"([^"]*)"|'([^']*)')/
        @title_text = ($1 || $2)&.strip
      end
      @title_text ||= "C++ Code"

      if stripped_markup =~ /stdin_placeholder=(?:"([^"]*)"|'([^']*)')/
        @stdin_placeholder_text = ($1 || $2)&.strip
      end
      @stdin_placeholder_text ||= "Enter standard input here (if any)..."
    end

    def render(context)
      code = super.strip
      index = (@@index += 1)
      id = "wandbox-#{index}"
      
      escaped_code = code.gsub('<', '&lt;').gsub('>', '&gt;')
      
      current_title_escaped = @title_text.gsub('<', '&lt;').gsub('>', '&gt;').gsub('"', '&quot;')
      current_stdin_placeholder_escaped = @stdin_placeholder_text.gsub('"', '&quot;')

      <<~HTML
        <div class="wandbox-block">
          <div class="wandbox-header">
            <span class="wandbox-title">#{current_title_escaped}</span>
            <button class="wandbox-copy-btn" id="#{id}-copy-btn" onclick="copyWandboxCode('#{id}')" aria-label="Copy code to clipboard">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              Copy
            </button>
          </div>
          <pre><code class="language-cpp" data-lang="cpp" id="#{id}-code">#{escaped_code}</code></pre>
          <div class="wandbox-stdin-container">
            <label for="#{id}-stdin" class="wandbox-stdin-label">Standard Input (stdin):</label>
            <textarea id="#{id}-stdin" class="wandbox-stdin-input" rows="3" placeholder="#{current_stdin_placeholder_escaped}" aria-label="Standard Input"></textarea>
          </div>
          <div class="wandbox-controls">
            <button id="#{id}-run" onclick="runWandbox('#{id}')">▶ Run Code</button>
            <span id="#{id}-loading" class="wandbox-loading" style="display: none;">⏳ Running...</span>
          </div>
          <div id="#{id}-type" class="wandbox-type"></div>
          <pre id="#{id}-output" class="wandbox-output"></pre>
        </div>
      HTML
    end
  end
end

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)
