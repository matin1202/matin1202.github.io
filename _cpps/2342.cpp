#include <bits/stdc++.h>

using namespace std;

constexpr int cost(int start, int end){
    if(start == end) return 1;
    if(start == 0) return 2;
    if(abs(start-end) == 2) return 4;
    return 3;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    queue<int> step;
    while(true){
        cin >> t;
        if(t == 0)
            break;
        step.push(t);
    }

    auto dp = vector(5, vector(5, INT_MAX));
    dp[0][0] = 0;
    int prev = 0;

    while(!step.empty()){
        int target = step.front();
        step.pop();

        auto next = vector(5, vector(5, INT_MAX));

        for(int i = 0;i < 5;i++){
            if(dp[prev][i] != INT_MAX){
                if(target != i){
                    next[target][i] = min(next[target][i], dp[prev][i] + cost(prev, target));
                }

                if(target != prev){
                    next[prev][target] = min(next[prev][target], dp[prev][i] + cost(i, target));
                }
            }

            if(dp[i][prev] != INT_MAX){
                if(target != i){
                    next[i][target] = min(next[i][target], dp[i][prev] + cost(prev, target));
                }

                if(target != prev){
                    next[target][prev] = min(next[target][prev], dp[i][prev] + cost(i, target));
                }
            }
        }

        dp = move(next);
        prev = target;
    
    }

    int ans = INT_MAX;
    for(int i = 0;i < 5;i++){
        ans = min(ans, dp[prev][i]);
        ans = min(ans, dp[i][prev]);
    }

    cout << ans << '\n';

    return 0;
}