"""Build the adapted Andle portfolio with Ifedike Victor's content.

Reads /home/z/my-project/andle-original/index.html (the verbatim Andle page),
applies a series of targeted text/HTML replacements, and writes the result
to /home/z/my-project/public/andle-portfolio.html.

All images stay as Unsplash URLs (no local files). Icon classes from the
missing Andle icon-fonts (icofont-*, las la-*, ion-ios-*, ion-android-*) are
remapped to Font Awesome 6 free equivalents, which we load from CDN.
"""
import re
import sys
from pathlib import Path

SRC = Path("/home/z/my-project/andle-original/index.html")
OUT = Path("/home/z/my-project/public/andle-portfolio.html")
OUT.parent.mkdir(parents=True, exist_ok=True)

html = SRC.read_text(encoding="utf-8")


# --------------------------------------------------------------------------- #
# 1. Title + meta description
# --------------------------------------------------------------------------- #
html = html.replace(
    '<title>Andle - Personal Portfolio Bootstrap 5 Template</title>',
    '<title>Ifedike Victor — Software, fixed.</title>',
)
html = html.replace(
    '<meta name="description" content="">',
    '<meta name="description" content="I build and fix software for small businesses. Slow, half-built, or nobody-knows-how-it-works software — that\'s the work I take on. One person, start to finish.">',
)

# --------------------------------------------------------------------------- #
# 2. Make all asset paths absolute so they resolve from any URL
# --------------------------------------------------------------------------- #
html = html.replace('href="assets/', 'href="/andle/assets/')
html = html.replace('src="assets/', 'src="/andle/assets/')

# --------------------------------------------------------------------------- #
# 3. Add Font Awesome 6 CDN (the Andle icon font binaries are missing — we
#    remap to FA6 free) + the engagement layer script
# --------------------------------------------------------------------------- #
html = html.replace(
    "<!-- Icon Font CSS -->",
    '<!-- Font Awesome 6 (replaces missing Andle icon font binaries) -->\n'
    '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">\n'
    "    <!-- Icon Font CSS -->",
)
html = html.replace(
    '<!-- Main JS -->\n    <script src="/andle/assets/js/main.js"></script>',
    '<!-- Main JS -->\n    <script src="/andle/assets/js/main.js"></script>\n'
    '    <!-- Engagement Layer -->\n'
    '    <script src="/andle/engagement.js" defer></script>',
)

# --------------------------------------------------------------------------- #
# 4. Logo alt text
# --------------------------------------------------------------------------- #
html = html.replace(
    '<img src="/andle/assets/images/logo/logo-1.png" alt="" title="">',
    '<img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=35&h=38&q=80" alt="Ifedike Victor" title="Ifedike Victor">',
)

# --------------------------------------------------------------------------- #
# 5. Nav menu — strip to Home / Work / About / Contact (anchor links)
#    Original: Home / About (dropdown) / Services / Pages / Blog / Contact
# --------------------------------------------------------------------------- #
nav_pattern = re.compile(
    r'(<div class="primary-menu">\s*<ul>)(.*?)(</ul>)',
    re.DOTALL,
)
new_nav_items = (
    '<li><a href="#top">Home</a></li>\n'
    '                        <li><a href="#work">Work</a></li>\n'
    '                        <li><a href="#about">About</a></li>\n'
    '                        <li><a href="#contact">Contact</a></li>'
)
html = nav_pattern.sub(
    lambda m: m.group(1) + new_nav_items + m.group(3),
    html,
    count=1,
)

# Also strip the desktop nav (the main-menu list). The desktop nav is inside
# <div class="header-menu d-none d-lg-block"> ... </div>
desktop_nav_pattern = re.compile(
    r'(<div class="header-menu d-none d-lg-block">\s*<nav class="main-menu">\s*<ul>)(.*?)(</ul>\s*</nav>\s*</div>)',
    re.DOTALL,
)
html = desktop_nav_pattern.sub(
    lambda m: m.group(1) + new_nav_items + m.group(3),
    html,
    count=1,
)

# --------------------------------------------------------------------------- #
# 6. Hero slider — replace 3 identical Bowmore Wine slides with 3 projects:
#    Interior-deco, Truespec, Athletica
# --------------------------------------------------------------------------- #
# Match swiper-wrapper contents (the 3 slides) up to the closing </div>
# followed by the "Add Arrows" comment.
hero_block_pattern = re.compile(
    r'(<div class="slider-active swiper-container">\s*<div class="swiper-wrapper">)(.*?)(</div>\s*\n\s*\n\s*<!-- Add Arrows -->)',
    re.DOTALL,
)

new_slides = """
                    <div class="swiper-slide single-slider d-flex align-items-center animation-style-01" style="background-image: url(https://images.unsplash.com/photo-1502672260266-1c1ef2ea9131?auto=format&fit=crop&w=1920&h=1080&q=80);">

                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>

                        <div class="container">
                            <div class="slider-content">
                                <h4 class="sub-title">Marketing site — live</h4>
                                <h1 class="main-title">Interior-deco</h1>
                                <p>A marketing site for an interior decoration studio. <br>Brand-led layout, public pages, structured to turn visits into enquiries.</p>
                                <a class="slider-btn" href="https://interior-deco-kappa.vercel.app/" target="_blank" rel="noopener">See project</a>
                            </div>
                        </div>
                    </div>

                    <div class="swiper-slide single-slider d-flex align-items-center animation-style-01" style="background-image: url(https://images.unsplash.com/photo-1553429309-1e2f5c1e9f4b?auto=format&fit=crop&w=1920&h=1080&q=80);">

                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>

                        <div class="container">
                            <div class="slider-content">
                                <h4 class="sub-title">Inventory app + public site — live</h4>
                                <h1 class="main-title">Truespec</h1>
                                <p>Inventory management on the inside, public catalogue on the outside. <br>Two surfaces, one codebase, no admin friction.</p>
                                <a class="slider-btn" href="https://truespec-k4y6.vercel.app/" target="_blank" rel="noopener">See project</a>
                            </div>
                        </div>
                    </div>

                    <div class="swiper-slide single-slider d-flex align-items-center animation-style-01" style="background-image: url(https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1920&h=1080&q=80);">

                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>

                        <div class="container">
                            <div class="slider-content">
                                <h4 class="sub-title">Affiliate platform — in preview</h4>
                                <h1 class="main-title">Athletica</h1>
                                <p>Being built for a client. Visitors land on a product page, click through to Amazon. <br>Live preview while the affiliate loop is being finished.</p>
                                <a class="slider-btn" href="https://athletica-blond.vercel.app/" target="_blank" rel="noopener">See project</a>
                            </div>
                        </div>
                    </div>
"""
html = hero_block_pattern.sub(
    lambda m: m.group(1) + new_slides + "\n                " + m.group(3),
    html,
    count=1,
)

# Add anchor IDs to sections — slider gets id="top"
html = html.replace(
    '<div class="section slider-section">',
    '<div class="section slider-section" id="top">',
    1,
)

# --------------------------------------------------------------------------- #
# 7. About section — name + bio + portrait (keep Unsplash URL)
# --------------------------------------------------------------------------- #
# Replace the portrait background URL with a dark developer portrait
html = html.replace(
    '<div class="about-images" style="background-image: url(https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&h=1300&q=80);"></div>',
    '<div class="about-images" style="background-image: url(https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&h=1300&q=80);"></div>',
)
# Note: keeping the same dark portrait URL — README confirms it's a "dark portrait"

# Replace name
html = html.replace('<h3 class="title">Andle Brewster</h3>', '<h3 class="title">Ifedike Victor</h3>')

# Replace bio paragraphs
bio_pattern = re.compile(
    r'(<p class="about-text">Founded in Lebanon.*?)(<img class="signechar")',
    re.DOTALL,
)
new_bio = (
    '<p class="about-text">I build and fix software for small businesses.</p>\n'
    '                                <p>If something is slow, half-built, or nobody knows how it works anymore — that\'s the work I take on.</p>\n'
    '                                <p>One person, start to finish. No jargon to hide behind.</p>\n'
    '                                '
)
html = bio_pattern.sub(lambda m: new_bio + m.group(2), html, count=1)

# Remove the signature image + "Daniel Jr" name underneath
sig_pattern = re.compile(
    r'<img class="signechar"[^>]*>\s*<h6 class="name">Daniel Jr</h6>',
)
html = sig_pattern.sub('', html, count=1)

# Add anchor id="about" to the about section wrapper
html = html.replace(
    '<div class="about-section section-padding mt-n3 mb-n1">',
    '<div class="about-section section-padding mt-n3 mb-n1" id="about">',
    1,
)

# --------------------------------------------------------------------------- #
# 8. Why Choose Me — 4 cards: Marketing sites / Web apps / Process / On-time
# --------------------------------------------------------------------------- #
html = html.replace(
    '<h4 class="title"><a href="#">profressional and dedicate team</a></h4>',
    '<h4 class="title"><a href="#">marketing sites</a></h4>',
)
html = html.replace(
    '<p>Building architectures with modern technology.</p>',
    '<p>Public-facing pages that turn visits into enquiries.</p>',
)
html = html.replace(
    '<i class="icofont-labour"></i>',
    '<i class="fas fa-bullhorn"></i>',
)

html = html.replace(
    '<h4 class="title"><a href="#">unique design</a></h4>',
    '<h4 class="title"><a href="#">web apps</a></h4>',
)
# Replace the unique-design description (need to find it first)
# The original has "Building architectures with modern technology." only on card 1;
# cards 2-4 each have their own description (look them up in the source).
# Let me handle the active card (card 2) first:
html = html.replace(
    '<i class="icofont-ruler-pencil-alt-2"></i>',
    '<i class="fas fa-layer-group"></i>',
)

html = html.replace(
    '<h4 class="title"><a href="#">affordable and flexiable</a></h4>',
    '<h4 class="title"><a href="#">client-first process</a></h4>',
)
html = html.replace(
    '<i class="icofont-money-bag"></i>',
    '<i class="fas fa-handshake"></i>',
)

html = html.replace(
    '<h4 class="title"><a href="#">24/7 support</a></h4>',
    '<h4 class="title"><a href="#">on-time delivery</a></h4>',
)
html = html.replace(
    '<i class="icofont-support-tpost"></i>',
    '<i class="fas fa-clock"></i>',
)

# Generic why-choose descriptions (cards 2-4 use lorem ipsum "Building architectures..."
# variants — replace them with on-brand lines)
html = re.sub(
    r'<p>Building architectures[^<]*</p>',
    '<p>Inventory, dashboards, internal tools — the work that runs the business.</p>',
    html,
)

# --------------------------------------------------------------------------- #
# 9. Counter stats — replace with Ifedike's actual numbers
# --------------------------------------------------------------------------- #
html = html.replace('data-count-to="8000"', 'data-count-to="4"')
html = html.replace(
    '<p>Partner <br> worldwide</p>',
    '<p>projects <br> live</p>',
)

html = html.replace('data-count-to="1250"', 'data-count-to="2"')
html = html.replace(
    '<p>employees and <br> staffs</p>',
    '<p>complete &amp; <br> shipped</p>',
)

html = html.replace('data-count-to="904"', 'data-count-to="2"')
html = html.replace(
    '<p>project completed <br> on 60 countries</p>',
    '<p>in active <br> development</p>',
)

# --------------------------------------------------------------------------- #
# 10. Works — section title + filter tabs + project cards
# --------------------------------------------------------------------------- #
html = html.replace('<h2 class="title">Works</h2>', '<h2 class="title">Work</h2>')

# Filter tabs: All / architecture / interior / landscape → All / Marketing site / Web app / In-progress
html = html.replace(
    '<li><a class="active" data-bs-toggle="tab" href="#tab1">All</a></li>',
    '<li><a class="active" data-bs-toggle="tab" href="#tab1">All</a></li>',
)
html = html.replace(
    '<li><a data-bs-toggle="tab" href="#tab2">architecture</a></li>',
    '<li><a data-bs-toggle="tab" href="#tab2">marketing site</a></li>',
)
html = html.replace(
    '<li><a data-bs-toggle="tab" href="#tab3">interior</a></li>',
    '<li><a data-bs-toggle="tab" href="#tab3">web app</a></li>',
)
html = html.replace(
    '<li><a data-bs-toggle="tab" href="#tab4">landscape</a></li>',
    '<li><a data-bs-toggle="tab" href="#tab4">in-progress</a></li>',
)

# Add anchor id="work" to the work section
html = html.replace(
    '<div class="section section-padding-02 mt-n10">',
    '<div class="section section-padding-02 mt-n10" id="work">',
    1,
)

# Project cards — replace 4 unique cards across all 4 tabs
# Cubic Villa (Residential) → Interior-deco (Marketing site)
html = html.replace(
    '<h4 class="subtitle">Residential</h4>\n                                                <h3 class="title"><a href="project-details.html">Cubic Villa</a></h3>',
    '<h4 class="subtitle">Marketing site</h4>\n                                                <h3 class="title"><a href="https://interior-deco-kappa.vercel.app/" target="_blank" rel="noopener">Interior-deco</a></h3>',
)
html = html.replace(
    '<img class="fit-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=480&h=730&q=80" alt="Product" />',
    '<img class="fit-image" src="https://images.unsplash.com/photo-1502672260266-1c1ef2ea9131?auto=format&fit=crop&w=480&h=730&q=80" alt="Interior-deco" />',
)

# OBERO (Architecture) → Truespec (Web app)
html = html.replace(
    '<h4 class="subtitle">Architecture</h4>\n                                                <h3 class="title"><a href="project-details.html">OBERO</a></h3>',
    '<h4 class="subtitle">Web app</h4>\n                                                <h3 class="title"><a href="https://truespec-k4y6.vercel.app/" target="_blank" rel="noopener">Truespec</a></h3>',
)
html = html.replace(
    '<img class="fit-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=480&h=730&q=80" alt="Product" />',
    '<img class="fit-image" src="https://images.unsplash.com/photo-1553429309-1e2f5c1e9f4b?auto=format&fit=crop&w=480&h=730&q=80" alt="Truespec" />',
)

# ABC Financial Bank (Commercial) → Athletica (In-progress)
html = html.replace(
    '<h4 class="subtitle">Commercial</h4>\n                                                <h3 class="title"><a href="project-details.html">ABC Financial Bank</a></h3>',
    '<h4 class="subtitle">In progress</h4>\n                                                <h3 class="title"><a href="https://athletica-blond.vercel.app/" target="_blank" rel="noopener">Athletica</a></h3>',
)
html = html.replace(
    '<img class="fit-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=480&h=730&q=80" alt="Product" />',
    '<img class="fit-image" src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=480&h=730&q=80" alt="Athletica" />',
)

# B6-No.5 OLA Tower (Interior) → CP3-legacy (In-progress)
html = html.replace(
    '<h4 class="subtitle">Interior</h4>\n                                                <h3 class="title"><a href="project-details.html">B6-No.5 OLA Tower</a></h3>',
    '<h4 class="subtitle">In progress</h4>\n                                                <h3 class="title"><a href="https://cp3-legacy.vercel.app/" target="_blank" rel="noopener">CP3-legacy</a></h3>',
)
html = html.replace(
    '<img class="fit-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=480&h=730&q=80" alt="Product" />',
    '<img class="fit-image" src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=480&h=730&q=80" alt="CP3-legacy" />',
)

# --------------------------------------------------------------------------- #
# 11. Achieved → Milestones section (replace 2020/2019 entries with 2022/2025/2026)
# --------------------------------------------------------------------------- #
# Replace the whole achieved section body with the milestones
milestones_pattern = re.compile(
    r'(<!-- Achieved End -->\s*<div class="section section-padding mt-n1 mb-n2">)(.*?)(</div>\s*</div>\s*<!-- Achieved End -->)',
    re.DOTALL,
)
new_milestones = """
        <div class="section">
            <div class="container">

                <!-- Section Title -->
                <div class="section-title text-center mb-5">
                    <h2 class="title">Milestones</h2>
                </div>

                <!-- Milestone 2022 -->
                <div class="achieved-year wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1.5s">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="year-text">
                                <p>2022</p>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="achieved-item">
                                <span class="sub-title text-primary">Started</span>
                                <h2 class="title"><a href="#about">Started writing code. <span>No degree, no bootcamp.</span></a></h2>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Milestone 2025 -->
                <div class="achieved-year wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="1.5s">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="year-text">
                                <p>2025</p>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="achieved-item">
                                <span class="sub-title text-success">Production</span>
                                <h2 class="title"><a href="https://interior-deco-kappa.vercel.app/" target="_blank" rel="noopener">First site in production — <span>Lighthouse 99 performance, 100 SEO.</span></a></h2>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Milestone 2026 -->
                <div class="achieved-year wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="1.5s">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="year-text">
                                <p>2026</p>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="achieved-item">
                                <span class="sub-title text-warning">Build</span>
                                <h2 class="title"><a href="#work">Built a complete dealership system alone in five weeks: <span>26 database migrations, back office, auth, PDF enquiries.</span></a></h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
"""
html = milestones_pattern.sub(
    lambda m: m.group(1) + new_milestones + "\n        " + m.group(3),
    html,
    count=1,
)

# --------------------------------------------------------------------------- #
# 12. Testimonials — remove the entire section
# --------------------------------------------------------------------------- #
testimonial_pattern = re.compile(
    r'<!-- Testimonial Start -->.*?<!-- Testimonial End -->',
    re.DOTALL,
)
html = testimonial_pattern.sub('', html, count=1)

# --------------------------------------------------------------------------- #
# 13. Footer — name + email + social (LinkedIn, Twitter, WhatsApp, GitHub)
# --------------------------------------------------------------------------- #
html = html.replace(
    '<h2 class="mail wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="2s"><a href="mailto:hello@andle.com">hello@andle.com</a></h2>',
    '<h2 class="mail wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="2s"><a href="mailto:mifedike@gmail.com">mifedike@gmail.com</a></h2>',
)
# Add anchor id="contact" to footer
html = html.replace(
    '<div class="section bg-dark">\n            <div class="container">\n',
    '<div class="section bg-dark" id="contact">\n            <div class="container">\n',
    1,
)
# Replace footer social links — placeholder URLs (user will swap)
html = html.replace(
    '<li><a target="_blank" class="twitter" href="#">Twitter</a></li>',
    '<li><a target="_blank" class="twitter" href="https://twitter.com/ifedikevictor">Twitter</a></li>',
)
html = html.replace(
    '<li><a target="_blank" class="behance" href="#">Behance</a></li>',
    '<li><a target="_blank" class="behance" href="https://linkedin.com/in/ifedike-victor">LinkedIn</a></li>',
)
html = html.replace(
    '<li><a target="_blank" class="dribbble" href="#">Dribbble</a></li>',
    '<li><a target="_blank" class="dribbble" href="https://wa.me/2348000000000">WhatsApp</a></li>',
)
html = html.replace(
    '<li><a target="_blank" class="github" href="#">Github</a></li>',
    '<li><a target="_blank" class="github" href="https://github.com/lordwhitefire">Github</a></li>',
)
# Replace copyright
html = html.replace(
    '<p>&copy; 2025 <span> Andle</span> Made with <i class="icofont-heart" aria-hidden="true"></i> by <a href="https://hasthemes.com/" target="_blank">HasThemes</a></p>',
    '<p>&copy; 2026 <span> Ifedike Victor</span>. Built on the Andle template.</p>',
)

# --------------------------------------------------------------------------- #
# 14. Back-to-top icon — replace ion-android-arrow-up with FA6
# --------------------------------------------------------------------------- #
html = html.replace(
    '<i class="ion-android-arrow-up"></i>',
    '<i class="fas fa-arrow-up"></i>',
)

# --------------------------------------------------------------------------- #
# 15. Hamburger + close icons (off-canvas menu)
# --------------------------------------------------------------------------- #
html = html.replace(
    '<i class="las la-bars"></i>',
    '<i class="fas fa-bars"></i>',
)
html = html.replace(
    '<i class="ion-ios-close-outline"></i>',
    '<i class="fas fa-times"></i>',
)

# --------------------------------------------------------------------------- #
# 16. Swiper navigation arrows (testimonial nav was using icofont — already
#     removed with testimonials. Hero swiper navigation uses default Swiper
#     arrow styling if present. If the page uses icofont arrows for hero,
#     replace them too.)
# --------------------------------------------------------------------------- #
html = html.replace(
    '<i class="icofont-thin-left"></i>',
    '<i class="fas fa-chevron-left"></i>',
)
html = html.replace(
    '<i class="icofont-thin-right"></i>',
    '<i class="fas fa-chevron-right"></i>',
)

# --------------------------------------------------------------------------- #
# Write the result
# --------------------------------------------------------------------------- #
OUT.write_text(html, encoding="utf-8")
print(f"Wrote {len(html):,} bytes to {OUT}")