"""
快速排序算法实现
Quick Sort Algorithm Implementation
"""


def quicksort(arr: list) -> list:
    """
    快速排序算法 - 返回新的排序列表

    Args:
        arr: 待排序的列表

    Returns:
        排序后的新列表
    """
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quicksort(left) + middle + quicksort(right)


def quicksort_inplace(arr: list, low: int = None, high: int = None) -> None:
    """
    原地快速排序算法 - 直接修改原列表

    Args:
        arr: 待排序的列表
        low: 起始索引
        high: 结束索引
    """
    if low is None:
        low = 0
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = partition(arr, low, high)
        quicksort_inplace(arr, low, pivot_index - 1)
        quicksort_inplace(arr, pivot_index + 1, high)


def partition(arr: list, low: int, high: int) -> int:
    """
    分区函数 - 将小于基准的元素放左边，大于基准的放右边

    Args:
        arr: 待分区的列表
        low: 起始索引
        high: 结束索引

    Returns:
        基准元素的最终位置
    """
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


if __name__ == "__main__":
    # 测试示例
    test_arr = [64, 34, 25, 12, 22, 11, 90, 5]

    print("原始数组:", test_arr)

    # 测试返回新列表的版本
    sorted_arr = quicksort(test_arr.copy())
    print("排序后 (新列表):", sorted_arr)

    # 测试原地排序版本
    arr_inplace = test_arr.copy()
    quicksort_inplace(arr_inplace)
    print("排序后 (原地):", arr_inplace)
