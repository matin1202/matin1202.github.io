async function runWandbox(id) {
  const code = document.getElementById(`${id}-code`).textContent;

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

    const typeEl = document.getElementById(`${id}-type`);
    const outputEl = document.getElementById(`${id}-output`);

    // 초기화
    typeEl.className = 'wandbox-type';
    outputEl.textContent = '';

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
  }
}