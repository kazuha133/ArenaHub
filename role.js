function login() {
  const role = document.getElementById("roleSelect").value;
  localStorage.setItem("role", role);
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

function checkAdmin() {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    window.location.href = "index.html";
  }
}

function requireLoginForSchedule() {
  const role = localStorage.getItem("role");
  if (!role) {
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const adminLink = document.getElementById("adminAccounts");
  const loginLink = document.getElementById("navLogin");
  const logoutLink = document.getElementById("navLogout");
  const mobileAdmin = document.getElementById("mobileAdminAccounts");
  const mobileLogin = document.getElementById("mobileNavLogin");
  const mobileLogout = document.getElementById("mobileNavLogout");
  const adminContent = document.querySelectorAll("#adminTeam, #adminSchedule, #adminResults");
  const coachContent = document.querySelectorAll("#coachTeam, #coachSchedule");
  const coachResultsControls = document.querySelectorAll(".coach-result-control");

  if (adminLink) adminLink.classList.add("hidden");
  if (logoutLink) logoutLink.classList.add("hidden");
  if (loginLink) loginLink.classList.remove("hidden");
  if (mobileAdmin) mobileAdmin.classList.add("hidden");
  if (mobileLogout) mobileLogout.classList.add("hidden");
  if (mobileLogin) mobileLogin.classList.remove("hidden");

  if (role) {
    if (loginLink) loginLink.classList.add("hidden");
    if (logoutLink) logoutLink.classList.remove("hidden");
    if (mobileLogin) mobileLogin.classList.add("hidden");
    if (mobileLogout) mobileLogout.classList.remove("hidden");

    if (role === "admin") {
      if (adminLink) adminLink.classList.remove("hidden");
      if (mobileAdmin) mobileAdmin.classList.remove("hidden");
      adminContent.forEach(el => el && el.classList.remove("hidden"));
      coachResultsControls.forEach(el => el && el.classList.remove("hidden"));
    }

    if (role === "coach") {
      coachContent.forEach(el => el && el.classList.remove("hidden"));
      coachResultsControls.forEach(el => el && el.classList.remove("hidden"));
    }
  } else {
    adminContent.forEach(el => el && el.classList.add("hidden"));
    coachContent.forEach(el => el && el.classList.add("hidden"));
    coachResultsControls.forEach(el => el && el.classList.add("hidden"));
  }

  if (adminLink && mobileAdmin) {
    if (!adminLink.classList.contains("hidden")) mobileAdmin.classList.remove("hidden");
    else mobileAdmin.classList.add("hidden");
  }

  const hb = document.querySelector('.hamburger');
  const mobile = document.getElementById('mobileNav');
  if (hb && mobile) {
    hb.addEventListener('click', () => {
      const expanded = hb.getAttribute('aria-expanded') === 'true';
      hb.setAttribute('aria-expanded', String(!expanded));
      mobile.classList.toggle('hidden');
    });
  }

  if (window.location.pathname.endsWith("schedule.html") || window.location.href.includes("/schedule.html")) {
    requireLoginForSchedule();
  }
});
