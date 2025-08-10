#include <bits/stdc++.h>

using namespace std;
constexpr int INF = 987654321;

void dijstra(const vector<vector<pair<int, int>>>& g, int s, int e){
    int N = g.size();
    vector<int> dist(N, INF);
    dist[s] = 0;

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, s});

    while(!pq.empty()){
        auto [d, u] = pq.top();
        pq.pop();

        if(dist[u] < d) continue;

        for(auto [v, w] : g[u]){
            if(dist[v] > dist[u] + w){
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    cout << dist[e] << "\n";
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    auto g = vector(N, vector<pair<int, int>>());

    for(int i = 0; i < M; i++){
        int u, v, w;
        cin >> u >> v >> w;
        g[u-1].push_back({v-1, w});
    }

    int s, e;
    cin >> s >> e;
    dijstra(g, s-1, e-1);

    return 0;
}