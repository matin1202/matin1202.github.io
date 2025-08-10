#include <bits/stdc++.h>

using namespace std;

class Trie {
public:
    vector<pair<char, unique_ptr<Trie>>> child;
    bool isEOW;

    Trie() {
        isEOW = false;
    }

    Trie* findChild(char ch){
        for(const auto& p: child){
            if(p.first == ch)
                return p.second.get();
        }
        return nullptr;
    }
};

void insert(Trie* root, const string& key){
    auto crawl = root;
    for(const char ch: key){
        auto next = crawl->findChild(ch);
        if(next == nullptr){
            crawl->child.emplace_back(ch, make_unique<Trie>());
            next = crawl->child.back().second.get();
        }
        crawl = next;
    }
    crawl->isEOW = true;

}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int C, N;
    cin >> C >> N;

    auto colors = make_unique<Trie>();
    string color;
    while(C--){
        cin >> color;
        insert(colors.get(), color);
    }

    auto nicknames = make_unique<Trie>();
    string nickname;
    while(N--){
        cin >> nickname;
        reverse(nickname.begin(), nickname.end());
        insert(nicknames.get(), nickname);
    }

    int Q;
    cin >> Q;

    string team;
    while(Q--){
        cin >> team;
        int len = team.length();

        auto isColor = vector(len, false);
        auto crawl = colors.get();
        for(int i = 0;i<len;i++){
            const auto ch = team[i];
            crawl = crawl->findChild(ch);
            if(crawl == nullptr)
                break;
            if(crawl->isEOW)
                isColor[i] = true;
        }

        auto isNick = vector(len, false);
        crawl = nicknames.get();
        for(int i = len-1;i>=0;i--){
            const auto ch = team[i];
            crawl = crawl->findChild(ch);
            if(crawl == nullptr)
                break;
            if(crawl->isEOW)
                isNick[i] = true;
        }



        bool isFind = false;
        for(int i = 0;i<len-1;i++){
            if(isColor[i] && isNick[i+1]){
                isFind = true;
                break;
            }
        }

        if(isFind)
            cout << "Yes\n";
        else
            cout << "No\n";

    }

    

    return 0;
}