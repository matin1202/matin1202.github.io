#include <bits/stdc++.h>

using namespace std;

auto usedInCol = array<int, 9>();
auto usedInRow = array<int, 9>();
auto usedInBox = array<int, 9>();
bool isFind = false;

void sudoku(array<array<int, 9>, 9>& board, int x, int y){
    if(isFind)
        return;
    if(y == 9){
        x++;
        y = 0;
    }
    if(x == 9){
        isFind = true;
        return;
    }

    if(board[x][y] != 0){
        sudoku(board, x, y+1);
        return;
    }
    for(int i = 1;i<10;i++){
        if(!(usedInCol[y] & (1<<i)) && !(usedInRow[x] & (1<<i)) && !(usedInBox[(x/3)*3 + y/3] & (1<<i))){
            board[x][y] = i;
            usedInBox[(x/3)*3 + y/3] |= (1<<i);
            usedInRow[x] |= (1<<i);
            usedInCol[y] |= (1<<i);
            
            sudoku(board, x, y+1);
            
            if(isFind)
                return;

            board[x][y] = 0;
            usedInBox[(x/3)*3 + y/3] &= ~(1<<i);
            usedInRow[x] &= ~(1<<i);
            usedInCol[y] &= ~(1<<i);
        }
    }
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    auto board = array<array<int, 9>, 9>();
    string s;

    for(int i = 0; i < 9; i++){
        cin >> s;
        for(int j = 0; j < 9; j++){
            board[i][j] = s[j] - '0';
            if(board[i][j] != 0){
                usedInCol[j] |= (1<<board[i][j]);
                usedInRow[i] |= (1<<board[i][j]);
                usedInBox[(i/3)*3 + j/3] |= (1<<board[i][j]);
            }
        }
    }

    sudoku(board, 0, 0);

    for(const auto& c: board){
        for(const auto& e: c){
            cout << e;
        }
        cout << '\n';
    }

    return 0;
}