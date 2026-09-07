# Superseded design directions

Kept for reference. **`p6-quiet.html` is the one that won** — it is now the live build at
`../index.html`, `../resources.html` and `../contact.html`, styled by `../base.css` +
`../theme-p6.css`. Nothing here is loaded by the live pages.

Open `compare.html` to click through the lot.

| | |
| --- | --- |
| `directions.html` | Round 1 style tiles — flyer / magazine / riso |
| `d1-flyer.html` … `d4-mix.html` | Round 2 — the four directions as full homepages |
| `p1-soft.html` … `p4-anchor.html` | Round 3 — pastel iterations on direction 3 + 4 |
| `p5-mix-pastel.html` | Round 4 — direction 4 in the pastel palette |
| `p6-quiet.html` | Round 5 — the chosen one, kept as a snapshot |
| `fundsy.css` | The original combined stylesheet, before base + theme were split |

`theme-mix.css` had a malformed comment that silently killed the whole stylesheet; it is
fixed here, and `base.css` now carries neutral fallback tokens so the same failure would
be obvious instead of looking like a deliberate minimal design.
