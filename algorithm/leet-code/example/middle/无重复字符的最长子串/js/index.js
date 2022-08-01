/**
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 */

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    const map = {};
    var left = 0;
    
    return s.split('').reduce((max, v, i) => {
        left = map[v] >= left ? map[v] + 1 : left;
        map[v] = i;
        return Math.max(max, i - left + 1);
    }, 0);
};