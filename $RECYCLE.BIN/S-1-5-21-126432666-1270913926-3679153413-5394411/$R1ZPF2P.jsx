import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "./TerminalPage.css"; // Add this import

const TerminalPage = () => {
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(null);
  const socketRef = useRef(null);
  const bufferRef = useRef("");

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
        cursor: "#ffffff",
        selection: "#5DA5D533",
        black: "#1E1E1E",
        brightBlack: "#666666",
        red: "#E06C75",
        brightRed: "#E06C75",
        green: "#98C379",
        brightGreen: "#98C379",
        yellow: "#D19A66",
        brightYellow: "#D19A66",
        blue: "#61AFEF",
        brightBlue: "#61AFEF",
        magenta: "#C678DD",
        brightMagenta: "#C678DD",
        cyan: "#56B6C2",
        brightCyan: "#56B6C2",
        white: "#ABB2BF",
        brightWhite: "#FFFFFF",
      },
      allowTransparency: true,
      scrollback: 10000,
    });

    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);

    // Fullscreen fit
    const resize = () => {
      try {
        if (fitAddonRef.current) {
          fitAddonRef.current.fit();
          term.scrollToBottom();
        }
      } catch (error) {
        console.error("Resize error:", error);
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // WebSocket connection
    // Fetch the WebSocket port from backend first
    const getPortAndConnect = async () => {
      try {
        const response = await fetch("/api/terminal/port");
        const data = await response.json();
        const port = data.port;

        console.log(`Connecting to WebSocket on port: ${port}`);

        // WebSocket connection with dynamic port
        const socket = new WebSocket(`ws://localhost:${port}`);
        socketRef.current = socket;

        socket.onopen = () => {
          term.writeln(`\x1b[32mConnected to backend on port ${port}!\x1b[0m`);
          term.write("> ");
        };

        socket.onmessage = (event) => {
          const output = event.data.toString();
          term.write("\r\n" + output + "\r\n> ");
        };

        socket.onerror = (err) => {
          term.writeln(`\x1b[31mWebSocket error on port ${port}\x1b[0m`);
          console.error("WebSocket error:", err);
        };

        term.onData((data) => {
          if (data === "\r") {
            const command = bufferRef.current.trim();
            if (command && socket.readyState === WebSocket.OPEN) {
              socket.send(command);
            }
            bufferRef.current = "";
            term.write("\r\n");
          } else if (data === "\u007F") {
            if (bufferRef.current.length > 0) {
              bufferRef.current = bufferRef.current.slice(0, -1);
              term.write("\b \b");
            }
          } else {
            bufferRef.current += data;
            term.write(data);
          }
        });
      } catch (error) {
        console.error("Failed to get port:", error);
        term.writeln("\x1b[31mFailed to connect to backend\x1b[0m");
      }
    };

    getPortAndConnect();

    return () => {
      term.dispose();
      if (socketRef.current) {
        socketRef.current.close(); // ✅ Use socketRef instead
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Function to reload the page
  const handleRetry = () => {
    window.location.reload();
  };

  // Function to close the page
  const handleClose = () => {
    window.close();
  };

  return (
    <div className="terminal-page">
      <div ref={terminalRef} className="terminal-container" />
      <div className="terminal-buttons">
        <button className="retry-button" onClick={handleRetry}>
          Retry
        </button>
        <button className="close-button-terminal" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TerminalPage;
