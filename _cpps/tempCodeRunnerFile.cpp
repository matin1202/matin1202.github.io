#include <bits/stdc++.h>

using namespace std;

class BigInt {
private:
    deque<int> digits;

    void trim(){
        while(digits.size() > 1 && digits.front() == 0){
            digits.pop_front();
        }
    }

public:
    BigInt(): digits({0}){}
    BigInt(long long n){
        while(n!=0){
            digits.push_front(n%10);
            n/=10;
        }
    }

    BigInt& operator+=(const BigInt& other){
        int carry = 0;
        deque<int> res;

        for(auto it1 = digits.rbegin(), it2 = other.digits.rbegin(); it1 != digits.rend() || it2 != other.digits.rend(); it1++, it2++){
            int sum = carry;
            if(it1 != digits.rend())
                sum += *it1;
            if(it2 != other.digits.rend())
                sum += *it2;
            res.push_front(sum%10);
            carry = sum/10;
        }

        if(carry)
            res.push_front(carry)

        digits = res;
        return *this;
    }

    BigInt& operator-=(const BigInt& other){
        int borrow = 0;
        deque<int> res;

        while(it1 != digits.rend()){
            int diff = *it1 - borrow;
            borrow = 0;

            if(it2 != other.digits.rend()){
                diff -= *it2;
                it2++;
            }
            
            if(diff < 0){
                diff += 10;
                borrow = 1;
            }
            res.push_front(diff);
            it1++;
        }
        this->digits = res;
        this->trim();
        return *this;
    }

    friend BigInt operator+(BigInt lhs, BigInt rhs){
        lhs += rhs;
        return lhs;
    }

    friend BigInt operator-(BigInt lhs, BigInt rhs){
        lhs -= rhs;
        return lhs;
    }

    friend ostream& operator<<(ostream& os, const BigInt& n){
        for(auto it = n.digits.begin(); it != n.digits.end(); it++)
            os << *it;
        return os;
    }
};

template<typename T>
class FenwickTree{
private:
    vector<T> tree;
    int size;

    void updateImple(int idx, const T& delta){
        while(idx <= size){
            tree[idx] += delta;
            idx += idx & -idx;
        }
    }

public:
    FenwickTree(int n): size(n), tree(n+1) {}

    void update(int idx, T val){
        T delta = val - query(idx, idx);
        updateImple(idx, delta);
    }

    T query(int idx){
        T sum = T();
        while(idx > 0){
            sum += tree[idx];
            idx -= idx & -idx;
        }
        return sum;
    }

    T query(int l, int r){
        return query(r) - query(l-1);
    }
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, K;
    cin >> N >> M >> K;
    long long t;
    FenwickTree<BigInt> t(N+1);
    for(int i = 1;i<N+1;i++){
        cin >> t;
        t.update(i, t);
    }

    int a, b, c;
    while(M + K){
        cin >> a >> b >> c;
        if(a == 1){
            M--;
            t.update(b, c);
        }
        else{
            K--;
            cout << t.query(b, c) << '\n';
        }
    }

    return 0;
}