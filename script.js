// Project metadata — maps project ID to detail screenshot
var projects = {
  'bar-rescue': 'screenshots/01-bar-rescue.png',
  'variety-magazine': 'screenshots/02-variety-magazine.png',
  'bellator-mma': 'screenshots/03-bellator-mma.png',
  'waco-cable': 'screenshots/04-waco-cable.png',
  'album-cover': 'screenshots/05-album-cover.png',
  'paramount': 'screenshots/06-paramount.png',
  'the-greatest': 'screenshots/07-greatest-logo.png',
  'disney-fairies': 'screenshots/08-disney-fairies.png',
  'disney-sofia': 'screenshots/09-disney-sofia.png',
  'disney-princess': 'screenshots/10-disney-princess.png',
  'hello-kitty-cosmetic': 'screenshots/11-hello-kitty-cosmetic.png',
  'hello-kitty-salon': 'screenshots/12-hello-kitty-salon.png',
  'anna-hu-butterfly': 'screenshots/13-anna-hu-butterfly.png',
  'anna-hu-morocco-1': 'screenshots/14-anna-hu-morocco1.png',
  'anna-hu-morocco-2': 'screenshots/15-anna-hu-morocco2.png',
  'portcullis': 'screenshots/16-portcullis-logo.png',
  'smile-connection': 'screenshots/17-smile-connection.png',
  'embrace-myself': 'screenshots/18-embrace-myself.png',
  'wedding-favors': 'screenshots/19-wedding-favors.png',
  'wedding-invitation': 'screenshots/20-wedding-invitation.png',
  'baby-shower': 'screenshots/21-baby-shower.png'
};

// Ordered list of project IDs (left-to-right, top-to-bottom)
var projectOrder = Object.keys(projects);

// DOM elements
var navWork = document.getElementById('nav-work');
var navResume = document.getElementById('nav-resume');
var pageWork = document.getElementById('page-work');
var pageResume = document.getElementById('page-resume');
var pageDetail = document.getElementById('page-detail');
var detailImage = document.getElementById('detail-image');
var mainEl = document.getElementById('main');

// Save/restore scroll positions per page
var scrollPositions = {};
var activeHash = '';

function pageKeyForHash(hash) {
  if (hash.startsWith('#project/')) return 'detail';
  if (hash === '#resume') return 'resume';
  return 'work';
}

// Route to the correct page based on the URL hash
function navigate(hash) {
  // Save scroll position of the page we're leaving
  scrollPositions[pageKeyForHash(activeHash)] = mainEl.scrollTop;
  activeHash = hash;

  // Hide all pages
  pageWork.classList.remove('active');
  pageResume.classList.remove('active');
  pageDetail.classList.remove('active');

  // Update nav highlights
  navWork.classList.remove('active');
  navResume.classList.remove('active');

  // Determine which page to show
  var targetKey;

  if (hash.startsWith('#project/')) {
    // Project detail page
    var projectId = hash.replace('#project/', '');
    var detailSrc = projects[projectId];
    if (detailSrc) {
      // Hide old image immediately to prevent flash of stale content
      detailImage.style.opacity = '0';
      detailImage.src = detailSrc;
      detailImage.alt = projectId.replace(/-/g, ' ');
      pageDetail.classList.add('active');
      navWork.classList.add('active');
      targetKey = 'detail';
    } else {
      // Unknown project, fall back to work
      pageWork.classList.add('active');
      navWork.classList.add('active');
      targetKey = 'work';
    }
  } else if (hash === '#resume') {
    pageResume.classList.add('active');
    navResume.classList.add('active');
    targetKey = 'resume';
  } else {
    // Default: #work or empty hash
    pageWork.classList.add('active');
    navWork.classList.add('active');
    targetKey = 'work';
  }

  // Restore saved scroll position, or scroll to top for new detail pages
  if (targetKey === 'detail') {
    mainEl.scrollTop = 0;
  } else if (scrollPositions[targetKey] !== undefined) {
    mainEl.scrollTop = scrollPositions[targetKey];
  } else {
    mainEl.scrollTop = 0;
  }
}

// Reveal image once loaded (prevents flash of old content)
detailImage.addEventListener('load', function () {
  detailImage.style.opacity = '1';
});

// Keyboard navigation on detail and sub-pages
window.addEventListener('keydown', function (e) {
  var hash = window.location.hash;

  // Escape returns to the main work page from any sub-page
  if (e.key === 'Escape' && hash && hash !== '#work' && hash !== '') {
    e.preventDefault();
    window.location.hash = '#work';
    return;
  }

  if (!hash.startsWith('#project/')) return;

  var projectId = hash.replace('#project/', '');
  var idx = projectOrder.indexOf(projectId);
  if (idx === -1) return;

  if (e.key === 'ArrowLeft' && idx > 0) {
    e.preventDefault();
    window.location.hash = '#project/' + projectOrder[idx - 1];
  } else if (e.key === 'ArrowRight' && idx < projectOrder.length - 1) {
    e.preventDefault();
    window.location.hash = '#project/' + projectOrder[idx + 1];
  }
});

// Listen for hash changes (back/forward buttons)
window.addEventListener('hashchange', function () {
  navigate(window.location.hash);
});

// Initial load — navigate to the current hash
navigate(window.location.hash || '#work');
