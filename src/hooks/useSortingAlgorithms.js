
// Utility function for animations and sound feedback
const animateBar = async (bars, indices, newColor, delay, playStepSound, sleep, isSoundOnRef) => {
  for (const index of indices) {
    if (bars[index]) {
      bars[index].style.backgroundColor = newColor;
    }
  }
  playStepSound(); // Call playStepSound. It will internally check isSoundOnRef.current
  await sleep(delay);
};

// Utility function to reset bar color
const resetBarColor = (bars, indices, defaultColor = '#133FB3') => {
  for (const index of indices) {
    if (bars[index]) {
      bars[index].style.backgroundColor = defaultColor;
    }
  }
};

// Utility function to swap heights (values) and update bar styles
const swap = async (arr, bars, i, j, delay, playStepSound, sleep, logMessage, isSoundOnRef) => {
  logMessage(`Swapping elements at index ${i} (value: ${arr[i]}) and ${j} (value: ${arr[j]})`);

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  if (bars[i] && bars[j]) {
    bars[i].style.height = `${arr[i]}px`;
    bars[j].style.height = `${arr[j]}px`;

    // Update the displayed value inside the bars if you have a .bar-value span
    if (bars[i].querySelector('.bar-value')) {
        bars[i].querySelector('.bar-value').textContent = arr[i];
    }
    if (bars[j].querySelector('.bar-value')) {
        bars[j].querySelector('.bar-value').textContent = arr[j];
    }

    playStepSound(); // Call playStepSound. It will internally check isSoundOnRef.current
    await sleep(delay);
  }
};

// --- Sorting Algorithms ---

export const bubbleSort = async (arr, bars, delay, logMessage, playStepSound, playSortedSound, playFinalSound, sleep, isSoundOnRef) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      logMessage(`Comparing elements at index ${j} (value: ${arr[j]}) and ${j + 1} (value: ${arr[j + 1]})`);
      await animateBar(bars, [j, j + 1], 'purple', delay, playStepSound, sleep, isSoundOnRef);

      if (arr[j] > arr[j + 1]) {
        await swap(arr, bars, j, j + 1, delay, playStepSound, sleep, logMessage, isSoundOnRef);
      }
      resetBarColor(bars, [j, j + 1]);
    }
    logMessage(`Element ${arr[n - 1 - i]} at index ${n - 1 - i} is now in its sorted position.`);
    await animateBar(bars, [n - 1 - i], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
    playSortedSound();
  }
  logMessage(`Element ${arr[0]} at index 0 is now in its sorted position.`);
  await animateBar(bars, [0], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
  playSortedSound();
};

export const selectionSort = async (arr, bars, delay, logMessage, playStepSound, playSortedSound, playFinalSound, sleep, isSoundOnRef) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    logMessage(`Searching for minimum element from index ${i} to ${n - 1}. Current min assumed at index ${i} (value: ${arr[i]})`);
    await animateBar(bars, [i], 'orange', delay, playStepSound, sleep, isSoundOnRef);

    for (let j = i + 1; j < n; j++) {
      logMessage(`Comparing element at index ${j} (value: ${arr[j]}) with current minimum at index ${minIndex} (value: ${arr[minIndex]})`);
      await animateBar(bars, [j], 'purple', delay, playStepSound, sleep, isSoundOnRef);

      if (arr[j] < arr[minIndex]) {
        if (minIndex !== i) {
          resetBarColor(bars, [minIndex]);
        }
        minIndex = j;
        await animateBar(bars, [minIndex], 'red', delay, playStepSound, sleep, isSoundOnRef);
      } else {
        resetBarColor(bars, [j]);
      }
    }
    await swap(arr, bars, i, minIndex, delay, playStepSound, sleep, logMessage, isSoundOnRef);
    logMessage(`Element ${arr[i]} at index ${i} is now in its sorted position.`);
    resetBarColor(bars, [i, minIndex]);
    await animateBar(bars, [i], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
    playSortedSound();
  }
  logMessage(`Element ${arr[n - 1]} at index ${n - 1} is now in its sorted position.`);
  await animateBar(bars, [n - 1], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
  playSortedSound();
};

export const insertionSort = async (arr, bars, delay, logMessage, playStepSound, playSortedSound, playFinalSound, sleep, isSoundOnRef) => {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    logMessage(`Taking element ${key} at index ${i} to insert into sorted part.`);
    await animateBar(bars, [i], 'orange', delay, playStepSound, sleep, isSoundOnRef);

    while (j >= 0 && arr[j] > key) {
      logMessage(`Shifting element ${arr[j]} at index ${j} to the right.`);
      await animateBar(bars, [j, j + 1], 'purple', delay, playStepSound, sleep, isSoundOnRef);

      arr[j + 1] = arr[j];
      bars[j + 1].style.height = `${arr[j + 1]}px`;
      if (bars[j + 1].querySelector('.bar-value')) {
           bars[j + 1].querySelector('.bar-value').textContent = arr[j + 1];
       }
      playStepSound();
      await sleep(delay);
      resetBarColor(bars, [j, j + 1]);
      j--;
    }
    arr[j + 1] = key;
    bars[j + 1].style.height = `${arr[j + 1]}px`;
    if (bars[j + 1].querySelector('.bar-value')) {
        bars[j + 1].querySelector('.bar-value').textContent = key;
    }
    logMessage(`Inserting ${key} at final position ${j + 1}.`);
    playStepSound();
    await sleep(delay); // Small delay for final placement visualization

    // Mark the sorted part
    for (let k = 0; k <= i; k++) {
      await animateBar(bars, [k], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
    }
    playSortedSound();
  }
  // REMOVED: Final loop to turn all bars green, as App.js now handles this via state.
};

export const mergeSort = async (arr, bars, delay, logMessage, playStepSound, playSortedSound, playFinalSound, sleep, isSoundOnRef) => {
  const merge = async (arr, bars, left, mid, right) => {
    logMessage(`Merging sub-array from index ${left} to ${right}.`);
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
      await animateBar(bars, [left + i], 'orange', delay, playStepSound, sleep, isSoundOnRef); // Highlight left part
      resetBarColor(bars, [left + i]);
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
      await animateBar(bars, [mid + 1 + j], 'purple', delay, playStepSound, sleep, isSoundOnRef); // Highlight right part
      resetBarColor(bars, [mid + 1 + j]);
    }

    let i = 0; // Initial index of first sub-array
    let j = 0; // Initial index of second sub-array
    let k = left; // Initial index of merged sub-array

    while (i < n1 && j < n2) {
      // Highlight elements being compared
      await animateBar(bars, [left + i, mid + 1 + j], 'yellow', delay, playStepSound, sleep, isSoundOnRef);
      resetBarColor(bars, [left + i, mid + 1 + j]); // Reset after comparison

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      // Update the bar's height and value immediately after placing the element
      bars[k].style.height = `${arr[k]}px`;
      if (bars[k].querySelector('.bar-value')) {
          bars[k].querySelector('.bar-value').textContent = arr[k];
      }
      await animateBar(bars, [k], 'red', delay, playStepSound, sleep, isSoundOnRef); // Highlight element being placed
      resetBarColor(bars, [k]);
      k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
      arr[k] = L[i];
      bars[k].style.height = `${arr[k]}px`;
      if (bars[k].querySelector('.bar-value')) {
          bars[k].querySelector('.bar-value').textContent = arr[k];
      }
      await animateBar(bars, [k], 'red', delay, playStepSound, sleep, isSoundOnRef);
      resetBarColor(bars, [k]);
      i++;
      k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
      arr[k] = R[j];
      bars[k].style.height = `${arr[k]}px`;
      if (bars[k].querySelector('.bar-value')) {
          bars[k].querySelector('.bar-value').textContent = arr[k];
      }
      await animateBar(bars, [k], 'red', delay, playStepSound, sleep, isSoundOnRef);
      resetBarColor(bars, [k]);
      j++;
      k++;
    }
    // Mark the entire merged segment as sorted (temporarily, before App.js makes it green)
    for (let idx = left; idx <= right; idx++) {
      await animateBar(bars, [idx], 'cyan', 0, playStepSound, sleep, isSoundOnRef);
    }
    playSortedSound();
  };

  const mergeSortRecursive = async (arr, bars, left, right) => {
    if (left >= right) {
      // If a single element subarray, it's considered sorted
      if (left === right) {
        logMessage(`Sub-array with single element ${arr[left]} at index ${left} is sorted.`);
        await animateBar(bars, [left], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
        playSortedSound();
      }
      return;
    }
    const mid = Math.floor((left + right) / 2);
    logMessage(`Dividing sub-array: (${left}-${mid}) and (${mid + 1}-${right})`);
    await mergeSortRecursive(arr, bars, left, mid);
    await mergeSortRecursive(arr, bars, mid + 1, right);
    await merge(arr, bars, left, mid, right);
  };

  await mergeSortRecursive(arr, bars, 0, arr.length - 1);

};


export const quickSort = async (arr, bars, delay, logMessage, playStepSound, playSortedSound, playFinalSound, sleep, isSoundOnRef) => {
  const partition = async (arr, bars, low, high) => {
    const pivot = arr[high];
    logMessage(`Selecting pivot: ${pivot} at index ${high}.`);
    await animateBar(bars, [high], 'red', delay, playStepSound, sleep, isSoundOnRef);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      logMessage(`Comparing element at index ${j} (value: ${arr[j]}) with pivot ${pivot}.`);
      await animateBar(bars, [j], 'purple', delay, playStepSound, sleep, isSoundOnRef);

      if (arr[j] < pivot) {
        i++;
        await swap(arr, bars, i, j, delay, playStepSound, sleep, logMessage, isSoundOnRef);
        resetBarColor(bars, [i, j]);
      } else {
        resetBarColor(bars, [j]);
      }
    }
    await swap(arr, bars, i + 1, high, delay, playStepSound, sleep, logMessage, isSoundOnRef); // Place pivot in correct position
    resetBarColor(bars, [high]); // Reset pivot's initial color
    logMessage(`Pivot ${pivot} placed at final position ${i + 1}.`);

    await animateBar(bars, [i + 1], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
    playSortedSound();
    return i + 1;
  };

  const quickSortRecursive = async (arr, bars, low, high) => {
    if (low < high) {
      const pi = await partition(arr, bars, low, high);
      logMessage(`Recursively sorting left partition (indices ${low} to ${pi - 1}).`);
      await quickSortRecursive(arr, bars, low, pi - 1);
      logMessage(`Recursively sorting right partition (indices ${pi + 1} to ${high}).`);
      await quickSortRecursive(arr, bars, pi + 1, high);
    } else if (low === high) {
      // If a single element subarray, it's considered sorted
      logMessage(`Sub-array with single element ${arr[low]} at index ${low} is sorted.`);
      await animateBar(bars, [low], 'limegreen', 0, playStepSound, sleep, isSoundOnRef);
      playSortedSound();
    }
  };

  await quickSortRecursive(arr, bars, 0, arr.length - 1);

};
