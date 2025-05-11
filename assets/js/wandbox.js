
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre code[id$="-code"]');
  codeBlocks.forEach((block) => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightElement(block);
    } else {
      // console.warn('Prism.js not found. Code highlighting for Wandbox blocks will not work.');
    }
  });
});

async function runWandbox(id) {
  const code = document.getElementById(`${id}-code`).textContent;
  const runBtn = document.getElementById(`${id}-run`);
  const loading = document.getElementById(`${id}-loading`);
  const typeEl = document.getElementById(`${id}-type`);
  const outputEl = document.getElementById(`${id}-output`);

  runBtn.disabled = true;
  loading.style.display = "inline";
  typeEl.textContent = "";
  outputEl.textContent = "";
  typeEl.className = "wandbox-type";

  const body = {
    code,
    compiler: "clang-17.0.1",
    options: "-O0 -std=c++2a",
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
      // alert("Wandbox 응답 오류:\n\n" + text);
      console.error("Wandbox response error:", text, e);
      typeEl.textContent = "Response Error";
      typeEl.classList.add("compile-error"); // Or a new error class
      outputEl.textContent = text;
      return;
    }

    if (result.compiler_error) {
      typeEl.textContent = "컴파일 에러";
      typeEl.classList.add("compile-error");
      outputEl.textContent = result.compiler_error;
    } else if (result.program_error) {
      typeEl.textContent = "런타임 에러";
      typeEl.classList.add("runtime-error");
      outputEl.textContent = result.program_error;
    } else {
      typeEl.textContent = "성공";
      typeEl.classList.add("success");
      outputEl.textContent = result.program_output;
    }

  } catch (err) {
    // alert("Wandbox 요청 실패:\n\n" + err);
    console.error("Wandbox request failed:", err);
    typeEl.textContent = "Request Error";
    typeEl.classList.add("compile-error"); // Or a new error class
    outputEl.textContent = err.message;
  } finally {
    runBtn.disabled = false;
    loading.style.display = "none";
  }
}

async function copyWandboxCode(id) {
  const codeElement = document.getElementById(`${id}-code`);
  const copyBtn = document.getElementById(`${id}-copy-btn`);
  
  if (!codeElement || !copyBtn) {
    console.error('Code element or copy button not found for ID:', id);
    return;
  }

  const originalButtonContent = copyBtn.innerHTML;
  const copyIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="vertical-align: middle;"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
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
      console.error('Failed to copy code to clipboard: ', err);
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
        console.error('Fallback copy method failed:', err);
        // alert('Code copying failed. Please copy manually.'); // 주석 처리
        copyBtn.innerHTML = originalButtonContent;
    }
  }
}
