#include <bits/stdc++.h>

using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int iter, N;
    cin >> iter;
    vector<long long> wave(101);
    wave[1] = 1LL;
    wave[2] = 1LL;
    wave[3] = 1LL; 
    for(int i = 4;i<=100;i++){
        wave[i] = wave[i-2] + wave[i-3];
    }
    while(iter--){
        cin >> N;
        cout << wave[N] << '\n';
    }

    return 0;
}