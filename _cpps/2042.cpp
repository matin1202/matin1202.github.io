#include <bits/stdc++.h>

using namespace std;

class FenwickTree{
private:
    vector<long long> tree;
    int size;

    void updateImple(int idx, long long delta){
        while(idx <= size){
            tree[idx] += delta;
            idx += idx & -idx;
        }
    }

public:
    FenwickTree(int n): size(n), tree(n+1) {}

    void update(int idx, long long val){
        long long delta = val - query(idx, idx);
        updateImple(idx, delta);
    }

    long long query(int idx){
        long long sum = 0LL;
        while(idx > 0){
            sum += tree[idx];
            idx -= idx & -idx;
        }
        return sum;
    }

    long long query(int l, int r){
        return query(r) - query(l-1);
    }
};

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, K;
    cin >> N >> M >> K;
    long long t;
    FenwickTree tree(N);
    for(int i = 1;i<N+1;i++){
        cin >> t;
        tree.update(i, t);
    }

    int a, b;
    long long c;
    while(M + K){
        cin >> a >> b >> c;
        if(a == 1){
            M--;
            tree.update(b, c);
        }
        else{
            K--;
            cout << tree.query(b, c) << '\n';
        }
    }

    return 0;
}