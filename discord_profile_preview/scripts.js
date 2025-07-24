function toggleEdit() {
  const form = document.getElementById('edit-form');
  if (form.style.display !== 'flex') {
    form.style.display = 'flex';
  }
}

function updateImage(event, type) {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    document.getElementById(type).style.backgroundImage = `url('${url}')`;
  }
}

function toggleBadges() {
  const showBadges = document.getElementById('badge-toggle').checked;
  document.querySelector('.badges').style.display = showBadges ? 'flex' : 'none';
}

function saveChanges() {
  const username = document.getElementById('username-input').value;
  const tagline = document.getElementById('tagline-input').value;
  const bio = document.getElementById('bio-input').value;
  const primary = document.getElementById('primary-color').value;
  const accent = document.getElementById('accent-color').value;

  if (username) document.getElementById('display-username').innerText = username;
  if (tagline) document.getElementById('display-tagline').innerText = tagline;
  if (bio) document.getElementById('display-bio').innerHTML = bio.replace(/\n/g, "<br>");

  document.documentElement.style.setProperty('--primary-color', primary);
  document.documentElement.style.setProperty('--accent-color', accent);
  document.getElementById('pfp').style.borderColor = primary;

  document.getElementById('edit-form').style.display = 'none';
}
