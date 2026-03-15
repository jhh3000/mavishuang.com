// Project metadata — maps project ID to images, title, and subtitle
var projects = {
  'bar-rescue': {
    images: ['project-images/bar-rescue-1.jpg', 'project-images/bar-rescue-2.jpg', 'project-images/bar-rescue-3.jpg', 'project-images/bar-rescue-4.jpg', 'project-images/bar-rescue-5.jpg'],
    title: 'PARAMOUNT NETWORK BAR RESCUE',
    subtitle: 'Digital Ad Design'
  },
  'variety-magazine': {
    images: ['project-images/variety-magazine-1.jpg', 'project-images/variety-magazine-2.jpg'],
    title: 'VARIETY MAGAZINE COVER',
    subtitle: 'Print Design'
  },
  'bellator-mma': {
    images: ['project-images/bellator-mma.jpg'],
    title: 'PARAMOUNT NETWORK BELLATOR MMA BANNER',
    subtitle: 'Digital Ad Design'
  },
  'waco-cable': {
    images: ['project-images/waco-cable.jpg'],
    title: 'PARAMOUNT NETWORK WACO CABLE GUIDE BANNERS',
    subtitle: 'Digital Ad Design'
  },
  'album-cover': {
    images: ['project-images/album-cover.jpg'],
    title: 'ALBUM COVER',
    subtitle: 'Print Design'
  },
  'paramount': {
    images: ['project-images/paramount-1.jpg', 'project-images/paramount-2.jpg'],
    title: 'PARAMOUNT NETWORK PRESENTATION',
    subtitle: 'PowerPoint Design'
  },
  'the-greatest': {
    images: ['project-images/the-greatest-1.jpg', 'project-images/the-greatest-2.jpg'],
    title: 'THE GREATEST',
    subtitle: 'Logo Design'
  },
  'disney-fairies': {
    images: ['project-images/disney-fairies.jpg'],
    title: 'DISNEY FAIRIES SWIVEL HAIRBRUSH',
    subtitle: 'Product & Packaging Design'
  },
  'disney-sofia': {
    images: ['project-images/disney-sofia-1.jpg', 'project-images/disney-sofia-2.jpg'],
    title: 'DISNEY SOFIA THE FIRST COSMETIC SET',
    subtitle: 'Product & Packaging Design'
  },
  'disney-princess': {
    images: ['project-images/disney-princess-1.jpg', 'project-images/disney-princess-2.jpg'],
    title: 'DISNEY PRINCESS BEAUTY PRODUCTS',
    subtitle: 'Product & Packaging Design'
  },
  'hello-kitty-cosmetic': {
    images: ['project-images/hello-kitty-cosmetic.jpg'],
    title: 'SANRIO HELLO KITTY COSMETIC GIFT SET',
    subtitle: 'Product & Packaging Design'
  },
  'hello-kitty-salon': {
    images: ['project-images/hello-kitty-salon.jpg'],
    title: 'SANRIO HELLO KITTY BEAUTY SALON SET',
    subtitle: 'Product & Packaging Design'
  },
  'anna-hu-butterfly': {
    images: ['project-images/anna-hu-butterfly-1.jpg', 'project-images/anna-hu-butterfly-2.jpg', 'project-images/anna-hu-butterfly-3.jpg'],
    title: 'ANNA HU HAUTE JOAILLERIE BUTTERFLY',
    subtitle: 'Social Media Ad Design'
  },
  'anna-hu-morocco-1': {
    images: ['project-images/anna-hu-morocco-1.jpg'],
    title: 'ANNA HU HAUTE JOAILLERIE MOROCCO',
    subtitle: 'Social Media Ad Design'
  },
  'anna-hu-morocco-2': {
    images: ['project-images/anna-hu-morocco-2.jpg'],
    title: 'ANNA HU HAUTE JOAILLERIE MOROCCO',
    subtitle: 'Social Media Ad Design'
  },
  'portcullis': {
    images: ['project-images/portcullis.jpg'],
    title: 'PORTCULLIS',
    subtitle: 'Brand Design'
  },
  'smile-connection': {
    images: ['project-images/smile-connection-1.jpg', 'project-images/smile-connection-2.jpg', 'project-images/smile-connection-3.jpg'],
    title: 'SMILE CONNECTION',
    subtitle: 'Brand Design'
  },
  'embrace-myself': {
    images: ['project-images/embrace-myself-1.jpg', 'project-images/embrace-myself-2.jpg', 'project-images/embrace-myself-3.jpg', 'project-images/embrace-myself-4.jpg', 'project-images/embrace-myself-5.jpg', 'project-images/embrace-myself-6.jpg', 'project-images/embrace-myself-7.jpg'],
    title: 'EMBRACE MYSELF',
    subtitle: 'Brand Design'
  },
  'wedding-favors': {
    images: ['project-images/wedding-favors-1.jpg', 'project-images/wedding-favors-2.jpg', 'project-images/wedding-favors-3.jpg', 'project-images/wedding-favors-4.jpg'],
    title: 'WEDDING FAVORS',
    subtitle: 'Print Design'
  },
  'wedding-invitation': {
    images: ['project-images/wedding-invitation.jpg'],
    title: 'WEDDING INVITATION',
    subtitle: 'Print Design'
  },
  'baby-shower': {
    images: ['project-images/baby-shower.jpg'],
    title: 'BABY SHOWER INVITATION',
    subtitle: 'Print Design'
  }
};

// Ordered list of project IDs (left-to-right, top-to-bottom)
var projectOrder = Object.keys(projects);

// DOM elements
var navWork = document.getElementById('nav-work');
var navResume = document.getElementById('nav-resume');
var navPrev = document.getElementById('nav-prev');
var navNext = document.getElementById('nav-next');
var pageWork = document.getElementById('page-work');
var pageResume = document.getElementById('page-resume');
var pageDetail = document.getElementById('page-detail');
var detailTitle = document.getElementById('detail-title');
var detailSubtitle = document.getElementById('detail-subtitle');
var detailContent = document.getElementById('detail-content');
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
      detailTitle.textContent = project.title;
      detailSubtitle.textContent = project.subtitle;

      // Clear previous images
      detailContent.innerHTML = '';

      // Add all project images
      project.images.forEach(function (src) {
        var img = document.createElement('img');
        img.src = src;
        img.alt = projectId.replace(/-/g, ' ');
        img.className = 'detail-image';
        img.style.opacity = '0';
        img.addEventListener('load', function () {
          img.style.opacity = '1';
        });
        detailContent.appendChild(img);
      });

      // Restart swipe hint animation
      var hint = document.getElementById('swipe-hint');
      hint.style.animation = 'none';
      hint.offsetHeight; // trigger reflow
      hint.style.animation = '';

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

// Navigation helpers
function navigatePrev() {
  var hash = window.location.hash;
  if (!hash.startsWith('#project/')) return;
  var idx = projectOrder.indexOf(hash.replace('#project/', ''));
  if (idx === -1) return;
  window.location.hash = idx === 0 ? '#work' : '#project/' + projectOrder[idx - 1];
}

function navigateNext() {
  var hash = window.location.hash;
  if (!hash || hash === '#work' || hash === '') {
    window.location.hash = '#project/' + projectOrder[0];
    return;
  }
  if (!hash.startsWith('#project/')) return;
  var idx = projectOrder.indexOf(hash.replace('#project/', ''));
  if (idx === -1) return;
  window.location.hash = idx === projectOrder.length - 1 ? '#work' : '#project/' + projectOrder[idx + 1];
}

// Sidebar arrow buttons
navPrev.addEventListener('click', navigatePrev);
navNext.addEventListener('click', navigateNext);

// Keyboard navigation
window.addEventListener('keydown', function (e) {
  var hash = window.location.hash;

  if (e.key === 'Escape' && hash && hash !== '#work' && hash !== '') {
    e.preventDefault();
    window.location.hash = '#work';
    return;
  }

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigatePrev();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigateNext();
  }
});

// Touch swipe navigation (mobile)
var touchStartX = 0;
var touchStartY = 0;
var swiping = false;

mainEl.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  swiping = true;
}, { passive: true });

mainEl.addEventListener('touchend', function (e) {
  if (!swiping) return;
  swiping = false;

  var hash = window.location.hash;
  if (!hash.startsWith('#project/')) return;

  var dx = e.changedTouches[0].clientX - touchStartX;
  var dy = e.changedTouches[0].clientY - touchStartY;

  // Only trigger if horizontal swipe is dominant and long enough
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx > 0) {
      navigatePrev();
    } else {
      navigateNext();
    }
  }
}, { passive: true });

// Listen for hash changes (back/forward buttons)
window.addEventListener('hashchange', function () {
  navigate(window.location.hash);
});

// Initial load — navigate to the current hash
navigate(window.location.hash || '#work');
