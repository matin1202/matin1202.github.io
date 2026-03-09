#include <bits/stdc++.h>

using namespace std;

constexpr array<array<int, 3>, 3> moves = {{
    {0, 2, -1}, 
    {1, 2, -1}, 
    {0, 1, 2}
}};

constexpr array<pair<int, int>, 3> coord = {{
    {0, 1},
    {1, 0},
    {1, 1}
}};

const bool canMovable(const auto& board, const pair<int, int> &coord, const int ori){
    const int N = board.size();
    switch(ori){
        case 0:
            if(coord.second + 1 >= N || board[coord.first][coord.second + 1] != 0)
                return false;
        break;
        case 1:
            if(coord.first + 1 >= N || board[coord.first + 1][coord.second] != 0)
                return false;
        break;
        case 2:
            if(coord.first + 1 >= N || coord.second + 1 >= N)
                return false;
            if(board[coord.first + 1][coord.second] != 0)
                return false;
            if(board[coord.first][coord.second + 1] != 0)
                return false;
            if(board[coord.first + 1][coord.second + 1] != 0)
                return false;
        break;
    }
    return true;
}

int BFS(const auto& board){
    const int N = board.size();
    queue<pair<pair<int, int>, int>> q;
    q.push({{0, 1}, 0});
    int res = 0;

    while(!q.empty()){
        auto currOrientation = q.front().second;
        auto currCoord = q.front().first;
        q.pop();

        for(int i = 0; i < 3; i++){
            if(moves[currOrientation][i] == -1)
                continue;
            if(!canMovable(board, currCoord, moves[currOrientation][i]))
                continue;
            auto nextOrientation = moves[currOrientation][i];
            pair<int, int> nextCoord = { currCoord.first + coord[nextOrientation].first, currCoord.second + coord[nextOrientation].second };
            if(nextCoord.first == N - 1 && nextCoord.second == N - 1){
                res++;
                continue;
            }
            q.push({nextCoord, nextOrientation});
        }
    }
    return res;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    cin >> N;
    auto board = vector(N, vector(N, -1));

    for(auto& row: board){
        for(auto& e: row){
            cin >> e;
        }
    }

    // Initialize
    board[0][0] = 1;
    board[0][1] = 1;

    cout << BFS(board) << "\n";
    

    return 0;
}