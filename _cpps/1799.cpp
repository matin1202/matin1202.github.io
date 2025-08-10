#include <bits/stdc++.h>

using namespace std;

constexpr int dx[] = {-1, 1, -1, 1};
constexpr int dy[] = {-1, -1, 1, 1};
int maxBishop = 0;
int N;
vector<bool> rldiag, lrdiag;

void backtracking(vector<vector<int>>& board, int cnt, int x, int y, int color){
    if(y == N){
        x++;
        y = 0;
    }
    
    if(x == N){
        maxBishop = max(cnt, maxBishop);
        return;
    }

    if((x + y) % 2 == color && board[x][y] == 1 && !rldiag[x + y] && !lrdiag[x - y + N - 1]){
        rldiag[x+y] = true;
        lrdiag[x-y+N-1] = true;
        backtracking(board, cnt+1, x, y+1, color);
        rldiag[x+y] = false;
        lrdiag[x-y+N-1] = false;
    }

    backtracking(board, cnt, x, y+1, color);
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> N;

    auto board = vector(N, vector(N, -1));

    for(auto& c: board)
        for(auto& e: c)
            cin >> e;

    rldiag = vector(2*N-1, false);
    lrdiag = vector(2*N-1, false);

    backtracking(board, 0, 0, 0, 0);
    int white = maxBishop;

    maxBishop = 0;
    backtracking(board, 0, 0, 0, 1);

    cout << maxBishop + white << '\n';

    return 0;
}