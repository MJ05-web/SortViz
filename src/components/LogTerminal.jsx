import React, { useEffect, useRef } from 'react';

function LogTerminal({ logs }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="terminal" id="logTerminal" ref={terminalRef}>
      {logs.length === 0 ? (
        <p>Logs will appear here...</p>
      ) : (
        logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))
      )}
    </div>
  );
}

export default LogTerminal;