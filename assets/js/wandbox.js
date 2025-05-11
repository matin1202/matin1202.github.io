// === Wandbox Style 삽입 ===
const wandboxStyle = document.createElement("style");
wandboxStyle.innerHTML = `
  .wandbox-block {
    background: #1e1e2e;
    border: 1px solid #3b3b4f;
    border-radius: 0.6rem;
    padding: 1rem;
    margin-bottom: 2rem;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    animation: fadeIn 0.4s ease;
  }

  .wandbox-controls {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .wandbox-button, .wandbox-copy {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }

  .wandbox-button:hover, .wandbox-copy:hover {
    background: #1e40af;
  }

  .wandbox-loading {
    font-size: 0.9rem;
    color: #cbd5e1;
  }

  .wandbox-type {
    margin-top: 0.5rem;
    font-weight: bold;
  }

  .wandbox-output {
    margin-top: 0.2rem;
    background: #2a2a3d;
    border-radius: 0.4rem;
    padding: 0.6rem;
    font-family: monospace;
    white-space: pre-wrap;
    color: #e2e8f0;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(wandboxStyle);

// === Wandbox 기능 ===
async function wandboxRun(id) {
  const code = document.querySelector(`#${id} code`).innerText;
  const outputEl = document.getElementById(`${id}-output`);
  const typeEl = document.getElementById(`${id}-type`);
  const loadingEl = document.getElementById(`${id}-loading`);

  outputEl.textContent = '';
  typeEl.textContent = '';
  loadingEl.style.display = 'inline';

  const request = {
    code: code,
    compiler: "clang-17.0.1",
    options: "warning",
    "compiler-option-raw": "-std=c++2a",
    save: false
  };

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);

      if (json.status === 0) {
        typeEl.innerHTML = "<span style='color:#4caf50;'>성공</span>";
        outputEl.innerHTML = `<pre><code>${json.program_output}</code></pre>`;
      } else {
        typeEl.innerHTML = "<span style='color:#ff9800;'>실패</span>";
        outputEl.innerHTML = `<pre><code>${json.compiler_output || json.program_error || "오류 없음"}</code></pre>`;
      }
    } catch {
      alert("응답이 JSON이 아님:\n" + text);
    }
  } catch (e) {
    alert("요청 실패: " + e);
  } finally {
    loadingEl.style.display = 'none';
  }
}

function wandboxCopy(id) {
  const code = document.querySelector(`#${id} code`).innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("코드가 복사되었습니다.");
  });
}