document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  async function navigate(page) {
    let pageUrl = '';

    switch (page) {
      case 'home':
        pageUrl = 'pages/home.html';
        break;
      case 'about':
        pageUrl = 'pages/about.html';
        break;
      case 'resume':
        pageUrl = 'pages/resume.html';
        break;
      case 'doing':
        pageUrl = 'pages/doing.html';
        break;
      case 'podcasts':
        pageUrl = 'pages/podcasts.html';
        break;
      default:
        pageUrl = 'pages/404.html';
        break;
    }

    try {
      const response = await fetch(pageUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const html = await response.text();
      content.innerHTML = html;
    } catch (error) {
      content.innerHTML = '<h1>Error loading page</h1>';
      console.error(error);
    }
  }

  function onLinkClick(event) {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    history.pushState({ page }, '', `#${page}`);
    navigate(page);
  }

  function onPopState(event) {
    const page = (event.state && event.state.page) || 'home';
    navigate(page);
  }

  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', onLinkClick);
  });

  window.addEventListener('popstate', onPopState);

  const initialPage = window.location.hash.slice(1) || 'home';
  navigate(initialPage);
});
