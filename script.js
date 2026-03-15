// Project metadata — maps project ID to image, title, and subtitle
var projects = {
  'bar-rescue': {
    image: 'project-images/bar-rescue.jpg',
    title: 'PARAMOUNT NETWORK BAR RESCUE',
    subtitle: 'Digital Ad Design'
  },
  'variety-magazine': {
    image: 'project-images/variety-magazine.jpg',
    title: 'VARIETY MAGAZINE COVER',
    subtitle: 'Print Design'
  },
  'bellator-mma': {
    image: 'project-images/bellator-mma.jpg',
    title: 'PARAMOUNT NETWORK BELLATOR MMA BANNER',
    subtitle: 'Digital Ad Design'
  },
  'waco-cable': {
    image: 'project-images/waco-cable.jpg',
    title: 'PARAMOUNT NETWORK WACO CABLE GUIDE BANNERS',
    subtitle: 'Digital Ad Design'
  },
  'album-cover': {
    image: 'project-images/album-cover.jpg',
    title: 'ALBUM COVER',
    subtitle: 'Print Design'
  },
  'paramount': {
    image: 'project-images/paramount.jpg',
    title: 'PARAMOUNT NETWORK PRESENTATION',
    subtitle: 'PowerPoint Design'
  },
  'the-greatest': {
    image: 'project-images/the-greatest.jpg',
    title: 'THE GREATEST',
    subtitle: 'Logo Design'
  },
  'disney-fairies': {
    image: 'project-images/disney-fairies.jpg',
    title: 'DISNEY FAIRIES SWIVEL HAIRBRUSH',
    subtitle: 'Product & Packaging Design'
  },
  'disney-sofia': {
    image: 'project-images/disney-sofia.jpg',
    title: 'DISNEY SOFIA THE FIRST COSMETIC SET',
    subtitle: 'Product & Packaging Design'
  },
  'disney-princess': {
    image: 'project-images/disney-princess.jpg',
    title: 'DISNEY PRINCESS BEAUTY PRODUCTS',
    subtitle: 'Product & Packaging Design'
  },
  'hello-kitty-cosmetic': {
    image: 'project-images/hello-kitty-cosmetic.jpg',
    title: 'SANRIO HELLO KITTY COSMETIC GIFT SET',
    subtitle: 'Product & Packaging Design'
  },
  'hello-kitty-salon': {
    image: 'project-images/hello-kitty-salon.jpg',
    title: 'SANRIO HELLO KITTY BEAUTY SALON SET',
    subtitle: 'Product & Packaging Design'
  },
  'anna-hu-butterfly': {
    image: 'project-images/anna-hu-butterfly.jpg',
    title: 'ANNA HU HAUTE JOAILLERIE BUTTERFLY',
    subtitle: 'Social Media Ad Design'
  },
  'anna-hu-morocco-1': {
    image: 'project-images/anna-hu-morocco-1.jpg',
    title: 'ANNA HU HAUTE JOAILLERIE MOROCCO',
    subtitle: 'Social Media Ad Design'
  },
  'anna-hu-morocco-2': {
    image: 'project-images/anna-hu-morocco-2.jpg',
    title: 'ANNA HU HAUTE JOAILLERIE MOROCCO',
    subtitle: 'Social Media Ad Design'
  },
  'portcullis': {
    image: 'project-images/portcullis.jpg',
    title: 'PORTCULLIS',
    subtitle: 'Brand Design'
  },
  'smile-connection': {
    image: 'project-images/smile-connection.jpg',
    title: 'SMILE CONNECTION',
    subtitle: 'Brand Design'
  },
  'embrace-myself': {
    image: 'project-images/embrace-myself.jpg',
    title: 'EMBRACE MYSELF',
    subtitle: 'Brand Design'
  },
  'wedding-favors': {
    image: 'project-images/wedding-favors.jpg',
    title: 'WEDDING FAVORS',
    subtitle: 'Print Design'
  },
  'wedding-invitation': {
    image: 'project-images/wedding-invitation.jpg',
    title: 'WEDDING INVITATION',
    subtitle: 'Print Design'
  },
  'baby-shower': {
    image: 'project-images/baby-shower.jpg',
    title: 'BABY SHOWER INVITATION',
    subtitle: 'Print Design'
  }
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
var detailTitle = document.getElementById('detail-title');
var detailSubtitle = document.getElementById('detail-subtitle');
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
    var project = projects[projectId];
    if (project) {
      // Hide old image immediately to prevent flash of stale content
      detailImage.style.opacity = '0';
      detailImage.src = project.image;
      detailImage.alt = projectId.replace(/-/g, ' ');
      detailTitle.textContent = project.title;
      detailSubtitle.textContent = project.subtitle;
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
