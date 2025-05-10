module Jekyll
  class WandboxTag < Liquid::Block
    def render(context)
      # 블록 내부의 코드 가져오기
      code = super.strip

      # HTML로 감싸기
      output = <<-HTML
      <pre id="#{context['page']['slug']}-code"><code class="language-cpp">#{code}</code></pre>
      <button onclick="runWandbox('#{context['page']['slug']}')">Run Code</button>
      <table id="#{context['page']['slug']}-output"></table>
      HTML

      output
    end
  end
end

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)