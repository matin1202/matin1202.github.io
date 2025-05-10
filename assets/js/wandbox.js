async function runWandbox(id) {
  const code = document.getElementById(id + "-code").textContent.trim();
  const outputEl = document.getElementById(id + "-output");
  outputEl.innerHTML = "<tr><td colspan='2'>Running...</td></tr>";

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        compiler: "c++2a",
        options: "warning",
        save: false
      })
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      alert("Wandbox에서 JSON이 아닌 응답을 반환했습니다:\n\n" + text);
      outputEl.innerHTML = `<tr><td colspan="2"><pre>${escapeHtml(text)}</pre></td></tr>`;
      return;
    }

    const data = await res.json();
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