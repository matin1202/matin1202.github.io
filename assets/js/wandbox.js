const CHEVRON_UP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;
const CHEVRON_DOWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>`;
const copyIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
const successIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`;
const loadingIconSVG = `<svg class="copy-loading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle; animation: spin 1s linear infinite;"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>`;


function setFoldButtonIcon(foldBtn, isFolded, animate) {
  if (!foldBtn) return;
  const newIcon = isFolded ? CHEVRON_DOWN_SVG : CHEVRON_UP_SVG;
  
  if (animate) {
    foldBtn.classList.add('icon-swapping');
    setTimeout(() => {
      foldBtn.innerHTML = newIcon;
      foldBtn.classList.remove('icon-swapping');
    }, 150);
  } else {
    foldBtn.innerHTML = newIcon;
  }
}

function setupWandboxFoldButton(foldBtn, preElement) {
  if (!foldBtn || !preElement) return;

  const codeWrapper = preElement.parentElement;
  const copyBtn = codeWrapper ? codeWrapper.querySelector('.wandbox-copy-btn') : null;
  const isInitiallyFolded = preElement.classList.contains('folded');

  setFoldButtonIcon(foldBtn, isInitiallyFolded, false);

  if (isInitiallyFolded) {
    foldBtn.setAttribute('aria-expanded', 'false');
    if (copyBtn) copyBtn.style.display = 'none';
  } else {
    foldBtn.setAttribute('aria-expanded', 'true');
    if (copyBtn) copyBtn.style.display = 'inline-flex';
  }
}

function toggleWandboxCode(id_prefix) {
  const foldBtn = document.getElementById(`${id_prefix}-fold-btn`);
  const preElement = document.getElementById(`${id_prefix}-code-pre`);
  if (!foldBtn || !preElement) return;

  const codeWrapper = preElement.parentElement;
  const copyBtn = codeWrapper ? codeWrapper.querySelector('.wandbox-copy-btn') : null;
  
  preElement.classList.toggle('folded');
  const isNowFolded = preElement.classList.contains('folded');
  
  setFoldButtonIcon(foldBtn, isNowFolded, true);

  if (isNowFolded) {
    foldBtn.setAttribute('aria-expanded', 'false');
    if (copyBtn) copyBtn.style.display = 'none';
  } else {
    foldBtn.setAttribute('aria-expanded', 'true');
    if (copyBtn) copyBtn.style.display = 'inline-flex';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const codeBlocksForPrism = document.querySelectorAll('pre code[id$="-code"]');
  codeBlocksForPrism.forEach((block) => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightElement(block);
    }
  });

  const wandboxFoldButtons = document.querySelectorAll('.wandbox-fold-btn');
  wandboxFoldButtons.forEach(foldBtn => {
    const preElementId = foldBtn.getAttribute('aria-controls');
    if (preElementId) {
      const preElement = document.getElementById(preElementId);
      if (preElement) {
        setupWandboxFoldButton(foldBtn, preElement);
      }
    }
  });
});

async function runWandbox(id_prefix) {
  const wandboxBlockElement = document.getElementById(id_prefix);
  const stdinTextarea = document.getElementById(`${id_prefix}-stdin`);
  const runBtn = document.getElementById(`${id_prefix}-run`);
  const loading = document.getElementById(`${id_prefix}-loading`);
  const typeEl = document.getElementById(`${id_prefix}-type`);
  const outputEl = document.getElementById(`${id_prefix}-output`);

  if (!wandboxBlockElement || !runBtn || !loading || !typeEl || !outputEl) {
    return;
  }
  
  let codeFromAttribute = wandboxBlockElement.dataset.codeForApi;
  let actualCodeForApi = "";

  if (typeof codeFromAttribute === 'undefined') {
    typeEl.textContent = "Internal Error";
    typeEl.classList.add("compile-error");
    outputEl.textContent = "Code for API not found in data attribute.";
    runBtn.disabled = false;
    loading.style.display = "none";
    return;
  }

  const newlinePlaceholderRegex = /__WANDBOX_NEWLINE__/g;
  actualCodeForApi = codeFromAttribute.replace(newlinePlaceholderRegex, "\n");
  
  const stdinValue = stdinTextarea ? stdinTextarea.value : "";

  runBtn.disabled = true;
  loading.style.display = "inline";
  typeEl.textContent = "";
  outputEl.textContent = "";
  typeEl.className = "wandbox-type";

  const body = {
    code: actualCodeForApi,
    compiler: "clang-17.0.1",
    options: "-O0 -std=c++2a",
    stdin: stdinValue,
    save: false
  };
  
  console.log("Wandbox API Request Body:", JSON.stringify(body, null, 2));
  console.log("Code sent to API:\n" + actualCodeForApi);


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



async function copyWandboxCode(id_prefix) {
  const codeElement = document.getElementById(`${id_prefix}-code`);
  const copyBtn = document.getElementById(`${id_prefix}-copy-btn`);
  
  if (!codeElement || !copyBtn) {
    return;
  }

  const originalButtonIcon = copyIconSVG; 
  const successButtonIcon = successIconSVG;
  const loadingButtonIcon = loadingIconSVG;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      copyBtn.innerHTML = loadingButtonIcon;
      copyBtn.disabled = true;
      copyBtn.classList.add('copying');

      await navigator.clipboard.writeText(codeElement.textContent);

      copyBtn.innerHTML = successButtonIcon;
      copyBtn.classList.remove('copying');
      copyBtn.classList.add('copied');
      copyBtn.setAttribute('aria-label', 'Copied to clipboard');

      setTimeout(() => {
        copyBtn.innerHTML = originalButtonIcon;
        copyBtn.classList.remove('copied');
        copyBtn.disabled = false;
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      }, 2000);

    } catch (err) {
      copyBtn.innerHTML = originalButtonIcon; 
      copyBtn.classList.remove('copying');
      copyBtn.disabled = false;
      copyBtn.setAttribute('aria-label', 'Failed to copy');
       setTimeout(() => {
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
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

        copyBtn.innerHTML = successButtonIcon;
        copyBtn.classList.add('copied');
        copyBtn.setAttribute('aria-label', 'Copied to clipboard');
        setTimeout(() => {
            copyBtn.innerHTML = originalButtonIcon;
            copyBtn.classList.remove('copied');
            copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
    } catch (err) {
        copyBtn.innerHTML = originalButtonIcon;
        copyBtn.setAttribute('aria-label', 'Failed to copy');
        setTimeout(() => {
          copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
    }
  }
}
