# Hero captures — 2026-10-31

Method: attached to the owner's real Chrome (automation profile) over CDP :9222 via
`hero_capture.py` (piper venv playwright). One temporary tab per capture, viewport
1280x800, above-the-fold only, settle = network idle + 2.5s, `animations="disabled"` to
freeze hero motion for a stable frame. Temp tab closed after each; browser left running.

Results (all 1280x800 PNG, real content rendered, no challenge/error states):

1. https://interior-deco-kappa.vercel.app/ -> public/projects/interior-deco.png
   "Whitefire Interior — Amsterdam Interior Design Studio". Dark bamboo-garden hero,
   "Designing Spaces. Elevating Lives." headline, gold CTA, full nav.
2. http://localhost:3011/product/adidas-predator-elite-ft-fg-white-light-green
   -> public/projects/athletica.png
   Athletica storefront product page: adidas Predator Elite FT-FG (white/light green),
   main image + 4-thumbnail gallery, "Link coming soon" CTA, Amazon Associate note.
3. https://cp3-legacy.vercel.app/ -> public/projects/cp3-legacy.png
   "CP3 Legacy" Chris Paul fan site. Logo bar, search, nav (HOME/PLAYER/NEWS, socials),
   hero "THE POINT GOD ERA / CP3 LEGACY" + game photo at right.

Note: first attempt on site 1 hit a 30s screenshot timeout (infinite hero animation);
fixed by adding `animations="disabled"` + longer capture timeout to hero_capture.py.
