---
title: 동시 실행
author: matin1202
date: 2025-05-11 18:30:00
layout: post
categories: [Programming, C++]
tags: [Programming, C++]
---

# 동시실행이란?
동시 실행<span style="color: grey;"><sup>cocurrency</sup></span>은 여러 작업을 동시에 실행하는 것으로 처리량과 응답성을 증가시키는데 사용합니다.
- 장점
	1. 처리량이 증가합니다.
	2. 응답성이 증가합니다.
- 단점
	1. 코드 복잡성이 증가합니다.
	2. 데드락<span style="color: grey;"><sup>dead lock</sup></span>, 데이터 경쟁 등이 발생합니다.
	3. 한 스레드에서 다른 스레드로 정보를 전달하는 작업의 비용이 순차적 실행의 비용보다 커질 수 있습니다.
	4. 각 스레드는 각자의 스택 메모리를 가져 많은 메모리가 소모됩니다.

## 구현
C++에서는 동시 실행을 달성하기 위해 시스템 수준의 라이브러리를 제공합니다.
- `thread`와 `jthread`
- `mutex`와 `lock`
- `atomic`과 `semaphore`
- `future`와 `promise`
- `coroutine`

### thread와 jthread
- `std::thread`(C++11 이상)
	- 가장 기본적인 스레드 지원 클래스입니다.
	- 운영체제 수준의 새로운 스레드를 생성하며, 개발자가 생명주기를 직접 관리합니다.
	- 생성자 `std::thread(Function&& f, Args&&... args)`는 실행할 함수 `f`에 인자 `args`를 전달해 새로운 스레드에서 함수를 실행합니다.
	- 기본적으로 `args`는 복사로 전달됩니다. 참조로 전달하기 위해서는 `std::ref()`나 `std::cref()`를 사용해야합니다. (데이터 동기화 주의)
	- 생명 주기 관리
		- `join()`
			스레드의 작업이 종료될때까지 기다립니다.
		- `detach()`
			스레드를 백그라운드에서 독립적으로 실행시킵니다. 
			일반적으로 권장되지 않습니다.
		- 소멸
			`std::thread` 객체가 소멸될때 `join()`또는 `detach()`가 호출되지 않았다면 프로그램이 비정상 종료됩니다.
			
{% wandbox title="스레드 비정상 종료" %}
#include <thread>

int main(){
  std::thread t{[](){ for(int i = 0;i<1000;i++){} }};
  // thread를 join하지 않고 종료
  return 0;
}
{% endwandbox %}
			
#### thread 예제
{% wandbox %}

#include <iostream>
#include <thread>
#include <vector>
#include <chrono>
#include <random>
#include <numeric>
#include <iterator>
#include <functional>
#include <string>
#include <format>

using namespace std;

void accu(vector<float>::iterator s, vector<float>::iterator e, double& res){
  res += accumulate(s, e, 0.0);
}

template<typename Duration>
void print_formatted_duration(const Duration& duration) {
  using namespace std::chrono;

  auto ns = duration_cast<nanoseconds>(duration);
  if (ns.count() < 4000) {
   cout << ns.count() << "ns";
    } else if (ns.count() < 4000000) {
     auto us = duration_cast<microseconds>(duration);
     cout << us.count() << "us";
   } else if (ns.count() < 4000000000) {
    auto ms = duration_cast<milliseconds>(duration);
    cout << ms.count() << "ms";
   } else {
    auto s = duration_cast<seconds>(duration);
     cout << s.count() << "s";
   }
}

auto sumUsingThread(vector<float>& v) -> double{
  double res1{0}, res2{0}, res3{0}, res4{0};
  using namespace chrono;
  auto start = system_clock::now();
  auto sz = v.size();

  auto v_begin = v.begin();
  auto v1_end = v.begin();
  advance(v1_end, sz/4);
  auto v2_end = v.begin();
  advance(v2_end, sz/2);
  auto v3_end = v.begin();
  advance(v3_end, sz*3/4);
  auto v_end = v.end();

  thread t1 {accu, v_begin, v1_end, ref(res1)};
  thread t2 {accu, v1_end, v2_end, ref(res2)};
  thread t3 {accu, v2_end, v3_end, ref(res3)};
  thread t4 {accu, v3_end, v_end, ref(res4)};

  t1.join();
  t2.join();
  t3.join();
  t4.join();

  double total_res = res1 + res2 + res3 + res4;

  auto end = system_clock::now();
  cout << "스레드를 사용한 합계 시간: ";
  print_formatted_duration(end - start);
  cout << "\n";
  return total_res;
}

auto sumUsingSequential(vector<float>& v) -> double{
  using namespace chrono;
  double sum = 0.0;
  auto start = system_clock::now();
  sum = accumulate(v.begin(), v.end(), 0.0);
  auto end = system_clock::now();
  cout << "순차적 합계 시간: ";
  print_formatted_duration(end - start);
  cout << "\n";
  return sum;
}

void initializeVector(vector<float>& v){
  random_device rd;
  mt19937 gen(rd());
  uniform_real_distribution<> dist(0, 1);
  for(auto it = v.begin(); it < v.end(); it++)
   *it = dist(gen);
  return;
}

int main(){
  vector<float> v1(100000), v2(1000000), v3(10000000);
  // 10만개 원소를 가진 v1
  // 100만개 원소를 가진 v2
  // 1000만개 원소를 가진 v3
  initializeVector(v1);
  initializeVector(v2);
  initializeVector(v3);

  double result{0};

  cout << "--- 순차적 합계 ---" << endl;
  result = sumUsingSequential(v1);
  cout << "Sum (10만번): " << result << "\n";

  result = sumUsingSequential(v2);
  cout << "Sum (100만번): " << result << "\n";

  result = sumUsingSequential(v3);
  cout << "Sum (1000만번): " << result << "\n";

  cout << "\n--- 스레드를 사용한 합계 ---" << endl;
  result = sumUsingThread(v1);
  cout << "Sum (10만번): " << result << "\n";

  result = sumUsingThread(v2);
  cout << "Sum (100만번): " << result << "\n";

  result = sumUsingThread(v3);
  cout << "Sum (1000만번): " << result << "\n";

  return 0;
}

{% endwandbox %}

컴퓨터의 상태에 따라 다를 수 있지만, 오버헤드에 의해 동시 실행이 상대적으로 적은 작업의 수에서는 불리할 수 있습니다.

#### 협력적 중단 
협력적 중단(C++20 이상)은 스레드가 외부에서 강제로 종료시키는게 아니라, 스레드 스스로가 종료 요청을 받아 종료하는 것입니다.
1. 자원 관리 문제
	스레드가 강제로 종료되면 스레드가 점유하고 있던 mutex, 메모리, 파일 핸들등의 자원이 해제되지 않을 수 있습니다.
	이는 메모리 릭, 데드락 등을 유발 할 수 있습니다.
2. 데이터 일관성
	공유 데이터 구조체를 수정하다가 강제종료되면 데이터 일관성이 무너질 수 있습니다.
3. RAII 위반
	C++의 핵심 패턴인 RAII<span style="color: grey;"><sup>Resource Acquisition Is Initialization</sup></span>의 소멸자 호출을 보장하지 않으므로, RAII를 위반합니다.

#### 협력적 중단 구현

협력적 중단은 `stop_source`, `stop_token`, `stop_callback`을 이용합니다.
- `stop_source`
  중단 요청을 발생시키는 역할입니다.
- `stop_token`
  중단 요청이 발생했는지 확인하는 역할입니다.
  `stop_requested()` 메소드로 확인합니다.
- `stop_callback`
  블록 중인 스레드에도 중단 요청을 보낼 수 있습니다.
  

---

{% wandbox title="협력적 중단 시뮬레이션" %}

#include <iostream>
#include <thread>
#include <chrono>
// #include <stop_token> // C++20

using namespace std;

void worker_function(stop_token stop_token) {
    cout << "워커 스레드: 시작.\n";
    int count = 0;
    while (!stop_token.stop_requested()) {
        // 스레드가 실제로 하는 작업...
        cout << "워커 스레드: " << ++count << "번 일하는 중\n";
        this_thread::sleep_for(chrono::milliseconds(500)); // 작업을 시뮬레이션

        // 주기적으로 stop_requested() 확인
        // 만약 시간이 오래 걸리는 단일 작업 중이라면, 작업 중간중간 또는 작업 시작 전에 확인해야 합니다.
    }

    cout << "워커 스레드: 중단 요청을 확인했습니다.\n";
    // 중단 요청을 받은 후 필요한 정리 작업 수행 (자원 해제 등)
    cout << "워커 스레드: 종료\n";
}

int main() {
    cout << "메인 스레드: 시작\n";

    stop_source stop_src;

    thread worker_thread(worker_function, stop_src.get_token());

    cout << "메인스레드: 3초간 일을 합니다.\n";

    this_thread::sleep_for(chrono::seconds(3));

    cout << "메인 스레드: 협력적 중단 요청\n";
    stop_src.request_stop();
    
    
    cout << "메인 스레드: 남은 작업 진행 중\n";
    this_thread::sleep_for(chrono::seconds(1));
    cout << "메인 스레드: 남은 작업 진행 완료\n";

    worker_thread.join();

    cout << "메인 스레드: 종료\n";

    return 0;
}


{% endwandbox %}

- `std::jthread`(C++20 이상)
`jthread`는 thread의 개선된 형태입니다.
	- 자동 `join()`
		`jthread`는 소멸자에서 해당 스레드가 `joinnable()`한지 확인하고 자동으로 `join()`합니다.
	- 내장된 협력적 중단
		`jthread`는 호출할 함수의 첫 인수에 `stop_token`을 전달합니다.
		
#### jthread 예제

{% wandbox title="jthread 예제" %}
#include <iostream>
#include <thread>
#include <chrono>
#include <stop_token>

int main(){
  using namespace std;
  cout << "메인 스레드: 시작.\n";
  auto worker = [](auto token){
    cout << "워커 스레드: 시작\n";
    int count{0};
    while(!token.stop_requested()){
      cout << "워커 스레드: 작업 " << ++count << "회 실행\n";
      this_thread::sleep_for(chrono::milliseconds(500));
    }
    
    cout << "워커 스레드: 종료 요청 확인\n";
    // 종료 전 할당 해제 등등 진행
    cout << "워커 스레드: 종료\n";
  };
  
  jthread jt {worker};
  
  cout << "메인스레드: 3초간 일을 합니다.\n";

  this_thread::sleep_for(chrono::seconds(3));

  cout << "메인 스레드: 협력적 중단 요청\n";
  jt.request_stop();
    
    
  cout << "메인 스레드: 남은 작업 진행 중\n";
  this_thread::sleep_for(chrono::seconds(1));
  cout << "메인 스레드: 남은 작업 진행 완료\n";

  cout << "메인 스레드: 종료\n";
  
  return 0;
}
{% endwandbox %}