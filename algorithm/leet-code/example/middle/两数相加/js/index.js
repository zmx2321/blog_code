/**
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {
   var List = new ListNode(0);
   var head = List;
   var sum = 0;
   var carry = 0;

   while(l1!==null||l2!==null||sum>0){

       if(l1!==null){
           sum = sum + l1.val;
           l1 = l1.next;
       }
       if(l2!==null){
           sum = sum + l2.val;
           l2 = l2.next;
       }
       if(sum>=10){
           carry = 1;
           sum = sum - 10;
       }

       head.next = new ListNode(sum);
       head = head.next;

       sum = carry;
       carry = 0;

   }

   return List.next;
};