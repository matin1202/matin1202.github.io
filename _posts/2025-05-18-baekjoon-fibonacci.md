---
title: 백준 피보나치 수열
author: matin1202
date: 2025-05-17 12:30:00
layout: post
categories: [C++, BaekJun]
---

## 2747번 피보나치 수

### 문제
---
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 45보다 작거나 같은 자연수이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 출력한다.

## 10870번 피보나치 수 5 (브론즈 2)

### 문제
---

피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 20보다 작거나 같은 자연수 또는 0이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 출력한다.


## 2748번 피보나치 수 2 (브론즈 1)

### 문제
---
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 90보다 작거나 같은 자연수이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 출력한다.

## 풀이

피보나치 수는 점화식 $$F_n = F_{n-1} + F_{n-2} (F_0 = 1, F_1 = 0)$$을 만족합니다.
1. 재귀적 풀이 ($$O(2^n)$$)

	$$F_4 = F_3 + F_2 = F_2 + F_1 + F_1 + F_0$$으로 볼 수 있습니다.
	이를 재귀 함수로 구현합니다.
2. 반복문 풀이 ($$O(n)$$)

	$$0, 1, 1, 2, 3, 6, \dots$$를 순서대로 구하며 해당 번째 값을 찾아냅니다.

## 구현

{% wandbox title="재귀적 풀이 시간 측정(2747, 10870번)" folded="true" stdin_value="20" %}
#include <iostream>
#include <chrono>

using namespace std;

unsigned fibo(int n) {
	if(n == 1 || n == 0) return n;
	return fibo(n - 1) + fibo(n - 2);
}

int main() {
	int n = 0;
	cin >> n;
	auto start = chrono::system_clock::now();
	cout << fibo(n) << "\n";
	auto dur = duration_cast<chrono::milliseconds>(chrono::system_clock::now() - start);
	cout << dur << "\n";
	return 0;
}

{% endwandbox %}

{% wandbox title="반복문 풀이 시간 측정(2748번)" folded="true" stdin_value="90" %}
#include <iostream>
#include <chrono>

using namespace std;

long long fibo(int n) {
	if(n == 1 || n == 0) return n;
	long long a = 0, b = 1;
	for(int i = 1;i < n;i++){
		long long c = a + b;
		a = b;
		b = c;
	}
	return b;
}

int main() {
	int n = 0;
	cin >> n;
	auto start = chrono::system_clock::now();
	cout << fibo(n) << "\n";
	auto dur = duration_cast<chrono::milliseconds>(chrono::system_clock::now() - start);
	cout << dur << "\n";
	return 0;
}

{% endwandbox %}

{% wandbox title="2747, 2748, 10870번" folded="true" stdin_value="90" %}
#include <iostream>

using namespace std;

long long fibo(int n) {
	if(n == 1 || n == 0) return n;
	long long a = 0, b = 1;
	for(int i = 1;i < n;i++){
		long long c = a + b;
		a = b;
		b = c;
	}
	return b;
}

int main() {
	int n = 0;
	cin >> n;
	cout << fibo(n) << "\n";
	return 0;
}

{% endwandbox %}

---

## 10826번 피보나치 수 4 (실버 5)

### 문제
---
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 10,000보다 작거나 같은 자연수 또는 0이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 출력한다.

## 풀이
10,000번째 피보나치 수는 너무 커서 long long 형으로도 표현할 수 없습니다.
Python과 같은 무한 정밀도 수를 지원하는 언어에서는 쉽지만 C++과 같은 언어에서는 구현이 어렵습니다.
C++에서 무한 정밀도 수를 지원하는 클래스를 만들어 해결합니다.

## 구현

{% wandbox title="무한 정밀도 수(10824번)" stdin_value="10000" folded="true" %}
#include <iostream>
#include <vector>
#include <algorithm>
// #include <concepts>

using namespace std;

// template<typename T>
// requires std::integral<T>
class InfinitePrecisionNum {
private:
	vector<int> num;
	
public: 
	InfinitePrecisionNum() {
		num.push_back(0);
	}
	
	InfinitePrecisionNum(long long n){
		if(n == 0) num.push_back(0);
		while(n > 0){
			num.push_back(n % 10);
			n /= 10;
		}
		trim();
	}
	
	InfinitePrecisionNum(const InfinitePrecisionNum& other){
		num = other.num;
	}
	
	InfinitePrecisionNum(InfinitePrecisionNum&& other){
		num = std::move(other.num);
	}
	
	InfinitePrecisionNum operator+(const InfinitePrecisionNum& other) const {
		InfinitePrecisionNum result;
		result.num.clear();
		const auto& a = this->num;
		const auto& b = other.num;
		int carry = 0;
		long long n = max(a.size(), b.size());
		for(long long i = 0;i < n;i++){
			if(i < a.size()) carry += a[i];
			if(i < b.size()) carry += b[i];
			result.num.push_back(carry % 10);
			carry /= 10;
		}
		if(carry != 0) result.num.push_back(carry);
		return result;
	}
	
	InfinitePrecisionNum& operator=(const InfinitePrecisionNum& other){
		if(this == &other) return *this;
		num = other.num;
		return *this;
	}
	
	friend ostream& operator<<(ostream& os, const InfinitePrecisionNum& n){
		for(auto it = n.num.rbegin();it != n.num.rend(); it++) os << *it;
		return os;
	}
	
private:
	void trim(){
		while(num.size() > 1 && num.back() == 0) num.pop_back();
	}
};

InfinitePrecisionNum fibo(int n){
	if(n == 0 || n == 1) return InfinitePrecisionNum(n);
	InfinitePrecisionNum a = InfinitePrecisionNum(0), b = InfinitePrecisionNum(1);
	for(int i = 1;i < n;i++){
		InfinitePrecisionNum c = a + b;
		a = b;
		b = c;
	}
	return b;
}

int main() {
	int n;
	cin >> n;
	cout << fibo(n) << "\n";
	return 0;
}

{% endwandbox %}

{% wandbox title="무한 정밀도 수(Python)" lang="python" stdin_value="10000" folded="true" %}
def fibo(n: int):
    if n == 0 or n == 1:
        return n
    a = 0
    b = 1
    for i in range(1, n):
        c = a + b
        a = b
        b = c
    return c
	
if __name__ == "__main__":
    n = int(input())
    print(fibo(n))
{% endwandbox %}

## 15624번 피보나치 수 7 (실버 4)

### 문제
---
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 1,000,000보다 작거나 같은 자연수 또는 0이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 1,000,000,007으로 나눈 나머지를 출력한다.

---

## 풀이

완전 재귀적 방식 $$O(2^n)$$으로 100만번째 수를 찾기엔 너무 느립니다.

1. Top-Down 다이나믹 프로그래밍(메모이제이션)
	
재귀적 방식과 유사하나 이미 계산된 값을 저장해 시간 복잡도를 줄입니다. $$O(n)$$
	
2. Bottom-Up 다이나믹 프로그래밍(타뷸레이션)
	
	이전 반복문으로 구현한 방식이 타뷸레이션입니다.

## 구현

{% wandbox title="타뷸레이션(15624번)" stdin_value="1000000" folded="true" %}
#include <iostream>

using namespace std;

const long long MOD = 1000000007;

long long fibo(int n){
	if(n == 0 || n == 1) return n;
	long long a = 0, b = 1;
	for(int i = 1;i < n;i++){
		long long c = (a + b) % MOD;
		a = b;
		b = c;
	}
	return b;
}

int main() {
  long long n;
  cin >> n;
  cout << fibo(n) << "\n";
  return 0;
}
{% endwandbox %}

---

## 11444번 피보나치 수 6 (골드 2)

### 문제
---
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 $$F_n = F_{n-1} + F_{n-2} (n ≥ 2)$$가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 1,000,000,000,000,000,000보다 작거나 같은 자연수이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 1,000,000,007으로 나눈 나머지를 출력한다.

## 2749번 피보나치 3

### 문제
---
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 $$F_n = F_{n-1} + F_{n-2} (n ≥ 2)$$가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

### 입력
---
첫째 줄에 n이 주어진다. n은 1,000,000,000,000,000,000보다 작거나 같은 자연수이다.

### 출력
---
첫째 줄에 n번째 피보나치 수를 1,000,000으로 나눈 나머지를 출력한다.

## 풀이
n번째 피보나치 수는 $$F_n = F_{n-1} + F_{n-2}$$
- 그리디 방식으로 풀이할 시 시간복잡도는 $$O(2^n)$$ 
- 메모이제이션 방식으로 풀이할 시 $$O(n)$$

위 두 방식으로 100해 번째 피보나치 수를 1초 내에 구하기엔 무리가 있습니다.

### 피보나치 수를 더 빨리 구하기
1. 행렬을 이용
  
	행렬 $$\begin{bmatrix}F_{n+1} \\ F_{n}\end{bmatrix} = \begin{bmatrix}a & b \\ c & d\end{bmatrix} \begin{bmatrix}F_{n} \\ F_{n-1} \end{bmatrix}$$ 를 만족하는 $$a, b, c, d$$를 구하면 $$F_n$$에 대한 일반식을 구할 수 있습니다.

	이에 $$F_{n+1} = F_{n} + F_{n-1}$$를 대입하면:

	$$\begin{bmatrix}F_{n} + F_{n-1} \\ F_{n}\end{bmatrix} = \begin{bmatrix}a & b \\ c & d\end{bmatrix} \begin{bmatrix}F_{n} \\ F_{n-1} \end{bmatrix}$$

	이를 수행하면: 

	$$\begin{bmatrix}aF_{n} + bF_{n-1} \\ cF_n + dF_{n-1}\end{bmatrix} = \begin{bmatrix}1 \cdot F_{n} + 1 \cdot F_{n-1} \\ 1 \cdot F_n + 0 \cdot F_{n-1}\end{bmatrix} $$

	$$a = 1, b = 1, c = 1, d = 0$$이 나옵니다.

	이를 통해 $$\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} F_n \\ F_{n-1} \end{pmatrix}$$라는 식을 얻을 수 있으며,

	$$\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} F_n \\ F_{n-1} \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^2 \begin{pmatrix} F_{n-1} \\ F_{n-2} \end{pmatrix} $$ 

	$$ = \dots = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n \begin{pmatrix} F_1 \\ F_0 \end{pmatrix}$$
	
	즉, $$\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n \begin{pmatrix} 1 \\ 0 \end{pmatrix}$$입니다.
	
	따라서, 행렬 Q에 대해 $$Q_n = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$$로 표현할 수 있습니다.
	
	예를 들어 $$F_{100}$$을 구하는 경우
	$$Q_{100} = \begin{pmatrix} F_{101} & F_{100} \\ F_{100} & F_{99} \end{pmatrix}$$

	$$ = Q^{64} \cdot Q^{32} \cdot Q^4$$로 표현 할 수 있으므로 시간 복잡도는 $$O(log(n))$$이 됩니다.
	
	---
	
2. 황금비를 이용
	두 피보나치 수 $$F_n, F_{n-1}$$에 대해 두 수의 비는 황금비에 수렴한다고 알려져 있습니다.
	$$\lim_{n \to \infty} \frac{F_{n+1}}{F_n} = \phi = \frac{1 + \sqrt{5}}{2}$$
	따라서, 비네의 공식에 따라 
	$$F_n = \frac{\phi^n - (-\phi)^{-n}}{\sqrt{5}}$$이고, 이에 대한 시간 복잡도는 $$O(1)$$이나, 부동소수점 정밀도 문제 탓에 100해 번째 피보나치 수를 구하는데 사용하기엔 무리가 있습니다.
	
	---
	
3. Fast Doubling 방식(우리가 사용할 방식)
	Fast Doubling은 다음 항등식을 통해 이루어집니다.
	$$F_{2k} = F_k (2F_{k+1} - F_k)$$
	$$F_{2k+1} = F_k^2 + F_{k+1}^2$$
	이 공식을 활용해 $$O(log(n))$$의 시간 복잡도로 계산할 수 있습니다.
	
## 구현

{% wandbox title="시간 측정" stdin_visible="true" stdin_value="100000000000000" folded="true" %}
#include <bits/stdc++.h>

using namespace std;

constexpr long long MOD = 1000000007;

// return <F(n), F(n+1)>
auto fibo_pair(long long n) -> pair<long long, long long> {
    if (n == 0) return {0, 1};
    auto [a, b] = fibo_pair(n/2);
    long long c{0}, d{0};
    c = (a * ((2 * b) % MOD - a % MOD + MOD) % MOD ) % MOD;
    d = (a * a % MOD + b * b % MOD) % MOD;
    
    if (n % 2 == 0) return {c, d};
    return {d, (c + d) % MOD};
}

int main() {
  long long n;
  cin >> n;
  auto start = chrono::system_clock::now();
  cout << fibo_pair(n).first << "\n";
  auto dur = duration_cast<chrono::milliseconds>(chrono::system_clock::now() - start);
  cout << dur.count() << "ms\n";
  return 0;
}
{% endwandbox %}

{% wandbox title="11444번 피보나치 6" stdin_visible="true" stdin_value="1000" %}
#include <bits/stdc++.h>

using namespace std;

constexpr long long MOD = 1000000007;

// return <F(n), F(n+1)>
auto fibo_pair(long long n) -> pair<long long, long long> {
    if (n == 0) return {0, 1};
    auto [a, b] = fibo_pair(n/2);
    long long c{0}, d{0};
    c = (a * ((2 * b) % MOD - a % MOD + MOD) % MOD ) % MOD;
    d = (a * a % MOD + b * b % MOD) % MOD;
    
    if (n % 2 == 0) return {c, d};
    return {d, (c + d) % MOD};
}

int main(){
    long long n;
    cin >> n;
    cout << fibo_pair(n).first;
    return 0;
}
{% endwandbox %}

{% wandbox title="2749번 피보나치 3" stdin_visible="true" stdin_value="1000" %}
#include <bits/stdc++.h>

using namespace std;

constexpr long long MOD = 1000000;

// return <F(n), F(n+1)>
auto fibo_pair(long long n) -> pair<long long, long long> {
    if (n == 0) return {0, 1};
    auto [a, b] = fibo_pair(n/2);
    long long c{0}, d{0};
    c = (a * ((2 * b) % MOD - a % MOD + MOD) % MOD ) % MOD;
    d = (a * a % MOD + b * b % MOD) % MOD;
    
    if (n % 2 == 0) return {c, d};
    return {d, (c + d) % MOD};
}

int main() {
  long long n;
  cin >> n;
  cout << fibo_pair(n).first << "\n";
  return 0;
}
{% endwandbox %}