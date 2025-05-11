module Jekyll
  class WandboxTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @id = markup.strip
    end

    def render(context)
      code = super.strip.gsub('<', '&lt;').gsub('>', '&gt;').gsub('"', '&quot;')
      <<~HTML
        <div class="wandbox-block" id="#{@id}">
          <div class="highlight">
            <pre><code class="language-cpp" data-lang="cpp">#{code}</code></pre>
          </div>
          <div class="wandbox-controls">
            <button onclick="wandboxRun('#{@id}')" class="wandbox-button">▶ Run Code</button>
            <button onclick="wandboxCopy('#{@id}')" class="wandbox-copy">📋 Copy</button>
            <span class="wandbox-loading" id="#{@id}-loading" style="display:none;">⏳ Running...</span>
          </div>
          <div class="wandbox-type" id="#{@id}-type"></div>
          <div class="wandbox-output" id="#{@id}-output"></div>
        </div>
      HTML
    end
  end
end 

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)