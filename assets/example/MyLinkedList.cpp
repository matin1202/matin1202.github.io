 #include <utility>
 #include <stdexcept>
	
 template <typename T>
 class MyLinkedList {
	
 public:
     struct Node {
         T data;
         Node* next;
			
         Node(const T& val): data(val), next(nullptr) {}
			
         Node(T&& val): data(std::move(val)), next(nullptr) {}
			
         Node(): next(nullptr) {}
     };
		
 private:
		
     Node* headPointer;
		
 public:
		
     MyLinkedList() {
         headPointer = new Node();
     }
		
     MyLinkedList(size_t count, const T& val){
         headPointer = new Node();
         try{
             for(size_t i = 0; i < count; i++){
                 push_front(val);
             }
         } catch (const std::bad_alloc& e) {
             clear();
             throw;
         } catch(...) {
             clear();
             throw;
         }
     }
		
     ~MyLinkedList() {
          clear();
         delete headPointer;
         headPointer = nullptr;
     }
		
     MyLinkedList(const MyLinkedList&) = delete;
     MyLinkedList& operator=(const MyLinkedList&) = delete;
     MyLinkedList(MyLinkedList&&) = delete;
     MyLinkedList& operator=(MyLinkedList&&) = delete;
		
     void clear(){
         Node* curr = begin();
         while(curr != nullptr) {
             Node* tmp = curr;
             curr = curr->next;
             delete tmp;
         }
         headPointer->next = nullptr;
     }
		
     void push_front(const T& val) {
         Node* newNode =
         new Node(val);
         newNode->next = begin();
         headPointer->next = newNode;
     }
		
     void push_front(T&& val) {
         Node* newNode =
         new Node(std::move(val));
         newNode->next = begin();
         headPointer->next = newNode;
     }
		
     bool empty() const {
         return begin() == nullptr;
     }
		
     void insert_after(Node* pos, const T& val) {
         if(pos == nullptr) return;
         Node* newNode = new Node(val);
         newNode->next = pos->next;
         pos->next = newNode;
     }
		
     void insert_after(Node* pos, T&& val){
         if(pos == nullptr) return;
         Node* newNode = new Node(std::move(val));
         newNode->next = pos->next;
         pos->next = newNode;
     }
		
     void pop_front(){
         if(empty()) return;
         Node* tmp = begin();
         headPointer->next = tmp->next;
         delete tmp;
     }
		
     T& front(){
         if(empty())  {
             throw std::out_of_range("Linked List is empty");
         }
         return begin()->data;
     }
		
     const T& front() const {
         if(empty())  {
             throw std::out_of_range("Linked List is empty");
         }
         return begin()->data;
     }
		
     void erase_after(Node* pos){
         if(!pos || !pos->next){
             return;
         }
         Node* tmp = pos->next;
         pos->next = tmp->next;
         delete tmp;
     }
		
     void sort(){
         headPointer->next = merge_sort(begin());
     }
		
     size_t remove(const T& val){
         size_t count = 0;
         Node* curr = before_begin();
         while(curr->next){
             if(curr->next->data == val){
                 erase_after(curr);
                 count++;
             }
             else {
                 curr = curr->next;
             }
         }
         return count;
     }
		
     void splice_after(Node* pos, MyLinkedList& other){
         if(!pos || other.empty()) return;
			
         Node* last = other.begin();
         while(last->next != nullptr){
             last = last->next;
         }
         last->next = pos->next;
         pos->next = other.begin();
         other.before_begin()->next = nullptr;
     }
		
     void splice_after(Node* pos, MyLinkedList&& other){
         splice_after(pos, other);
     }
		
     void merge(MyLinkedList& other){
         headPointer->next = sort_merge(begin(), other.begin());
         other.before_begin()->next = nullptr;
     }
		
     void resize(size_t count, const T& value = T()){
         size_t index = 0;
         Node* curr = before_begin();
			
         while(index < count){
             if(!curr->next){
                 insert_after(curr, value);
             }
             curr = curr->next;
             index++;
         }
         while(curr->next){
             erase_after(curr);
         }
     }
		
     void reverse() {
         Node* prev = nullptr;
         Node* curr = begin();
         Node* next = nullptr;
		    
         while (curr) {
             next = curr->next;
             curr->next = prev;
             prev = curr;
             curr = next;
         }
         headPointer->next = prev;
     }
		
     // 구현 시작
     Node* begin() {
         return headPointer->next;
     }
		
     const Node* begin() const {
         return headPointer->next;
     }
		
     Node* end() {
         return nullptr;
     }
		
     const Node* end() const {
         return nullptr;
     }
		
     // getHeadPointer() 대체
     Node* before_begin(){
         return headPointer;
     }
		
     const Node* before_begin() const {
         return headPointer;
     }
		
 private:
     Node* merge_sort(Node* head){
		
         if(!head || !head->next) return head;
			
         Node* slow = head;
         Node* fast = head->next;
			
         while(fast && fast->next){
             slow = slow->next;
             fast = fast->next->next;
         }
			
         Node* mid = slow->next;
         slow->next = nullptr;
			
         Node* left = merge_sort(head);
         Node* right = merge_sort(mid);
			
         return sort_merge(left, right);
     }
		
     Node* sort_merge(Node* thisFront, Node* otherFront){
         Node dummy;
         Node* tail = &dummy;
			
         while(thisFront && otherFront){
             if(thisFront->data <= otherFront->data){
                 tail->next = thisFront;
                 thisFront = thisFront->next;
             }
             else{
                 tail->next = otherFront;
                 otherFront = otherFront->next;
             }
             tail = tail->next;
         }
			
         tail->next = thisFront ? thisFront : otherFront;
			
         return dummy.next;
     }
 };