import React from 'react';

function Controls({
  generateArray,
  onBubbleSort,
  onSelectionSort,
  onInsertionSort,
  onMergeSort,
  onQuickSort,
  arraySize,
  setArraySize,
  animationSpeed,
  setAnimationSpeed,
  isSoundOn,
  setIsSoundOn,
  clearLogs,
  isSorting,
}) {
  return (
    <div className="controls">
      <button onClick={generateArray} disabled={isSorting}>
        Generate New Array
      </button>
      <button onClick={onBubbleSort} disabled={isSorting}>
        Bubble Sort
      </button>
      <button onClick={onSelectionSort} disabled={isSorting}>
        Selection Sort
      </button>
      <button onClick={onInsertionSort} disabled={isSorting}>
        Insertion Sort
      </button>
      <button onClick={onMergeSort} disabled={isSorting}>
        Merge Sort
      </button>
      <button onClick={onQuickSort} disabled={isSorting}>
        Quick Sort
      </button>

      {/* Array Size Slider */}
      <div className="slider-group">
        <label htmlFor="arraySize">Array Size: {arraySize}</label>
        <input
          type="range"
          id="arraySize"
          min="10"
          max="150"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isSorting}
        />
      </div>

      {/* Animation Speed Slider */}
      <div className="slider-group">
        <label htmlFor="animationSpeed">Speed: {animationSpeed}%</label>
        <input
          type="range"
          id="animationSpeed"
          min="1"
          max="100"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          disabled={isSorting}
        />
      </div>

      <button
        id="soundToggleBtn"
        onClick={() => setIsSoundOn((prev) => !prev)}
        className={isSoundOn ? 'sound-off-red' : 'sound-on-green'}
        disabled={isSorting}
      >
        {isSoundOn ? 'Sound OFF' : 'Sound ON'}
      </button>
      <button onClick={clearLogs} disabled={isSorting}>
        Clear Logs
      </button>
    </div>
  );
}

export default Controls;