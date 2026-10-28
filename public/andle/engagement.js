/* ============================================================================
   engagement.js — Engagement layer for Ifedike Victor's portfolio
   Loaded after Andle's main.js. Pure vanilla JS, no jQuery dependency.
   Implements 9 touchpoints across 6 UI forms:
     1. First-time visitor → floating chat bubble (3s delay)
     2. Returning visitor → modifies #1's message
     3. Time-of-day → dynamic hero eyebrow text
     4. Scroll 50% → inline sticky banner
     5. Idle 45s → slide-in panel
     6. Exit intent → centered modal (one per session)
     7. Reached footer → confetti burst + toast
     8. Project card hover → native title tooltip
     9. Referrer-aware → modifies #1's opener
   ============================================================================ */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  // Persistence keys
  var VISIT_KEY = 'ifedike_visit_count';
  var SESSION_KEY = 'ifedike_session_seen';

  function getVisitCount() {
    try {
      var n = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) || 0;
      return n;
    } catch (e) {
      return 0;
    }
  }
  function bumpVisitCount() {
    try {
      var n = getVisitCount() + 1;
      localStorage.setItem(VISIT_KEY, String(n));
      return n;
    } catch (e) {
      return 1;
    }
  }
  function hasSeenSession(key) {
    try {
      if (sessionStorage.getItem(key)) return true;
      sessionStorage.setItem(key, '1');
      return false;
    } catch (e) {
      return false;
    }
  }

  // ----------------------------------------------------------------------- //
  // 3. Time-of-day greeting (dynamic hero eyebrow text)
  // ----------------------------------------------------------------------- //
  function applyTimeOfDay() {
    var h = new Date().getHours();
    var greeting;
    if (h < 12) greeting = 'Good morning.';
    else if (h < 18) greeting = 'Good afternoon.';
    else greeting = 'Good evening.';

    // Inject a small subtitle above the first hero slide's content
    var firstSub = document.querySelector('.single-slider .sub-title');
    if (firstSub && !firstSub.dataset.engagementPatched) {
      firstSub.dataset.engagementPatched = '1';
      // Don't override the project status eyebrow; we add a separate line via CSS
      var dot = document.createElement('span');
      dot.className = 'engagement-time-greeting';
      dot.textContent = greeting + ' Software, fixed.';
      dot.style.cssText =
        'display:block;font-family:Inter,sans-serif;font-size:0.85rem;' +
        'letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.55);' +
        'margin-bottom:0.6rem;font-weight:500;';
      firstSub.parentNode.insertBefore(dot, firstSub);
    }
  }

  // ----------------------------------------------------------------------- //
  // 1 + 2 + 9. Floating chat bubble (first-time / returning / referrer-aware)
  // ----------------------------------------------------------------------- //
  function showGreetingBubble() {
    if (hasSeenSession('greeting_shown')) return;

    var visits = getVisitCount();
    var referrer = '';
    try { referrer = document.referrer.toLowerCase(); } catch (e) {}

    var refGreeting = '';
    if (referrer.indexOf('linkedin') !== -1) {
      refGreeting = 'Saw you came from LinkedIn — what\'s the project?';
    } else if (referrer.indexOf('twitter') !== -1 || referrer.indexOf('x.com') !== -1) {
      refGreeting = 'Saw you came from Twitter — what\'s the project?';
    }

    var heading;
    if (visits > 1) {
      heading = 'Welcome back. Athletica went into preview since you last visited.';
    } else if (refGreeting) {
      heading = refGreeting;
    } else {
      heading = 'Hey — quick question: are you here for a marketing site, a web app, or fixing something that\'s broken?';
    }

    var bubble = document.createElement('div');
    bubble.id = 'engagement-bubble';
    bubble.setAttribute('role', 'dialog');
    bubble.setAttribute('aria-label', 'Quick routing question');
    bubble.innerHTML =
      '<div class="eng-bubble-head">' +
        '<span class="eng-bubble-name">Ifedike</span>' +
        '<button class="eng-bubble-close" aria-label="Dismiss">&times;</button>' +
      '</div>' +
      '<p class="eng-bubble-msg">' + escapeHtml(heading) + '</p>' +
      '<div class="eng-bubble-actions">' +
        '<a href="#work" data-route="work" class="eng-bubble-btn">See the work</a>' +
        '<a href="#about" data-route="about" class="eng-bubble-btn eng-bubble-btn--ghost">About me</a>' +
        '<a href="#contact" data-route="contact" class="eng-bubble-btn eng-bubble-btn--ghost">Talk</a>' +
      '</div>';

    document.body.appendChild(bubble);

    // Force reflow then add the visible class for the slide-in transition
    void bubble.offsetWidth;
    bubble.classList.add('eng-bubble--visible');

    // Auto-dismiss after 14 seconds
    var t = setTimeout(function () { dismissBubble(bubble); }, 14000);

    bubble.querySelector('.eng-bubble-close').addEventListener('click', function () {
      clearTimeout(t);
      dismissBubble(bubble);
    });

    bubble.querySelectorAll('.eng-bubble-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        clearTimeout(t);
        dismissBubble(bubble);
        // Anchor link will scroll naturally
      });
    });
  }

  function dismissBubble(bubble) {
    if (!bubble || !bubble.parentNode) return;
    bubble.classList.remove('eng-bubble--visible');
    setTimeout(function () {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, 350);
  }

  // ----------------------------------------------------------------------- //
  // 4. Scroll 50% → inline sticky banner
  // ----------------------------------------------------------------------- //
  function setupScrollBanner() {
    if (hasSeenSession('scroll50_shown')) return;
    var shown = false;
    var banner = null;

    function check() {
      if (shown) return;
      var scrolled = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight;
      var total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        shown = true;
        banner = createInlineBanner(
          'Halfway through. Want me to just show you the work?',
          'Jump to projects',
          '#work'
        );
      }
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    setTimeout(check, 1500);
  }

  function createInlineBanner(message, ctaLabel, ctaHref) {
    var banner = document.createElement('div');
    banner.id = 'engagement-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML =
      '<div class="eng-banner-inner">' +
        '<p>' + escapeHtml(message) + '</p>' +
        '<a href="' + ctaHref + '" class="eng-banner-cta">' + escapeHtml(ctaLabel) + ' &rarr;</a>' +
        '<button class="eng-banner-close" aria-label="Dismiss">&times;</button>' +
      '</div>';
    document.body.appendChild(banner);
    void banner.offsetWidth;
    banner.classList.add('eng-banner--visible');

    banner.querySelector('.eng-banner-close').addEventListener('click', function () {
      banner.classList.remove('eng-banner--visible');
      setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 350);
    });

    return banner;
  }

  // ----------------------------------------------------------------------- //
  // 5. Idle 45s → slide-in panel
  // ----------------------------------------------------------------------- //
  function setupIdlePanel() {
    if (hasSeenSession('idle_shown')) return;
    var idleTimer = null;
    var shown = false;

    function reset() {
      if (shown) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        shown = true;
        showIdlePanel();
      }, 45000);
    }

    ['scroll', 'mousemove', 'click', 'keydown', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, reset, { passive: true });
    });
    reset();
  }

  function showIdlePanel() {
    var panel = document.createElement('div');
    panel.id = 'engagement-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Still here?');
    panel.innerHTML =
      '<div class="eng-panel-head">' +
        '<button class="eng-panel-close" aria-label="Dismiss">&times;</button>' +
      '</div>' +
      '<div class="eng-panel-body">' +
        '<h3>Still here?</h3>' +
        '<p>Want me to walk you through the work in 30 seconds?</p>' +
        '<div class="eng-panel-actions">' +
          '<a href="#work" class="eng-panel-btn">Yes, show me</a>' +
          '<button class="eng-panel-btn eng-panel-btn--ghost">No thanks</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(panel);
    void panel.offsetWidth;
    panel.classList.add('eng-panel--visible');

    function close() {
      panel.classList.remove('eng-panel--visible');
      setTimeout(function () { if (panel.parentNode) panel.parentNode.removeChild(panel); }, 350);
    }
    panel.querySelector('.eng-panel-close').addEventListener('click', close);
    panel.querySelector('.eng-panel-btn--ghost').addEventListener('click', close);
    panel.querySelector('a[href="#work"]').addEventListener('click', close);
  }

  // ----------------------------------------------------------------------- //
  // 6. Exit intent → centered modal (one per session)
  // ----------------------------------------------------------------------- //
  function setupExitIntent() {
    if (hasSeenSession('exit_intent_shown')) return;
    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget && !e.toElement && e.clientY <= 0) {
        showExitModal();
      }
    });
  }

  function showExitModal() {
    if (document.getElementById('engagement-exit-modal')) return;
    hasSeenSession('exit_intent_shown'); // mark session

    var overlay = document.createElement('div');
    overlay.id = 'engagement-exit-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Before you go');
    overlay.innerHTML =
      '<div class="eng-exit-card">' +
        '<button class="eng-exit-close" aria-label="Dismiss">&times;</button>' +
        '<h3>Leaving already?</h3>' +
        '<p>If you\'ve got a half-built thing, drop a link — I\'ll take a look.</p>' +
        '<a href="mailto:mifedike@gmail.com" class="eng-exit-cta">mifedike@gmail.com</a>' +
        '<p class="eng-exit-foot">One person, start to finish.</p>' +
      '</div>';
    document.body.appendChild(overlay);
    void overlay.offsetWidth;
    overlay.classList.add('eng-exit--visible');

    function close() {
      overlay.classList.remove('eng-exit--visible');
      setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 250);
    }
    overlay.querySelector('.eng-exit-close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // ----------------------------------------------------------------------- //
  // 7. Reached footer → confetti burst + toast
  // ----------------------------------------------------------------------- //
  function setupFooterConfetti() {
    var footer = document.querySelector('.footer-info-box') ||
                 document.querySelector('#contact');
    if (!footer) return;

    var shown = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !shown) {
          shown = true;
          confettiBurst();
          showToast('You saw everything. The contact strip is just above ↑', 8000);
        }
      });
    }, { threshold: 0.6 });

    obs.observe(footer);
  }

  function confettiBurst() {
    var colors = ['#89715b', '#f58344', '#feae01', '#da2929', '#ffffff'];
    var container = document.createElement('div');
    container.id = 'engagement-confetti';
    document.body.appendChild(container);

    for (var i = 0; i < 60; i++) {
      var p = document.createElement('span');
      p.className = 'eng-confetti-piece';
      p.style.background = colors[i % colors.length];
      p.style.left = (Math.random() * 100) + '%';
      var dx = (Math.random() - 0.5) * 600;
      var dy = -Math.random() * 600 - 200;
      var rot = (Math.random() - 0.5) * 720;
      p.style.setProperty('--dx', dx + 'px');
      p.style.setProperty('--dy', dy + 'px');
      p.style.setProperty('--rot', rot + 'deg');
      container.appendChild(p);
    }

    setTimeout(function () {
      if (container.parentNode) container.parentNode.removeChild(container);
    }, 2000);
  }

  function showToast(message, durationMs) {
    durationMs = durationMs || 6000;
    if (document.getElementById('engagement-toast')) return;
    var toast = document.createElement('div');
    toast.id = 'engagement-toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('eng-toast--visible');

    setTimeout(function () {
      toast.classList.remove('eng-toast--visible');
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 350);
    }, durationMs);
  }

  // ----------------------------------------------------------------------- //
  // 8. Project card hover → native title tooltip with tagline
  // ----------------------------------------------------------------------- //
  function setupCardTooltips() {
    var taglines = {
      'Interior-deco': 'Marketing site for an interior decoration studio',
      'Truespec': 'Inventory + public site, two surfaces, one codebase',
      'Athletica': 'Affiliate platform in preview for a client',
      'CP3-legacy': 'Athlete-focused software in development'
    };
    var cards = document.querySelectorAll('.single-project-slide .content .title a, .single-project-slide .content .title');
    cards.forEach(function (el) {
      var text = (el.textContent || '').trim();
      Object.keys(taglines).forEach(function (key) {
        if (text.indexOf(key) !== -1) {
          el.setAttribute('title', taglines[key]);
        }
      });
    });
  }

  // ----------------------------------------------------------------------- //
  // Helpers
  // ----------------------------------------------------------------------- //
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function injectStyles() {
    var css = '' +
      // ----- Bubble (touchpoint 1) ----- //
      '#engagement-bubble{position:fixed;right:24px;bottom:24px;width:340px;max-width:calc(100vw - 48px);' +
        'background:#1a1613;color:#fff;border-radius:14px;padding:18px 20px;' +
        'box-shadow:0 18px 50px rgba(0,0,0,0.45);z-index:9999;' +
        'font-family:Inter,sans-serif;' +
        'opacity:0;transform:translateY(20px) scale(0.98);transition:all .35s cubic-bezier(.2,.8,.2,1);' +
        'border:1px solid rgba(245,131,68,0.18)}' +
      '#engagement-bubble.eng-bubble--visible{opacity:1;transform:translateY(0) scale(1)}' +
      '.eng-bubble-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}' +
      '.eng-bubble-name{font-weight:600;color:#f58344;font-size:0.85rem;letter-spacing:.04em}' +
      '.eng-bubble-close{background:transparent;border:0;color:rgba(255,255,255,.6);font-size:1.5rem;line-height:1;cursor:pointer;padding:0 4px}' +
      '.eng-bubble-close:hover{color:#fff}' +
      '.eng-bubble-msg{margin:0 0 14px 0;font-size:0.95rem;line-height:1.5;color:rgba(255,255,255,.92)}' +
      '.eng-bubble-actions{display:flex;flex-wrap:wrap;gap:8px}' +
      '.eng-bubble-btn{display:inline-block;padding:8px 14px;border-radius:8px;font-size:0.82rem;font-weight:500;text-decoration:none;cursor:pointer;' +
        'background:#f58344;color:#fff;border:1px solid #f58344;transition:all .2s}' +
      '.eng-bubble-btn:hover{background:#e07435;border-color:#e07435}' +
      '.eng-bubble-btn--ghost{background:transparent;color:rgba(255,255,255,.85);border-color:rgba(255,255,255,.25)}' +
      '.eng-bubble-btn--ghost:hover{background:rgba(255,255,255,.08);color:#fff}' +
      '@media(max-width:540px){#engagement-bubble{right:12px;left:12px;width:auto}}' +

      // ----- Banner (touchpoint 4) ----- //
      '#engagement-banner{position:fixed;left:0;right:0;bottom:0;z-index:9998;' +
        'background:#1a1613;color:#fff;' +
        'border-top:1px solid rgba(245,131,68,0.25);' +
        'transform:translateY(100%);transition:transform .35s cubic-bezier(.2,.8,.2,1);' +
        'font-family:Inter,sans-serif}' +
      '#engagement-banner.eng-banner--visible{transform:translateY(0)}' +
      '.eng-banner-inner{max-width:1200px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}' +
      '.eng-banner-inner p{margin:0;flex:1;min-width:200px;font-size:0.95rem;color:rgba(255,255,255,.9)}' +
      '.eng-banner-cta{display:inline-block;background:#f58344;color:#fff;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:0.85rem;font-weight:500}' +
      '.eng-banner-cta:hover{background:#e07435}' +
      '.eng-banner-close{background:transparent;border:0;color:rgba(255,255,255,.5);font-size:1.4rem;cursor:pointer;padding:0 6px}' +
      '.eng-banner-close:hover{color:#fff}' +

      // ----- Idle panel (touchpoint 5) ----- //
      '#engagement-panel{position:fixed;right:-360px;top:50%;transform:translateY(-50%);width:340px;max-width:calc(100vw - 24px);' +
        'background:#1a1613;color:#fff;border-radius:14px;z-index:9999;' +
        'box-shadow:0 18px 50px rgba(0,0,0,0.5);transition:right .4s cubic-bezier(.2,.8,.2,1);' +
        'font-family:Inter,sans-serif;border:1px solid rgba(245,131,68,0.18)}' +
      '#engagement-panel.eng-panel--visible{right:24px}' +
      '.eng-panel-head{display:flex;justify-content:flex-end;padding:10px 14px 0}' +
      '.eng-panel-close{background:transparent;border:0;color:rgba(255,255,255,.6);font-size:1.5rem;cursor:pointer}' +
      '.eng-panel-close:hover{color:#fff}' +
      '.eng-panel-body{padding:0 24px 24px}' +
      '.eng-panel-body h3{font-family:Zilla Slab,serif;font-size:1.4rem;margin:0 0 8px;color:#fff}' +
      '.eng-panel-body p{margin:0 0 18px;color:rgba(255,255,255,.85);font-size:0.95rem;line-height:1.5}' +
      '.eng-panel-actions{display:flex;gap:8px;flex-wrap:wrap}' +
      '.eng-panel-btn{display:inline-block;padding:8px 16px;border-radius:8px;font-size:0.85rem;font-weight:500;text-decoration:none;cursor:pointer;' +
        'background:#f58344;color:#fff;border:1px solid #f58344}' +
      '.eng-panel-btn:hover{background:#e07435}' +
      '.eng-panel-btn--ghost{background:transparent;color:rgba(255,255,255,.85);border-color:rgba(255,255,255,.25)}' +

      // ----- Exit modal (touchpoint 6) ----- //
      '#engagement-exit-modal{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;' +
        'opacity:0;transition:opacity .25s ease;font-family:Inter,sans-serif;padding:24px}' +
      '#engagement-exit-modal.eng-exit--visible{opacity:1}' +
      '.eng-exit-card{background:#1a1613;color:#fff;border-radius:14px;padding:36px 32px;max-width:440px;width:100%;' +
        'text-align:center;position:relative;border:1px solid rgba(245,131,68,0.2);box-shadow:0 30px 80px rgba(0,0,0,0.5)}' +
      '.eng-exit-close{position:absolute;top:14px;right:14px;background:transparent;border:0;color:rgba(255,255,255,.6);font-size:1.6rem;cursor:pointer}' +
      '.eng-exit-card h3{font-family:Zilla Slab,serif;font-size:1.8rem;margin:0 0 14px;color:#fff}' +
      '.eng-exit-card p{margin:0 0 18px;color:rgba(255,255,255,.85);line-height:1.55}' +
      '.eng-exit-cta{display:inline-block;background:#f58344;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:1rem;font-weight:500;margin-bottom:14px}' +
      '.eng-exit-cta:hover{background:#e07435}' +
      '.eng-exit-foot{font-size:0.85rem;color:rgba(255,255,255,.5);margin:0}' +

      // ----- Confetti (touchpoint 7) ----- //
      '#engagement-confetti{position:fixed;inset:0;pointer-events:none;z-index:9997;overflow:hidden}' +
      '.eng-confetti-piece{position:absolute;top:50%;width:10px;height:14px;border-radius:2px;' +
        'animation:eng-confetti-fall 1.6s ease-out forwards}' +
      '@keyframes eng-confetti-fall{' +
        '0%{transform:translate(0,0) rotate(0);opacity:1}' +
        '100%{transform:translate(var(--dx),var(--dy)) rotate(var(--rot));opacity:0}' +
      '}' +

      // ----- Toast (touchpoint 7) ----- //
      '#engagement-toast{position:fixed;left:50%;bottom:32px;transform:translate(-50%,80px);' +
        'background:#1a1613;color:#fff;padding:12px 22px;border-radius:10px;font-family:Inter,sans-serif;font-size:0.9rem;' +
        'box-shadow:0 12px 32px rgba(0,0,0,0.35);z-index:9999;opacity:0;transition:all .35s cubic-bezier(.2,.8,.2,1);' +
        'border:1px solid rgba(245,131,68,0.25);max-width:calc(100vw - 48px);text-align:center}' +
      '#engagement-toast.eng-toast--visible{opacity:1;transform:translate(-50%,0)}' +

      // ----- Touchpoint 3: dynamic hero greeting (no separate element styling needed) ----- //
      '.engagement-time-greeting{opacity:0;animation:eng-fade-in .8s ease-out .3s forwards}' +
      '@keyframes eng-fade-in{to{opacity:1}}' +
      '';

    var style = document.createElement('style');
    style.setAttribute('data-engagement', '1');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ----------------------------------------------------------------------- //
  // Init
  // ----------------------------------------------------------------------- //
  function init() {
    injectStyles();
    applyTimeOfDay();

    bumpVisitCount(); // first call: sets to 1 if was 0
    // Show greeting 3s after load
    setTimeout(showGreetingBubble, 3000);

    setupScrollBanner();
    setupIdlePanel();
    setupExitIntent();
    setupFooterConfetti();
    setupCardTooltips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();