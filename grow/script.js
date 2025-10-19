// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// On DOM ready: set initial theme preference if none, then load links
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Load links from links.json and render
    loadLinks();
});

async function loadLinks() {
    const container = document.getElementById('links');
    const loading = document.getElementById('links-loading');
    try {
        const res = await fetch('./links.json', {cache: 'no-store'});
        if (!res.ok) throw new Error('Failed to fetch links.json: ' + res.status);
        const links = await res.json();
        // Clear loading node
        if (loading) loading.remove();

        if (!Array.isArray(links) || links.length === 0) {
            container.innerHTML = '<p style="opacity:0.85">No links found in <code>links.json</code>.</p>';
            return;
        }

        for (const item of links) {
            const a = document.createElement('a');
            a.href = item.url;
            a.className = 'link-button';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.innerHTML = '<span class="link-title">' + escapeHtml(item.title) + '</span>';
            container.appendChild(a);
        }
    } catch (err) {
        console.error('Error loading links.json:', err);
        if (loading) loading.textContent = 'Unable to load links.';
    }
}

function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
