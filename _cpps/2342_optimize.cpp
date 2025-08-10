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

    vector<vector<int>> dp[2];
    dp[0].assign(5, vector<int>(5, INT_MAX));
    dp[1].assign(5, vector<int>(5, INT_MAX));
    int curr = 0, next = 1;
    dp[curr][0][0] = 0;
    int prev = 0;

    while(!step.empty()){
        int target = step.front();
        step.pop();
        dp[next].assign(5, vector<int>(5, INT_MAX));

        for(int i = 0;i < 5;i++){
            if(dp[curr][prev][i] != INT_MAX){
                if(target != i){
                    dp[next][target][i] = min(dp[next][target][i], dp[curr][prev][i] + cost(prev, target));
                }

                if(target != prev){
                    dp[next][prev][target] = min(dp[next][prev][target], dp[curr][prev][i] + cost(i, target));
                }
            }

            if(dp[curr][i][prev] != INT_MAX){
                if(target != i){
                    dp[next][i][target] = min(dp[next][i][target], dp[curr][i][prev] + cost(prev, target));
                }

                if(target != prev){
                    dp[next][target][prev] = min(dp[next][target][prev], dp[curr][i][prev] + cost(i, target));
                }
            }
        }
        swap(curr, next);
        prev = target;
    }

    int ans = INT_MAX;
    for(int i = 0;i < 5;i++){
        ans = min(ans, dp[curr][prev][i]);
        ans = min(ans, dp[curr][i][prev]);
    }

    cout << ans << '\n';

    return 0;
}