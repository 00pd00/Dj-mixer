import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Connected to terminal server');
    
    // Send test commands
    const testCommands = [
        'pwd',
        'ls -la',
        'whoami'
    ];

    let commandIndex = 0;
    const sendNextCommand = () => {
        if (commandIndex < testCommands.length) {
            const command = testCommands[commandIndex++];
            console.log(`Sending command: ${command}`);
            ws.send(command + '\n');
            setTimeout(sendNextCommand, 2000);
        }
    };

    sendNextCommand();
});

ws.on('message', (data) => {
    console.log('Received:', data.toString());
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});

ws.on('close', () => {
    console.log('Connection closed');
    process.exit(0);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('Closing WebSocket connection...');
    ws.close();
});

// Timeout after 30 seconds
setTimeout(() => {
    console.log('Test timeout reached. Closing connection...');
    ws.close();
}, 30000);