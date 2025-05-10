module Jekyll
  class WandboxTag < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @id = text.strip.delete('"')
    end

    def render(context)
	  code = super.strip.gsub(/</, '&lt;').gsub(/>/, '&gt;').gsub(/"/, '&quot;')

	  <<~HTML
 	   <div class="wandbox-block my-6">
  	    <pre id="#{@id}-code" class="highlight"><code class="language-cpp">#{code}</code></pre>
    	  <button onclick="runWandbox('#{@id}')" class="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Run</button>

  	    <table class="wandbox-table mt-4 w-full text-sm border border-gray-300">
    	    <thead class="bg-gray-100 text-left">
      	    <tr>
      	      <th class="border border-gray-300 p-2">Type</th>
  	          <th class="border border-gray-300 p-2">Output</th>
  	        </tr>
 	       </thead>
 	       <tbody id="#{@id}-output">
      	    <tr>
          	  <td colspan="2" class="text-center p-2 text-gray-500">Not executed yet</td>
     	     </tr>
     	   </tbody>
  	    </table>
  	  </div>
	  HTML
	end
  end
end

Liquid::Template.register_tag('wandbox', Jekyll::WandboxTag)