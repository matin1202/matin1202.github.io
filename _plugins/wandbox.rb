module Jekyll
  class WandboxTag < Liquid::Block
    @@index = 0
    attr_reader :title_text, :stdin_placeholder_text

    def initialize(tag_name, markup, parse_context)
      super
      stripped_markup = markup.strip

      if stripped_markup =~ /title="([^"]*)"/
        @title_text = $1.strip
      else
        @title_text = "C++ Code"
      end

      if stripped_markup =~ /stdin_placeholder="([^"]*)"/
        @stdin_placeholder_text = $1.strip
      else
        @stdin_placeholder_text = "Enter standard input here (if any)..."
      end
    end

    def render(context)
      code = super.strip
      index = (@@index += 1)
      id = "wandbox-#{index}"
      escaped_code = code.gsub('<', '&lt;').gsub('>', '&gt;')
      
      # initialize에서 설정된 인스턴스 변수 사용
      current_title = @title_text
      current_stdin_placeholder = @stdin_placeholder_text

      <<~HTML
        <div class="wandbox-block">
          <div class="wandbox-header">
            <span class="wandbox-title">#{current_title}</span>
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
            <textarea id="#{id}-stdin" class="wandbox-stdin-input" rows="3" placeholder="#{current_stdin_placeholder}" aria-label="Standard Input"></textarea>
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
