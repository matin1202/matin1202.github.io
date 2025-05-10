module Jekyll
  class WandboxTag < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @id = text.strip.delete('"')
    end

    def render(context)
      code = super.strip.gsub(/</, '&lt;').gsub(/>/, '&gt;').gsub(/"/, '&quot;')
      <<~HTML
        <div class="wandbox-block" style="margin-bottom: 2rem;">
          <pre id="#{@id}-code" style="background:#f4f4f4; padding:10px; border:1px solid #ccc; overflow-x:auto;">#{code}</pre>
          <button onclick="runWandbox('#{@id}')">Run Code</button>

          <table border="1" style="margin-top:10px; border-collapse: collapse; width:100%;">
            <thead>
              <tr><th>Type</th><th>Output</th></tr>
            </thead>
            <tbody id="#{@id}-output">
              <tr><td colspan="2" style="text-align: center;">Not executed yet</td></tr>
            </tbody>
          </table>
        </div>
      HTML
    end
  end
end

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)