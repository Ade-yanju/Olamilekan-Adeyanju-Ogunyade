<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Olamilekan Ogunyade — Engineering</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#060608;--bg2:#0c0c10;--bg3:#111118;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --text:#f0eee8;--muted:#6a6875;--subtle:#9998a5;
  --accent:#7c6fff;--accent2:#4de8b2;--yellow:#f5c842;
  --radius:2px;
  --font-display:'Syne',sans-serif;
  --font-mono:'JetBrains Mono',monospace;
  --font-serif:'Instrument Serif',serif;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--font-display);overflow-x:hidden;}

/* CURSOR desktop only */
.cursor,.cursor-ring{display:none;}
@media(hover:hover) and (pointer:fine){
  body{cursor:none;}
  .cursor{display:block;position:fixed;width:10px;height:10px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:exclusion;}
  .cursor-ring{display:block;position:fixed;width:36px;height:36px;border:1px solid rgba(124,111,255,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .25s,height .25s,border-color .2s;}
  body:has(a:hover) .cursor-ring,body:has(button:hover) .cursor-ring{width:56px;height:56px;border-color:var(--accent2);}
}
/* NOISE */
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.032;pointer-events:none;z-index:1000;}
/* GRID BG */
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(124,111,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,111,255,.04) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;z-index:0;}
/* BLOBS */
.blob{position:fixed;border-radius:50%;pointer-events:none;filter:blur(120px);z-index:0;}
.blob-1{width:500px;height:500px;background:rgba(124,111,255,.07);top:-150px;right:-100px;}
.blob-2{width:400px;height:400px;background:rgba(77,232,178,.05);bottom:10%;left:-100px;}
.blob-3{width:300px;height:300px;background:rgba(255,107,74,.04);top:50%;right:10%;}

/* LAYOUT */
.container{max-width:1280px;margin:0 auto;padding:0 48px;position:relative;z-index:1;}

/* ===== NAV ===== */
nav.topnav{position:fixed;top:0;left:0;right:0;z-index:900;border-bottom:1px solid var(--border);backdrop-filter:blur(24px);background:rgba(6,6,8,.85);}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 48px;height:64px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--font-mono);font-size:12px;color:var(--muted);letter-spacing:.1em;text-decoration:none;}
.nav-logo span{color:var(--accent);}
.nav-links{display:flex;gap:40px;list-style:none;}
.nav-links a{font-family:var(--font-mono);font-size:11px;color:var(--muted);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;transition:color .2s;}
.nav-links a:hover{color:var(--text);}
.nav-status{display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;color:var(--muted);}
.status-dot{width:6px;height:6px;background:var(--accent2);border-radius:50%;animation:pulse 2s infinite;flex-shrink:0;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
/* Hamburger */
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;}
.hamburger span{display:block;width:22px;height:1.5px;background:var(--muted);transition:all .3s;}
.hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;}
.hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}
/* Mobile menu */
.mobile-menu{display:none;position:fixed;inset:64px 0 0;background:rgba(6,6,8,.98);backdrop-filter:blur(24px);z-index:850;flex-direction:column;justify-content:center;align-items:center;gap:40px;opacity:0;transition:opacity .3s;pointer-events:none;}
.mobile-menu.open{opacity:1;pointer-events:all;}
.mobile-menu a{font-family:var(--font-mono);font-size:20px;color:var(--subtle);text-decoration:none;letter-spacing:.1em;text-transform:uppercase;transition:color .2s;}
.mobile-menu a:hover{color:var(--accent);}

/* SIDE DOTS */
.side-nav{position:fixed;right:24px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:12px;z-index:800;}
.side-dot{width:6px;height:6px;border-radius:50%;background:var(--border2);cursor:pointer;transition:all .2s;}
.side-dot.active{background:var(--accent);transform:scale(1.5);}

/* SECTION */
.section{padding:120px 0;position:relative;z-index:1;}
.section-header{margin-bottom:64px;}
.section-index{font-family:var(--font-mono);font-size:11px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:16px;}
.section-index::after{content:'';flex:0 0 60px;height:1px;background:var(--accent);opacity:.4;}
.section-title{font-size:clamp(32px,4vw,56px);font-weight:800;letter-spacing:-.04em;line-height:1.05;}
.section-title em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--subtle);}

/* FADE */
.fade-up{opacity:0;transform:translateY(30px);transition:all .7s ease;}
.fade-up.visible{opacity:1;transform:translateY(0);}
.fd1{transition-delay:.1s;}.fd2{transition-delay:.2s;}.fd3{transition-delay:.3s;}

/* ===== HERO ===== */
.hero{min-height:100vh;display:flex;align-items:center;padding-top:64px;position:relative;}
.hero-grid{display:grid;grid-template-columns:1fr 420px;gap:80px;align-items:center;width:100%;}
.hero-eyebrow{display:flex;align-items:center;gap:12px;font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px;}
.hero-eyebrow::before{content:'';display:block;width:40px;height:1px;background:var(--accent);}
.availability{background:rgba(77,232,178,.06);border:1px solid rgba(77,232,178,.2);padding:12px 18px;display:inline-flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:10px;color:var(--accent2);letter-spacing:.08em;text-transform:uppercase;margin-bottom:32px;}
.hero-name{font-size:clamp(44px,7vw,96px);font-weight:800;line-height:.9;letter-spacing:-.04em;margin-bottom:24px;}
.hero-name .line2{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--accent);display:block;font-size:clamp(38px,6vw,84px);letter-spacing:-.02em;line-height:1;}
.hero-desc{font-size:clamp(14px,1.5vw,18px);line-height:1.65;color:var(--subtle);max-width:520px;margin-bottom:44px;border-left:2px solid rgba(124,111,255,.3);padding-left:22px;}
.hero-ctas{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.stat{background:var(--bg);padding:22px 18px;}
.stat-num{font-size:clamp(26px,3vw,36px);font-weight:800;letter-spacing:-.04em;line-height:1;margin-bottom:6px;}
.stat-num span{color:var(--accent);}
.stat-label{font-family:var(--font-mono);font-size:9px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}

/* TERMINAL */
.terminal-card{background:var(--bg2);border:1px solid var(--border2);border-radius:4px;overflow:hidden;}
.terminal-bar{background:var(--bg3);padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border);}
.dot{width:12px;height:12px;border-radius:50%;}
.dot-r{background:#ff5f57;}.dot-y{background:#febc2e;}.dot-g{background:#28c840;}
.term-title{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-left:auto;}
.terminal-body{padding:22px;font-family:var(--font-mono);font-size:12px;line-height:1.8;}
.t-prompt{color:var(--accent2);}.t-out{color:var(--muted);}.t-acc{color:var(--accent);}.t-acc2{color:var(--accent2);}.t-warn{color:var(--yellow);}
.t-cursor{display:inline-block;width:8px;height:14px;background:var(--accent);vertical-align:middle;animation:blink 1s step-end infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

/* BUTTONS */
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;font-family:var(--font-mono);font-size:12px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:15px 28px;border:none;border-radius:var(--radius);cursor:pointer;transition:all .2s;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(124,111,255,.35);}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--subtle);font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:15px 28px;border:1px solid var(--border2);border-radius:var(--radius);cursor:pointer;transition:all .2s;}
.btn-ghost:hover{color:var(--text);border-color:var(--accent);background:rgba(124,111,255,.06);}

/* TICKER */
.ticker-wrap{border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;padding:14px 0;margin:80px 0;position:relative;z-index:1;}
.ticker-track{display:flex;gap:64px;width:max-content;animation:scroll-x 30s linear infinite;}
@keyframes scroll-x{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.ticker-item{font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;display:flex;align-items:center;gap:24px;}
.ticker-item::before{content:'◆';color:var(--accent);font-size:6px;}

/* METRICS */
.metric-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:72px;}
.metric{background:var(--bg);padding:28px 22px;}
.metric-val{font-size:clamp(28px,3.5vw,44px);font-weight:800;letter-spacing:-.04em;line-height:1;margin-bottom:8px;}
.metric-val span{color:var(--accent);}
.metric-key{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}

/* PROJECT FEATURED */
.project-featured{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--border);margin-bottom:1px;}
.project-featured-content{background:var(--bg);padding:48px;transition:background .3s;}
.project-featured:hover .project-featured-content{background:var(--bg2);}
.project-featured-visual{background:var(--bg2);padding:40px;display:flex;align-items:center;justify-content:center;border-left:1px solid var(--border);position:relative;min-height:280px;}

/* PROJECT GRID */
.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-top:none;}
.project-card{background:var(--bg);padding:36px;position:relative;overflow:hidden;transition:background .3s;}
.project-card:hover{background:var(--bg2);}
.project-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .4s;}
.project-card:hover::before{transform:scaleX(1);}

/* CATALOG */
.catalog-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.catalog-item{background:var(--bg);padding:26px 22px;transition:background .25s;position:relative;overflow:hidden;}
.catalog-item:hover{background:var(--bg2);}
.catalog-item::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--accent2);transform:scaleX(0);transform-origin:left;transition:transform .3s;}
.catalog-item:hover::after{transform:scaleX(1);}

/* PROJECT SHARED */
.project-index{font-family:var(--font-mono);font-size:10px;color:var(--muted);margin-bottom:14px;letter-spacing:.06em;}
.project-name{font-size:clamp(18px,2vw,24px);font-weight:800;letter-spacing:-.03em;margin-bottom:10px;line-height:1.1;}
.project-desc{font-size:13px;color:var(--subtle);line-height:1.7;margin-bottom:20px;}
.project-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:22px;}
.tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border2);padding:4px 10px;border-radius:2px;transition:all .2s;}
.project-link{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;color:var(--accent);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;transition:gap .2s;}
.project-link:hover{gap:14px;}
.live-badge{position:absolute;top:14px;right:14px;font-family:var(--font-mono);font-size:9px;color:var(--accent2);border:1px solid rgba(77,232,178,.3);padding:4px 10px;display:flex;align-items:center;gap:6px;letter-spacing:.1em;text-transform:uppercase;}
.live-badge::before{content:'';width:5px;height:5px;background:var(--accent2);border-radius:50%;animation:pulse 1.5s infinite;}
.cat-name{font-size:14px;font-weight:700;letter-spacing:-.02em;margin-bottom:6px;}
.cat-tech{font-family:var(--font-mono);font-size:10px;color:var(--muted);margin-bottom:10px;}
.cat-desc{font-size:12px;color:var(--subtle);line-height:1.6;margin-bottom:12px;}
.cat-link{font-family:var(--font-mono);font-size:10px;color:var(--accent);text-decoration:none;letter-spacing:.06em;text-transform:uppercase;display:inline-flex;align-items:center;gap:6px;transition:gap .2s;}
.cat-link:hover{gap:10px;}
.arch-box{font-family:var(--font-mono);font-size:11px;color:var(--subtle);text-align:center;line-height:2;}

/* STACK */
.stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.stack-cell{background:var(--bg);padding:36px 28px;transition:background .2s;}
.stack-cell:hover{background:var(--bg2);}
.stack-layer{font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px;}
.stack-cell-title{font-size:18px;font-weight:700;letter-spacing:-.02em;margin-bottom:16px;}
.stack-items{display:flex;flex-direction:column;gap:8px;}
.stack-item{font-family:var(--font-mono);font-size:11px;color:var(--muted);display:flex;align-items:center;gap:8px;}
.stack-item::before{content:'→';color:var(--accent2);font-size:10px;}
.skills-flow{display:flex;flex-wrap:wrap;gap:10px;margin-top:48px;}
.skill-pill{font-family:var(--font-mono);font-size:10px;color:var(--muted);border:1px solid var(--border);padding:7px 14px;transition:all .25s;border-radius:2px;cursor:default;}
.skill-pill:hover{color:var(--text);border-color:var(--accent2);background:rgba(77,232,178,.05);transform:translateY(-2px);}

/* TIMELINE */
.exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;}
.timeline{position:relative;padding-left:28px;}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--border2);}
.timeline-item{position:relative;padding-bottom:48px;}
.timeline-item::before{content:'';position:absolute;left:-33px;top:6px;width:8px;height:8px;border-radius:50%;background:var(--accent);border:2px solid var(--bg);box-shadow:0 0 0 3px rgba(124,111,255,.2);}
.timeline-item.current::before{background:var(--accent2);box-shadow:0 0 0 3px rgba(77,232,178,.2);animation:pulse 2s infinite;}
.timeline-date{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-bottom:10px;letter-spacing:.06em;}
.timeline-role{font-size:20px;font-weight:700;letter-spacing:-.03em;margin-bottom:6px;}
.timeline-company{font-family:var(--font-mono);font-size:11px;color:var(--accent);margin-bottom:12px;}
.timeline-body{font-size:13px;color:var(--subtle);line-height:1.75;max-width:520px;}

/* PHILOSOPHY */
.philosophy-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;}
.philosophy-text{font-size:clamp(17px,1.8vw,22px);font-weight:500;line-height:1.6;letter-spacing:-.02em;}
.philosophy-text em{font-family:var(--font-serif);font-style:italic;color:var(--subtle);font-weight:400;}
.philosophy-right{display:flex;flex-direction:column;gap:28px;}
.philosophy-item{border-left:2px solid var(--border2);padding-left:22px;}
.philosophy-item-label{font-family:var(--font-mono);font-size:10px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
.philosophy-item-text{font-size:13px;color:var(--subtle);line-height:1.7;}

/* CONTACT */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.contact-email{display:block;font-family:var(--font-mono);font-size:13px;color:var(--subtle);text-decoration:none;margin-bottom:36px;transition:color .2s;word-break:break-all;}
.contact-email:hover{color:var(--text);}
.contact-links{display:flex;gap:12px;flex-wrap:wrap;}
.social-link{display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;color:var(--muted);text-decoration:none;border:1px solid var(--border2);padding:11px 16px;transition:all .2s;border-radius:var(--radius);letter-spacing:.08em;text-transform:uppercase;}
.social-link:hover{color:var(--text);border-color:var(--accent);background:rgba(124,111,255,.06);}
.contact-right{background:var(--bg2);border:1px solid var(--border2);padding:40px;}
.form-label{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;display:block;}
.form-input,.form-textarea{width:100%;background:var(--bg);border:1px solid var(--border2);color:var(--text);font-family:var(--font-mono);font-size:13px;padding:13px 14px;outline:none;border-radius:var(--radius);transition:border-color .2s;resize:none;}
.form-input:focus,.form-textarea:focus{border-color:var(--accent);}
.form-group{margin-bottom:20px;}

/* FOOTER */
footer{border-top:1px solid var(--border);padding:28px 0;position:relative;z-index:1;}
.footer-inner{max-width:1280px;margin:0 auto;padding:0 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;}
.footer-copy{font-family:var(--font-mono);font-size:11px;color:var(--muted);}
.footer-right{font-family:var(--font-mono);font-size:11px;color:var(--muted);display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
.footer-right a{color:var(--muted);text-decoration:none;transition:color .2s;}
.footer-right a:hover{color:var(--text);}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .container,.nav-inner,.footer-inner{padding-left:32px;padding-right:32px;}
  .hero-grid{grid-template-columns:1fr;}
  .hero-right{display:none;}
  .metric-row{grid-template-columns:repeat(2,1fr);}
  .project-featured{grid-template-columns:1fr;}
  .project-featured-visual{border-left:none;border-top:1px solid var(--border);min-height:160px;}
  .projects-grid{grid-template-columns:repeat(2,1fr);}
  .catalog-grid{grid-template-columns:repeat(3,1fr);}
  .stack-grid{grid-template-columns:repeat(2,1fr);}
  .exp-grid{grid-template-columns:1fr;}
  .philosophy-grid{grid-template-columns:1fr;}
  .contact-grid{grid-template-columns:1fr;}
  .side-nav{display:none;}
  .nav-links,.nav-status{display:none;}
  .hamburger{display:flex;}
  .mobile-menu{display:flex;}
}
@media(max-width:640px){
  .container,.nav-inner,.footer-inner{padding-left:20px;padding-right:20px;}
  .section{padding:72px 0;}
  .section-header{margin-bottom:40px;}
  .hero{padding-top:80px;min-height:auto;padding-bottom:60px;}
  .hero-grid{gap:0;}
  .hero-name{font-size:clamp(36px,11vw,56px);}
  .hero-desc{font-size:15px;margin-bottom:32px;}
  .hero-ctas{flex-direction:column;gap:12px;}
  .btn-primary,.btn-ghost{width:100%;justify-content:center;}
  .availability{font-size:9px;padding:10px 14px;}
  .hero-stats{grid-template-columns:repeat(3,1fr);}
  .stat{padding:16px 12px;}
  .stat-num{font-size:22px;}
  .stat-label{font-size:8px;}
  .metric-row{grid-template-columns:1fr 1fr;}
  .metric{padding:20px 14px;}
  .metric-val{font-size:26px;}
  .project-featured-content{padding:28px 20px;}
  .projects-grid{grid-template-columns:1fr;}
  .project-card{padding:28px 20px;}
  .catalog-grid{grid-template-columns:1fr 1fr;}
  .stack-grid{grid-template-columns:1fr;}
  .ticker-wrap{margin:48px 0;}
  .contact-right{padding:24px 20px;}
  .contact-links{flex-direction:column;}
  .social-link{justify-content:center;}
  .skills-flow{gap:8px;}
  .skills-flow .skill-pill{font-size:9px;padding:6px 10px;}
}
@media(max-width:380px){
  .catalog-grid{grid-template-columns:1fr;}
  .hero-stats{grid-template-columns:1fr 1fr;}
}
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursor-ring"></div>
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="blob blob-3"></div>

<!-- SIDE NAV -->
<nav class="side-nav" aria-hidden="true">
  <div class="side-dot active" data-section="hero"></div>
  <div class="side-dot" data-section="projects"></div>
  <div class="side-dot" data-section="stack"></div>
  <div class="side-dot" data-section="experience"></div>
  <div class="side-dot" data-section="about"></div>
  <div class="side-dot" data-section="contact"></div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <a href="#projects" onclick="closeMenu()">Work</a>
  <a href="#stack" onclick="closeMenu()">Stack</a>
  <a href="#experience" onclick="closeMenu()">XP</a>
  <a href="#about" onclick="closeMenu()">About</a>
  <a href="#contact" onclick="closeMenu()">Contact</a>
</div>

<!-- NAV -->
<nav class="topnav" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="#" class="nav-logo"><span>❯</span> ade_engine<span>.sh</span></a>
    <ul class="nav-links">
      <li><a href="#projects">Work</a></li>
      <li><a href="#stack">Stack</a></li>
      <li><a href="#experience">XP</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-status">
      <div class="status-dot"></div>
      Available for hire
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="availability"><div class="status-dot"></div>Open to senior &amp; lead roles — Lagos / Remote</div>
        <div class="hero-eyebrow">Full Stack · Mobile · Systems</div>
        <h1 class="hero-name">OLAMILEKAN<span class="line2">Ogunyade.</span></h1>
        <p class="hero-desc">I build performant, production-grade web and mobile systems — from zero to scale. 20+ shipped products, clean architecture, relentless attention to craft.</p>
        <div class="hero-ctas">
          <a href="#projects" class="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5 12 12 5 19 12"/><polyline points="5 19 12 12 19 19"/></svg>
            View my work
          </a>
          <a href="mailto:adeyanjuolamilekan080@gmail.com" class="btn-ghost">Get in touch →</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><div class="stat-num">20<span>+</span></div><div class="stat-label">Shipped</div></div>
          <div class="stat"><div class="stat-num">5<span>yr</span></div><div class="stat-label">Experience</div></div>
          <div class="stat"><div class="stat-num">99<span>%</span></div><div class="stat-label">Uptime</div></div>
        </div>
      </div>
      <div class="hero-right">
        <div class="terminal-card">
          <div class="terminal-bar">
            <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
            <span class="term-title">~/portfolio — zsh</span>
          </div>
          <div class="terminal-body">
            <div><span class="t-prompt">ade@engine</span> ~ $ whoami</div>
            <div class="t-out"><span class="t-acc2">→</span> Senior Software Engineer</div><br/>
            <div><span class="t-prompt">ade@engine</span> ~ $ cat stats.json</div>
            <div class="t-out">{</div>
            <div class="t-out">&nbsp;&nbsp;<span class="t-acc">"shipped"</span>: 20,</div>
            <div class="t-out">&nbsp;&nbsp;<span class="t-acc">"stack"</span>: ["React","RN","Node","Firebase"],</div>
            <div class="t-out">&nbsp;&nbsp;<span class="t-acc">"platforms"</span>: ["Web","iOS","Android"],</div>
            <div class="t-out">&nbsp;&nbsp;<span class="t-acc2">"status"</span>: <span class="t-warn">"AVAILABLE"</span></div>
            <div class="t-out">}</div><br/>
            <div><span class="t-prompt">ade@engine</span> ~ $ <span class="t-cursor"></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker-wrap" aria-hidden="true">
  <div class="ticker-track" id="ticker">
    <div class="ticker-item">React.js</div><div class="ticker-item">Next.js</div><div class="ticker-item">React Native</div><div class="ticker-item">Expo</div><div class="ticker-item">Node.js</div><div class="ticker-item">Firebase</div><div class="ticker-item">TypeScript</div><div class="ticker-item">Tailwind CSS</div><div class="ticker-item">Framer Motion</div><div class="ticker-item">Vercel</div><div class="ticker-item">GraphQL</div><div class="ticker-item">Cloudinary</div><div class="ticker-item">EAS Build</div><div class="ticker-item">Figma → Code</div><div class="ticker-item">React.js</div><div class="ticker-item">Next.js</div><div class="ticker-item">React Native</div><div class="ticker-item">Expo</div><div class="ticker-item">Node.js</div><div class="ticker-item">Firebase</div><div class="ticker-item">TypeScript</div><div class="ticker-item">Tailwind CSS</div><div class="ticker-item">Framer Motion</div><div class="ticker-item">Vercel</div><div class="ticker-item">GraphQL</div><div class="ticker-item">Cloudinary</div><div class="ticker-item">EAS Build</div><div class="ticker-item">Figma → Code</div>
  </div>
</div>

<!-- PROJECTS -->
<section class="section" id="projects">
  <div class="container">
    <div class="section-header fade-up">
      <div class="section-index">01 — Selected Work</div>
      <h2 class="section-title">Things I've <em>shipped</em></h2>
    </div>

    <div class="metric-row fade-up fd1">
      <div class="metric"><div class="metric-val">20<span>+</span></div><div class="metric-key">Production apps</div></div>
      <div class="metric"><div class="metric-val">100<span>K+</span></div><div class="metric-key">Lines prod code</div></div>
      <div class="metric"><div class="metric-val">4<span>★</span></div><div class="metric-key">Avg store rating</div></div>
      <div class="metric"><div class="metric-val">5<span>ms</span></div><div class="metric-key">Avg API latency</div></div>
    </div>

    <!-- FEATURED -->
    <div class="project-featured fade-up fd2">
      <div class="project-featured-content">
        <div class="project-index">[RE_01] — FLAGSHIP · MOBILE</div>
        <h3 class="project-name">OMI Health</h3>
        <p class="project-desc">Full-featured telemedicine React Native app powering appointment scheduling, patient records, and real-time doctor-patient chat — Firebase real-time sync, serverless backend, sub-100ms data delivery. Live on Android.</p>
        <div class="project-tags">
          <span class="tag">React Native</span><span class="tag">Expo</span><span class="tag">Firebase</span><span class="tag">Firestore</span><span class="tag">Node.js</span><span class="tag">EAS Build</span>
        </div>
        <a href="https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk" class="project-link" target="_blank" rel="noopener">Download APK →</a>
      </div>
      <div class="project-featured-visual">
        <div class="live-badge">Live on Android</div>
        <div class="arch-box">
          <div style="color:var(--accent2);margin-bottom:10px;font-size:10px;">[ APP_ARCHITECTURE ]</div>
          <div>Auth Layer → Firestore DB</div>
          <div style="color:var(--accent);">↓</div>
          <div>React Native UI Layer</div>
          <div style="color:var(--accent);">↓</div>
          <div>Serverless Functions</div>
          <div style="color:var(--accent);">↓</div>
          <div>EAS Build → APK / IPA</div>
        </div>
      </div>
    </div>

    <!-- 3-COL GRID -->
    <div class="projects-grid">
      <div class="project-card fade-up fd1">
        <div class="project-index">[RE_02] · FINTECH · MOBILE</div>
        <h3 class="project-name">VODIUM</h3>
        <p class="project-desc">Cross-platform fintech wallet — secure transaction flows, encrypted local state, real-time balance sync, and biometric auth on Android &amp; iOS.</p>
        <div class="project-tags"><span class="tag">React Native</span><span class="tag">Secure Storage</span><span class="tag">REST API</span><span class="tag">Biometrics</span></div>
        <a href="#" class="project-link">Case study coming →</a>
      </div>
      <div class="project-card fade-up fd2">
        <div class="project-index">[RE_03] · WEB · COMMUNITY</div>
        <h3 class="project-name">DU Alumni</h3>
        <p class="project-desc">Alumni engagement platform with Cloudinary media, event listings, member directories, and editorial CMS integration.</p>
        <div class="project-tags"><span class="tag">React</span><span class="tag">Next.js</span><span class="tag">Cloudinary</span><span class="tag">CMS</span></div>
        <a href="https://du-alumni-steel.vercel.app/" class="project-link" target="_blank" rel="noopener">View live →</a>
      </div>
      <div class="project-card fade-up fd3">
        <div class="project-index">[RE_04] · WEB · REAL ESTATE</div>
        <h3 class="project-name">Hillstar</h3>
        <p class="project-desc">Premium property listing platform — headless CMS, virtual tour embeds, lead capture, and SSG on Vercel Edge for sub-2s loads.</p>
        <div class="project-tags"><span class="tag">React</span><span class="tag">Headless CMS</span><span class="tag">SSG</span><span class="tag">Vercel Edge</span></div>
        <a href="https://hillstar-realestate.vercel.app/" class="project-link" target="_blank" rel="noopener">View live →</a>
      </div>
    </div>

    //<!-- FULL CATALOG -->

</section>

<!-- STACK -->
<section class="section" id="stack" style="background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div class="container">
    <div class="section-header fade-up">
      <div class="section-index">02 — Technologies</div>
      <h2 class="section-title">The <em>arsenal</em></h2>
    </div>
    <div class="stack-grid fade-up fd1">
      <div class="stack-cell">
        <div class="stack-layer">Layer 01 / Frontend</div>
        <div class="stack-cell-title">Web UI</div>
        <div class="stack-items">
          <div class="stack-item">React.js &amp; Next.js 14</div>
          <div class="stack-item">TypeScript</div>
          <div class="stack-item">Tailwind CSS</div>
          <div class="stack-item">Framer Motion</div>
          <div class="stack-item">Chakra UI</div>
        </div>
      </div>
      <div class="stack-cell">
        <div class="stack-layer">Layer 02 / Mobile</div>
        <div class="stack-cell-title">Native Apps</div>
        <div class="stack-items">
          <div class="stack-item">React Native (Expo)</div>
          <div class="stack-item">EAS Build &amp; Submit</div>
          <div class="stack-item">Reanimated 3</div>
          <div class="stack-item">Expo Router</div>
          <div class="stack-item">Native Modules</div>
        </div>
      </div>
      <div class="stack-cell">
        <div class="stack-layer">Layer 03 / Backend</div>
        <div class="stack-cell-title">Server &amp; Data</div>
        <div class="stack-items">
          <div class="stack-item">Node.js + Express</div>
          <div class="stack-item">Firebase / Firestore</div>
          <div class="stack-item">Serverless Functions</div>
          <div class="stack-item">REST &amp; GraphQL</div>
          <div class="stack-item">WebSockets</div>
        </div>
      </div>
      <div class="stack-cell">
        <div class="stack-layer">Layer 04 / Infra</div>
        <div class="stack-cell-title">Deploy &amp; Scale</div>
        <div class="stack-items">
          <div class="stack-item">Vercel (Edge / ISR)</div>
          <div class="stack-item">Cloudinary CDN</div>
          <div class="stack-item">GitHub Actions CI</div>
          <div class="stack-item">App &amp; Play Store</div>
          <div class="stack-item">Lighthouse 95+ perf</div>
        </div>
      </div>
    </div>
    <div class="skills-flow fade-up fd2">
      <span class="skill-pill">React Query</span><span class="skill-pill">Zustand</span><span class="skill-pill">Redux Toolkit</span><span class="skill-pill">Zod</span><span class="skill-pill">React Hook Form</span><span class="skill-pill">Storybook</span><span class="skill-pill">Vitest</span><span class="skill-pill">Playwright</span><span class="skill-pill">Prisma</span><span class="skill-pill">Supabase</span><span class="skill-pill">Push Notifications</span><span class="skill-pill">Deep Linking</span><span class="skill-pill">Paystack</span><span class="skill-pill">Flutterwave</span><span class="skill-pill">Stripe</span><span class="skill-pill">Mapbox</span><span class="skill-pill">ML Kit</span><span class="skill-pill">OpenAI API</span><span class="skill-pill">Figma → Code</span><span class="skill-pill">WCAG A11y</span>
    </div>
  </div>
</section>

<!-- EXPERIENCE -->
<section class="section" id="experience">
  <div class="container">
    <div class="section-header fade-up">
      <div class="section-index">03 — Experience</div>
      <h2 class="section-title">Where I've <em>built</em></h2>
    </div>
    <div class="exp-grid">
      <div class="timeline fade-up fd1">
        <div class="timeline-item current">
          <div class="timeline-date">2023 — Present</div>
          <div class="timeline-role">Senior Full Stack Engineer</div>
          <div class="timeline-company">// FREELANCE &amp; CONTRACT</div>
          <p class="timeline-body">Delivering 10+ web and mobile solutions for startups and SMEs across health, fintech, agritech, and real estate. Owning architecture decisions, CI/CD pipelines, and App Store releases end-to-end.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2022 — 2023</div>
          <div class="timeline-role">React Native Developer</div>
          <div class="timeline-company">// VODIUM</div>
          <p class="timeline-body">Built and maintained a cross-platform fintech application. Led mobile architecture, biometric auth, encrypted storage, and Play/App Store release pipelines.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2021 — 2022</div>
          <div class="timeline-role">Frontend Developer</div>
          <div class="timeline-company">// HILLSTAR GROUP</div>
          <p class="timeline-body">Developed a high-performance real estate platform from scratch. Sub-2s page loads using React + headless CMS + SSG on Vercel Edge.</p>
        </div>
      </div>
      <div class="fade-up fd2">
        <div style="margin-bottom:48px;">
          <div class="section-index" style="margin-bottom:24px;">Education</div>
          <div class="timeline-role" style="margin-bottom:6px;">B.Sc. Computer Science</div>
          <div class="timeline-company" style="margin-bottom:12px;">// DOMINION UNIVERSITY</div>
          <p class="timeline-body">Algorithms, systems design, and software engineering. Led build sessions, code reviews, and open-source initiatives as an active member of the university tech community.</p>
        </div>
        <div>
          <div class="section-index" style="margin-bottom:24px;">Currently leveling up</div>
          <div class="skills-flow" style="margin-top:0;">
            <span class="skill-pill">System Design</span><span class="skill-pill">Rust</span><span class="skill-pill">AWS Fundamentals</span><span class="skill-pill">tRPC</span><span class="skill-pill">Bun.js</span><span class="skill-pill">LLM integrations</span><span class="skill-pill">Docker</span><span class="skill-pill">Kubernetes basics</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PHILOSOPHY -->
<section class="section" id="about" style="background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div class="container">
    <div class="section-header fade-up">
      <div class="section-index">04 — Philosophy</div>
      <h2 class="section-title">How I <em>think</em></h2>
    </div>
    <div class="philosophy-grid fade-up fd1">
      <div class="philosophy-text">
        I believe great software is <em>invisible</em>. The best interface is the one users never have to think about. I obsess over the gap between "it works" and "it <em>feels</em> right" — across 20+ shipped products.
      </div>
      <div class="philosophy-right">
        <div class="philosophy-item">
          <div class="philosophy-item-label">Performance First</div>
          <p class="philosophy-item-text">Every millisecond counts. I write code with Lighthouse scores, bundle sizes, and real-world network conditions in mind from the first commit.</p>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-item-label">Architecture Over Hacks</div>
          <p class="philosophy-item-text">I resist the quick fix. Scalable, readable, maintainable architecture is the product — not just the code that ships it.</p>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-item-label">Design Literacy</div>
          <p class="philosophy-item-text">I read Figma files fluently and bridge the design-engineering gap with precision. No "close enough" compromises.</p>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-item-label">Ownership Mentality</div>
          <p class="philosophy-item-text">I treat every project like my name is on it. Because it is.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="section" id="contact">
  <div class="container">
    <div class="section-header fade-up">
      <div class="section-index">05 — Let's Talk</div>
      <h2 class="section-title">Build something <em>great</em></h2>
    </div>
    <div class="contact-grid">
      <div class="fade-up fd1">
        <a href="mailto:adeyanjuolamilekan080@gmail.com" class="contact-email">adeyanjuolamilekan080@gmail.com</a>
        <div class="contact-links">
          <a href="https://github.com/Ade-yanju" target="_blank" rel="noopener" class="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter / X
          </a>
        </div>
      </div>
      <div class="contact-right fade-up fd2">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input class="form-input" type="text" placeholder="Your name"/>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" type="email" placeholder="your@email.com"/>
        </div>
        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea class="form-textarea" rows="4" placeholder="Tell me about your project..."></textarea>
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center;" onclick="alert('Wire this to Formspree or your backend!')">Send message →</button>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-copy">© 2026 Olamilekan Ogunyade. Built from scratch.</div>
    <div class="footer-right">
      <span id="live-time"></span>
      <a href="https://github.com/Ade-yanju" target="_blank" rel="noopener">/github</a>
      <a href="mailto:adeyanjuolamilekan080@gmail.com">/mail</a>
    </div>
  </div>
</footer>

<script>
// CURSOR (desktop fine pointer only)
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
}

// HAMBURGER / MOBILE MENU
const ham=document.getElementById('hamburger'),menu=document.getElementById('mobileMenu');
function closeMenu(){ham.classList.remove('open');menu.classList.remove('open');menu.setAttribute('aria-hidden','true');ham.setAttribute('aria-expanded','false');}
ham.addEventListener('click',()=>{
  const open=ham.classList.toggle('open');
  menu.classList.toggle('open');
  menu.setAttribute('aria-hidden',String(!open));
  ham.setAttribute('aria-expanded',String(open));
});
// close on resize to desktop
window.addEventListener('resize',()=>{if(window.innerWidth>1024)closeMenu();});

// LIVE TIME
(function tick(){const el=document.getElementById('live-time');if(el)el.textContent=new Date().toLocaleTimeString('en-US',{hour12:false});setTimeout(tick,1000);})();

// SCROLL FADE
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.08});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

// SIDE DOTS
const secs=['hero','projects','stack','experience','about','contact'];
const dots=document.querySelectorAll('.side-dot');
const sObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      dots.forEach(d=>d.classList.remove('active'));
      const i=secs.indexOf(e.target.id);
      if(i>=0&&dots[i])dots[i].classList.add('active');
    }
  });
},{threshold:.4});
secs.forEach(id=>{const el=document.getElementById(id);if(el)sObs.observe(el);});
dots.forEach((d,i)=>d.addEventListener('click',()=>document.getElementById(secs[i])?.scrollIntoView({behavior:'smooth'})));

// TICKER DUPE
const tk=document.getElementById('ticker');
if(tk){const cl=tk.cloneNode(true);cl.setAttribute('aria-hidden','true');tk.parentNode.appendChild(cl);}
</script>
</body>
</html>
