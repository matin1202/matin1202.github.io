
---
title: C++ 기초
author: matin1202
date: 2025-04-25 15:30:00
categories: [Programming, C++]
tags: [Programming, C++]
---

# Hello, World! 
 ```cpp
 int main() { }  // 최소한의 C++ 실행 프로그램
```
해당 코드는 어떠한 인수<span style="color: grey;"><sup>agrument</sup></span>도 입력받지 않고 어떤 기능을 하지도 않은 가장 기본적인 `main`함수를 정의합니다.
모든 C++ 프로그램은 `main()`이라는 전역 함수를 딱 하나 포함해야 합니다.
프로그램은 `main`함수를 실행하며 시작됩니다.

```cpp
import std.core; // 표준 라이브러리 모듈(STanDarD Library Module)를 사용합니다. 
// C++20 이상에서 사용가능합니다.

int main() {
   std::cout << "Hello, World!" << std::endl;
   return 0;
}
```
해당 코드는 "Hello, World!"를 출력하는 간단한 프로그램입니다.
- `std::` : 표준 라이브러리 네임스페이스에 정의되어 있음을 나타냅니다.
- `cout` : "Character OUTput"의 약자로, 표준 출력 스트림을 나타내는 **객체<span style="color: grey;"><sup>object</sup></span>** 입니다.


# 함수
함수는 이름과 반환 값 타입, 사용할 매개 변수, 본문으로 정의됩니다.
```cpp
double sqrt(double) // 타입: double(double), 기본적인 함수 선언
double sqrt(double n) {
  return n * n;
} // 타입: double (double), 기본적인 함수 정의
```
- `double` : 배정밀도 부동 소수점 타입을 반환합니다.
- `sqrt` : 함수 이름을 정의합니다.
- `double n` : 매개변수<span style="color: grey;"><sup>parameters</sup></span> n를 사용합니다.
- `{ ... }` : 함수가 수행할 실제 작업을 정의합니다. 해당 코드에서는 n × n을 해 반환합니다.
## 함수를 사용하는 이유
- 재사용성<span style="color: grey;"><sup>Reusability</sup></span> : 한 번 작성된 함수는 필요할 때 마다 여러번 호출해 사용할 수 있습니다.
- 모듈성<span style="color: grey;"><sup>Modularity</sup></span> : 복잡한 프로그램을 여러 작은 모듈(함수)로 나눠 전체 구도가 명확해지고 이해 하기 쉬워집니다.
- 유지보수 용이성<span style="color: grey;"><sup>Maintenance</sup></span> : 잘 작성된 함수는 이름만으로도 기능을 알 수 있으므로 관리하기 쉬워집니다.
- 추상화<span style="color: grey;"><sup>Abstraction</sup></span> : 함수 내부의 구조를 알지 못해도, 입력과 출력 값만 알고 사용하면 됩니다.

### 함수 더보기 
함수 오버로딩<span style="color: grey;"><sup>overloading</sup></span> : 같은 이름을 하나 다른 타입의 매개 변수들을 받는 여러개의 함수를 정의하는 기능입니다.
```cpp
import std.core;

int add(int a, int b){
  return a + b;
} // int 2개를 받아 더하는 함수

double add(double a, double b){
  return a + b;
} // double 2개를 받아 더하는 함수

int add(int a, int b, int c){
  return a + b + c;
} // int 3개를 받아 더하는 함수

int main(){
  add(2, 3); // add(int, int), 5
  add(2.0, 3.0); // add(double, double), 5.0
  add(1, 2, 3); // add(int, int, int)
  add(1.0, 2.0, 3.0) // Error: add(double, double, double)은 정의되지 않음
  return 0;
}
```
### 함수 주의점
호출 할 수 있는 함수가 두개 이상이면 모호한 호출<span style="color: grey;"><sup>ambiguous call</sup></span>이 발생해 컴파일 에러가 발생합니다.
```cpp
int add(int, int)
double add(double, double)

int main(){
  add(2, 3); // Error: add(int, int), add(double, double) 둘 중 결정할 수 없어 컴파일 오류를 발생시킵니다.
}
```

# 변수
변수<span style="color: grey;"><sup>variable</sup></span>는 값을 저장하고 사용 할 수 있는 공간입니다.
```cpp
int num; // 정수형 변수 num
float real; // 단정밀도 부동 소수점형 변수 real
```
## 타입 
C++는 여러가지 기본적인 타입을 제공합니다.
1. 기본 데이터 타입<span style="color: grey;"><sup>fundamental type</sup></span>
	- `void` : 특별한 타입으로 값을 받지 않는 타입입니다.
	- `std::nullptr_t` : 특별한 타입으로 어떤 객체도 가리키지 않는 `nullptr`의 타입입니다.
	- 정수형 타입
		1. `bool` : 참(`True`<span style="color: grey;"><sup>1</sup></span>) 혹은 거짓(`False`<span style="color: grey;"><sup>0</sup></span>)을 갖습니다.
		2. 문자형 타입 
			- `char`<span style="color: grey;"><sup>-128~127</sup></span> : 1Byte; 문자 표현 및 작은 정수을 표현합니다.
		3. 정수형 타입 
			- `short`<span style="color: grey;"><sup>-32768~32767</sup></span> : 2Byte; 정수를 표현합니다.
			- `int`<span style="color: grey;"><sup>-21,4748,3648~21,4748,3647</sup></span> : 4Byte; 정수를 표현합니다
			- `long long`<span style="color: grey;"><sup>-9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807</sup></span> : 8Byte; 큰 정수를 표현합니다.
			- 해당 타입들은 `signed`(부호 있음; 기본값), `unsigned`(부호 없음; 0 ~ $2$<sup>4 * Byte</sup>의 범위를 갖습니다.)
		4. 부동 소수점형 타입
			- `float`<span style="color: grey;"><sup>3.40×10<sup>38</sup>~1.18×10<sup>38</sup></sup></span> : 4Byte; 단정밀도 부동 소수점을 표현합니다.
			- `double`<span style="color: grey;"><sup>1.80×10<sup>308</sup>~2.23×10<sup>-308</sup></sup></span> : 8Byte; 배정밀도 부동 소수점를 표현합니다.
			- `long double`<span style="color: grey;"><sup>최대 1.19×10<sup>4932</sup>~3.36×10<sup>-4932</sup></sup></span> : 8, 12, 16 Byte; 매우 높은 단정밀도를 가지나 컴파일러에 따라 달라질 수 있습니다. 사용을 권장하지 않습니다.
2. 복합 속성 타입<span style="color: grey;"><sup>compound types</sup></span>
	- 포인터<span style="color: grey;"><sup>pointers</sup></span> : T<sup>*</sup> 형태로 다른 객체나 함수의 메모리 주소를 저장합니다.
	- 참조<span style="color: grey;"><sup>references</sup></span> : 이미 존재하는 객체의 별명<span style="color: grey;"><sup>alias</sup></span>처럼 동작합니다.
		- lvalue : T& 형태로 메모리 주소를 가지는 객체로, 메모리에 저장된 값을 참조합니다.
		- rvalue : T&& 형태로 임시 객체나 수정 불가능한 값을 나타냅니다.
		- `x = 1 + 2;`에서 x는 lvalue, 1 + 2는 rvalue입니다.
	- 배열<span style="color: grey;"><sup>arrays</sup></span> : T[N] 형태로, 같은 타입 T의 원소 N개를 연속된 메모리 공간에 저장합니다.
	- 함수<span style="color: grey;"><sup>function</sup></span> : 함수의 반환 타입과 매개 변수 타입을 정의합니다.
	- 클래스<span style="color: grey;"><sup>class</sup></span> : `class`나 `struct` 키워드로 정의하며, 데이터 멤버와 멤버 함수를 하나로 묶는 사용자 지정 타입입니다.
	- 공용체<span style="color: grey;"><sup>uni
on</sup></span> : `union` 키워드로 정의하며, 여러 멤버가 같은 메모리 공간을 공유하며 한 시점에는 하나의 멤버만 활성화됩니다.
	- 열거<span style="color: grey;"><sup>enumeration</sup></span> : `enum`이나 `enum class` 키워드로 정의하며, 명명된 정수 상수들의 집합입니다.
[cpprefence.com](https://en.cppreference.com/w/cpp/language/type)을 참조했습니다.

### 타입 변환
타입 변환<span style="color: grey;"><sup>type conversion</sup></span>은 하나의 데이터 타입을 다른 데이터 타입으로 변환하는 과정입니다.
1. 암시적 타입 변환<span style="color: grey;"><sup>implicit type conversion</sup></span>
	- **자동 타입 변환**이라고도 하며 컴파일러가 자동적으로 타입을 변환합니다.
	- 작은 타입에서 큰 타입으로 변환시 사용됩니다. ex) int -> double
	- `double d1 = 1;` d1에는 1.0이 저장됩니다.
2. 명시적 타입 변환<span style="color: grey;"><sup>explicit type conversion</sup></span>
	- **개발자가 직접** 타입을 변환합니다.
	- 주로 큰 타입에서 작은 타입으로 변환 시 사용됩니다. 정보의 손실이 발생합니다. ex) double -> int
	- `int n1 = 1.3;` n1에는 1이 저장되며 0.3이 손실됩니다.

## 연산
변수는 여러 연산자로 연산될 수 있습니다.
```cpp
a + b // 덧셈
a - b // 뺄셈
-a // 단항 뺄셈
a % b // 나머지(Mod)

a==b // a, b는 서로 같다.
a < b // a는 b보다 작다.
a!=b // a, b는 서로 다르다.

a & b // 비트 AND 연산
a | b // 비트 OR 연산
a ^ b // 비트 XOR 연산
^a // 비트 보수 연산

a && b // 논리 AND 연산 (a 이고 b)
a || b // 논리 OR 연산 (a 거나 b)
!a // 논리 NOT 연산

a += b // a = a + b
a ++ // a = a + 1
a %= b // a = a % b

a.b // a 객체의 멤버 b
a->b // a가 가르키는 객체의 멤버 b
a[b] // 배열 a의 b번째 인덱스

a << b // a의 비트를 b만큼 왼쪽으로 이동
// 또는 b 스트림을 a로 출력
a >> b // a의 비트를 b만큼 오른쪽으로 이동
// 또는 b 스트림에 a로 입력
```

## 초기화
C++에서 객체를 사용하기 위해선 초기화<span style="color: grey;"><sup>intialization</sup></span>를 통해 값을 넣어야 합니다.
```cpp
int n1 = 1; // int n1에 1을 초기화
int n2 (2); // int n2에 2를 초기화
int n3 {3}; // int n3에 3을 초기화

vector<int> nums {1, 2, 3, 4}; // 벡터 nums를 초기화
```
초기화는 = 연산자, ()연산자 또는 {}연산자<span style="color: grey;"><sup>c++ 11 이상</sup></span>을 사용해 진행할 수 있습니다.
### 초기화 주의사항 
{} 연산자는 명시적 타입 변환을 제거해 타입 변환으로 인한 정보 손실을 막습니다.
```cpp
int n1 = 1.3; // int n1에 1 저장
int n2 (2.3); // int n2에 2 저장
int n3 {3.4}; // Error
```

# 상수
상수<span style="color: grey;"><sup>constant</sup></span>는 값을 한번 초기화한 후 더는 값을 바꿀 수 없는 변수입니다.
1. `const`에 의한 선언
	`const`는 **값을 변경할 수 없는 변수**를 정의할 때 사용됩니다. 
	```cpp
	const int num = 10;
	num = 20; // Error: num은 상수이므로 변경 할 수 없습니다.
	```
	정의 될 때 반드시 **초기화**해야합니다.
	**런타임**에 평가됩니다.
	**포인터**와 결합해 상수로 사용할 수 있습니다.
	```cpp
	int a = 10;
	int* const ptr = &a; // a의 주소값을 갖는 포인터 상수입니다.
	*ptr = 20; // ptr이 가리키는 값은 변경할 수 있습니다.
	ptr = &a; // Error: ptr의 주소값은 변경할 수 없습니다.
	```
2. `constexpr`에 의한 선언
	`constexpr`는 **컴파일 타임 상수**를 정의할 때 사용됩니다.
	해당 상수는 컴파일 시점에 확정 할 수 있어야합니다.
	함수에 사용해 **상수 함수**로 사용 할 수 있습니다.
	```cpp
	constexpr int add(int a, int b){
	  return a + b;
	}
	
	int main(){
	  const int a {1}, b {2}; // 컴파일 시점에 초기화되는 a, b 상수
	  int c {3}, d {4}; // 런타임 시점에 초기화되는 c, d 변수
	  constexpr int result1 = add(a, b); // result1: 3
	  constexpr int result2 = add(a, b); // Error: c, d가 컴파일 시점에 정의되지 않았습니다.
	  int result3 = add(c, d); // result3 : 7
	  return 1;
	}
	```
	`constexpr`로 정의된 함수는 컴파일 시점 뿐 아니라 런타임 시점에서도 사용할 수 있습니다.
3. `consteval`에 의한 선언<span style="color: grey;"><sup>c++20 이상에서 사용가능</sup></span>
	`consteval`은 **컴파일 상수 함수**를 정의하는 데 사용되며, 해당 함수는 컴파일 시점에서만 사용가능합니다.
	```cpp
	consteval int add(int a, int b){
	  return a + b;
	}
	
	int main() {
	  const int a {1}, b {2};
	  constexpr int result1 = add(a, b); // result1: 3
	  int result2 = add(a, b); // Error: consteval 상수 함수는 런타임에 사용될 수 없습니다.
	  return 1;
	}
	```
	`consteval`을 사용하면 반드시 상수를 컴파일 시점에 계산하게 하는 효과가 있습니다.
### 상수 더보기 
1. `const` 객체와 멤버 함수
	`const` 객체는 초기화된 이후 **상태가 변경되지 않습니다.**
	`const` 멤버 함수는 **객체의 상태를 변경하지 않습니다.**
	```cpp
	import std.core;
	
	class MyClass{
	  public:
	  int value;
	  MyClass(int v): value(v) {}
	  
	  int ​getValue() const { 
	    return value;
	  } // const 멤버 함수
	  
	  void setValue(int v) {
	    value = v;
	  }
	  
	  int changeValue(int v) const {
	    value = v;
	    return value;
	  } // Compile Error: const 멤버 함수는 객체의 상태를 변경할 수 없습니다.
	};
	
	int main() {
	  const MyClass obj(1); // const 객체로 선언됩니다.
	  std::cout << obj.getValue(); // 1이 출력됩니다.
	  obj.setValue(2); // Error: const 객체는 상태를 변경할 수 없습니다.
	  return 0;
	}
	```
2. `const` 포인터와 참조
	- `const T*` : **상수 T에 대한 포인터**로 포인터는 변경 가능하지만, 가리키는 값은 변경 할 수 없습니다.
	- `T* const` : **상수 포인터**로 포인터는 변경할 수 없지만, 가리키는 값은 변경 할 수 있습니다.
		
	- `const T& ` : **상수 T에 대한 참조**로 값을 변경할 수 없습니다.
	- `T& const` : C++에서는 참조에 `const`를 **적용할 수 없습니다. **
	```cpp
	int a {10}, b {20};
	const int& ref1 = a; // 상수 a에 대한 참조 ref1
	// int& const ref2 = a; Error: C++은 상수 참조를 허용하지 않습니다.
	
	ref1 = b; // 상수 a에 대한 참조 ref1의 값을 변경할 수 없습니다.
	```
	
3. `const` 매개 변수
	`const` 매개 변수는 **함수가 매개 변수의 값을 변경할 수 없게** 보장합니다.
	- 기본적인 상수 매개 변수
		`const`를 매개 변수이 적용하면 매개 변수를 변경할 수 없게 됩니다.
		```cpp
		import std.core;
		
		void printValue(const int x) {
		  x = 10;  // Error: const 매개 변수는 값을 변경할 수 없습니다.
		  std::cout << x << std::endl;
		}
		int main() {
		  int a = 5;
		  printValue(a);  // 5 출력
		}
		```
		
	- 상수 참조 매개 변수
		`const`참조를 사용하여 객체나 배열등의 **큰 자료의 복사본을 만들지 않고, 원본을 훼손하지 않으며 매개 변수로 전달할 수 있습니다.**
		```cpp
		import std;
		
		void printArray(const std::vector<int>& arr) {
		  arr[0] = 10;  // 오류! const 참조 매개 변수는 값을 변경할 수 없습니다.
		  std::cout << arr << std::endl;
		}
		
		int main() {
		  std::vector<int> a = std::vector<int>(1000);
		  printArray(a);  // 벡터 a 출력
		}
		```import std.core;

int add(int a, int b){
  return a + b;
} // int 2개를 받아 더하는 함수

double add(double a, double b){
  return a + b;
} // double 2개를 받아 더하는 함수

int add(int a, int b, int c){
  return a + b + c;
} // int 3개를 받아 더하는 함수

int main(){
  add(2, 3); // add(int, int), 5
  add(2.0, 3.0); // add(double, double), 5.0
  add(1, 2, 3); // add(int, int, int)
  add(1.0, 2.0, 3.0) // Error: add(double, double, double)은 정의되지 않음
  return 0;
}
```
### 함수 주의점
호출 할 수 있는 함수가 두개 이상이면 모호한 호출<span style="color: grey;"><sup>ambiguous call</sup></span>이 발생해 컴파일 에러가 발생합니다.
```cpp
int add(int, int)
double add(double, double)

int main(){
  add(2, 3); // Error: add(int, int), add(double, double) 둘 중 결정할 수 없어 컴파일 오류를 발생시킵니다.
}
```

# 변수
변수<span style="color: grey;"><sup>variable</sup></span>는 값을 저장하고 사용 할 수 있는 공간입니다.
```cpp
int num; // 정수형 변수 num
float real; // 단정밀도 부동 소수점형 변수 real
```
## 타입 
C++는 여러가지 기본적인 타입을 제공합니다.
1. 기본 데이터 타입<span style="color: grey;"><sup>fundamental type</sup></span>
	- `void` : 특별한 타입으로 값을 받지 않는 타입입니다.
	- `std::nullptr_t` : 특별한 타입으로 어떤 객체도 가리키지 않는 `nullptr`의 타입입니다.
	- 정수형 타입
		1. `bool` : 참(`True`<span style="color: grey;"><sup>1</sup></span>) 혹은 거짓(`False`<span style="color: grey;"><sup>0</sup></span>)을 갖습니다.
		2. 문자형 타입 
			- `char`<span style="color: grey;"><sup>-128~127</sup></span> : 1Byte; 문자 표현 및 작은 정수을 표현합니다.
		3. 정수형 타입 
			- `short`<span style="color: grey;"><sup>-32768~32767</sup></span> : 2Byte; 정수를 표현합니다.
			- `int`<span style="color: grey;"><sup>-21,4748,3648~21,4748,3647</sup></span> : 4Byte; 정수를 표현합니다
			- `long long`<span style="color: grey;"><sup>-9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807</sup></span> : 8Byte; 큰 정수를 표현합니다.
			- 해당 타입들은 `signed`(부호 있음; 기본값), `unsigned`(부호 없음; 0 ~ $2$<sup>4 * Byte</sup>의 범위를 갖습니다.)
		4. 부동 소수점형 타입
			- `float`<span style="color: grey;"><sup>3.40×10<sup>38</sup>~1.18×10<sup>38</sup></sup></span> : 4Byte; 단정밀도 부동 소수점을 표현합니다.
			- `double`<span style="color: grey;"><sup>1.80×10<sup>308</sup>~2.23×10<sup>-308</sup></sup></span> : 8Byte; 배정밀도 부동 소수점를 표현합니다.
			- `long double`<span style="color: grey;"><sup>최대 1.19×10<sup>4932</sup>~3.36×10<sup>-4932</sup></sup></span> : 8, 12, 16 Byte; 매우 높은 단정밀도를 가지나 컴파일러에 따라 달라질 수 있습니다. 사용을 권장하지 않습니다.
2. 복합 속성 타입<span style="color: grey;"><sup>compound types</sup></span>
	- 포인터<span style="color: grey;"><sup>pointers</sup></span> : T<sup>*</sup> 형태로 다른 객체나 함수의 메모리 주소를 저장합니다.
	- 참조<span style="color: grey;"><sup>references</sup></span> : 이미 존재하는 객체의 별명<span style="color: grey;"><sup>alias</sup></span>처럼 동작합니다.
		- lvalue : T& 형태로 메모리 주소를 가지는 객체로, 메모리에 저장된 값을 참조합니다.
		- rvalue : T&& 형태로 임시 객체나 수정 불가능한 값을 나타냅니다.
		- `x = 1 + 2;`에서 x는 lvalue, 1 + 2는 rvalue입니다.
	- 배열<span style="color: grey;"><sup>arrays</sup></span> : T[N] 형태로, 같은 타입 T의 원소 N개를 연속된 메모리 공간에 저장합니다.
	- 함수<span style="color: grey;"><sup>function</sup></span> : 함수의 반환 타입과 매개 변수 타입을 정의합니다.
	- 클래스<span style="color: grey;"><sup>class</sup></span> : `class`나 `struct` 키워드로 정의하며, 데이터 멤버와 멤버 함수를 하나로 묶는 사용자 지정 타입입니다.
	- 공용체<span style="color: grey;"><sup>union</sup></span> : `union` 키워드로 정의하며, 여러 멤버가 같은 메모리 공간을 공유하며 한 시점에는 하나의 멤버만 활성화됩니다.
	- 열거<span style="color: grey;"><sup>enumeration</sup></span> : `enum`이나 `enum class` 키워드로 정의하며, 명명된 정수 상수들의 집합입니다.
[cpprefence.com](https://en.cppreference.com/w/cpp/language/type)을 참조했습니다.

### 타입 변환
타입 변환<span style="color: grey;"><sup>type conversion</sup></span>은 하나의 데이터 타입을 다른 데이터 타입으로 변환하는 과정입니다.
1. 암시적 타입 변환<span style="color: grey;"><sup>implicit type conversion</sup></span>
	- **자동 타입 변환**이라고도 하며 컴파일러가 자동적으로 타입을 변환합니다.
	- 작은 타입에서 큰 타입으로 변환시 사용됩니다. ex) int -> double
	- `double d1 = 1;` d1에는 1.0이 저장됩니다.
2. 명시적 타입 변환<span style="color: grey;"><sup>explicit type conversion</sup></span>
	- **개발자가 직접** 타입을 변환합니다.
	- 주로 큰 타입에서 작은 타입으로 변환 시 사용됩니다. 정보의 손실이 발생합니다. ex) double -> int
	- `int n1 = 1.3;` n1에는 1이 저장되며 0.3이 손실됩니다.

## 연산
변수는 여러 연산자로 연산될 수 있습니다.
```cpp
a + b // 덧셈
a - b // 뺄셈
-a // 단항 뺄셈
a % b // 나머지(Mod)

a==b // a, b는 서로 같다.
a < b // a는 b보다 작다.
a!=b // a, b는 서로 다르다.

a & b // 비트 AND 연산
a | b // 비트 OR 연산
a ^ b // 비트 XOR 연산
^a // 비트 보수 연산

a && b // 논리 AND 연산 (a 이고 b)
a || b // 논리 OR 연산 (a 거나 b)
!a // 논리 NOT 연산

a += b // a = a + b
a ++ // a = a + 1
a %= b // a = a % b

a.b // a 객체의 멤버 b
a->b // a가 가르키는 객체의 멤버 b
a[b] // 배열 a의 b번째 인덱스

a << b // a의 비트를 b만큼 왼쪽으로 이동
// 또는 b 스트림을 a로 출력
a >> b // a의 비트를 b만큼 오른쪽으로 이동
// 또는 b 스트림에 a로 입력
```

## 초기화
C++에서 객체를 사용하기 위해선 초기화<span style="color: grey;"><sup>intialization</sup></span>를 통해 값을 넣어야 합니다.
```cpp
int n1 = 1; // int n1에 1을 초기화
int n2 (2); // int n2에 2를 초기화
int n3 {3}; // int n3에 3을 초기화

vector<int> nums {1, 2, 3, 4}; // 벡터 nums를 초기화
```
초기화는 = 연산자, ()연산자 또는 {}연산자<span style="color: grey;"><sup>c++ 11 이상</sup></span>을 사용해 진행할 수 있습니다.
### 초기화 주의사항 
{} 연산자는 명시적 타입 변환을 제거해 타입 변환으로 인한 정보 손실을 막습니다.
```cpp
int n1 = 1.3; // int n1에 1 저장
int n2 (2.3); // int n2에 2 저장
int n3 {3.4}; // Error
```

# 상수
상수<span style="color: grey;"><sup>constant</sup></span>는 값을 한번 초기화한 후 더는 값을 바꿀 수 없는 변수입니다.
1. `const`에 의한 선언
	`const`는 **값을 변경할 수 없는 변수**를 정의할 때 사용됩니다. 
	```cpp
	const int num = 10;
	num = 20; // Error: num은 상수이므로 변경 할 수 없습니다.
	```
	정의 될 때 반드시 **초기화**해야합니다.
	**런타임**에 평가됩니다.
	**포인터**와 결합해 상수로 사용할 수 있습니다.
	```cpp
	int a = 10;
	int* const ptr = &a; // a의 주소값을 갖는 포인터 상수입니다.
	*ptr = 20; // ptr이 가리키는 값은 변경할 수 있습니다.
	ptr = &a; // Error: ptr의 주소값은 변경할 수 없습니다.
	```
2. `constexpr`에 의한 선언
	`constexpr`는 **컴파일 타임 상수**를 정의할 때 사용됩니다.
	해당 상수는 컴파일 시점에 확정 할 수 있어야합니다.
	함수에 사용해 **상수 함수**로 사용 할 수 있습니다.
	```cpp
	constexpr int add(int a, int b){
	  return a + b;
	}
	
	int main(){
	  const int a {1}, b {2}; // 컴파일 시점에 초기화되는 a, b 상수
	  int c {3}, d {4}; // 런타임 시점에 초기화되는 c, d 변수
	  constexpr int result1 = add(a, b); // result1: 3
	  constexpr int result2 = add(a, b); // Error: c, d가 컴파일 시점에 정의되지 않았습니다.
	  int result3 = add(c, d); // result3 : 7
	  return 1;
	}
	```
	`constexpr`로 정의된 함수는 컴파일 시점 뿐 아니라 런타임 시점에서도 사용할 수 있습니다.
3. `consteval`에 의한 선언<span style="color: grey;"><sup>c++20 이상에서 사용가능</sup></span>
	`consteval`은 **컴파일 상수 함수**를 정의하는 데 사용되며, 해당 함수는 컴파일 시점에서만 사용가능합니다.
	```cpp
	consteval int add(int a, int b){
	  return a + b;
	}
	
	int main() {
	  const int a {1}, b {2};
	  constexpr int result1 = add(a, b); // result1: 3
	  int result2 = add(a, b); // Error: consteval 상수 함수는 런타임에 사용될 수 없습니다.
	  return 1;
	}
	```
	`consteval`을 사용하면 반드시 상수를 컴파일 시점에 계산하게 하는 효과가 있습니다.
### 상수 더보기 
1. `const` 객체와 멤버 함수
	`const` 객체는 초기화된 이후 **상태가 변경되지 않습니다.**
	`const` 멤버 함수는 **객체의 상태를 변경하지 않습니다.**
	```cpp
	import std.core;
	
	class MyClass{
	  public:
	  int value;
	  MyClass(int v): value(v) {}
	  
	  int ​getValue() const { 
	    return value;
	  } // const 멤버 함수
	  
	  void setValue(int v) {
	    value = v;
	  }
	  
	  int changeValue(int v) const {
	    value = v;
	    return value;
	  } // Compile Error: const 멤버 함수는 객체의 상태를 변경할 수 없습니다.
	};
	
	int main() {
	  const MyClass obj(1); // const 객체로 선언됩니다.
	  std::cout << obj.getValue(); // 1이 출력됩니다.
	  obj.setValue(2); // Error: const 객체는 상태를 변경할 수 없습니다.
	  return 0;
	}
	```
2. `const` 포인터와 참조
	- `const T*` : **상수 T에 대한 포인터**로 포인터는 변경 가능하지만, 가리키는 값은 변경 할 수 없습니다.
	- `T* const` : **상수 포인터**로 포인터는 변경할 수 없지만, 가리키는 값은 변경 할 수 있습니다.
		```cpp
		int a {10}, b {20};
	const int* ptr1 = &a; // 상수 a에 대한 포인터 ptr1
	int* const ptr2 = &a; // a에 대한 상수 포인터 ptr2
	
	*ptr1 = 11; // Error: 상수 a를 변경 할 수 없습니다.
	ptr1 = &b; // 상수 b에 대한 포인터로 변경할 수 있습니다.
	*ptr2 = 11; // 상수 포인터 ptr2가 가리키는 변수 a의 값을 변경할 수 있습니다.
	ptr2 = &b; // Error: 상수 포인터 ptr2가 가리키는 주소값을 변경할 수 없습니다.
	```
	- `const T&` : **상수 T에 대한 참조**로 값을 변경할 수 없습니다.
	- `T& const` : C++에서는 참조에 `const`를 **적용할 수 없습니다. **
	```cpp
	int a {10}, b {20};
	const int& ref1 = a; // 상수 a에 대한 참조 ref1
	// int& const ref2 = a; Error: C++은 상수 참조를 허용하지 않습니다.
	
	ref1 = b; // 상수 a에 대한 참조 ref1의 값을 변경할 수 없습니다.
	```
3. `const` 매개 변수
	`const` 매개 변수는 **함수가 매개 변수의 값을 변경할 수 없게** 보장합니다.
	- 기본적인 상수 매개 변수
		`const`를 매개 변수이 적용하면 매개 변수를 변경할 수 없게 됩니다.
		```cpp
		import std.core;
		
		void printValue(const int x) {
		  x = 10;  // Error: const 매개 변수는 값을 변경할 수 없습니다.
		  std::cout << x << std::endl;
		}
		int main() {
		  int a = 5;
		  printValue(a);  // 5 출력
		}
		```
		
	- 상수 참조 매개 변수
		`const`참조를 사용하여 객체나 배열등의 **큰 자료의 복사본을 만들지 않고, 원본을 훼손하지 않으며 매개 변수로 전달할 수 있습니다.**
		```cpp
		import std;
		
		void printArray(const std::vector<int>& arr) {
		  arr[0] = 10;  // 오류! const 참조 매개 변수는 값을 변경할 수 없습니다.
		  std::cout << arr << std::endl;
		}
		
		int main() {
		  std::vector<int> a = std::vector<int>(1000);
		  printArray(a);  // 벡터 a 출력
		}
		```