const setInitialTheme = () => {
  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // If there's a saved theme, use it
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    return;
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    return;
  }
  
  // Otherwise check for OS preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// Run as soon as possible to avoid theme flashing
setInitialTheme();
