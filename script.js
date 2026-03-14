// Project metadata — maps project ID to detail screenshot
const projects = {
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

// DOM elements
const navWork = document.getElementById('nav-work');
const navResume = document.getElementById('nav-resume');
const pageWork = document.getElementById('page-work');
const pageResume = document.getElementById('page-resume');
const pageDetail = document.getElementById('page-detail');
const detailImage = document.getElementById('detail-image');
const mainEl = document.getElementById('main');

// Route to the correct page based on the URL hash
function navigate(hash) {
  // Hide all pages
  pageWork.classList.remove('active');
  pageResume.classList.remove('active');
  pageDetail.classList.remove('active');

  // Update nav highlights
  navWork.classList.remove('active');
  navResume.classList.remove('active');

  if (hash.startsWith('#project/')) {
    // Project detail page
    var projectId = hash.replace('#project/', '');
    var detailSrc = projects[projectId];
    if (detailSrc) {
      detailImage.src = detailSrc;
      detailImage.alt = projectId.replace(/-/g, ' ');
      pageDetail.classList.add('active');
      navWork.classList.add('active');
    } else {
      // Unknown project, fall back to work
      pageWork.classList.add('active');
      navWork.classList.add('active');
    }
  } else if (hash === '#resume') {
    pageResume.classList.add('active');
    navResume.classList.add('active');
  } else {
    // Default: #work or empty hash
    pageWork.classList.add('active');
    navWork.classList.add('active');
  }

  // Scroll to top
  mainEl.scrollTop = 0;
}

// Listen for hash changes (back/forward buttons)
window.addEventListener('hashchange', function () {
  navigate(window.location.hash);
});

// Initial load — navigate to the current hash
navigate(window.location.hash || '#work');
