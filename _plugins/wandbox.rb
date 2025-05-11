code_html = <<~HTML
  <div class="wandbox-block" id="#{id}">
    <div class="highlight"><pre><code class="language-cpp" data-lang="cpp">#{code}</code></pre></div>
    <div class="wandbox-controls">
      <button onclick="wandboxRun('#{id}')" class="wandbox-button">▶ Run Code</button>
      <button onclick="wandboxCopy('#{id}')" class="wandbox-copy">📋 Copy</button>
    </div>
    <div class="wandbox-type" id="#{id}-type"></div>
    <div class="wandbox-output" id="#{id}-output"></div>
  </div>
HTML