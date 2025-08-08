---
title: "Liquid Tag 테스트"
date: 2025-05-10 20:00:00 +0900
tags: [C++, Wandbox, Chirpy]
---

다음은 Wandbox와 연동된 테스트입니다.

{% link_preview "https://www.google.com" %}

{% wandbox lang="cpp" file="main.cpp" stdin_visible="true" %}
파일로부터 코드를 불러옵니다. 이 내용은 무시됩니다.
{% endwandbox %}

{% wandbox title="compile-error" %}
int main() {
  undeclared_variable += 1; // 컴파일 에러
}
{% endwandbox %}

{% wandbox title="runtime-error" stdin_visible="true" %}
#include <vector>
int main() {
  std::vector<int> v;
  return v.at(100); // 런타임 에러
}
{% endwandbox %}

{% wandbox title="stdin" stdin_placeholder="여기에 이름 나이를 입력하세요..." stdin_value="Alice 20" %}
#include <iostream>
#include <string>

int main() {
  std::string name;
  int age;

  std::cout << "Enter your name: \n"; // 이 프롬프트는 stdin 입력창에 직접 나타나지 않습니다.
  std::cin >> name;                 // stdin 입력창의 첫 번째 단어를 읽음

  std::cout << "Enter your age: \n";
  std::cin >> age;                  // stdin 입력창의 다음 숫자를 읽음

  std::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;
  return 0;
}
{% endwandbox %}

```cpp
import std.core;

int main(){
  std::cout << "Hello, World!\n";
  return 0;
}
```


다음은 상태 다이어그램의 변화를 보여주는 애니메이션입니다. 각 프레임은 2초 간격(`interval="2000"`)으로 재생됩니다.

{% mermaid_animation interval="2000" title="프로세스 상태 변화" %}
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]

---

stateDiagram-v2
    direction LR
    [*] --> Active

    state Active {
        [*] --> NumLockOff
        NumLockOff --> NumLockOn : EvNumLockPressed
        NumLockOn --> NumLockOff : EvNumLockPressed
        --
        [*] --> CapsLockOff
        CapsLockOff --> CapsLockOn : EvCapsLockPressed
        CapsLockOn --> CapsLockOff : EvCapsLockPressed
        --
        [*] --> ScrollLockOff
        ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
        ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
    }

---

graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
{% endmermaid_animation %}
