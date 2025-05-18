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
협력적 중단(C++20 이상)은 스레드를 외부에서 강제로 종료시키는게 아니라, 스레드 스스로가 종료 요청을 받아 종료하는 것입니다.
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

## mutex와 lock

## atomic과 semaphore

## future와 promise

## 코루틴
코루틴<span style="color: grey;"><sup>coroutine</sup></span>은 **함수를 중간에 일시정지했다가 나중에 다시 재개**할 수 있는 기능입니다.

### 코루틴의 필요처
1. IO 작업
  네트워크 통신, 파일 입출력 등의 실행 시간이 긴 작업을 비동기적으로 실행해, 해당 스레드가 블록되지 않고 다른 작업을 수행할 수 있게 합니다.
2. Generator
  특정 시퀸스의 값을 생성하는 함수에 적합합니다.
  예를 들어, 피보나치 수열을 생성하는 함수나 파일을 한줄씩 읽는 함수에서 일시정지와 재개의 반복을 통해 구현할 수 있습니다.
3. 협력적 멀티테스킹
  비교적 가벼운 작업을 수행하며, 스레드와 달리 OS가 아닌 어플리케이션 단위에서 실행 제어권을 서로 넘기며 수행됩니다.

### 코루틴의 핵심 요소
- `co_await`
- `co_yield`
- `co_return`

### 코루틴 대 스레드

#### 코루틴 대 스레드 코드 비교

{% wandbox title="IO 흉내(스레드)" %}
#include <iostream>
#include <thread>
#include <vector>
#include <numeric>
#include <chrono>
#include <fstream>
#include <string>

using namespace std;
using namespace chrono;

constexpr size_t TASKS = 1000;
constexpr size_t THREADS = 2;

size_t getCurrentRSS() {
    std::ifstream status_file("/proc/self/status");
    std::string line;
    while (std::getline(status_file, line)) {
        if (line.rfind("VmRSS:", 0) == 0) {
            size_t rss_kb;
            sscanf(line.c_str(), "VmRSS: %zu kB", &rss_kb);
            return rss_kb * 1024;
        }
    }
    return 0;
}

void fake_io_task(int input, int& output) {
    this_thread::sleep_for(1ms);
    output = input * 2 + 1;
}

int main() {
    // cout << "[Thread] Memory before: " << getCurrentRSS() / 1024 << " KB" << endl;
    auto start = steady_clock::now();
    vector<thread> threads;
    vector<int> results(TASKS);
    size_t per_thread = TASKS / THREADS;

    for (size_t t = 0; t < THREADS; ++t) {
        size_t start_i = t * per_thread;
        size_t end_i = (t == THREADS - 1) ? TASKS : (t + 1) * per_thread;
        threads.emplace_back([start_i, end_i, &results]() {
            for (size_t i = start_i; i < end_i; ++i)
                fake_io_task(i, results[i]);
        });
    }

    for (auto& t : threads) t.join();
    auto end = steady_clock::now();
    int total = accumulate(results.begin(), results.end(), 0);

    cout << "[Thread] Total: " << total << endl;
    cout << "[Thread] Time: " << duration_cast<milliseconds>(end - start).count() << " ms" << endl;
    // cout << "[Thread] Memory after: " << getCurrentRSS() / 1024 << " KB" << endl;
}
{% endwandbox %}

{% wandbox title="IO 흉내(코루틴)" %}
#include <boost/asio.hpp>
#include <boost/asio/awaitable.hpp>
#include <boost/asio/co_spawn.hpp>
#include <boost/asio/detached.hpp>
#include <boost/asio/steady_timer.hpp>
#include <iostream>
#include <vector>
#include <chrono>
#include <numeric>
#include <fstream>
#include <string>

using namespace boost::asio;
using namespace std::chrono;
using namespace std;

constexpr size_t TASKS = 1000;
constexpr size_t THREADS = 2;

size_t getCurrentRSS() {
    std::ifstream status_file("/proc/self/status");
    std::string line;
    while (std::getline(status_file, line)) {
        if (line.rfind("VmRSS:", 0) == 0) {
            size_t rss_kb;
            sscanf(line.c_str(), "VmRSS: %zu kB", &rss_kb);
            return rss_kb * 1024;
        }
    }
    return 0;
}

awaitable<int> fake_io_task(int input) {
    steady_timer timer(co_await this_coro::executor);
    timer.expires_after(1ms);
    co_await timer.async_wait(use_awaitable);
    int result = input * 2 + 1;
    co_return result;
}

int main() {
    // cout << "[Coroutine] Memory before: " << getCurrentRSS() / 1024 << " KB" << endl;
    thread_pool pool(THREADS);
    vector<int> results(TASKS);
    auto start = steady_clock::now();

    for (int i = 0; i < TASKS; ++i) {
        co_spawn(pool,
            [i, &results]() -> awaitable<void> {
                results[i] = co_await fake_io_task(i);
                co_return;
            },
            detached);
    }

    pool.join();

    auto end = steady_clock::now();
    int total = accumulate(results.begin(), results.end(), 0);

    cout << "[Coroutine] Total: " << total << endl;
    cout << "[Coroutine] Time: " << duration_cast<milliseconds>(end - start).count() << " ms" << endl;
    // cout << "[Coroutine] Memory after: " << getCurrentRSS() / 1024 << " KB" << endl;
}
{% endwandbox %}

1ms가 걸리는 가상의 IO 작업을 스레드에서 실행했을때와 코루틴을 이용해서 실행했을때 속도 차이가 명확히 드러납니다.

#### 더보기
1. 코루틴의 메모리 사용
  > 코루틴은 스택 메모리를 거의 사용하지 않습니다.
  - 일반 함수는 스택 프레임을 생성하고 종료시 제거합니다.
  - 이에 반해 코루틴은 코루틴 프레임을 만들어 힙 메모리에 저장합니다.
  - 이를 통해 코루틴은 일시정지와 재개를 구현 할 수 있습니다.
  
2. 코루틴 프레임<span style="color: grey;"><sup>coroutine frame</sup></span>
  > 코루틴이 실행되면 **프레임**이라는 구조체를 힙 메모리에 생성합니다.
  프레임은 다음으로 구성됩니다.
    - 로컬 변수
    - 중단점 위치 정보
    - `promise` 객체
    - 코루틴 핸들
    - 리턴 `future`
    
3. State-Machine 구조
  > 컴파일러는 코루틴을 State-Machine 형태로 변형시킵니다.
  
  ```cpp
  task<void> foo() {
    // 상태 'A'
    co_await some_oper(); // 일시 정지 1
    // 상태 'B'
    co_await another_oper(); // 일시 정지 2
    // 상태 'C'
    co_return 1; // 최종 반환
  }
  ```
  와 같은 기본적인 코루틴은 컴파일시
  ```mermaid
  ---
  config:
    look: handDrawn
  ---
  stateDiagram-v2
    init: 코루틴 최초 호출, 프레임 할당
    state0: co_await some_oper()까지 진행
    await1: 코루틴 일시 중지됨. some_oper() 완료 대기 중
    state1: co_await another_oper()까지 진행
    await2: 코루틴 일시 중지됨. another_oper() 완료 대기 중
    state2: co_return 까지 진행
    state3: final_suspend.await_suspend(handle) 호출(암묵적 최종 일시 중지)
    
    
    [*] --> init
    init --> state0: 코루틴 시작, state = 0
    state0 --> await1: co_await some_oper() 실행, some_oper()가 일시 중지를 호출하면
    await1 --> state1: some_oper() 완료 후, 진입점 1에서 코루틴 재개, state = 1
    state1 --> await2: co_await some_oper() 실행, some_oper()가 일시 중지를 호출하면
    await2 --> state2: some_oper() 완료 후, 진입점 1에서 코루틴 재개, state = 2
    state2 --> state3: co_return 호출, promise_return_int() 호출
    state3 --> [*]: 코루틴 핸들 소멸, 프레임 해제
  
  ```
  와 같이 컴파일링됩니다.
  
4. `co_await` 작동 방식
  `co_await foo;`를 컴파일러는
  ```cpp
  auto&& awaitable = expr;
  if (!awaitable.await_ready()) {
    awaitable.await_suspend(coroutine_handle);
    // 일시 중지됨
  }
  auto result = awaitable.await_resume();
  ```
  와 같이 처리합니다.
  - `await_ready()` : awaitable이 바로 처리가능한지 확인합니다.
  - `await_suspend()` : 현재 코루틴을 일시 중지시키고, awaitable이 완료되었을시 다시 재개 시킵니다.
  - `await_resume()` : awaitable의 결과값을 가져옵니다.
  
  ```mermaid
  ---
  layout: handDrawn
  ---
  stateDiagram-v2
     state if1 <<choice>>
     state if2 <<choice>>
     
     [*] --> co_await
     co_await --> await_ready
     await_ready --> if1
     if1 --> co_resume : if await_ready() == true
     if1 --> co_suspend : if await_ready() == false
     co_suspend --> if2
     if2 --> 일시중지 : if co_suspend() return void or true
     if2 --> co_resume: if co_suspend() return false
     if2 --> other_coroutine_handle: if co_suspend() return coroutine_handle
     other_coroutine_handle: Awaitable foo 일시 중지, 다른 코루틴 시작
     일시중지 --> co_resume: Awaitable foo 실행 완료됨
     co_resume --> [*]: 코루틴 재개
  ```
  
5. `coroutine_handle`의 역할
  > `std::coroutine_handle<>`은 프레임을 가리키는 포인터입니다.
  
  - `resume()` : 코루틴을 현재 위치에서 재개합니다.
  - `destroy()` : 코루틴 프레임의 메모리를 해제합니다.
  - `done()` : 코루틴이 끝났는지 확인합니다.
  - `promise()` : 사용자의 Promise 객체에 접근합니다.