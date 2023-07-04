Binary Search tree and node classes per The Odin Project

# Pseudo-code

1. Inititalize start = 0, end = length of the array - 1
2. mid = (start+end)/2
3. Create a tree node with mid as root (let's call it A)
4. Recursively do following steps:
5. Calculate mid of left subarray and make it root of left of subtree of A
6. Calculate mid of right subarray and make it root of right of subtree of A
7. TERMINATOR: if start > end return null
