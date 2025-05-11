module Jekyll
  class WandboxTag < Liquid::Block
    @@index = 0
    attr_reader :title_text

    def initialize(tag_name, markup, parse_context)
      super
      if markup.strip =~ /title="([^"]*)"/
        @title_text = $1.strip
      else
        @title_text = "C++ Code"
      end
    end

    def render(context)
      code = super.strip
      index = (@@index += 1)
      id = "wandbox-#{index}"
      escaped_code = code.gsub('<', '&lt;').gsub('>', '&gt;')

      <<~HTML
        <div class="wandbox-block">
          <div class="wandbox-header">
            <span class="wandbox-title">#{title_text}</span>
            <button class="wandbox-copy-btn" id="#{id}-copy-btn" onclick="copyWandboxCode('#{id}')" aria-label="Copy code to clipboard">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            </button>
          </div>
          <pre><code class="language-cpp" data-lang="cpp" id="#{id}-code">#{escaped_code}</code></pre>
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
