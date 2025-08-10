#include <bits/stdc++.h>

using namespace std;

int N, M;
vector<function<bool(const vector<bool>&)>> funcs;
vector<bool> variables;

void solve(int k) {
    if (k > N) {
        bool all_clauses_satisfied = true;
        for (const auto& f : funcs) {
            if (!f(variables)) {
                all_clauses_satisfied = false;
                break;
            }
        }

        if (all_clauses_satisfied) {
            cout << 1 << endl;
            exit(0);
        }
        return;
    }

    variables[k] = true;
    solve(k + 1);

    variables[k] = false;
    solve(k + 1);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> N >> M;

    funcs.reserve(M);
    for (int k = 0; k < M; ++k) {
        int i, j;
        cin >> i >> j;

        funcs.emplace_back([i, j](const vector<bool>& vars) {
            bool val1 = (i > 0) ? vars[abs(i)] : !vars[abs(i)];
            bool val2 = (j > 0) ? vars[abs(j)] : !vars[abs(j)];
            return val1 || val2;
        });
    }

    variables.resize(N + 1);

    solve(1);

    cout << 0 << endl;

    return 0;
}
