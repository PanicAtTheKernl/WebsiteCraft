function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    const navLinkBtn = document.getElementById(pageId + '-link');
    navLinkBtn.classList.add('active');
}