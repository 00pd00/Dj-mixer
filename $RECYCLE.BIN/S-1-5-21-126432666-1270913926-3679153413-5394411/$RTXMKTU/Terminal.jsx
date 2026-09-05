import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const XtermComponent = () => {
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(null);
  const socketRef = useRef(null);
  const bufferRef = useRef("");

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: { background: "#1e1e1e", foreground: "#ffffff" },
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);

    try {
      fitAddon.fit();
    } catch {}

    const socket = new WebSocket("ws://localhost:4000");
    socketRef.current = socket;

    socket.onopen = () => {
      term.writeln("\x1b[32mConnected🟢\x1b[0m");
      term.write("> ");
    };

    socket.onmessage = (event) => {
      const output = event.data.toString();
      term.write("\r\n" + output + "\r\n> ");
    };

    socket.onerror = (err) => {
      term.writeln("\x1b[31mWebSocket error🔴\x1b[0m");
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

    return () => {
      term.dispose();
      socket.close();
    };
  }, []);

  return (
    <div className="p-2">
      <div
        ref={terminalRef}
        style={{
          width: "100%",
          height: "400px",
          overflow: "hidden",   // 🚀 hides outer scroll
        }}
        className="rounded-lg shadow-lg border border-gray-700 bg-black"
      />
    </div>
  );
};

export default XtermComponent;
