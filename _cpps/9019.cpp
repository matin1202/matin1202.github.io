#include <bits/stdc++.h>

using namespace std;

string BFS(const int a, const int b, const array<function<void(int&)>, 4>& func){
    queue<pair<int, string>> q;
    q.push({a, ""});
    vector<bool> visited(10000, false);
    visited[a] = true;
    const array<string, 4> DSLR = {"D", "S", "L", "R"};
    while(!q.empty()){
        auto [curr, exec] = q.front();
        q.pop();

        if(curr == b)
            return exec;
        
        int i = 0;
        for(const auto& f: func){
            int next = curr;
            f(next);
            if(!visited[next]){
                visited[next] = true;
                q.push({next, exec + DSLR[i]});
            }
            i++;
        }
    }

    return "";
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int iter, regi, a, b;
    cin >> iter;

    array<function<void(int&)>, 4> func;
    
    func[0] = [](int& n){
        n = (n * 2) % 10000;
    };

    func[1] = [](int& n){
        if(--n < 0){
            n = 9999;
        }
    };

    func[2] = [](int& n){
        n = (n % 1000) * 10 + (n / 1000);
    };

    func[3] = [](int& n){
        n = (n % 10) * 1000 + (n / 10);
    };

    while(iter--){
        cin >> a >> b;
        auto res = BFS(a, b, func);
        cout << res << endl;
    }
    
    return 0;
}