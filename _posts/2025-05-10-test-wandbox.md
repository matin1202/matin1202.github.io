---
title: "Wandbox 테스트"
date: 2025-05-10 20:00:00 +0900
tags: [C++, Wandbox, Chirpy]
---

다음은 Wandbox와 연동된 테스트입니다.

{% wandbox "hello-wandbox" %}
#include <iostream>
int main() {
  std::cout << "Hello from Wandbox!" << std::endl;
  return 0;
}
{% endwandbox %}

{% wandbox "compile-error" %}
int main() {
  undeclared_variable += 1; // 컴파일 에러
}
{% endwandbox %}

{% wandbox "runtime-error" %}
#include <vector>
int main() {
  std::vector<int> v;
  return v.at(100); // 런타임 에러
}
{% endwandbox %}

<script src="{{ '/assets/js/wandbox.js' | relative_url }}"></script>