(function() {
  const style = document.createElement("style");
  style.textContent = `
    .wandbox-block {
      border: 1px solid var(--main-border-color, #334155);
      border-radius: 0.5rem;
      margin: 1.5em 0;
      padding: 1em;
      background-color: var(--bg-color, #0f172a);
      transition: background-color 0.3s ease;
    }

    .wandbox-controls {
      margin-top: 0.5em;
      display: flex;
      gap: 1em;
      align-items: center;
    }

    .wandbox-controls button {
      padding: 0.4em 0.8em;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 0.3em;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .wandbox-controls button:hover {
      background-color: #1d4ed8;
      transform: scale(1.03);
    }

    .wandbox-controls button:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
      transform: none;
    }

    .wandbox-loading {
      font-size: 0.9em;
      color: #facc15;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .wandbox-type {
      font-weight: bold;
      margin-top: 1em;
      transition: color 0.3s ease;
    }

    .wandbox-type.success {
      color: #4ade80;
    }

    .wandbox-type.compile-error {
      color: #f87171;
    }

    .wandbox-type.runtime-error {
      color: #facc15;
    }

    .wandbox-output {
      background-color: #1e293b;
      color: #e2e8f0;
      padding: 0.8em;
      margin-top: 0.3em;
      border-radius: 0.4em;
      font-family: monospace;
      white-space: pre-wrap;
      max-height: 400px;
      overflow: auto;
      transition: all 0.3s ease;
    }
    
    .wandbox-copy {
  	background-color: #475569;
	}
	.wandbox-copy:hover {
	  background-color: #334155;
	}
  `;
  document.head.appendChild(style);
})();

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
      alert("Wandbox 응답 오류:\n\n" + text);
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
    alert("Wandbox 요청 실패:\n\n" + err);
  } finally {
    runBtn.disabled = false;
    loading.style.display = "none";
  }
}

function wandboxCopy(id) {
  const codeEl = document.querySelector(`#${id} code`);
  if (!codeEl) return;

  const text = codeEl.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const button = document.querySelector(`#${id} .wandbox-copy`);
    const original = button.innerHTML;
    button.innerHTML = "✔ Copied!";
    setTimeout(() => button.innerHTML = original, 1500);
  });
}