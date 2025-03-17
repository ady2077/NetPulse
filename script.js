// Initialize particles
particlesJS('particles-js', {
    particles: {
        number: { value: 110, density: { enable: true, value_area: 800 } },
        color: { value: '#ff8c00' }, // Orange particles
        shape: { type: 'circle' },
        opacity: { value: 0.8, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 140, color: '#00cccc', opacity: 0.4, width: 1.5 },
        move: { enable: true, speed: 3.5, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.6 } }, push: { particles_nb: 5 } }
    },
    retina_detect: true
});

let isOnline = false;
let uptime = 0;
let lastChange = Date.now();
const statusHistory = [];

function toggleNetwork() {
    isOnline = !isOnline;
    const statusSpan = document.getElementById('status');
    const latencySpan = document.getElementById('latency');
    const uptimeSpan = document.getElementById('uptime');

    // Update status
    statusSpan.textContent = isOnline ? 'Online' : 'Offline';
    statusSpan.style.color = isOnline ? '#00ff9f' : '#ff6b6b';

    // Update latency (fake)
    const latency = isOnline ? Math.floor(Math.random() * 100) + 20 : 0; // 20-120 ms
    latencySpan.textContent = `${latency} ms`;

    // Update uptime
    if (isOnline) {
        lastChange = Date.now();
    } else {
        uptime += Math.floor((Date.now() - lastChange) / 1000);
    }
    uptimeSpan.textContent = `${uptime}s`;

    // Log status change
    const timestamp = new Date().toLocaleTimeString();
    statusHistory.unshift(`[${timestamp}] ${isOnline ? 'Online' : 'Offline'} - Latency: ${latency}ms`);
    updateHistory();

    // Update uptime every second if online
    if (isOnline) {
        clearInterval(window.uptimeInterval);
        window.uptimeInterval = setInterval(() => {
            uptime = Math.floor((Date.now() - lastChange) / 1000);
            uptimeSpan.textContent = `${uptime}s`;
        }, 1000);
    } else {
        clearInterval(window.uptimeInterval);
    }
}

function updateHistory() {
    const historyList = document.getElementById('statusHistory');
    historyList.innerHTML = '';
    statusHistory.slice(0, 5).forEach(entry => { // Show last 5 entries
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Initial state
toggleNetwork();