#ifndef MY_LINKED_LIST_H
#define MY_LINKED_LIST_H

#include <utility>      // For std::move
#include <stdexcept>    // For std::out_of_range, std::bad_alloc
#include <cstddef>      // For size_t

template <typename T>
class MyLinkedList {

public:
    struct Node {
        T data;
        Node* next;

        Node(const T& val) : data(val), next(nullptr) {}
        Node(T&& val) : data(std::move(val)), next(nullptr) {}
        Node() : next(nullptr) {} // Default constructor for dummy node
    };

private:
    Node* headPointer; 

public:
    MyLinkedList() {
        headPointer = new Node(); 
    }

    MyLinkedList(size_t count, const T& val) {
        headPointer = new Node();
        try {
            for (size_t i = 0; i < count; i++) {
                push_front(val);
            }
        } catch (...) {
            clear(); 
            delete headPointer;
            headPointer = nullptr;
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

    void clear() {
        Node* curr = headPointer->next; 
        while (curr != nullptr) {
            Node* tmp = curr;
            curr = curr->next;
            delete tmp;
        }
        headPointer->next = nullptr;
    }

    void push_front(const T& val) {
        Node* newNode = new Node(val);
        newNode->next = headPointer->next;
        headPointer->next = newNode;
    }

    void push_front(T&& val) {
        Node* newNode = new Node(std::move(val));
        newNode->next = headPointer->next;
        headPointer->next = newNode;
    }

    bool empty() const {
        return headPointer->next == nullptr;
    }

    void insert_after(Node* pos, const T& val) {
        if (pos == nullptr) return; 
        Node* newNode = new Node(val);
        newNode->next = pos->next;
        pos->next = newNode;
    }

    void insert_after(Node* pos, T&& val) {
        if (pos == nullptr) return;
        Node* newNode = new Node(std::move(val));
        newNode->next = pos->next;
        pos->next = newNode;
    }

    void pop_front() {
        if (empty()) return;
        Node* tmp = headPointer->next;
        headPointer->next = tmp->next;
        delete tmp;
    }

    T& front() {
        if (empty()) {
            throw std::out_of_range("Linked List is empty");
        }
        return headPointer->next->data;
    }

    const T& front() const {
        if (empty()) {
            throw std::out_of_range("Linked List is empty");
        }
        return headPointer->next->data;
    }

    void erase_after(Node* pos) {
        if (!pos || !pos->next) {
            return;
        }
        Node* tmp = pos->next;
        pos->next = tmp->next;
        delete tmp;
    }

    void sort() {
        headPointer->next = merge_sort(headPointer->next);
    }

    size_t remove(const T& val) {
        size_t count = 0;
        Node* curr = headPointer; 
        while (curr->next) {
            if (curr->next->data == val) {
                erase_after(curr);
                count++;
            } else {
                curr = curr->next;
            }
        }
        return count;
    }

    void splice_after(Node* pos, MyLinkedList& other) {
        if (!pos || other.empty()) return;

        Node* otherListStart = other.headPointer->next;
        if (otherListStart == nullptr) return;

        Node* otherListEnd = otherListStart;
        while (otherListEnd->next != nullptr) {
            otherListEnd = otherListEnd->next;
        }

        otherListEnd->next = pos->next;
        pos->next = otherListStart;
        other.headPointer->next = nullptr; 
    }

    void splice_after(Node* pos, MyLinkedList&& other) {
        splice_after(pos, other);
    }

    void merge(MyLinkedList& other) {
        if (this == &other) return; 
        headPointer->next = sort_merge(headPointer->next, other.headPointer->next);
        other.headPointer->next = nullptr;
    }
    
    void resize(size_t count, const T& value = T()) {
        size_t current_size = 0;
        Node* curr = headPointer;
        while (curr->next != nullptr) {
            curr = curr->next;
            current_size++;
        }

        if (current_size < count) {
            for (size_t i = 0; i < (count - current_size); ++i) {
                insert_after(curr, value); // curr is now the last node
                curr = curr->next; // move curr to the new last node
            }
        } else if (current_size > count) {
            Node* iter_node = headPointer;
            for (size_t i = 0; i < count; ++i) {
                iter_node = iter_node->next;
            }
            // iter_node is now the new last node after resize
            Node* to_delete_start = iter_node->next;
            iter_node->next = nullptr; // Cut the list
            
            while(to_delete_start != nullptr) {
                Node* temp = to_delete_start;
                to_delete_start = to_delete_start->next;
                delete temp;
            }
        }
    }

    void reverse() {
        Node* prev = nullptr;
        Node* curr = headPointer->next;
        Node* nextNode = nullptr; 
    
        while (curr != nullptr) {
            nextNode = curr->next; 
            curr->next = prev;   
            prev = curr;         
            curr = nextNode;       
        }
        headPointer->next = prev; 
    }

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

    Node* before_begin() {
        return headPointer;
    }

    const Node* before_begin() const {
        return headPointer;
    }

private:
    Node* merge_sort(Node* head) {
        if (!head || !head->next) return head;

        Node* slow = head;
        Node* fast = head->next;

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        Node* mid = slow->next;
        slow->next = nullptr;

        Node* left = merge_sort(head);
        Node* right = merge_sort(mid);

        return sort_merge(left, right);
    }

    Node* sort_merge(Node* list1_head, Node* list2_head) {
        Node dummy_node; 
        Node* tail = &dummy_node;

        while (list1_head && list2_head) {
            if (list1_head->data <= list2_head->data) {
                tail->next = list1_head;
                list1_head = list1_head->next;
            } else {
                tail->next = list2_head;
                list2_head = list2_head->next;
            }
            tail = tail->next;
        }

        tail->next = list1_head ? list1_head : list2_head;
        return dummy_node.next;
    }
};

#endif