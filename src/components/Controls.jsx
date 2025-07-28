// components/Controls.js
import React, { useState } from 'react';

const algorithmComplexities = {
  bubbleSort: {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
  },
  selectionSort: {
    name: "Selection Sort",
    best: "O(n^2)",
    average: "O(n^2)",
    worst: "O(n^2)",
  },
  insertionSort: {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
  },
  mergeSort: {
    name: "Merge Sort",
    best: "O(n log n)", 
    average: "O(n log n)", 
    worst: "O(n log n)", 
  },
  quickSort: {
    name: "Quick Sort",
    best: "O(n log n)", 
    average: "O(n log n)", 
    worst: "O(n^2)",
  },
};

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
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);

  const handleMouseEnter = (algoName) => {
    setHoveredAlgorithm(algoName);
  };

  const handleMouseLeave = () => {
    setHoveredAlgorithm(null);
  };

  return (
    <div className="controls">
      <button onClick={generateArray} disabled={isSorting}>
        Generate New Array
      </button>
      {/* Add onMouseEnter and onMouseLeave to each sorting button */}
      <button
        onClick={onBubbleSort}
        disabled={isSorting}
        onMouseEnter={() => handleMouseEnter('bubbleSort')}
        onMouseLeave={handleMouseLeave}
      >
        Bubble Sort
      </button>
      <button
        onClick={onSelectionSort}
        disabled={isSorting}
        onMouseEnter={() => handleMouseEnter('selectionSort')}
        onMouseLeave={handleMouseLeave}
      >
        Selection Sort
      </button>
      <button
        onClick={onInsertionSort}
        disabled={isSorting}
        onMouseEnter={() => handleMouseEnter('insertionSort')}
        onMouseLeave={handleMouseLeave}
      >
        Insertion Sort
      </button>
      <button
        onClick={onMergeSort}
        disabled={isSorting}
        onMouseEnter={() => handleMouseEnter('mergeSort')}
        onMouseLeave={handleMouseLeave}
      >
        Merge Sort
      </button>
      <button
        onClick={onQuickSort}
        disabled={isSorting}
        onMouseEnter={() => handleMouseEnter('quickSort')}
        onMouseLeave={handleMouseLeave}
      >
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

      {/* Conditionally render the complexity info card */}
      {hoveredAlgorithm && (
        <div className="complexity-info-card">
          <h3>{algorithmComplexities[hoveredAlgorithm].name} Complexity</h3>
          <p>Best: {algorithmComplexities[hoveredAlgorithm].best}</p>
          <p>Average: {algorithmComplexities[hoveredAlgorithm].average}</p>
          <p>Worst: {algorithmComplexities[hoveredAlgorithm].worst}</p>
        </div>
      )}
    </div>
  );
}

export default Controls;