import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import ArrayBar from './components/ArrayBar';
import LogTerminal from './components/LogTerminal';
import Confetti from './components/Confetti';
import Footer from './components/Footer';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} from './hooks/useSortingAlgorithms';

function App() {
  const [array, setArray] = useState([]); // The array of objects for visualization
  const [arraySize, setArraySize] = useState(50); // Number of bars
  const [animationSpeed, setAnimationSpeed] = useState(50); // Controls animation speed (1-100)
  const [isSoundOn, setIsSoundOn] = useState(false); // Sound toggle state (set to false initially)
  const [logs, setLogs] = useState([]); // Array to store log messages
  const [isSorting, setIsSorting] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false); 
  const stepSoundPoolRef = useRef([]);
  const sortedSoundRef = useRef(new Audio('/effcts/audi2.mp3'));
  const finalSoundRef = useRef(new Audio('/effcts/audi3.mp3'));
  const isSoundOnRef = useRef(isSoundOn);
  const isSortingRef = useRef(isSorting); 
  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
    if (!isSoundOn) {
      stepSoundPoolRef.current.forEach(audio => {
        if (!audio.paused || audio.currentTime > 0) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      if (sortedSoundRef.current) {
        sortedSoundRef.current.pause();
        sortedSoundRef.current.currentTime = 0;
      }
      if (finalSoundRef.current) {
        finalSoundRef.current.pause();
        finalSoundRef.current.currentTime = 0;
      }
    }
  }, [isSoundOn]);

  // Update isSortingRef whenever isSorting state changes
  useEffect(() => {
    isSortingRef.current = isSorting;
  }, [isSorting]);

  useEffect(() => {
    if (stepSoundPoolRef.current.length === 0) {
      for (let i = 0; i < 5; i++) {
        const audio = new Audio('/effcts/audi1.mp3');
        audio.volume = 0.5;
        stepSoundPoolRef.current.push(audio);
      }
    }
  }, []);

  const MIN_ANIMATION_SPEED = 1;
  const MAX_ANIMATION_SPEED = 100;
  const MAX_DELAY_MS = 5000;
  const MIN_DELAY_MS = 5;

  const effectiveSpeed = animationSpeed === 100 ? 98 : animationSpeed;

  const delay = Math.round(
    MAX_DELAY_MS -
    ((effectiveSpeed - MIN_ANIMATION_SPEED) *
      (MAX_DELAY_MS - MIN_DELAY_MS) /
      (MAX_ANIMATION_SPEED - MIN_ANIMATION_SPEED))
  );
  const logMessage = useCallback((message) => {
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs, message];
      return newLogs.slice(-20);
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const playStepSound = useCallback(() => {
    if (!isSoundOnRef.current) return;
    let availableAudio = stepSoundPoolRef.current.find(audio => audio.paused || audio.ended);
    if (!availableAudio) {
      availableAudio = stepSoundPoolRef.current[0];
    }
    if (availableAudio) {
      availableAudio.currentTime = 0;
      availableAudio.play().catch(error => {});
    }
  }, []);

  const playSortedSound = useCallback(() => {
    if (!isSoundOnRef.current) return;
    if (sortedSoundRef.current) {
      sortedSoundRef.current.pause();
      sortedSoundRef.current.currentTime = 0;
      sortedSoundRef.current.play().catch(error => {});
    }
  }, []);

  const playFinalSound = useCallback(() => {
    if (!isSoundOnRef.current) return;
    if (finalSoundRef.current) {
      finalSoundRef.current.pause();
      finalSoundRef.current.currentTime = 0;
      finalSoundRef.current.play().catch(error => {});
    }
  }, []);
  const generateArray = useCallback(() => {
    if (isSortingRef.current) return;
    clearLogs();
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      const value = Math.floor(Math.random() * 300) + 10;
      newArray.push({ value: value, isSorted: false }); 
    }
    setArray(newArray);
    logMessage(`New array generated with ${arraySize} elements`);
    stepSoundPoolRef.current.forEach(audio => { audio.pause(); audio.currentTime = 0; });
    if (sortedSoundRef.current) { sortedSoundRef.current.pause(); sortedSoundRef.current.currentTime = 0; }
    if (finalSoundRef.current) { finalSoundRef.current.pause(); finalSoundRef.current.currentTime = 0; }

  }, [arraySize, clearLogs, logMessage]);

  const highlightSortedBars = useCallback(async (finalSortedArrayValues) => {
    // Start with the sorted values from the algorithm, initially not marked as 'isSorted: true'.
    let currentArrayState = finalSortedArrayValues.map(value => ({ value: value, isSorted: false }));
    setArray(currentArrayState);

    // Now, sequentially update the `isSorted` flag in the state for each bar
    for (let i = 0; i < currentArrayState.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20)); // Small delay for visual effect
      
      // Create a new array to update the state immutably for the current bar
      const updatedArrayState = currentArrayState.map((item, index) => {
        if (index === i) {
          return { ...item, isSorted: true }; // Mark this specific bar as sorted
        }
        return item;
      });
      setArray(updatedArrayState); 
      currentArrayState = updatedArrayState; 
    }

    setTriggerConfetti(true);
    setTimeout(() => setTriggerConfetti(false), 4000);
    logMessage("Array is fully sorted!");
    playFinalSound();

  }, [logMessage, playFinalSound, setArray]);


  const sleep = useCallback((ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }, []);
  useEffect(() => {
    generateArray();
  }, [arraySize]); 

  const runSortingAlgorithm = useCallback(
    async (sortFunction) => {
      if (isSorting) return;

      setIsSorting(true);
      clearLogs();

      const valuesOnlyArray = array.map(item => item.value);
      const bars = document.querySelectorAll('.bar');

      logMessage(`Starting ${sortFunction.name} visualization...`);


      setArray(prevArray => prevArray.map(item => ({ ...item, isSorted: false })));

      try {
        await sortFunction(
          valuesOnlyArray, 
          bars,
          delay,
          logMessage,
          playStepSound,
          playSortedSound,
          playFinalSound,
          sleep,
          isSoundOnRef,
        );

        await highlightSortedBars(valuesOnlyArray);
      } catch (error) {
        logMessage(`Error during ${sortFunction.name}: ${error.message}`);
      } finally {
        setIsSorting(false); 
      }
    },

    [array, delay, logMessage, playStepSound, playSortedSound, playFinalSound, sleep, highlightSortedBars, clearLogs, isSorting],
  );


  return (
    <>
      <Header />
      <Controls
        generateArray={generateArray}
        onBubbleSort={() => runSortingAlgorithm(bubbleSort)}
        onSelectionSort={() => runSortingAlgorithm(selectionSort)}
        onInsertionSort={() => runSortingAlgorithm(insertionSort)}
        onMergeSort={() => runSortingAlgorithm(mergeSort)}
        onQuickSort={() => runSortingAlgorithm(quickSort)}
        arraySize={arraySize}
        setArraySize={setArraySize}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        clearLogs={clearLogs}
        isSorting={isSorting}
      />
      <div className="array-container" id="array">
        {array.map((item, index) => (
          <ArrayBar
            key={index}
            value={item.value}
            totalBars={array.length}
            color="#133FB3" 
            isSorted={item.isSorted}
          />
        ))}
      </div>
      <Confetti trigger={triggerConfetti} />
      <LogTerminal logs={logs} />
      <Footer />
    </>
  );
}

export default App;
