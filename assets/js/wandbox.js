(function() {
  const style = document.createElement("style");
  style.textContent = `
    .wandbox-block {
      border: 1px solid var(--main-border-color, #334155);
      border-radius: 0.5rem;
      margin: 1.5em 0;
      padding: 1em;
      background-color: var(--bg-color, #0f172a);
      transition: background-color 0.3s ease;
    }

    .wandbox-controls {
      margin-top: 0.5em;
      display: flex;
      gap: 1em;
      align-items: center;
    }

    .wandbox-controls button {
      padding: 0.4em 0.8em;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 0.3em;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .wandbox-controls button:hover {
      background-color: #1d4ed8;
      transform: scale(1.03);
    }

    .wandbox-controls button:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
      transform: none;
    }

    .wandbox-loading {
      font-size: 0.9em;
      color: #facc15;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .wandbox-type {
      font-weight: bold;
      margin-top: 1em;
      transition: color 0.3s ease;
    }

    .wandbox-type.success {
      color: #4ade80;
    }

    .wandbox-type.compile-error {
      color: #f87171;
    }

    .wandbox-type.runtime-error {
      color: #facc15;
    }

    .wandbox-output {
      background-color: #1e293b;
      color: #e2e8f0;
      padding: 0.8em;
      margin-top: 0.3em;
      border-radius: 0.4em;
      font-family: monospace;
      white-space: pre-wrap;
      max-height: 400px;
      overflow: auto;
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
})();