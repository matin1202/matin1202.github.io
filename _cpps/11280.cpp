#include <bits/stdc++.h>

using namespace std;

void kosaraju(const vector<vector<int>>& adj, const vector<vector<int>>& rev_adj, vector<int>& connected, vector<bool>& visited){
    const int N = adj.size();
    stack<int> s;
    


int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;
    auto adj = vector(2*N, vector<int>());
    auto rev_adj = vector(2*N, vector<int>());
    int i, j, ni, nj;

    constexpr int indexor = [&N](int n){
            return n - 1 + N;
        }

    while(M--){
        cin >> i >> j;
        ni = -i;
        nj = -j;

        int u = indexor(ni), v = indexor(j);
        adj[u].push_back(v);
        rev_adj[v].push_back(u);

        u = indexor(i), v = indexor(nj);
        adj[u].push_back(v);
        rev_adj[v].push_back(u);

    }

    auto connected = vector(2*N, -1);
    auto visited = vector(2*N, false);
    kosaraju(adj, rev_adj, connected, visited);

    return 0;
}