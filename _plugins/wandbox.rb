module Jekyll
  class WandboxTag < Liquid::Block
    @@index = 0

    def render(context)
      code = super.strip
      index = (@@index += 1)
      id = "wandbox-#{index}"

      <<~HTML
        <div class="wandbox-block highlight">
          <pre><code class="language-cpp" data-lang="cpp" id="#{id}-code">#{code.gsub('<', '&lt;').gsub('>', '&gt;')}</code></pre>

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