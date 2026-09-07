/* Fundsy wireframes — the small amount of behaviour the layouts need.
   Phase 3: these become React state in <SiteHeader/> and <ContactForms/>. */

// Mobile nav drawer
document.querySelectorAll('[data-burger]').forEach(function (btn) {
  var drawer = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', function () {
    var open = drawer.getAttribute('data-open') === 'true';
    drawer.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
  });
});

// Contact page: which form is showing
document.querySelectorAll('[data-seg]').forEach(function (group) {
  var buttons = Array.prototype.slice.call(group.querySelectorAll('button[data-panel]'));

  function select(btn, moveFocus) {
    buttons.forEach(function (b) {
      b.setAttribute('aria-selected', String(b === btn));
      document.getElementById(b.dataset.panel).hidden = b !== btn;
    });
    if (moveFocus) document.getElementById(btn.dataset.panel).querySelector('h2').focus();
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { select(btn, true); });
  });

  // Deep links: contact.html#resume opens the resume panel
  function fromHash() {
    var match = buttons.filter(function (b) { return '#' + b.id === window.location.hash; })[0];
    if (match) select(match, false);
  }
  fromHash();
  window.addEventListener('hashchange', fromHash);
});

// File upload: show the chosen file name
document.querySelectorAll('input[type=file]').forEach(function (input) {
  var out = document.getElementById(input.dataset.filename);
  if (!out) return;
  input.addEventListener('change', function () {
    out.textContent = input.files.length
      ? input.files[0].name + ' — ready to send'
      : 'PDF or Word, up to 10 MB';
  });
});
