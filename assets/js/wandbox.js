(function() {
  const style = document.createElement("style");
  style.textContent = ``;
  if (style.textContent.trim() !== "") {
    document.head.appendChild(style);
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre code[id$="-code"]');
  codeBlocks.forEach((block) => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightElement(block);
    }
  });
});

async function runWandbox(id) {
  const codeElement = document.getElementById(`${id}-code`);
  const stdinTextarea = document.getElementById(`${id}-stdin`);
  const runBtn = document.getElementById(`${id}-run`);
  const loading = document.getElementById(`${id}-loading`);
  const typeEl = document.getElementById(`${id}-type`);
  const outputEl = document.getElementById(`${id}-output`);

  if (!codeElement || !stdinTextarea || !runBtn || !loading || !typeEl || !outputEl) {
    return;
  }

  const code = codeElement.textContent;
  const stdinValue = stdinTextarea.value;

  runBtn.disabled = true;
  loading.style.display = "inline";
  typeEl.textContent = "";
  outputEl.textContent = "";
  typeEl.className = "wandbox-type";

  const body = {
    code,
    compiler: "clang-17.0.1",
    options: "-O2 -std=c++2a",
    stdin: stdinValue,
    save: false
  };

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });

    const text = await res.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      typeEl.textContent = "Response Error";
      typeEl.classList.add("compile-error");
      outputEl.textContent = "Failed to parse Wandbox response.";
      if (text) outputEl.textContent += "\n\nRaw response:\n" + text;
      return;
    }

    if (result.compiler_error || result.compiler_warning || result.compiler_message) {
      let compilerMessages = "";
      if(result.compiler_error) compilerMessages += "Error:\n" + result.compiler_error + "\n";
      if(result.compiler_warning) compilerMessages += "Warning:\n" + result.compiler_warning + "\n";
      // if(result.compiler_message) compilerMessages += "Message:\n" + result.compiler_message + "\n";
      
      outputEl.textContent = compilerMessages.trim();

      if(result.compiler_error){
        typeEl.textContent = "컴파일 에러";
        typeEl.classList.add("compile-error");
      } else {
        typeEl.textContent = "컴파일 경고/메시지";
        typeEl.classList.add("runtime-error");
      }

    } else if (result.program_error) {
      typeEl.textContent = "런타임 에러";
      typeEl.classList.add("runtime-error");
      let errorOutput = "";
      if(result.program_output) errorOutput += "Output before error:\n" + result.program_output + "\n\n";
      errorOutput += "Error:\n" + result.program_error;
      outputEl.textContent = errorOutput.trim();
    } else {
      typeEl.textContent = "성공";
      typeEl.classList.add("success");
      let programResultText = "";
      if (result.program_output) {
        programResultText = result.program_output;
      }
      outputEl.textContent = programResultText.trim() || "(No output)";
    }

  } catch (err) {
    typeEl.textContent = "Request Error";
    typeEl.classList.add("compile-error");
    outputEl.textContent = "Failed to connect to Wandbox.\nError: " + err.message;
  } finally {
    runBtn.disabled = false;
    loading.style.display = "none";
  }
}

async function copyWandboxCode(id) {
  const codeElement = document.getElementById(`${id}-code`);
  const copyBtn = document.getElementById(`${id}-copy-btn`);
  
  if (!codeElement || !copyBtn) {
    return;
  }

  const originalButtonContent = copyBtn.innerHTML;
  const successIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`;
  const loadingIconSVG = `<svg class="copy-loading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle; animation: spin 1s linear infinite;"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      copyBtn.innerHTML = `${loadingIconSVG} Copying...`;
      copyBtn.disabled = true;
      copyBtn.classList.add('copying');

      await navigator.clipboard.writeText(codeElement.textContent);

      copyBtn.innerHTML = `${successIconSVG} Copied!`;
      copyBtn.classList.remove('copying');
      copyBtn.classList.add('copied');

      setTimeout(() => {
        copyBtn.innerHTML = originalButtonContent;
        copyBtn.classList.remove('copied');
        copyBtn.disabled = false;
      }, 2000);

    } catch (err) {
      copyBtn.innerHTML = 'Error';
      copyBtn.classList.remove('copying');
      copyBtn.disabled = false;
      setTimeout(() => {
        copyBtn.innerHTML = originalButtonContent;
      }, 2000);
    }
  } else {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = codeElement.textContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        copyBtn.innerHTML = `${successIconSVG} Copied!`;
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.innerHTML = originalButtonContent;
            copyBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        copyBtn.innerHTML = originalButtonContent;
    }
  }
}

