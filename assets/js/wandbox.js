async function runWandbox(id) {
  const code = document.getElementById(id + "-code").textContent;
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

    const data = await res.json();
    outputEl.innerHTML = "";

    if (data.compiler_output)
      outputEl.innerHTML += `<tr><td>Compiler Output</td><td><pre>${data.compiler_output}</pre></td></tr>`;
    if (data.program_output)
      outputEl.innerHTML += `<tr><td>Program Output</td><td><pre>${data.program_output}</pre></td></tr>`;
    if (data.compiler_error)
      outputEl.innerHTML += `<tr><td>Compiler Error</td><td><pre>${data.compiler_error}</pre></td></tr>`;
    if (data.program_error)
      outputEl.innerHTML += `<tr><td>Runtime Error</td><td><pre>${data.program_error}</pre></td></tr>`;

    if (!data.compiler_output && !data.program_output && !data.compiler_error && !data.program_error)
      outputEl.innerHTML = "<tr><td colspan='2'>No output returned</td></tr>";
  } catch (err) {
    outputEl.innerHTML = `<tr><td colspan="2"><pre>${err}</pre></td></tr>`;
  }
}
