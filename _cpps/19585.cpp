#include <bits/stdc++.h>

using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int C, N, Q;
    cin >> C >> N;
    unordered_set<string> colors(C), nicknames(N);
    string temp;
    while(C--){
        cin >> temp;
        colors.insert(temp);
    }
    while(N--){
        cin >> temp;
        nicknames.insert(temp);
    }
    cin >> Q;
    string team;
    while(Q--){
        bool isFind = false;
        cin >> team;
        for(int i = 0;i<team.size();i++){
            string c = team.substr(0, i);
            string n = team.substr(i, team.size() - i);
            if(colors.find(c) != colors.end() && nicknames.find(n) != nicknames.end()){
                cout << "Yes\n";
                isFind = true;
                break;
            }
        }
        if(!isFind)
            cout << "No\n";
    }

    return 0;
}