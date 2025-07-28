
import React from 'react';

function ArrayBar({ value, totalBars, color, isSorted }) {
  const estimatedContainerWidth = Math.min(window.innerWidth * 0.9, 900); // 90% of viewport, max 900px
  const effectiveContainerWidth = estimatedContainerWidth - (2 * 16); 

  const marginPerBar = 2; 


  const calculatedBarWidth = Math.max(5, Math.floor((effectiveContainerWidth / totalBars) - marginPerBar));
  const barColor = isSorted ? 'limegreen' : color;

  // Force showValue to true to ensure numbers always display.
  const showValue = true;

  return (
    <div
      className="bar" // Retain the 'bar' class for existing styling
      style={{
        height: `${value}px`, // Actual height of the bar based on its value
        width: `${calculatedBarWidth}px`, // Use the calculated content width for the bar
        backgroundColor: barColor, // Use the determined barColor
        borderRadius: '4px 4px 0 0',
        boxShadow: `0 0 10px ${barColor}`,
        transition: 'background-color 0.1s ease-in-out, height 0.3s ease', // Smooth transitions for color and height changes
        position: 'relative', // Needed for positioning the value span
      }}
    >
      {showValue && (
        <span
          className="bar-value"
          style={{
            position: 'absolute',
            bottom: '100%', // Position above the bar
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally
            marginBottom: '2px', // Small margin above the bar
            fontSize: '0.65rem', // Smaller font size for values
            color: '#fff', // White text
            textAlign: 'center',
            whiteSpace: 'nowrap', // Prevent text wrapping
            lineHeight: '1', // Compact line height
            zIndex: 100, // Ensure value is on top
            pointerEvents: 'none', // Allow clicks to pass through to the bar
            backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background for readability
            padding: '2px 4px', // Padding around the value
            borderRadius: '3px', // Rounded corners for the value background
            opacity: totalBars > 70 ? 0.7 : 1, // Reduce opacity for many bars to avoid clutter
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export default ArrayBar;