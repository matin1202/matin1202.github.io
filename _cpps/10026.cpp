#include <bits/stdc++.h>

using namespace std;

constexpr array<int, 4> dx = {1, 0, -1, 0};
constexpr array<int, 4> dy = {0, 1, 0, -1};

void BFS(const vector<vector<int>>& board, vector<vector<bool>>& visited, int x, int y){
    queue<pair<int, int>> q;
    q.push({x, y});
    visited[x][y] = true;
    const int currColor = board[x][y];
    while(!q.empty()){
        auto [x, y] = q.front();
        q.pop();
        for(int i = 0;i<4;i++){
            int nx = x + dx[i];
            int ny = y + dy[i];
            if(nx < 0 || nx >= board.size() || ny < 0 || ny >= board[0].size() || visited[nx][ny] || board[nx][ny] != currColor){
                continue;
            }
            visited[nx][ny] = true;
            q.push({nx, ny});
        }
    }
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;
    auto board = vector(N, vector(N, 0)); // 0: Unknown, 1: Red, 2: Green, 3: Blue
    auto board_week = vector(N, vector(N, 0));
    string s;
    for(int i = 0;i<N;i++){
        cin >> s;
        for(int j = 0;j<N;j++){
            if(s[j] == 'R'){
                board[i][j] = 1;
                board_week[i][j] = 1;
            }
            else if(s[j] == 'G'){
                board[i][j] = 2;
                board_week[i][j] = 1;
            }
            else if(s[j] == 'B'){
                board[i][j] = 3;
                board_week[i][j] = 3;
            }
        }
    }

    int cnt = 0, cnt_week = 0;
    auto visited = vector(N, vector(N, false));
    auto visited_week = vector(N, vector(N, false));
    for(int i = 0;i<N;i++){
        for(int j = 0;j<N;j++){
            if(!visited[i][j]){
                BFS(board, visited, i, j);
                cnt++;
            }
            if(!visited_week[i][j]){
                BFS(board_week, visited_week, i, j);
                cnt_week++;
            }
        }
    }

    cout << cnt << " " << cnt_week << '\n';

    return 0;
}