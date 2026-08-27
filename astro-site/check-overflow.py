#!/usr/bin/env python3
"""Check every built page for horizontal overflow at phone width.

    npm run build && python3 check-overflow.py

Why this exists rather than a screenshot: headless Chrome silently clamps
--window-size to a minimum around 485px, so a screenshot taken at "390" is a
485px layout cropped to 390 and everything looks broken whether it is or not.
An iframe of a fixed width gets a real layout viewport of that width, which is
the only way to measure this honestly from here.

Reports documentElement.scrollWidth against clientWidth, then names the
elements that actually push it out — skipping any clipped by an ancestor,
and treating <body> as non-clipping because an overflow value there
propagates to the viewport rather than clipping its own content.
"""
import glob, http.server, os, re, socketserver, subprocess, sys, threading, html

HERE = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(HERE, "dist")
WIDTH = int(sys.argv[1]) if len(sys.argv) > 1 else 390
PORT = 4488
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

HARNESS = """<body style="margin:0">
<iframe id="f" src="__PAGE__" width="__W__" height="760" style="border:0"></iframe>
<pre id="OUT">pending</pre>
<script>
document.getElementById('f').addEventListener('load', function () {
  var d = this.contentDocument, w = this.contentWindow;
  var vw = d.documentElement.clientWidth, sw = d.documentElement.scrollWidth;
  function clipped(el) {
    for (var p = el.parentElement; p && p !== d.body && p !== d.documentElement; p = p.parentElement) {
      var o = w.getComputedStyle(p);
      if (o.overflowX !== 'visible' || o.overflow !== 'visible') return true;
    }
    return false;
  }
  var out = [];
  d.querySelectorAll('*').forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.right > vw + 1 && !clipped(el)) {
      out.push(Math.round(r.right - vw) + 'px  ' + el.tagName.toLowerCase() +
        (el.id ? '#' + el.id : '') +
        (typeof el.className === 'string' && el.className
          ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : ''));
    }
  });
  document.getElementById('OUT').textContent =
    'vw=' + vw + ' scrollWidth=' + sw + ' over=' + Math.max(0, sw - vw) +
    (out.length ? '\\n    ' + out.slice(0, 6).join('\\n    ') : '');
});
</script></body>"""


class Quiet(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=DIST, **k)
    def log_message(self, *a): pass


srv = socketserver.TCPServer(("", PORT), Quiet)
srv.allow_reuse_address = True
threading.Thread(target=srv.serve_forever, daemon=True).start()

pages = sorted(os.path.basename(p) for p in glob.glob(DIST + "/*.html")
               if not os.path.basename(p).startswith("_"))
bad = 0
print(f"checking {len(pages)} pages at a real {WIDTH}px viewport\n")
for page in pages:
    hp = os.path.join(DIST, "_ovf.html")
    open(hp, "w").write(HARNESS.replace("__PAGE__", "/" + page).replace("__W__", str(WIDTH)))
    dom = subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=7000",
         "--window-size=1200,900", "--dump-dom", f"http://localhost:{PORT}/_ovf.html"],
        capture_output=True, text=True).stdout
    m = re.search(r'<pre id="OUT">(.*?)</pre>', dom, re.S)
    txt = html.unescape(re.sub("<[^>]+>", "", m.group(1))).strip() if m else "probe failed"
    over = re.search(r"over=(\d+)", txt)
    ok = over and over.group(1) == "0"
    if not ok: bad += 1
    print(f"  {'ok  ' if ok else 'OVER'} {page:<28} {txt}")
    os.remove(hp)

srv.shutdown()
print(f"\n{len(pages) - bad} clean, {bad} with horizontal overflow")
sys.exit(1 if bad else 0)
