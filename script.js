// Project metadata
const projects = {
  'bar-rescue': {
    title: 'PARAMOUNT NETWORK\nBAR RESCUE',
    subtitle: 'Graphic Art Design',
    detail: 'screenshots/01-bar-rescue.png'
  },
  'variety-magazine': {
    title: 'VARIETY MAGAZINE COVER',
    subtitle: 'Graphic Art Design',
    detail: 'screenshots/02-variety-magazine.png'
  },
  'bellator-mma': {
    title: 'BELLATOR MMA BANNER',
    subtitle: 'Graphic Design',
    detail: 'screenshots/03-bellator-mma.png'
  },
  'waco-cable': {
    title: 'WACO CABLE\nGUIDE BANNERS',
    subtitle: 'Graphic Design',
    detail: 'screenshots/04-waco-cable.png'
  },
  'album-cover': {
    title: 'ALBUM COVER',
    subtitle: 'Illustration & Design',
    detail: 'screenshots/05-album-cover.png'
  },
  'paramount': {
    title: 'PARAMOUNT\nPRESENTATION',
    subtitle: 'Graphic Design',
    detail: 'screenshots/06-paramount.png'
  },
  'the-greatest': {
    title: 'THE GREATEST',
    subtitle: 'Logo Design',
    detail: 'screenshots/07-greatest-logo.png'
  },
  'disney-fairies': {
    title: 'DISNEY FAIRIES\nSWIVEL HAIRBRUSH',
    subtitle: 'Product & Packaging Design',
    detail: 'screenshots/08-disney-fairies.png'
  },
  'disney-sofia': {
    title: 'DISNEY SOFIA THE FIRST\nCOSMETIC SET',
    subtitle: 'Product & Packaging Design',
    detail: 'screenshots/09-disney-sofia.png'
  },
  'disney-princess': {
    title: 'DISNEY PRINCESS\nBEAUTY PRODUCTS',
    subtitle: 'Product & Packaging Design',
    detail: 'screenshots/10-disney-princess.png'
  },
  'hello-kitty-cosmetic': {
    title: 'SANRIO HELLO KITTY\nCOSMETIC GIFT SET',
    subtitle: 'Product & Packaging Design',
    detail: 'screenshots/11-hello-kitty-cosmetic.png'
  },
  'hello-kitty-salon': {
    title: 'SANRIO HELLO KITTY\nBEAUTY SALON SET',
    subtitle: 'Product & Packaging Design',
    detail: 'screenshots/12-hello-kitty-salon.png'
  },
  'anna-hu-butterfly': {
    title: 'ANNA HU HAUTE JOAILLERIE\nBUTTERFLY',
    subtitle: 'Social Media Art Design',
    detail: 'screenshots/13-anna-hu-butterfly.png'
  },
  'anna-hu-morocco-1': {
    title: 'ANNA HU\nMOROCCO',
    subtitle: 'Art Direction & Design',
    detail: 'screenshots/14-anna-hu-morocco1.png'
  },
  'anna-hu-morocco-2': {
    title: 'ANNA HU\nMOROCCO',
    subtitle: 'Art Direction & Design',
    detail: 'screenshots/15-anna-hu-morocco2.png'
  },
  'portcullis': {
    title: 'PORTCULLIS',
    subtitle: 'Logo Design',
    detail: 'screenshots/16-portcullis-logo.png'
  },
  'smile-connection': {
    title: 'SMILE CONNECTION',
    subtitle: 'Logo Design',
    detail: 'screenshots/17-smile-connection.png'
  },
  'embrace-myself': {
    title: 'EMBRACE MYSELF',
    subtitle: 'Brand Design',
    detail: 'screenshots/18-embrace-myself.png'
  },
  'wedding-favors': {
    title: 'WEDDING FAVORS',
    subtitle: 'Print Design',
    detail: 'screenshots/19-wedding-favors.png'
  },
  'wedding-invitation': {
    title: 'WEDDING INVITATION',
    subtitle: 'Print Design',
    detail: 'screenshots/20-wedding-invitation.png'
  },
  'baby-shower': {
    title: 'BABY SHOWER\nINVITATION',
    subtitle: 'Print Design',
    detail: 'screenshots/21-baby-shower.png'
  }
};

// DOM elements
const navWork = document.getElementById('nav-work');
const navResume = document.getElementById('nav-resume');
const pageWork = document.getElementById('page-work');
const pageResume = document.getElementById('page-resume');
const pageDetail = document.getElementById('page-detail');
const detailImage = document.getElementById('detail-image');
const mainEl = document.getElementById('main');

// Create back button
const backBtn = document.createElement('button');
backBtn.className = 'back-btn';
backBtn.textContent = '← BACK';
document.body.appendChild(backBtn);

// Navigation state
let currentPage = 'work';

function showPage(page) {
  // Hide all pages
  pageWork.classList.remove('active');
  pageResume.classList.remove('active');
  pageDetail.classList.remove('active');

  // Update nav
  navWork.classList.remove('active');
  navResume.classList.remove('active');

  // Show requested page
  if (page === 'work') {
    pageWork.classList.add('active');
    navWork.classList.add('active');
    backBtn.classList.remove('visible');
    currentPage = 'work';
  } else if (page === 'resume') {
    pageResume.classList.add('active');
    navResume.classList.add('active');
    backBtn.classList.remove('visible');
    currentPage = 'resume';
  } else if (page === 'detail') {
    pageDetail.classList.add('active');
    navWork.classList.add('active');
    backBtn.classList.add('visible');
    currentPage = 'detail';
  }

  // Scroll to top
  mainEl.scrollTop = 0;
}

// Nav click handlers
navWork.addEventListener('click', (e) => {
  e.preventDefault();
  showPage('work');
});

navResume.addEventListener('click', (e) => {
  e.preventDefault();
  showPage('resume');
});

// Back button
backBtn.addEventListener('click', () => {
  showPage('work');
});

// Project grid click handlers
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    const projectId = item.dataset.project;
    const project = projects[projectId];

    if (project) {
      detailImage.src = project.detail;
      detailImage.alt = project.title.replace(/\n/g, ' ');
      showPage('detail');
    }
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentPage === 'detail') {
    showPage('work');
  }
});
