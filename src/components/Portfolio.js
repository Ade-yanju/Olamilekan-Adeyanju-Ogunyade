/**
 * Olamilekan Ogunyade — Portfolio 2026
 * Updated: Tabbed projects (Mobile / Fullstack / Frontend), Light/Dark mode,
 * Aceternity-inspired components, everything inline.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── LIGHT theme ── */
:root{
  --bg:#f8f7f4;--bg2:#f0ede8;--bg3:#e8e4dd;
  --border:rgba(0,0,0,0.08);--border2:rgba(0,0,0,0.14);
  --text:#12100e;--muted:#888073;--subtle:#6b6460;
  --accent:#5b4fff;--accent2:#00b37a;--yellow:#d4a017;
  --radius:2px;
  --shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.05);
  --card-bg:#ffffff;
  --font-display:'Syne',sans-serif;
  --font-mono:'JetBrains Mono',monospace;
  --font-serif:'Instrument Serif',serif;
  color-scheme:light;
}
/* ── DARK theme ── */
[data-theme="dark"]{
  --bg:#060608;--bg2:#0c0c10;--bg3:#111118;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --text:#f0eee8;--muted:#6a6875;--subtle:#9998a5;
  --accent:#7c6fff;--accent2:#4de8b2;--yellow:#f5c842;
  --shadow:0 1px 3px rgba(0,0,0,0.4),0 4px 16px rgba(0,0,0,0.3);
  --card-bg:#0c0c10;
  color-scheme:dark;
}

html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--font-display);overflow-x:hidden;transition:background .3s,color .3s;}
@media(hover:hover) and (pointer:fine){body{cursor:none;}}

/* noise overlay */
.port::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.025;pointer-events:none;z-index:1000;}
/* grid overlay */
.port::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(91,79,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(91,79,255,.03) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;z-index:0;}
[data-theme="dark"] .port::after{background-image:linear-gradient(rgba(124,111,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,111,255,.04) 1px,transparent 1px);}

/* cursor */
.cursor{display:none;position:fixed;width:10px;height:10px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:exclusion;}
.cursor-ring{display:none;position:fixed;width:36px;height:36px;border:1px solid rgba(91,79,255,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .25s,height .25s,border-color .2s;}
[data-theme="dark"] .cursor-ring{border-color:rgba(124,111,255,.5);}
@media(hover:hover) and (pointer:fine){.cursor,.cursor-ring{display:block;}}

/* blobs */
.blob{position:fixed;border-radius:50%;pointer-events:none;filter:blur(130px);z-index:0;transition:background .3s;}
.blob-1{width:500px;height:500px;background:rgba(91,79,255,.06);top:-150px;right:-100px;}
.blob-2{width:400px;height:400px;background:rgba(0,179,122,.04);bottom:10%;left:-100px;}
.blob-3{width:300px;height:300px;background:rgba(255,107,74,.03);top:50%;right:10%;}
[data-theme="dark"] .blob-1{background:rgba(124,111,255,.07);}
[data-theme="dark"] .blob-2{background:rgba(77,232,178,.05);}
[data-theme="dark"] .blob-3{background:rgba(255,107,74,.04);}

/* layout */
.container{max-width:1280px;margin:0 auto;padding:0 48px;position:relative;z-index:1;}

/* nav */
.topnav{position:fixed;top:0;left:0;right:0;z-index:900;border-bottom:1px solid var(--border);backdrop-filter:blur(24px);background:rgba(248,247,244,.88);transition:background .3s;}
[data-theme="dark"] .topnav{background:rgba(6,6,8,.85);}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 48px;height:64px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--font-mono);font-size:12px;color:var(--muted);letter-spacing:.1em;text-decoration:none;}
.nav-logo .acc{color:var(--accent);}
.nav-links{display:flex;gap:40px;list-style:none;}
.nav-links a{font-family:var(--font-mono);font-size:11px;color:var(--muted);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;transition:color .2s;}
.nav-links a:hover{color:var(--text);}
.nav-right{display:flex;align-items:center;gap:16px;}
.nav-status{display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;color:var(--muted);}
.status-dot{width:6px;height:6px;background:var(--accent2);border-radius:50%;animation:pulse 2s infinite;flex-shrink:0;display:inline-block;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}

/* theme toggle */
.theme-btn{background:var(--bg3);border:1px solid var(--border2);color:var(--muted);font-family:var(--font-mono);font-size:11px;padding:6px 14px;cursor:pointer;border-radius:100px;transition:all .2s;display:flex;align-items:center;gap:6px;letter-spacing:.06em;}
.theme-btn:hover{color:var(--text);border-color:var(--accent);}

.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;}
.hamburger span{display:block;width:22px;height:1.5px;background:var(--muted);transition:all .3s;}
.hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;}
.hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}
.mobile-menu{display:none;position:fixed;inset:64px 0 0;background:rgba(248,247,244,.98);backdrop-filter:blur(24px);z-index:850;flex-direction:column;justify-content:center;align-items:center;gap:40px;opacity:0;transition:opacity .3s;pointer-events:none;}
[data-theme="dark"] .mobile-menu{background:rgba(6,6,8,.98);}
.mobile-menu.open{opacity:1;pointer-events:all;}
.mobile-menu a{font-family:var(--font-mono);font-size:20px;color:var(--subtle);text-decoration:none;letter-spacing:.1em;text-transform:uppercase;transition:color .2s;}
.mobile-menu a:hover{color:var(--accent);}

/* side dots */
.side-nav{position:fixed;right:24px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:12px;z-index:800;}
.side-dot{width:6px;height:6px;border-radius:50%;background:var(--border2);cursor:pointer;transition:all .2s;border:none;padding:0;}
.side-dot.active{background:var(--accent);transform:scale(1.5);}

/* fade */
.fade-up{opacity:0;transform:translateY(30px);transition:all .7s ease;}
.fade-up.visible{opacity:1;transform:translateY(0);}

/* sections */
.section{padding:120px 0;position:relative;z-index:1;}
.section.bg2{background:var(--bg2);}
.section.bordered{border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.section-header{margin-bottom:64px;}
.section-index{font-family:var(--font-mono);font-size:11px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:16px;}
.section-index::after{content:'';flex:0 0 60px;height:1px;background:var(--accent);opacity:.4;}
.section-title{font-size:clamp(32px,4vw,56px);font-weight:800;letter-spacing:-.04em;line-height:1.05;}
.section-title em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--subtle);}

/* hero */
.hero{min-height:100vh;display:flex;align-items:center;padding-top:64px;position:relative;}
.hero-grid{display:grid;grid-template-columns:1fr 420px;gap:80px;align-items:center;width:100%;}
.hero-eyebrow{font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px;display:flex;align-items:center;gap:12px;}
.hero-eyebrow::before{content:'';display:block;width:40px;height:1px;background:var(--accent);}
.availability{background:rgba(0,179,122,.06);border:1px solid rgba(0,179,122,.22);padding:12px 18px;display:inline-flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:10px;color:var(--accent2);letter-spacing:.08em;text-transform:uppercase;margin-bottom:32px;}
[data-theme="dark"] .availability{background:rgba(77,232,178,.06);border-color:rgba(77,232,178,.2);}
.hero-name{font-size:clamp(44px,7vw,96px);font-weight:800;line-height:.9;letter-spacing:-.04em;margin-bottom:24px;display:block;}
.line2{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--accent);display:block;font-size:clamp(38px,6vw,84px);letter-spacing:-.02em;line-height:1;}
.hero-desc{font-size:clamp(14px,1.5vw,18px);line-height:1.65;color:var(--subtle);max-width:520px;margin-bottom:44px;border-left:2px solid rgba(91,79,255,.3);padding-left:22px;}
[data-theme="dark"] .hero-desc{border-left-color:rgba(124,111,255,.3);}
.hero-ctas{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px;}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.stat{background:var(--card-bg);padding:22px 18px;transition:background .3s;}
.stat-num{font-size:clamp(26px,3vw,36px);font-weight:800;letter-spacing:-.04em;line-height:1;margin-bottom:6px;}
.stat-label{font-family:var(--font-mono);font-size:9px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}

/* terminal */
.terminal-card{background:var(--bg2);border:1px solid var(--border2);border-radius:4px;overflow:hidden;box-shadow:var(--shadow);}
.terminal-bar{background:var(--bg3);padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border);}
.dot{width:12px;height:12px;border-radius:50%;}
.dot-r{background:#ff5f57;}.dot-y{background:#febc2e;}.dot-g{background:#28c840;}
.term-title{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-left:auto;}
.terminal-body{padding:22px;font-family:var(--font-mono);font-size:12px;line-height:1.8;}
.t-prompt{color:var(--accent2);}.t-out{color:var(--muted);}.t-acc{color:var(--accent);}.t-acc2{color:var(--accent2);}.t-warn{color:var(--yellow);}
.t-cursor{display:inline-block;width:8px;height:14px;background:var(--accent);vertical-align:middle;animation:blink 1s step-end infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

/* buttons */
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;font-family:var(--font-mono);font-size:12px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:15px 28px;border:none;border-radius:var(--radius);cursor:pointer;transition:all .2s;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(91,79,255,.3);}
[data-theme="dark"] .btn-primary:hover{box-shadow:0 12px 40px rgba(124,111,255,.35);}
.btn-primary.btn-full{width:100%;justify-content:center;}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--subtle);font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:15px 28px;border:1px solid var(--border2);border-radius:var(--radius);cursor:pointer;transition:all .2s;}
.btn-ghost:hover{color:var(--text);border-color:var(--accent);background:rgba(91,79,255,.06);}
[data-theme="dark"] .btn-ghost:hover{background:rgba(124,111,255,.06);}

/* ticker */
.ticker-wrap{border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;padding:14px 0;margin:80px 0;position:relative;z-index:1;}
.ticker-track{display:flex;gap:64px;width:max-content;animation:scroll-x 30s linear infinite;}
@keyframes scroll-x{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.ticker-item{font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;display:flex;align-items:center;gap:24px;}
.ticker-item::before{content:'◆';color:var(--accent);font-size:6px;}

/* ══ PROJECT TABS (Aceternity-inspired) ══ */
.project-tabs-wrap{margin-bottom:48px;}
.tab-list{display:flex;gap:0;border:1px solid var(--border2);background:var(--bg2);overflow:hidden;border-radius:4px;width:fit-content;}
.tab-btn{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:12px 32px;background:none;border:none;color:var(--muted);cursor:pointer;transition:all .25s;position:relative;border-right:1px solid var(--border);}
.tab-btn:last-child{border-right:none;}
.tab-btn.active{color:var(--text);background:var(--card-bg);}
.tab-btn.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--accent);}

/* metrics */
.metric-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:72px;}
.metric{background:var(--card-bg);padding:28px 22px;transition:background .3s;}
.metric-val{font-size:clamp(28px,3.5vw,44px);font-weight:800;letter-spacing:-.04em;line-height:1;margin-bottom:8px;}
.metric-key{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}

/* aceternity card — spotlight hover effect */
.ace-card-wrap{position:relative;padding:1px;border-radius:4px;overflow:hidden;}
.ace-card-wrap::before{content:'';position:absolute;inset:0;border-radius:4px;background:radial-gradient(600px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(91,79,255,.18),transparent 40%);opacity:0;transition:opacity .4s;}
[data-theme="dark"] .ace-card-wrap::before{background:radial-gradient(600px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(124,111,255,.18),transparent 40%);}
.ace-card-wrap:hover::before{opacity:1;}
.ace-card-inner{border:1px solid var(--border2);background:var(--card-bg);border-radius:4px;transition:border-color .3s,background .3s;}
.ace-card-wrap:hover .ace-card-inner{border-color:rgba(91,79,255,.4);}
[data-theme="dark"] .ace-card-wrap:hover .ace-card-inner{border-color:rgba(124,111,255,.4);}

/* featured project */
.project-featured{display:grid;grid-template-columns:1fr 1fr;overflow:hidden;}
.project-featured-content{padding:48px;transition:background .3s;}
.project-featured:hover .project-featured-content{background:var(--bg2);}
.project-featured-visual{background:var(--bg2);padding:40px;display:flex;align-items:center;justify-content:center;border-left:1px solid var(--border);position:relative;min-height:280px;}
/* grid */
.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px;}
.project-card{background:var(--card-bg);padding:36px;position:relative;overflow:hidden;transition:background .3s;height:100%;border:1px solid var(--border);}
.project-card:hover{background:var(--bg2);}
.project-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .4s;}
.project-card:hover::before{transform:scaleX(1);}
/* mobile two-col */
.projects-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;}
.project-index{font-family:var(--font-mono);font-size:10px;color:var(--muted);margin-bottom:14px;letter-spacing:.06em;}
.project-name{font-size:clamp(18px,2vw,24px);font-weight:800;letter-spacing:-.03em;margin-bottom:10px;line-height:1.1;}
.project-desc{font-size:13px;color:var(--subtle);line-height:1.7;margin-bottom:20px;}
.project-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:22px;}
.tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border2);padding:4px 10px;border-radius:2px;transition:all .2s;}
.project-card:hover .tag{border-color:rgba(91,79,255,.3);color:var(--accent);}
[data-theme="dark"] .project-card:hover .tag{border-color:rgba(124,111,255,.3);}
.project-link{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;color:var(--accent);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;transition:gap .2s;}
.project-link:hover{gap:14px;}
.live-badge{position:absolute;top:14px;right:14px;font-family:var(--font-mono);font-size:9px;color:var(--accent2);border:1px solid rgba(0,179,122,.3);padding:4px 10px;display:flex;align-items:center;gap:6px;letter-spacing:.1em;text-transform:uppercase;}
[data-theme="dark"] .live-badge{border-color:rgba(77,232,178,.3);}
.live-badge::before{content:'';width:5px;height:5px;background:var(--accent2);border-radius:50%;animation:pulse 1.5s infinite;}
.arch-box{font-family:var(--font-mono);font-size:11px;color:var(--subtle);text-align:center;line-height:2;}

/* ── Aceternity "border beam" for featured card ── */
.border-beam-wrap{position:relative;overflow:hidden;}
.border-beam{position:absolute;inset:0;pointer-events:none;}
.border-beam::before{
  content:'';position:absolute;inset:-1px;border-radius:4px;
  background:conic-gradient(from var(--angle,0deg),transparent 20%,var(--accent) 40%,transparent 60%);
  animation:rotate-beam 4s linear infinite;
  opacity:.5;
}
@property --angle{syntax:'<angle>';initial-value:0deg;inherits:false;}
@keyframes rotate-beam{to{--angle:360deg;}}
.border-beam-inner{position:relative;z-index:1;background:var(--card-bg);margin:1px;border-radius:3px;}

/* stack */
.stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.stack-cell{background:var(--card-bg);padding:36px 28px;transition:background .2s;}
.stack-cell:hover{background:var(--bg3);}
.stack-layer{font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px;}
.stack-cell-title{font-size:18px;font-weight:700;letter-spacing:-.02em;margin-bottom:16px;}
.stack-items{display:flex;flex-direction:column;gap:8px;}
.stack-item-row{font-family:var(--font-mono);font-size:11px;color:var(--muted);display:flex;align-items:center;gap:8px;}
.stack-item-row::before{content:'→';color:var(--accent2);font-size:10px;}
.skills-flow{display:flex;flex-wrap:wrap;gap:10px;margin-top:48px;}
.skill-pill{font-family:var(--font-mono);font-size:10px;color:var(--muted);border:1px solid var(--border);padding:7px 14px;transition:all .25s;border-radius:2px;cursor:default;}
.skill-pill:hover{color:var(--text);border-color:var(--accent2);background:rgba(0,179,122,.05);transform:translateY(-2px);}
[data-theme="dark"] .skill-pill:hover{background:rgba(77,232,178,.05);}

/* timeline */
.exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;}
.timeline{position:relative;padding-left:28px;}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--border2);}
.timeline-item{position:relative;padding-bottom:48px;}
.timeline-item::before{content:'';position:absolute;left:-33px;top:6px;width:8px;height:8px;border-radius:50%;background:var(--accent);border:2px solid var(--bg);box-shadow:0 0 0 3px rgba(91,79,255,.2);}
[data-theme="dark"] .timeline-item::before{border-color:var(--bg);box-shadow:0 0 0 3px rgba(124,111,255,.2);}
.timeline-item.current::before{background:var(--accent2);box-shadow:0 0 0 3px rgba(0,179,122,.2);animation:pulse 2s infinite;}
[data-theme="dark"] .timeline-item.current::before{box-shadow:0 0 0 3px rgba(77,232,178,.2);}
.timeline-date{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-bottom:10px;letter-spacing:.06em;}
.timeline-role{font-size:20px;font-weight:700;letter-spacing:-.03em;margin-bottom:6px;}
.timeline-company{font-family:var(--font-mono);font-size:11px;color:var(--accent);margin-bottom:12px;}
.timeline-body{font-size:13px;color:var(--subtle);line-height:1.75;max-width:520px;}

/* philosophy */
.philosophy-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;}
.philosophy-text{font-size:clamp(17px,1.8vw,22px);font-weight:500;line-height:1.6;letter-spacing:-.02em;}
.philosophy-text em{font-family:var(--font-serif);font-style:italic;color:var(--subtle);font-weight:400;}
.philosophy-right{display:flex;flex-direction:column;gap:28px;}
.philosophy-item{border-left:2px solid var(--border2);padding-left:22px;transition:border-color .3s;}
.philosophy-item:hover{border-left-color:var(--accent);}
.philosophy-item-label{font-family:var(--font-mono);font-size:10px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
.philosophy-item-text{font-size:13px;color:var(--subtle);line-height:1.7;}

/* contact */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.contact-email{display:block;font-family:var(--font-mono);font-size:13px;color:var(--subtle);text-decoration:none;margin-bottom:36px;transition:color .2s;word-break:break-all;}
.contact-email:hover{color:var(--text);}
.contact-links{display:flex;gap:12px;flex-wrap:wrap;}
.social-link{display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:11px;color:var(--muted);text-decoration:none;border:1px solid var(--border2);padding:11px 16px;transition:all .2s;border-radius:var(--radius);letter-spacing:.08em;text-transform:uppercase;}
.social-link:hover{color:var(--text);border-color:var(--accent);background:rgba(91,79,255,.06);}
[data-theme="dark"] .social-link:hover{background:rgba(124,111,255,.06);}
.contact-right{background:var(--bg2);border:1px solid var(--border2);padding:40px;}
.form-label{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;display:block;}
.form-input,.form-textarea{width:100%;background:var(--card-bg);border:1px solid var(--border2);color:var(--text);font-family:var(--font-mono);font-size:13px;padding:13px 14px;outline:none;border-radius:var(--radius);transition:border-color .2s;resize:none;}
.form-input:focus,.form-textarea:focus{border-color:var(--accent);}
.form-group{margin-bottom:20px;}

/* footer */
footer{border-top:1px solid var(--border);padding:28px 0;position:relative;z-index:1;}
.footer-inner{max-width:1280px;margin:0 auto;padding:0 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;}
.footer-copy{font-family:var(--font-mono);font-size:11px;color:var(--muted);}
.footer-right{font-family:var(--font-mono);font-size:11px;color:var(--muted);display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
.footer-right a{color:var(--muted);text-decoration:none;transition:color .2s;}
.footer-right a:hover{color:var(--text);}

/* responsive */
@media(max-width:1024px){
  .container,.nav-inner,.footer-inner{padding-left:32px;padding-right:32px;}
  .hero-grid{grid-template-columns:1fr;}
  .hero-right{display:none;}
  .metric-row{grid-template-columns:repeat(2,1fr);}
  .project-featured{grid-template-columns:1fr;}
  .project-featured-visual{border-left:none;border-top:1px solid var(--border);min-height:160px;}
  .projects-grid{grid-template-columns:repeat(2,1fr);}
  .projects-grid-2{grid-template-columns:1fr;}
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
  .hero-name{font-size:clamp(36px,11vw,56px);}
  .hero-ctas{flex-direction:column;gap:12px;}
  .btn-primary,.btn-ghost{width:100%;justify-content:center;}
  .stat{padding:16px 12px;}
  .metric-row{grid-template-columns:1fr 1fr;}
  .project-featured-content{padding:28px 20px;}
  .projects-grid{grid-template-columns:1fr;}
  .project-card{padding:28px 20px;}
  .stack-grid{grid-template-columns:1fr;}
  .ticker-wrap{margin:48px 0;}
  .contact-right{padding:24px 20px;}
  .contact-links{flex-direction:column;}
  .social-link{justify-content:center;}
  .tab-btn{padding:10px 18px;font-size:10px;}
  .tab-list{width:100%;}
  .tab-btn{flex:1;text-align:center;}
}
`;

if (!document.getElementById("port-styles")) {
  const s = document.createElement("style");
  s.id = "port-styles";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "XP", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
const SECTIONS = [
  "hero",
  "projects",
  "stack",
  "experience",
  "about",
  "contact",
];
const TICKER_ITEMS = [
  "React.js",
  "Next.js",
  "React Native",
  "Expo",
  "Node.js",
  "Firebase",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel",
  "GraphQL",
  "Cloudinary",
  "EAS Build",
  "Figma → Code",
];

/* ── PROJECT TABS ── */
const PROJECTS_BY_TAB = {
  Mobile: {
    featured: {
      index: "[RN_01] — FLAGSHIP · MOBILE",
      name: "OMI Health",
      desc: "Full-featured telemedicine React Native app powering appointment scheduling, patient records, and real-time doctor-patient chat — Firebase real-time sync, serverless backend, sub-100ms data delivery. Live on Android.",
      tags: [
        "React Native",
        "Expo",
        "Firebase",
        "Firestore",
        "Node.js",
        "EAS Build",
      ],
      link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
      linkLabel: "Download APK →",
      live: "Live on Android",
      arch: [
        "Auth Layer → Firestore DB",
        "React Native UI Layer",
        "Serverless Functions",
        "EAS Build → APK / IPA",
      ],
    },
    cards: [
      {
        id: "[RN_02] · FINTECH",
        name: "VODIUM",
        desc: "Cross-platform fintech wallet — secure transaction flows, encrypted local state, real-time balance sync, and biometric auth on Android & iOS.",
        tags: ["React Native", "Secure Storage", "REST API", "Biometrics"],
        link: "https://expo.dev/accounts/olamilekan42424242/projects/vodium/builds/e0c811aa-9c81-4367-ac8e-e174167d0f60",
        linkLabel: "Download APK →",
        live: "Live on Android",
      },
      // {
      //   id: "[RN_03] · AGRITECH",
      //   name: "FarmPulse",
      //   desc: "Agritech mobile app enabling farmers to log crop data, view weather insights, and connect with cooperatives — real-time push notifications via FCM.",
      //   tags: ["React Native", "Expo", "FCM", "Maps"],
      //   link: "#",
      //   linkLabel: "Case study coming →",
      // },
    ],
  },
  Fullstack: {
    featured: {
      index: "[FS_01] — FULLSTACK · COMMUNITY",
      name: "DU Alumni Platform",
      desc: "Alumni engagement platform with Cloudinary media, event listings, member directories, editorial CMS integration, and a custom Node.js API layer with role-based access.",
      tags: ["React", "Node.js", "Cloudinary", "CMS", "Vercel"],
      link: "https://du-alumni-steel.vercel.app/",
      linkLabel: "View live →",
      live: "Live",
      arch: [
        "CMS Content Layer",
        "React App Router",
        "Node.js API + Auth",
        "Cloudinary CDN → Edge",
      ],
    },
    cards: [
      {
        id: "[FS_02] · API",
        name: "OMI Health API",
        desc: "Serverless Node.js + Firebase backend powering the OMI Health mobile app — appointment scheduling, patient records, and real-time event streaming.",
        tags: ["Node.js", "Firebase", "Firestore", "REST", "Serverless"],
        link: "#",
        linkLabel: "Private repo →",
      },
      {
        id: "[FS_03] · SAAS",
        name: "Tictify",
        desc: "SaaS platform for QR code-based ticketing and event management, dynamic QR generation, secure PDF ticketing, and seamless Paystack payment integration.",
        tags: [
          "React (VITE)",
          "QR code generation",
          "Paystack",
          "PDF",
          "MongoDB",
          "JWT",
        ],
        link: "https://www.tictify.ng/",
        linkLabel: "View live →",
      },
    ],
  },
  Frontend: {
    featured: {
      index: "[FE_01] — FRONTEND · REAL ESTATE",
      name: "Hillstar",
      desc: "Premium property listing platform — headless CMS, virtual tour embeds, lead capture, and SSG on Vercel Edge for sub-2s loads. Lighthouse 97 performance score.",
      tags: ["React", "Headless CMS", "SSG", "Vercel Edge", "Framer Motion"],
      link: "https://hillstar-realestate.vercel.app/",
      linkLabel: "View live →",
      live: "Live",
      arch: [
        "Headless CMS Data",
        "Next.js SSG",
        "Framer Motion UI",
        "Vercel Edge → CDN",
      ],
    },
    cards: [
      {
        id: "[FE_02] · FRONTEND · NOVEL ",
        name: "Next to the Mulatto",
        desc: "A novel about discovering who you are and what purpose God has for your life, Written by Gbemisola Akinsipe.",
        tags: ["Next.js", "Paystack", "TypeScript", "Resend", "Stripe"],
        link: "https://www.nexttothemulatto.com/",
        linkLabel: "View live →",
      },
      {
        id: "[FE_03] · LANDING",
        name: "Brownroof Tech Summit",
        desc: "Tech summit landing page with animated hero, event schedule, speaker bios, and registration form — optimized for performance and accessibility.",
        tags: ["Next.js", "Framer Motion", "Tailwind", "SEO"],
        link: "https://brownrooftechsummit.vercel.app/",
        linkLabel: "View live →",
      },
    ],
  },
};

const STACK = [
  {
    layer: "Layer 01 / Frontend",
    title: "Web UI",
    items: [
      "React.js & Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Chakra UI",
    ],
  },
  {
    layer: "Layer 02 / Mobile",
    title: "Native Apps",
    items: [
      "React Native (Expo)",
      "EAS Build & Submit",
      "Reanimated 3",
      "Expo Router",
      "Native Modules",
    ],
  },
  {
    layer: "Layer 03 / Backend",
    title: "Server & Data",
    items: [
      "Node.js + Express",
      "Firebase / Firestore",
      "Serverless Functions",
      "REST & GraphQL",
      "WebSockets",
    ],
  },
  {
    layer: "Layer 04 / Infra",
    title: "Deploy & Scale",
    items: [
      "Vercel (Edge / ISR)",
      "Cloudinary CDN",
      "GitHub Actions CI",
      "App & Play Store",
      "Lighthouse 95+ perf",
    ],
  },
];
const SKILLS = [
  "React Query",
  "Zustand",
  "Redux Toolkit",
  "Zod",
  "React Hook Form",
  "Storybook",
  "Vitest",
  "Playwright",
  "Prisma",
  "Supabase",
  "Push Notifications",
  "Deep Linking",
  "Paystack",
  "Flutterwave",
  "Stripe",
  "Mapbox",
  "ML Kit",
  "OpenAI API",
  "Figma → Code",
  "WCAG A11y",
];
const EXPERIENCE = [
  {
    date: "2023 — Present",
    role: "Senior Full Stack Engineer",
    company: "// FREELANCE & CONTRACT",
    body: "Delivering 10+ web and mobile solutions for startups and SMEs across health, fintech, agritech, and real estate. Owning architecture decisions, CI/CD pipelines, and App Store releases end-to-end.",
    current: true,
  },
  {
    date: "2022 — 2023",
    role: "React Native Developer",
    company: "// VODIUM",
    body: "Built and maintained a cross-platform fintech application. Led mobile architecture, biometric auth, encrypted storage, and Play/App Store release pipelines.",
  },
  {
    date: "2021 — 2022",
    role: "Frontend Developer",
    company: "// HILLSTAR GROUP",
    body: "Developed a high-performance real estate platform from scratch. Sub-2s page loads using React + headless CMS + SSG on Vercel Edge.",
  },
];
const LEVELING_UP = [
  "System Design",
  "Rust",
  "AWS Fundamentals",
  "tRPC",
  "Bun.js",
  "LLM integrations",
  "Docker",
  "Kubernetes basics",
];
const PHILOSOPHY = [
  {
    label: "Performance First",
    text: "Every millisecond counts. I write code with Lighthouse scores, bundle sizes, and real-world network conditions in mind from the first commit.",
  },
  {
    label: "Architecture Over Hacks",
    text: "I resist the quick fix. Scalable, readable, maintainable architecture is the product — not just the code that ships it.",
  },
  {
    label: "Design Literacy",
    text: 'I read Figma files fluently and bridge the design-engineering gap with precision. No "close enough" compromises.',
  },
  {
    label: "Ownership Mentality",
    text: "I treat every project like my name is on it. Because it is.",
  },
];

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`fade-up${vis ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* Aceternity spotlight card */
function SpotlightCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + "%";
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + "%";
    ref.current.style.setProperty("--mouse-x", x);
    ref.current.style.setProperty("--mouse-y", y);
  }, []);
  return (
    <div
      ref={ref}
      className={`ace-card-wrap ${className}`}
      style={style}
      onMouseMove={onMove}
    >
      <div className="ace-card-inner">{children}</div>
    </div>
  );
}

/* Aceternity animated border beam */
function BorderBeam({ children, className = "" }) {
  return (
    <div className={`border-beam-wrap ${className}`}>
      <div className="border-beam" />
      <div className="border-beam-inner">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────── */
function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  useEffect(() => {
    const isFine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isFine) return;
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top = e.clientY + "px";
      }
    };
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      rafId.current = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);
  return (
    <>
      <div ref={curRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <>
      <nav className="topnav">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <span className="acc">❯</span> ade_engine
            <span className="acc">.sh</span>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <div className="nav-status">
              <span className="status-dot" />
              Available for hire &nbsp;·&nbsp; {time}
            </div>
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀ Light" : "◑ Dark"}
            </button>
          </div>
          <button
            className={`hamburger${open ? " open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        {NAV_LINKS.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light mode" : "◑ Dark mode"}
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SIDE DOTS
───────────────────────────────────────────── */
function SideDots() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.4 },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="side-nav" aria-hidden="true">
      {SECTIONS.map((id) => (
        <button
          key={id}
          className={`side-dot${active === id ? " active" : ""}`}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
        />
      ))}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   TERMINAL
───────────────────────────────────────────── */
function Terminal() {
  return (
    <div className="terminal-card">
      <div className="terminal-bar">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="term-title">~/portfolio — zsh</span>
      </div>
      <div className="terminal-body">
        <div>
          <span className="t-prompt">ade@engine</span> ~ $ whoami
        </div>
        <div className="t-out">
          <span className="t-acc2">→</span> Senior Software Engineer
        </div>
        <br />
        <div>
          <span className="t-prompt">ade@engine</span> ~ $ cat stats.json
        </div>
        <div className="t-out">{"{"}</div>
        <div className="t-out">
          &nbsp;&nbsp;<span className="t-acc">"shipped"</span>: 20,
        </div>
        <div className="t-out">
          &nbsp;&nbsp;<span className="t-acc">"stack"</span>:
          ["React","RN","Node","Firebase"],
        </div>
        <div className="t-out">
          &nbsp;&nbsp;<span className="t-acc">"platforms"</span>:
          ["Web","iOS","Android"],
        </div>
        <div className="t-out">
          &nbsp;&nbsp;<span className="t-acc2">"status"</span>:{" "}
          <span className="t-warn">"AVAILABLE"</span>
        </div>
        <div className="t-out">{"}"}</div>
        <br />
        <div>
          <span className="t-prompt">ade@engine</span> ~ ${" "}
          <span className="t-cursor" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <div key={i} className="ticker-item">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="availability">
              <span className="status-dot" />
              Open to senior &amp; lead roles — Lagos / Remote
            </div>
            <div className="hero-eyebrow">Full Stack · Mobile · Systems</div>
            <h1 className="hero-name">
              OLAMILEKAN<span className="line2">Ogunyade.</span>
            </h1>
            <p className="hero-desc">
              I build performant, production-grade web and mobile systems — from
              zero to scale. 20+ shipped products, clean architecture,
              relentless attention to craft.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="5 12 12 5 19 12" />
                  <polyline points="5 19 12 12 19 19" />
                </svg>
                View my work
              </a>
              <a
                href="mailto:adeyanjuolamilekan080@gmail.com"
                className="btn-ghost"
              >
                Get in touch →
              </a>
            </div>
            <div className="hero-stats">
              {[
                ["20+", "Shipped"],
                ["5yr", "Experience"],
                ["99%", "Uptime"],
              ].map(([n, l]) => (
                <div key={l} className="stat">
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS (tabbed)
───────────────────────────────────────────── */
function Projects() {
  const [activeTab, setActiveTab] = useState("Mobile");
  const tabs = Object.keys(PROJECTS_BY_TAB);
  const { featured, cards } = PROJECTS_BY_TAB[activeTab];

  return (
    <section className="section" id="projects">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">01 — Selected Work</div>
          <h2 className="section-title">
            Things I've <em>shipped</em>
          </h2>
        </FadeUp>

        {/* Metrics */}
        <FadeUp delay={0.05} className="metric-row">
          {[
            ["20+", "Production apps"],
            ["100K+", "Lines prod code"],
            ["4★", "Avg store rating"],
            ["5ms", "Avg API latency"],
          ].map(([v, k]) => (
            <div key={k} className="metric">
              <div className="metric-val">{v}</div>
              <div className="metric-key">{k}</div>
            </div>
          ))}
        </FadeUp>

        {/* ── Tabs ── */}
        <FadeUp delay={0.1} className="project-tabs-wrap">
          <div className="tab-list" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`tab-btn${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Mobile" ? "📱 " : tab === "Fullstack" ? "⚡ " : "🎨 "}
                {tab}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* ── Featured (border beam) ── */}
        <FadeUp delay={0.15}>
          <BorderBeam
            className="project-featured"
            style={{ marginBottom: "16px" }}
          >
            <div className="project-featured" style={{ border: "none" }}>
              <div className="project-featured-content">
                <div className="project-index">{featured.index}</div>
                <h3 className="project-name">{featured.name}</h3>
                <p className="project-desc">{featured.desc}</p>
                <div className="project-tags">
                  {featured.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={featured.link}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {featured.linkLabel}
                </a>
              </div>
              <div className="project-featured-visual">
                <div className="live-badge">{featured.live}</div>
                <div className="arch-box">
                  <div
                    style={{
                      color: "var(--accent2)",
                      marginBottom: 10,
                      fontSize: 10,
                    }}
                  >
                    [ APP_ARCHITECTURE ]
                  </div>
                  {featured.arch.map((line, i) => (
                    <div key={i}>
                      {i > 0 && <div style={{ color: "var(--accent)" }}>↓</div>}
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BorderBeam>
        </FadeUp>

        {/* ── Project cards (spotlight hover) ── */}
        <div className="projects-grid-2">
          {cards.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.08}>
              <SpotlightCard>
                <div className="project-card" style={{ border: "none" }}>
                  <div className="project-index">{p.id}</div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.link}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.linkLabel}
                  </a>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STACK
───────────────────────────────────────────── */
function Stack() {
  return (
    <section className="section bg2 bordered" id="stack">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">02 — Technologies</div>
          <h2 className="section-title">
            The <em>arsenal</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="stack-grid">
          {STACK.map((s) => (
            <div key={s.layer} className="stack-cell">
              <div className="stack-layer">{s.layer}</div>
              <div className="stack-cell-title">{s.title}</div>
              <div className="stack-items">
                {s.items.map((item) => (
                  <div key={item} className="stack-item-row">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </FadeUp>
        <FadeUp delay={0.2} className="skills-flow">
          {SKILLS.map((s) => (
            <span key={s} className="skill-pill">
              {s}
            </span>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────── */
function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">03 — Experience</div>
          <h2 className="section-title">
            Where I've <em>built</em>
          </h2>
        </FadeUp>
        <div className="exp-grid">
          <FadeUp delay={0.1}>
            <div className="timeline">
              {EXPERIENCE.map((e) => (
                <div
                  key={e.role}
                  className={`timeline-item${e.current ? " current" : ""}`}
                >
                  <div className="timeline-date">{e.date}</div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-company">{e.company}</div>
                  <p className="timeline-body">{e.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ marginBottom: 48 }}>
              <div className="section-index" style={{ marginBottom: 24 }}>
                Education
              </div>
              <div className="timeline-role" style={{ marginBottom: 6 }}>
                B.Sc. Software Engineering
              </div>
              <div className="timeline-company" style={{ marginBottom: 12 }}>
                // DOMINION UNIVERSITY
              </div>
              <p className="timeline-body">
                Algorithms, systems design, and software engineering. Led build
                sessions, code reviews, and open-source initiatives.
              </p>
            </div>
            <div>
              <div className="section-index" style={{ marginBottom: 24 }}>
                Currently leveling up
              </div>
              <div className="skills-flow" style={{ marginTop: 0 }}>
                {LEVELING_UP.map((s) => (
                  <span key={s} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  return (
    <section className="section bg2 bordered" id="about">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">04 — Philosophy</div>
          <h2 className="section-title">
            How I <em>think</em>
          </h2>
        </FadeUp>
        <div className="philosophy-grid">
          <FadeUp delay={0.1}>
            <p className="philosophy-text">
              I believe great software is <em>invisible</em>. The best interface
              is the one users never have to think about. I obsess over the gap
              between "it works" and "it <em>feels</em> right" — across 20+
              shipped products.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="philosophy-right">
              {PHILOSOPHY.map((p) => (
                <div key={p.label} className="philosophy-item">
                  <div className="philosophy-item-label">{p.label}</div>
                  <p className="philosophy-item-text">{p.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconTwitter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    alert(
      "Message received! Wire this to Formspree or your preferred backend.",
    );
  };
  return (
    <section className="section" id="contact">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">05 — Let's Talk</div>
          <h2 className="section-title">
            Build something <em>great</em>
          </h2>
        </FadeUp>
        <div className="contact-grid">
          <FadeUp delay={0.1}>
            <a
              href="mailto:adeyanjuolamilekan080@gmail.com"
              className="contact-email"
            >
              adeyanjuolamilekan080@gmail.com
            </a>
            <div className="contact-links">
              <a
                href="https://github.com/Ade-yanju"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconGithub /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconLinkedin /> LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconTwitter /> Twitter / X
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <form className="contact-right" onSubmit={submit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={change}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={change}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={change}
                />
              </div>
              <button type="submit" className="btn-primary btn-full">
                Send message →
              </button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-copy">
          © 2026 Olamilekan Ogunyade. Built from scratch.
        </div>
        <div className="footer-right">
          <span>{time}</span>
          <a
            href="https://github.com/Ade-yanju"
            target="_blank"
            rel="noopener noreferrer"
          >
            /github
          </a>
          <a href="mailto:adeyanjuolamilekan080@gmail.com">/mail</a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [theme, setTheme] = useState(() => {
    const saved =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("portfolio-theme")
        : null;
    return (
      saved ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof localStorage !== "undefined")
      localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="port">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <Cursor />
      <SideDots />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Ticker />
      <Projects />
      <Stack />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
