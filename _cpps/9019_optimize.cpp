#include <bits/stdc++.h>

using namespace std;
constexpr int MAX = 10000;

void BFS(vector<int>& parent, vector<char>& command, int a, int b){
    queue<int> q;
    q.push(a);
    parent[a] = a;

    while(!q.empty()){
        int curr = q.front();
        q.pop();

        if(curr == b)
            break;
        
        int D = (curr * 2) % MAX;
        if(parent[D] == -1){
            parent[D] = curr;
            command[D] = 'D';
            q.push(D);
        }

        int S = (curr == 0 ? 9999 : curr-1);
        if(parent[S] == -1){
            parent[S] = curr;
            command[S] = 'S';
            q.push(S);
        }

        int L = (curr % 1000) * 10 + (curr / 1000);
        if(parent[L] == -1){
            parent[L] = curr;
            command[L] = 'L';
            q.push(L);
        }

        int R = (curr % 10) * 1000 + (curr / 10);
        if(parent[R] == -1){
            parent[R] = curr;
            command[R] = 'R';
            q.push(R);
        }
    }

    string res = "";
    while(b != a){
        res += command[b];
        b = parent[b];
    }

    reverse(res.begin(), res.end());
    cout << res << '\n';
    return;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int iter, a, b;
    cin >> iter;

    vector<int> parent(MAX);
    vector<char> command(MAX);


    while(iter--){
        cin >> a >> b;
        fill(parent.begin(), parent.end(), -1);
        BFS(parent, command, a, b);
    }

    return 0;
}