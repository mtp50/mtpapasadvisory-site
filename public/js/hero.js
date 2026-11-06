// No third-party code. The page works without JS (gradient background remains).
(function () {
  // Checklist form: placeholder until the real endpoint is wired.
  var form = document.getElementById('checklist-form');
  var status = document.getElementById('chk-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('chk-email');
      if (!email.checkValidity()) { status.textContent = 'Please enter a valid email address.'; email.focus(); return; }
      status.textContent = 'Form not connected yet (prototype).';
    });
  }

  // Hero video: load only on wider screens with no reduced-motion preference.
  var video = document.getElementById('hero-video');
  var toggle = document.getElementById('hero-toggle');
  if (!video || !toggle) return;

  var ok = window.matchMedia('(min-width: 768px)').matches &&
           !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ok) return;

  var s;
  if (video.dataset.mp4)  { s = document.createElement('source'); s.src = video.dataset.mp4;  s.type = 'video/mp4';  video.appendChild(s); }
  video.load();

  var userPaused = false;
  video.addEventListener('playing', function () { toggle.hidden = false; });
  video.addEventListener('error', function () { toggle.hidden = true; }, true);
  var p = video.play();
  if (p && p.catch) { p.catch(function () { toggle.hidden = true; }); }

  toggle.addEventListener('click', function () {
    userPaused = !userPaused;
    if (userPaused) { video.pause(); toggle.textContent = 'Play background video'; }
    else { video.play(); toggle.textContent = 'Pause background video'; }
    toggle.setAttribute('aria-pressed', String(userPaused));
  });
})();
