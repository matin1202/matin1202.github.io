async function runWandbox(id) {
  const code = document.getElementById(id + "-code").textContent.trim();
  const outputEl = document.getElementById(id + "-output");
  outputEl.innerHTML = "<tr><td colspan='2'>Running...</td></tr>";

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "clang-17.0.1",
        code: code,
        options: "warning",
        save: false,
        switches: [
          {
            name: "std-cxx",
            value: "c++2a"
          }
        ]
      })
    });

    let data;
    const contentType = res.headers.get("content-type") || "";

    const text = await res.text();
    try {
      data = JSON.parse(text);
    } catch (e) {
      alert("Wandbox 응답이 유효한 JSON이 아닙니다:\n\n" + text);
      outputEl.innerHTML = `<tr><td colspan="2"><pre>${escapeHtml(text)}</pre></td></tr>`;
      return;
    }

    outputEl.innerHTML = "";

    if (data.compiler_output)
      outputEl.innerHTML += `<tr><td>Compiler Output</td><td><pre>${escapeHtml(data.compiler_output)}</pre></td></tr>`;
    if (data.program_output)
      outputEl.innerHTML += `<tr><td>Program Output</td><td><pre>${escapeHtml(data.program_output)}</pre></td></tr>`;
    if (data.compiler_error)
      outputEl.innerHTML += `<tr><td>Compiler Error</td><td><pre>${escapeHtml(data.compiler_error)}</pre></td></tr>`;
    if (data.program_error)
      outputEl.innerHTML += `<tr><td>Runtime Error</td><td><pre>${escapeHtml(data.program_error)}</pre></td></tr>`;

    if (
      !data.compiler_output &&
      !data.program_output &&
      !data.compiler_error &&
      !data.program_error
    ) {
      outputEl.innerHTML = "<tr><td colspan='2'>No output returned</td></tr>";
    }

    // 하이라이팅 적용
    Prism.highlightAll();
  } catch (err) {
    alert("에러 발생:\n\n" + err.toString());
    outputEl.innerHTML = `<tr><td colspan="2"><pre>${escapeHtml(err.toString())}</pre></td></tr>`;
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}