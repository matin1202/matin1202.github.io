module Jekyll
  class WandboxTag < Liquid::Block
    @@index = 0

    def render(context)
      code = super.strip
      index = (@@index += 1)
      id = "wandbox-#{index}"

      <<~HTML
        <div class="wandbox-block">
          <pre><code class="language-cpp" data-lang="cpp" id="#{id}-code">#{code.gsub('<', '&lt;').gsub('>', '&gt;')}</code></pre>
          <button onclick="runWandbox('#{id}')">Run Code</button>
          <div id="#{id}-type" class="wandbox-type" style="margin-top: 0.5em; font-weight: bold;"></div>
          <pre id="#{id}-output" class="wandbox-output" style="background: #f8f8f8; padding: 0.5em;"></pre>
        </div>
      HTML
    end
  end
end

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)