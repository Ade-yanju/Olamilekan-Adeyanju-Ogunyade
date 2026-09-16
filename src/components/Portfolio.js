/**
 * Olamilekan Ogunyade — Portfolio 2026
 * Client-first portfolio: clear case studies, WhatsApp products and
 * responsive light/dark presentation, everything inline.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import profileImage from "../assets/profile.jpg";

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

/* ── CLIENT-FIRST REFRESH ── */
:root{
  --bg:#f7f6f2;--bg2:#eeece6;--bg3:#e3e0d9;
  --border:rgba(13,27,42,.1);--border2:rgba(13,27,42,.18);
  --text:#0d1b2a;--muted:#7b817f;--subtle:#4f5d68;
  --accent:#155eef;--accent2:#168a68;--yellow:#e6a533;
  --radius:14px;--card-bg:#fffefa;
  --shadow:0 14px 40px rgba(13,27,42,.08),0 2px 8px rgba(13,27,42,.05);
}
[data-theme="dark"]{
  --bg:#0b1118;--bg2:#101923;--bg3:#172330;
  --border:rgba(241,245,242,.09);--border2:rgba(241,245,242,.17);
  --text:#f1f5f2;--muted:#82909c;--subtle:#b1bcc2;
  --accent:#80a8ff;--accent2:#5de0b0;--yellow:#f5c451;--card-bg:#101923;
  --shadow:0 18px 50px rgba(0,0,0,.25),0 2px 8px rgba(0,0,0,.2);
}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);}
.port::after{background-image:linear-gradient(rgba(21,94,239,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(21,94,239,.025) 1px,transparent 1px);background-size:96px 96px;}
.container{max-width:1240px;}
.topnav{background:rgba(247,246,242,.82);}
[data-theme="dark"] .topnav{background:rgba(11,17,24,.84);}
.nav-inner{height:74px;}
.mobile-menu{inset:74px 0 0;}
.nav-logo{font-family:var(--font-display);font-weight:800;font-size:15px;letter-spacing:-.04em;color:var(--text);}
.nav-logo .acc{color:var(--accent);}
.nav-links{gap:30px;}
.nav-links a{font-size:10px;letter-spacing:.1em;}
.hero{min-height:92vh;padding-top:74px;}
.hero-grid{grid-template-columns:minmax(0,1fr) minmax(390px,470px);gap:70px;}
.availability{border-radius:999px;padding:10px 16px;margin-bottom:26px;background:rgba(22,138,104,.08);}
.hero-eyebrow{font-size:10px;color:var(--accent);margin-bottom:22px;}
.hero-eyebrow::before{background:var(--accent);}
.hero-name{font-size:clamp(50px,7.3vw,94px);line-height:.94;letter-spacing:-.07em;margin-bottom:28px;}
.line2{font-size:clamp(48px,6.4vw,84px);color:var(--accent);letter-spacing:-.055em;}
.hero-desc{font-size:clamp(16px,1.45vw,19px);line-height:1.65;max-width:590px;color:var(--subtle);border-left:3px solid rgba(21,94,239,.3);padding-left:20px;margin-bottom:34px;}
.hero-ctas{margin-bottom:40px;}
.btn-primary{border-radius:999px;padding:15px 24px;box-shadow:0 8px 20px rgba(21,94,239,.16);}
.btn-ghost{border-radius:999px;padding:15px 24px;}
.hero-stats{border-radius:16px;overflow:hidden;box-shadow:var(--shadow);}
.stat{padding:20px 18px;}
.stat-num{font-size:30px;}
.hero-visual{position:relative;min-height:505px;display:flex;align-items:center;justify-content:center;}
.hero-visual::before{content:'';position:absolute;width:360px;height:360px;border-radius:50%;background:rgba(21,94,239,.1);filter:blur(12px);top:55px;right:10px;}
[data-theme="dark"] .hero-visual::before{background:rgba(128,168,255,.12);}
.hero-card-back{position:absolute;right:0;top:30px;width:82%;height:88%;border:1px solid var(--border2);border-radius:28px;transform:rotate(5deg);background:var(--bg2);}
.product-window{position:relative;z-index:1;width:min(100%,430px);background:var(--card-bg);border:1px solid var(--border2);border-radius:22px;box-shadow:0 30px 70px rgba(13,27,42,.18);overflow:hidden;transform:rotate(-2deg);}
.product-window-top{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid var(--border);background:var(--bg2);font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;}
.window-logo{width:26px;height:26px;object-fit:contain;border-radius:8px;background:#101923;padding:3px;}
.window-live{margin-left:auto;color:var(--accent2);display:flex;align-items:center;gap:6px;}
.window-live::before{content:'';width:7px;height:7px;background:var(--accent2);border-radius:50%;}
.product-window-body{padding:26px 24px 24px;}
.window-kicker{font-family:var(--font-mono);font-size:10px;letter-spacing:.11em;color:var(--accent);text-transform:uppercase;margin-bottom:10px;}
.product-window h3{font-size:30px;line-height:1;letter-spacing:-.055em;max-width:300px;margin-bottom:22px;}
.mini-kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;}
.mini-kpi{padding:12px 10px;border:1px solid var(--border);border-radius:10px;background:var(--bg2);}
.mini-kpi strong{display:block;font-size:17px;letter-spacing:-.04em;margin-bottom:4px;}
.mini-kpi span{font-family:var(--font-mono);font-size:8px;color:var(--muted);line-height:1.3;text-transform:uppercase;}
.whatsapp-card{display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;background:#e8f7f0;border:1px solid rgba(22,138,104,.18);color:#145f4b;}
[data-theme="dark"] .whatsapp-card{background:rgba(93,224,176,.08);color:var(--accent2);}
.whatsapp-icon{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#1aa26e;color:white;font-size:16px;font-weight:800;}
.whatsapp-card strong{display:block;font-size:12px;margin-bottom:2px;}
.whatsapp-card span{font-family:var(--font-mono);font-size:9px;opacity:.78;}
.hero-note{position:absolute;z-index:2;bottom:30px;left:-22px;display:flex;align-items:center;gap:12px;padding:12px 15px;background:var(--card-bg);border:1px solid var(--border2);border-radius:14px;box-shadow:var(--shadow);font-size:12px;color:var(--subtle);}
.hero-avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;object-position:center top;border:2px solid var(--card-bg);}
.hero-note strong{display:block;color:var(--text);font-size:11px;margin-bottom:2px;}
.hero-note span{font-family:var(--font-mono);font-size:9px;color:var(--muted);}
.ticker-wrap{margin:38px 0 96px;background:var(--bg2);}
.ticker-item{font-size:10px;}
.section{padding:112px 0;}
.section-header{max-width:760px;}
.section-title{letter-spacing:-.06em;}
.section-title em{color:var(--accent);}
.metric-row{border-radius:16px;overflow:hidden;box-shadow:var(--shadow);}
.metric{padding:26px 22px;}
.metric-val{color:var(--text);}
.project-tabs-wrap{margin-bottom:34px;}
.tab-list{border-radius:999px;padding:4px;}
.tab-btn{border:none;border-radius:999px;padding:11px 22px;}
.tab-btn.active{background:var(--text);color:var(--bg);}
.tab-btn.active::after{display:none;}
.ace-card-wrap,.ace-card-inner,.border-beam-wrap,.border-beam-inner{border-radius:22px;}
.project-featured-content{padding:48px;}
.project-featured-visual{background:linear-gradient(145deg,var(--bg2),var(--bg3));padding:32px;min-height:320px;}
.project-featured:hover .project-featured-content{background:var(--bg2);}
.project-card{padding:34px;border-radius:0;}
.project-name{font-size:clamp(22px,2.2vw,30px);}
.project-desc{font-size:14px;line-height:1.75;}
.tag{border-radius:999px;padding:5px 10px;}
.live-badge{border-radius:999px;}
.arch-box{font-size:11px;max-width:300px;}
.case-preview{width:100%;max-width:360px;padding:22px;background:var(--card-bg);border:1px solid var(--border2);border-radius:18px;box-shadow:var(--shadow);}
.case-preview-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;font-family:var(--font-mono);font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;}
.case-preview-title{font-size:22px;line-height:1.05;letter-spacing:-.05em;margin-bottom:18px;}
.case-preview-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-top:1px solid var(--border);font-family:var(--font-mono);font-size:10px;color:var(--muted);}
.case-preview-row strong{font-family:var(--font-display);font-size:13px;color:var(--text);}
.case-preview-status{color:var(--accent2)!important;}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.service-card{height:100%;padding:28px;background:var(--card-bg);border:1px solid var(--border);border-radius:18px;box-shadow:var(--shadow);transition:transform .25s,border-color .25s,background .25s;}
.service-card:hover{transform:translateY(-5px);border-color:var(--accent);}
.service-number{font-family:var(--font-mono);font-size:10px;color:var(--accent);letter-spacing:.12em;margin-bottom:28px;}
.service-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:rgba(21,94,239,.1);color:var(--accent);font-size:20px;margin-bottom:20px;}
.service-card h3{font-size:22px;letter-spacing:-.045em;margin-bottom:12px;}
.service-card p{font-size:13px;line-height:1.7;color:var(--subtle);margin-bottom:20px;}
.service-card ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
.service-card li{font-family:var(--font-mono);font-size:10px;color:var(--muted);display:flex;gap:8px;align-items:flex-start;line-height:1.4;}
.service-card li::before{content:'✓';color:var(--accent2);font-weight:700;}
.stack-grid,.contact-right{border-radius:18px;overflow:hidden;box-shadow:var(--shadow);}
.stack-cell{padding:32px 26px;}
.skill-pill{border-radius:999px;}
.philosophy-text{font-size:clamp(19px,2vw,26px);}
.contact-right{background:var(--card-bg);padding:36px;}
.social-link{border-radius:999px;}
.footer-inner{max-width:1240px;}
@media(max-width:1024px){
  .hero-grid{grid-template-columns:1fr;}.hero-right{display:block;max-width:560px;margin:0 auto;width:100%;}
  .hero-visual{min-height:440px;}.services-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:640px){
  .section{padding:72px 0;}.hero{padding-top:96px;min-height:auto;}.hero-right{display:block;}.hero-visual{min-height:395px;}.product-window{width:94%;}.hero-note{left:-2px;bottom:8px;}.hero-card-back{width:84%;height:86%;}
  .mini-kpi strong{font-size:14px;}.product-window h3{font-size:25px;}.services-grid{grid-template-columns:1fr;}.project-featured-content{padding:30px 22px;}.project-featured-visual{padding:22px;}.project-card{padding:28px 20px;}.case-preview{max-width:none;}.ticker-wrap{margin:48px 0;}.contact-right{padding:24px 20px;}.tab-list{overflow-x:auto;}.tab-btn{padding:10px 8px;font-size:9px;letter-spacing:.03em;min-width:0;}
}

/* ── CLEAN, HUMAN-FIRST UI ── */
.port::before,.port::after{display:none;}
.cursor,.cursor-ring{display:none!important;}
.blob{display:none;}
body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.5;}
.section{scroll-margin-top:90px;}
.container{max-width:1180px;}
.topnav{background:rgba(255,255,255,.9);backdrop-filter:blur(16px);}
[data-theme="dark"] .topnav{background:rgba(16,25,35,.92);}
.nav-inner{height:70px;}
.mobile-menu{inset:70px 0 0;}
.nav-logo{font-family:inherit;font-weight:700;letter-spacing:-.04em;font-size:16px;}
.nav-logo .acc{color:var(--accent2);}
.side-nav{display:none;}
.nav-links{gap:28px;}
.nav-links a{font-family:inherit;font-size:13px;letter-spacing:0;text-transform:none;color:var(--subtle);}
.nav-links a:hover{color:var(--accent);}
.nav-status{font-family:inherit;font-size:12px;}
.status-dot{width:7px;height:7px;}
.theme-btn{font-family:inherit;font-size:12px;letter-spacing:0;padding:8px 13px;border-radius:10px;}
.section{padding:104px 0;}
.section-index{font-family:inherit;font-size:13px;letter-spacing:0;text-transform:none;color:var(--accent2);margin-bottom:14px;}
.section-index::after{display:none;}
.section-title{font-size:clamp(34px,4.4vw,58px);font-weight:700;letter-spacing:-.065em;line-height:1.04;}
.section-title em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--accent);}
.hero{min-height:88vh;padding-top:70px;}
.hero-grid{grid-template-columns:minmax(0,1.05fr) minmax(370px,.85fr);gap:78px;}
.availability{font-family:inherit;font-size:12px;letter-spacing:0;text-transform:none;color:var(--accent2);border:1px solid rgba(22,138,104,.18);padding:9px 14px;margin-bottom:25px;background:rgba(22,138,104,.06);}
.hero-eyebrow{font-family:inherit;font-size:14px;letter-spacing:0;text-transform:none;color:var(--subtle);margin-bottom:18px;}
.hero-eyebrow::before{width:28px;background:var(--accent2);}
.hero-name{font-family:inherit;font-size:clamp(48px,6.7vw,86px);font-weight:700;line-height:.98;letter-spacing:-.075em;margin-bottom:25px;max-width:800px;}
.line2{font-family:var(--font-serif);font-style:italic;font-size:clamp(50px,6.3vw,82px);font-weight:400;line-height:1.02;letter-spacing:-.045em;color:var(--accent);}
.hero-desc{font-family:inherit;font-size:clamp(16px,1.35vw,18px);line-height:1.7;max-width:570px;color:var(--subtle);border:0;padding:0;margin-bottom:33px;}
.hero-ctas{gap:11px;margin-bottom:38px;}
.btn-primary,.btn-ghost{font-family:inherit;font-size:14px;font-weight:600;letter-spacing:0;text-transform:none;border-radius:10px;padding:14px 20px;}
.btn-primary{box-shadow:0 8px 24px rgba(21,94,239,.16);}
.btn-ghost{color:var(--text);background:var(--card-bg);}
.btn-ghost:hover{background:var(--bg2);}
.hero-stats{border-radius:14px;box-shadow:0 8px 24px rgba(13,27,42,.06);}
.stat{padding:18px 16px;}
.stat-num{font-size:26px;}
.stat-label{font-family:inherit;font-size:11px;letter-spacing:0;text-transform:none;color:var(--muted);line-height:1.3;}
.hero-visual{min-height:490px;}
.hero-visual::before{width:330px;height:330px;background:rgba(22,138,104,.1);filter:blur(28px);top:68px;right:25px;}
[data-theme="dark"] .hero-visual::before{background:rgba(93,224,176,.1);}
.hero-card-back{right:2%;top:42px;width:79%;height:82%;border-radius:24px;transform:rotate(3deg);background:var(--bg2);}
.product-window{width:min(100%,420px);border-radius:18px;box-shadow:0 24px 55px rgba(13,27,42,.14);transform:none;}
.product-window-top{padding:14px 17px;font-family:inherit;font-size:11px;letter-spacing:0;text-transform:none;}
.window-logo{border-radius:7px;}
.window-live{font-family:inherit;font-size:11px;}
.product-window-body{padding:24px 22px 22px;}
.window-kicker{font-family:inherit;font-size:12px;letter-spacing:0;text-transform:none;margin-bottom:9px;}
.product-window h3{font-family:inherit;font-size:29px;line-height:1.02;letter-spacing:-.06em;}
.mini-kpi{border-radius:9px;}
.mini-kpi strong{font-size:16px;}
.mini-kpi span{font-family:inherit;font-size:10px;letter-spacing:0;text-transform:none;}
.whatsapp-card{border-radius:10px;}
.whatsapp-card strong{font-size:13px;}
.whatsapp-card span{font-family:inherit;font-size:10px;}
.hero-note{font-family:inherit;border-radius:12px;}
.hero-note strong{font-size:12px;}
.hero-note span{font-family:inherit;font-size:10px;}
.ticker-wrap{margin:26px 0 0;background:transparent;border-color:var(--border);}
.ticker-track{animation:none;width:100%;justify-content:center;flex-wrap:wrap;gap:10px 34px;}
.ticker-item{font-family:inherit;font-size:13px;letter-spacing:0;text-transform:none;color:var(--subtle);}
.ticker-item::before{font-size:8px;color:var(--accent2);}
.metric-row{border-radius:14px;box-shadow:0 8px 24px rgba(13,27,42,.05);}
.metric{padding:24px 20px;}
.metric-val{font-size:32px;}
.metric-key{font-family:inherit;font-size:11px;letter-spacing:0;text-transform:none;line-height:1.3;}
.project-tabs-wrap{margin-bottom:30px;}
.tab-list{border:0;border-radius:10px;padding:4px;background:var(--bg2);}
.tab-btn{font-family:inherit;font-size:13px;letter-spacing:0;text-transform:none;border-radius:8px;padding:10px 16px;}
.tab-btn.active{background:var(--card-bg);color:var(--text);box-shadow:0 2px 8px rgba(13,27,42,.08);}
.project-featured-content{padding:42px;}
.project-featured-visual{background:var(--bg2);padding:30px;min-height:300px;}
.ace-card-wrap,.ace-card-inner,.border-beam-wrap,.border-beam-inner{border-radius:18px;}
.ace-card-wrap::before{display:none;}
.border-beam::before{display:none;}
.project-index{font-family:inherit;font-size:12px;letter-spacing:0;color:var(--accent2);margin-bottom:13px;}
.project-name{font-family:inherit;font-size:clamp(23px,2.3vw,31px);font-weight:700;letter-spacing:-.055em;}
.project-desc{font-family:inherit;font-size:14px;line-height:1.75;}
.project-tags{gap:7px;}
.tag{font-family:inherit;font-size:11px;letter-spacing:0;text-transform:none;padding:5px 10px;background:var(--bg2);}
.project-link{font-family:inherit;font-size:13px;letter-spacing:0;text-transform:none;}
.live-badge{font-family:inherit;font-size:10px;letter-spacing:0;text-transform:none;padding:5px 10px;}
.case-preview{border-radius:15px;box-shadow:0 15px 30px rgba(13,27,42,.09);}
.case-preview-top,.case-preview-row{font-family:inherit;font-size:11px;letter-spacing:0;text-transform:none;}
.case-preview-title{font-family:inherit;font-size:23px;letter-spacing:-.06em;}
.case-preview-row strong{font-family:inherit;font-size:13px;}
.service-card{border-radius:16px;box-shadow:0 8px 24px rgba(13,27,42,.05);}
.service-number{font-family:inherit;font-size:12px;letter-spacing:0;margin-bottom:25px;}
.service-icon{border-radius:10px;}
.service-card h3{font-family:inherit;font-size:23px;letter-spacing:-.055em;}
.service-card p{font-family:inherit;font-size:14px;line-height:1.7;}
.service-card li{font-family:inherit;font-size:12px;}
.stack-grid{border-radius:16px;box-shadow:0 8px 24px rgba(13,27,42,.05);}
.stack-layer{font-family:inherit;font-size:12px;letter-spacing:0;text-transform:none;}
.stack-cell-title{font-family:inherit;font-size:19px;}
.stack-item-row{font-family:inherit;font-size:12px;}
.skill-pill{font-family:inherit;font-size:12px;letter-spacing:0;padding:7px 13px;}
.timeline-date,.timeline-company{font-family:inherit;font-size:12px;letter-spacing:0;}
.timeline-company{color:var(--accent2);}
.timeline-role{font-family:inherit;letter-spacing:-.04em;}
.timeline-body{font-family:inherit;font-size:14px;line-height:1.75;}
.philosophy-text{font-family:inherit;font-size:clamp(19px,2vw,26px);line-height:1.5;}
.philosophy-item-label{font-family:inherit;font-size:12px;letter-spacing:0;text-transform:none;}
.philosophy-item-text{font-family:inherit;font-size:14px;}
.contact-email{font-family:inherit;font-size:15px;}
.contact-intro{max-width:450px;color:var(--subtle);font-size:clamp(17px,1.7vw,21px);line-height:1.6;margin-bottom:28px;}
.social-link{font-family:inherit;font-size:13px;letter-spacing:0;text-transform:none;border-radius:10px;}
.contact-right{border-radius:16px;box-shadow:0 8px 24px rgba(13,27,42,.05);}
.form-label{font-family:inherit;font-size:12px;letter-spacing:0;text-transform:none;}
.form-input,.form-textarea{font-family:inherit;font-size:14px;border-radius:9px;}
.footer-copy,.footer-right{font-family:inherit;font-size:12px;}
.footer-right a{font-family:inherit;}
a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid rgba(21,94,239,.45);outline-offset:3px;}
@media(max-width:1024px){
  .hero-grid{gap:40px;}.hero-visual{min-height:430px;}
}
@media(max-width:640px){
  .section{padding:76px 0;}.hero{padding-top:92px;}.hero-grid{gap:20px;}.hero-name{font-size:clamp(44px,12vw,61px);}.line2{font-size:clamp(46px,11.5vw,60px);}.hero-desc{font-size:16px;}.hero-visual{min-height:390px;}.product-window{width:94%;}.hero-note{left:0;bottom:5px;}.hero-card-back{width:82%;height:84%;}.project-featured-content{padding:30px 22px;}.project-featured-visual{padding:22px;}.metric{padding:19px 14px;}.metric-val{font-size:27px;}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto;}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
  .fade-up{opacity:1;transform:none;}
}

/* ── PREMIUM EDITORIAL SYSTEM ── */
:root{
  --bg:#f8f4ed;--bg2:#efe7dc;--bg3:#e2d5c7;--card-bg:#fffdf8;
  --text:#201b18;--subtle:#5e5750;--muted:#8b8075;
  --border:rgba(32,27,24,.12);--border2:rgba(32,27,24,.22);
  --accent:#bf5e47;--accent2:#2f765e;--yellow:#d8a74d;
  --radius:18px;--shadow:0 18px 45px rgba(83,58,36,.1),0 3px 9px rgba(83,58,36,.06);
  --ink-surface:#201b18;--green-surface:#2f765e;--green-ink:#fffaf1;
  color-scheme:light;
}
[data-theme="dark"]{
  --bg:#151311;--bg2:#201c19;--bg3:#2c2520;--card-bg:#211d1a;
  --text:#fff8ee;--subtle:#d1c4b7;--muted:#a99a8b;
  --border:rgba(255,248,238,.11);--border2:rgba(255,248,238,.2);
  --accent:#f08a6d;--accent2:#78c09f;--yellow:#ecc16a;
  --shadow:0 22px 55px rgba(0,0,0,.25),0 3px 10px rgba(0,0,0,.18);
  --ink-surface:#0e100f;--green-surface:#183d31;--green-ink:#fff8ee;
  color-scheme:dark;
}
html{background:var(--bg);}
body{font-family:Arial,"Helvetica Neue",sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;}
.port{background:var(--bg);}
.topnav{background:rgba(248,244,237,.94);border-color:var(--border);backdrop-filter:blur(18px);}
[data-theme="dark"] .topnav{background:rgba(21,19,17,.95);}
.nav-inner{height:82px;max-width:1240px;}
.nav-logo{font-family:var(--font-display);font-size:18px;font-weight:800;letter-spacing:-.06em;color:var(--text);}
.nav-logo .acc{color:var(--accent);}
.nav-links{gap:32px;}
.nav-links a{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;color:var(--subtle);transition:color .2s;}
.nav-links a:hover{color:var(--accent);}
.nav-status{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;color:var(--subtle);}
.theme-btn{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;color:var(--text);background:var(--card-bg);border-color:var(--border2);border-radius:999px;}
.theme-btn:hover{color:var(--accent);border-color:var(--accent);}
.hamburger span{background:var(--text);}
.mobile-menu{background:var(--bg);}
[data-theme="dark"] .mobile-menu{background:var(--bg);}
.mobile-menu a{font-family:var(--font-display);font-size:28px;letter-spacing:-.04em;text-transform:none;color:var(--text);}
.mobile-menu a:hover{color:var(--accent);}
.section{padding:132px 0;}
.section.bg2{background:var(--bg2);}
.section.bordered{border-color:var(--border);}
.section-index{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;color:var(--accent);font-weight:700;letter-spacing:.01em;}
.section-title{font-family:var(--font-serif);font-size:clamp(42px,5.4vw,72px);font-weight:400;letter-spacing:-.055em;line-height:.98;}
.section-title em{font-family:var(--font-serif);color:var(--accent);}
#hero{background:radial-gradient(circle at 83% 35%,rgba(216,167,77,.14),transparent 30%),var(--bg);}
.hero{min-height:92vh;padding-top:82px;}
.hero-grid{grid-template-columns:minmax(0,1.1fr) minmax(390px,.9fr);gap:86px;}
.availability{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;font-weight:700;color:var(--accent2);background:rgba(47,118,94,.08);border:1px solid rgba(47,118,94,.2);padding:10px 15px;border-radius:999px;}
.hero-eyebrow{font-family:Arial,"Helvetica Neue",sans-serif;font-size:14px;color:var(--subtle);letter-spacing:.01em;text-transform:none;}
.hero-eyebrow::before{background:var(--accent);height:2px;}
.hero-name{font-family:var(--font-serif);font-size:clamp(58px,8vw,108px);font-weight:400;line-height:.88;letter-spacing:-.07em;max-width:820px;}
.line2{font-family:var(--font-serif);font-size:clamp(60px,7.3vw,98px);font-style:italic;color:var(--accent);letter-spacing:-.065em;line-height:.98;}
.hero-desc{font-family:Arial,"Helvetica Neue",sans-serif;font-size:clamp(17px,1.45vw,20px);line-height:1.65;color:var(--subtle);max-width:590px;}
.hero-ctas{gap:12px;}
.btn-primary,.btn-ghost{font-family:Arial,"Helvetica Neue",sans-serif;font-size:14px;font-weight:700;letter-spacing:0;text-transform:none;border-radius:10px;padding:15px 22px;}
.btn-primary{background:var(--accent);color:#fffaf1;box-shadow:0 12px 24px rgba(191,94,71,.2);}
.btn-primary:hover{background:#a84e3a;box-shadow:0 16px 30px rgba(191,94,71,.26);}
[data-theme="dark"] .btn-primary:hover{background:#f59b7e;}
.btn-ghost{color:var(--text);background:transparent;border-color:var(--border2);}
.btn-ghost:hover{color:var(--accent);background:var(--card-bg);border-color:var(--accent);}
.hero-stats{border-radius:14px;background:var(--border);border-color:var(--border);box-shadow:var(--shadow);}
.stat{background:var(--card-bg);padding:20px 18px;}
.stat-num{font-family:var(--font-serif);font-weight:400;font-size:34px;color:var(--accent);}
.stat-label{font-family:Arial,"Helvetica Neue",sans-serif;font-size:11px;letter-spacing:0;text-transform:none;color:var(--subtle);}
.hero-visual{min-height:520px;}
.hero-visual::before{background:rgba(191,94,71,.12);filter:blur(40px);}
.hero-card-back{background:var(--bg3);border-color:rgba(191,94,71,.28);border-radius:30px;transform:rotate(4deg);}
.product-window{background:var(--card-bg);border-color:var(--border2);border-radius:22px;box-shadow:0 28px 65px rgba(83,58,36,.15);}
.product-window-top{background:var(--ink-surface);color:#f7eee3;border-bottom:0;border-radius:21px 21px 0 0;padding:15px 18px;}
.window-logo{background:#faf0db;}
.window-live{color:#91d7b5;}
.product-window-body{padding:28px 25px 25px;}
.window-kicker{color:var(--accent2);font-weight:700;}
.product-window h3{font-family:var(--font-serif);font-size:35px;font-weight:400;line-height:.98;}
.mini-kpi{background:var(--bg2);border-color:var(--border);}
.mini-kpi strong{font-family:var(--font-serif);font-weight:400;font-size:22px;color:var(--accent);}
.whatsapp-card{background:rgba(47,118,94,.11);border-color:rgba(47,118,94,.22);color:var(--accent2);}
[data-theme="dark"] .whatsapp-card{background:rgba(120,192,159,.12);}
.hero-note{background:var(--ink-surface);border:0;color:#eadfd4;box-shadow:0 18px 35px rgba(32,27,24,.18);}
.hero-note strong{color:#fffaf1;}
.hero-note span{color:#c6b6a7;}
.ticker-wrap{border-color:var(--border);padding:20px 0;margin:36px 0 0;}
.ticker-item{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;color:var(--subtle);}
.ticker-item::before{color:var(--accent);}
.metric-row{background:var(--border);border-color:var(--border);border-radius:15px;box-shadow:var(--shadow);}
.metric{background:var(--card-bg);padding:28px 22px;}
.metric-val{font-family:var(--font-serif);font-size:42px;font-weight:400;color:var(--accent);}
.metric-key{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;letter-spacing:0;text-transform:none;color:var(--subtle);}
.tab-list{background:var(--bg3);border-radius:12px;padding:5px;}
.tab-btn{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;font-weight:700;color:var(--subtle);border-radius:9px;padding:11px 18px;}
.tab-btn.active{background:var(--accent);color:#fffaf1;box-shadow:none;}
.project-featured{border-radius:22px;}
.project-featured-content{background:var(--card-bg);padding:50px;}
.project-featured:hover .project-featured-content{background:var(--card-bg);}
.project-featured-visual{background:var(--bg3);border-left:0;padding:36px;min-height:350px;}
.border-beam-inner{background:var(--card-bg);}
.project-index{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;font-weight:700;color:var(--accent2);letter-spacing:0;}
.project-name{font-family:var(--font-serif);font-size:clamp(30px,3.2vw,45px);font-weight:400;letter-spacing:-.055em;}
.project-desc{font-family:Arial,"Helvetica Neue",sans-serif;font-size:15px;line-height:1.75;color:var(--subtle);}
.tag{font-family:Arial,"Helvetica Neue",sans-serif;font-size:11px;color:var(--subtle);border-color:var(--border2);background:transparent;}
.project-link{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;font-weight:700;color:var(--accent);}
.live-badge{font-family:Arial,"Helvetica Neue",sans-serif;font-weight:700;color:var(--accent2);border-color:rgba(47,118,94,.32);}
.case-preview{background:var(--card-bg);border-color:var(--border2);box-shadow:var(--shadow);}
.case-preview-title{font-family:var(--font-serif);font-weight:400;font-size:27px;}
.case-preview-top,.case-preview-row{font-family:Arial,"Helvetica Neue",sans-serif;color:var(--subtle);}
.case-preview-row strong{font-family:Arial,"Helvetica Neue",sans-serif;font-weight:700;color:var(--text);}
.services-grid{gap:20px;}
.service-card{background:var(--card-bg);border-color:var(--border);border-radius:18px;box-shadow:var(--shadow);padding:32px;}
.service-card:nth-child(1){background:#fffaf2;}
.service-card:nth-child(2){background:#f5faf5;}
.service-card:nth-child(3){background:#fff5f0;}
[data-theme="dark"] .service-card:nth-child(1){background:#28211b;}
[data-theme="dark"] .service-card:nth-child(2){background:#1b2922;}
[data-theme="dark"] .service-card:nth-child(3){background:#2a201d;}
.service-number{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;font-weight:700;color:var(--accent2);}
.service-icon{background:var(--accent);color:#fffaf1;border-radius:12px;}
.service-card:nth-child(2) .service-icon{background:var(--accent2);}
.service-card:nth-child(3) .service-icon{background:var(--yellow);color:var(--text);}
.service-card h3{font-family:var(--font-serif);font-size:30px;font-weight:400;letter-spacing:-.055em;}
.service-card p{font-family:Arial,"Helvetica Neue",sans-serif;font-size:15px;color:var(--subtle);line-height:1.7;}
.service-card li{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;color:var(--subtle);}
.service-card li::before{color:var(--accent2);}
#stack{background:var(--green-surface);color:var(--green-ink);border-color:transparent;}
#stack .section-index{color:var(--yellow);}
#stack .section-title{color:var(--green-ink);}
#stack .section-title em{color:var(--yellow);}
#stack .stack-grid{background:rgba(255,250,241,.18);border-color:rgba(255,250,241,.18);box-shadow:none;}
#stack .stack-cell{background:rgba(15,53,40,.3);}
#stack .stack-cell:hover{background:rgba(15,53,40,.5);}
#stack .stack-layer{color:var(--yellow);}
#stack .stack-cell-title{color:var(--green-ink);}
#stack .stack-item-row{color:rgba(255,250,241,.78);}
#stack .stack-item-row::before{color:var(--yellow);}
#stack .skill-pill{color:rgba(255,250,241,.78);border-color:rgba(255,250,241,.22);}
#stack .skill-pill:hover{color:var(--green-ink);border-color:var(--yellow);background:rgba(255,250,241,.08);}
.timeline::before{background:var(--border2);}
.timeline-item::before{background:var(--accent);box-shadow:0 0 0 4px rgba(191,94,71,.16);}
.timeline-item.current::before{background:var(--accent2);box-shadow:0 0 0 4px rgba(47,118,94,.18);}
.timeline-date,.timeline-company{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;}
.timeline-company{color:var(--accent2);font-weight:700;}
.timeline-role{font-family:var(--font-serif);font-weight:400;font-size:28px;letter-spacing:-.05em;}
.timeline-body{font-family:Arial,"Helvetica Neue",sans-serif;font-size:15px;color:var(--subtle);line-height:1.75;}
#about{background:var(--bg3);}
#about .section-title em{color:var(--accent2);}
.philosophy-text{font-family:var(--font-serif);font-size:clamp(26px,2.7vw,38px);font-weight:400;line-height:1.18;letter-spacing:-.045em;}
.philosophy-item{border-left:2px solid rgba(47,118,94,.34);}
.philosophy-item:hover{border-left-color:var(--accent2);}
.philosophy-item-label{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;font-weight:700;color:var(--accent2);}
.philosophy-item-text{font-family:Arial,"Helvetica Neue",sans-serif;font-size:15px;color:var(--subtle);line-height:1.7;}
#contact{background:var(--ink-surface);color:#fffaf1;border-color:transparent;}
#contact .section-index{color:var(--yellow);}
#contact .section-title{color:#fffaf1;}
#contact .section-title em{color:var(--accent);}
.contact-intro{font-family:Arial,"Helvetica Neue",sans-serif;font-size:clamp(18px,1.8vw,23px);color:#ddcfc2;line-height:1.55;}
.contact-email{font-family:Arial,"Helvetica Neue",sans-serif;font-size:16px;color:#fffaf1;}
.contact-email:hover{color:var(--yellow);}
.contact-right{background:#fffaf1;border:0;border-radius:18px;box-shadow:0 22px 50px rgba(0,0,0,.2);}
.form-label{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;font-weight:700;color:#6a5b50;}
.form-input,.form-textarea{font-family:Arial,"Helvetica Neue",sans-serif;font-size:15px;color:#201b18;background:#fff;border-color:#ddcfc2;border-radius:9px;}
.form-input::placeholder,.form-textarea::placeholder{color:#a39487;}
.social-link{font-family:Arial,"Helvetica Neue",sans-serif;font-size:13px;font-weight:700;color:#fffaf1;border-color:rgba(255,250,241,.3);}
.social-link:hover{color:var(--yellow);border-color:var(--yellow);background:transparent;}
footer{background:var(--ink-surface);border-color:rgba(255,250,241,.14);}
.footer-copy,.footer-right{font-family:Arial,"Helvetica Neue",sans-serif;color:#c9baad;}
.footer-right a{font-family:Arial,"Helvetica Neue",sans-serif;color:#fffaf1;}
.footer-right a:hover{color:var(--yellow);}
@media(max-width:1024px){
  .hero-grid{gap:48px;}.hero{min-height:auto;padding-top:118px;padding-bottom:80px;}.project-featured-content{padding:40px;}
}
@media(max-width:640px){
  .nav-inner{height:74px;}.section{padding:88px 0;}.hero{padding-top:105px;padding-bottom:65px;}.hero-name{font-size:clamp(51px,15vw,75px);}.line2{font-size:clamp(54px,14vw,72px);}.hero-desc{font-size:17px;}.hero-visual{min-height:390px;}.product-window h3{font-size:29px;}.hero-note{left:0;}.metric-val{font-size:34px;}.metric-key{font-size:11px;}.project-featured-content{padding:32px 24px;}.project-featured-visual{padding:22px;}.project-name{font-size:34px;}.service-card{padding:27px 23px;}.timeline-role{font-size:26px;}.philosophy-text{font-size:29px;}.contact-right{padding:25px 20px;}
}

/* ── STANDALONE HERO ── */
#hero{min-height:100vh;min-height:100svh;padding:82px 0 54px;display:flex;align-items:center;}
#hero .container{width:100%;}
#hero .hero-grid{grid-template-columns:minmax(0,1.12fr) minmax(360px,.88fr);gap:70px;align-items:center;}
#hero .availability{display:none;}
#hero .hero-eyebrow{margin-bottom:28px;}
#hero .hero-name{font-size:clamp(68px,7.3vw,104px);line-height:.88;max-width:690px;margin-bottom:30px;}
#hero .hero-line{display:block;}
#hero .line2{font-size:clamp(70px,7vw,100px);}
#hero .hero-desc{max-width:515px;margin-bottom:32px;}
#hero .hero-ctas{margin-bottom:35px;}
#hero .hero-stats{display:flex;align-items:center;gap:0;width:max-content;max-width:100%;background:transparent;border:0;box-shadow:none;overflow:visible;}
#hero .stat{display:flex;align-items:baseline;gap:8px;background:transparent;padding:0 18px 0 0;}
#hero .stat:not(:last-child){margin-right:18px;border-right:1px solid var(--border2);}
#hero .stat-num{font-family:Arial,"Helvetica Neue",sans-serif;font-size:18px;font-weight:700;color:var(--text);}
#hero .stat-label{font-size:11px;color:var(--muted);white-space:nowrap;}
#hero .hero-visual{min-height:500px;}
#hero .hero-visual::before{width:380px;height:380px;background:rgba(216,167,77,.16);filter:blur(42px);top:62px;right:10px;}
#hero .hero-card-back,#hero .hero-note{display:none;}
#hero .product-window{width:min(100%,460px);box-shadow:0 30px 70px rgba(32,27,24,.17);}
#hero .product-window-top{padding:16px 20px;}
#hero .product-window-body{padding:31px 28px 29px;}
#hero .product-window h3{font-size:clamp(32px,3vw,46px);max-width:340px;}
#hero .mini-kpi-grid{display:none;}
#hero .whatsapp-card{margin-top:28px;padding:16px;}
#hero .whatsapp-card strong{font-size:14px;}
#hero .whatsapp-card span{font-size:11px;}
#hero .window-logo{width:28px;height:28px;}
#hero .window-live{font-size:10px;}
@media(max-width:1024px){
  #hero{min-height:auto;padding-top:128px;}
  #hero .hero-grid{grid-template-columns:1fr;gap:36px;}
  #hero .hero-right{max-width:520px;margin:0 auto;width:100%;}
}
@media(max-width:640px){
  #hero{padding:112px 0 62px;}
  #hero .hero-eyebrow{font-size:13px;margin-bottom:22px;}
  #hero .hero-name{font-size:clamp(54px,15.5vw,78px);line-height:.9;margin-bottom:24px;}
  #hero .line2{font-size:clamp(57px,14.5vw,76px);}
  #hero .hero-desc{font-size:17px;line-height:1.65;margin-bottom:28px;}
  #hero .hero-ctas{display:flex;flex-direction:column;align-items:stretch;gap:10px;margin-bottom:31px;}
  #hero .btn-primary,#hero .btn-ghost{width:100%;justify-content:center;}
  #hero .hero-stats{width:100%;display:grid;grid-template-columns:repeat(3,1fr);}
  #hero .stat{display:block;padding:0 10px 0 0;}
  #hero .stat:not(:last-child){margin-right:8px;}
  #hero .stat-num{display:block;font-size:17px;margin-bottom:4px;}
  #hero .stat-label{display:block;white-space:normal;line-height:1.25;}
  #hero .hero-visual{min-height:360px;}
  #hero .hero-visual::before{width:285px;height:285px;top:32px;right:8px;}
  #hero .product-window{width:96%;}
  #hero .product-window-body{padding:26px 22px 22px;}
  #hero .product-window h3{font-size:31px;}
}

/* ── REFERENCE PATTERN / MONOCHROME PORTFOLIO ── */
:root{
  --bg:#f2f2ee;--bg2:#e5e5e1;--bg3:#d7d8d3;--card-bg:#fbfbf8;
  --text:#111315;--subtle:#53575b;--muted:#7a7e80;
  --border:rgba(17,19,21,.13);--border2:rgba(17,19,21,.28);
  --accent:#f06449;--accent2:#2c6d57;--yellow:#c5ff58;
  --ink-surface:#0d0f11;--green-surface:#15191a;--green-ink:#f3f4ef;
}
[data-theme="dark"]{
  --bg:#0d0f11;--bg2:#17191b;--bg3:#222527;--card-bg:#191c1e;
  --text:#f2f3ee;--subtle:#c4c8c4;--muted:#8b928e;
  --border:rgba(242,243,238,.13);--border2:rgba(242,243,238,.28);
  --accent:#ff7558;--accent2:#92cbb0;--yellow:#d5ff69;
  --ink-surface:#070809;--green-surface:#111817;--green-ink:#f2f3ee;
}
body{font-family:Arial,"Helvetica Neue",sans-serif;background:var(--bg);color:var(--text);}
.port{background:var(--bg);}
.topnav{background:#0d0f11;border-bottom:1px solid rgba(255,255,255,.14);}
[data-theme="dark"] .topnav{background:#070809;}
.nav-logo{font-family:var(--font-display);font-size:16px;letter-spacing:-.055em;color:#f2f3ee;}
.nav-logo .acc{color:var(--yellow);}
.nav-links a{font-family:Arial,"Helvetica Neue",sans-serif;color:rgba(242,243,238,.68);}
.nav-links a:hover{color:#fff;}
.nav-status{font-family:Arial,"Helvetica Neue",sans-serif;color:rgba(242,243,238,.65);}
.status-dot{background:var(--yellow);}
.theme-btn{font-family:Arial,"Helvetica Neue",sans-serif;color:#f2f3ee;background:transparent;border-color:rgba(242,243,238,.25);}
.theme-btn:hover{color:var(--yellow);border-color:var(--yellow);}
.hamburger span{background:#f2f3ee;}
.mobile-menu{background:#0d0f11;}
[data-theme="dark"] .mobile-menu{background:#070809;}
.mobile-menu a{font-family:var(--font-display);color:#f2f3ee;}
.mobile-menu a:hover{color:var(--yellow);}
.section{padding:128px 0;}
.section.bg2{background:var(--bg2);}
.section.bordered{border-color:var(--border);}
.section-index{font-family:Arial,"Helvetica Neue",sans-serif;font-size:12px;font-weight:700;color:var(--accent);letter-spacing:.03em;}
.section-title{font-family:var(--font-display);font-size:clamp(42px,5vw,74px);font-weight:800;letter-spacing:-.075em;line-height:.92;}
.section-title em{font-family:var(--font-serif);font-weight:400;color:var(--accent);}
#hero{background:#0d0f11;color:#f2f3ee;min-height:100vh;min-height:100svh;padding:82px 0 60px;}
#hero .hero-grid{grid-template-columns:minmax(0,1fr) minmax(360px,.82fr);gap:74px;}
#hero .hero-eyebrow{font-family:Arial,"Helvetica Neue",sans-serif;color:rgba(242,243,238,.66);}
#hero .hero-eyebrow::before{background:var(--yellow);}
#hero .hero-name{font-family:var(--font-display);font-size:clamp(66px,7.3vw,108px);font-weight:800;letter-spacing:-.09em;line-height:.82;max-width:730px;}
#hero .hero-line{color:#f2f3ee;}
#hero .line2{font-family:var(--font-serif);font-size:clamp(70px,7vw,104px);font-style:italic;color:var(--yellow);letter-spacing:-.065em;line-height:.98;}
#hero .hero-desc{font-family:Arial,"Helvetica Neue",sans-serif;color:rgba(242,243,238,.68);font-size:17px;line-height:1.7;max-width:510px;}
#hero .btn-primary{background:#f2f3ee;color:#0d0f11;box-shadow:none;}
#hero .btn-primary:hover{background:var(--yellow);color:#0d0f11;box-shadow:none;}
#hero .btn-ghost{color:#f2f3ee;border-color:rgba(242,243,238,.32);}
#hero .btn-ghost:hover{color:var(--yellow);border-color:var(--yellow);background:transparent;}
#hero .hero-stats{color:#f2f3ee;}
#hero .stat{background:transparent;}
#hero .stat:not(:last-child){border-color:rgba(242,243,238,.26);}
#hero .stat-num{color:#f2f3ee;}
#hero .stat-label{color:rgba(242,243,238,.55);}
#hero .hero-visual{min-height:520px;position:relative;}
#hero .hero-visual::before{width:330px;height:330px;top:92px;right:72px;background:rgba(197,255,88,.12);filter:blur(55px);}
#hero .hero-visual-index{position:absolute;top:4px;right:0;font-family:Arial,"Helvetica Neue",sans-serif;font-size:11px;letter-spacing:.12em;color:rgba(242,243,238,.48);}
#hero .hero-profile-card{position:relative;width:min(100%,390px);height:480px;margin:25px auto 0;overflow:hidden;background:#282b2d;border:1px solid rgba(242,243,238,.28);}
#hero .hero-profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 48%,rgba(5,6,7,.82));pointer-events:none;}
#hero .hero-profile-card img{width:100%;height:100%;object-fit:cover;object-position:center 20%;filter:grayscale(1) contrast(1.05);mix-blend-mode:normal;}
#hero .hero-profile-caption{position:absolute;z-index:1;bottom:23px;left:24px;display:flex;flex-direction:column;gap:4px;}
#hero .hero-profile-caption strong{font-family:var(--font-display);font-size:20px;letter-spacing:-.045em;color:#fff;}
#hero .hero-profile-caption span{font-family:Arial,"Helvetica Neue",sans-serif;font-size:11px;color:rgba(255,255,255,.65);}
#hero .hero-product-chip{position:absolute;z-index:2;left:0;bottom:12px;display:flex;flex-direction:column;gap:5px;width:220px;padding:17px 18px;background:#f2f3ee;color:#0d0f11;}
#hero .hero-product-chip .chip-label{font-family:Arial,"Helvetica Neue",sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#6b706d;}
#hero .hero-product-chip strong{font-family:var(--font-display);font-size:14px;letter-spacing:-.03em;}
#hero .hero-product-chip > span:last-child{font-family:Arial,"Helvetica Neue",sans-serif;font-size:10px;color:#6b706d;}
.ticker-wrap{background:var(--bg);border-color:var(--border);padding:18px 0;margin:0;}
.ticker-item{font-family:Arial,"Helvetica Neue",sans-serif;color:var(--subtle);font-size:12px;}
.ticker-item::before{color:var(--accent);}
#projects{--text:#f2f3ee;--subtle:#b6bbb7;--muted:#858d88;--border:rgba(242,243,238,.12);--border2:rgba(242,243,238,.25);--card-bg:#171a1c;background:#0d0f11;color:#f2f3ee;}
#projects .section-index{color:var(--yellow);}
#projects .section-title{color:#f2f3ee;}
#projects .section-title em{color:var(--yellow);}
#projects .metric-row{background:var(--border);border-color:var(--border);box-shadow:none;}
#projects .metric{background:#171a1c;}
#projects .metric-val{color:var(--yellow);}
#projects .metric-key{color:var(--muted);}
#projects .tab-list{background:#202426;}
#projects .tab-btn{color:var(--muted);}
#projects .tab-btn.active{background:#f2f3ee;color:#0d0f11;}
#projects .project-featured-content{background:#171a1c;}
#projects .project-featured:hover .project-featured-content{background:#171a1c;}
#projects .project-featured-visual{background:#202426;}
#projects .project-card{background:#171a1c;}
#projects .project-card:hover{background:#202426;}
#projects .project-index{color:var(--yellow);}
#projects .project-desc{color:#b6bbb7;}
#projects .tag{color:#b6bbb7;border-color:rgba(242,243,238,.22);}
#projects .project-link{color:var(--yellow);}
#projects .live-badge{color:#9ee3bc;border-color:rgba(158,227,188,.28);}
#projects .case-preview{background:#f2f3ee;color:#0d0f11;border-color:transparent;box-shadow:none;}
#projects .case-preview-title{color:#0d0f11;}
#projects .case-preview-top,#projects .case-preview-row{color:#646a66;}
#projects .case-preview-row strong{color:#0d0f11;}
#projects .case-preview-status{color:#2c6d57!important;}
#services{background:#f2f2ee;}
#services .section-title em{color:var(--accent);}
#services .service-card,#services .service-card:nth-child(1),#services .service-card:nth-child(2),#services .service-card:nth-child(3){background:#fbfbf8;border-color:var(--border);box-shadow:none;}
#services .service-card:hover{border-color:var(--text);transform:translateY(-4px);}
#services .service-icon{background:#111315;color:#f2f3ee;}
#services .service-card:nth-child(2) .service-icon{background:#2c6d57;}
#services .service-card:nth-child(3) .service-icon{background:var(--accent);color:#fff;}
#services .service-number{color:var(--accent);}
#services .service-card h3{font-family:var(--font-display);font-weight:800;font-size:28px;}
#services .service-card p,#services .service-card li{color:var(--subtle);}
#stack{background:#15191a;color:#f2f3ee;}
#stack .section-index{color:var(--yellow);}
#stack .section-title{color:#f2f3ee;}
#stack .section-title em{color:var(--yellow);}
#stack .stack-grid{background:rgba(242,243,238,.14);border-color:rgba(242,243,238,.14);}
#stack .stack-cell{background:#1b2021;}
#stack .stack-cell:hover{background:#222829;}
#stack .stack-layer{color:var(--yellow);}
#stack .stack-cell-title{color:#f2f3ee;}
#stack .stack-item-row{color:#b7bfba;}
#stack .stack-item-row::before{color:var(--yellow);}
#stack .skill-pill{color:#b7bfba;border-color:rgba(242,243,238,.2);}
#stack .skill-pill:hover{color:#f2f3ee;border-color:var(--yellow);background:rgba(197,255,88,.08);}
#experience{background:#f2f2ee;}
#experience .section-title em{color:var(--accent);}
#experience .timeline-company{color:var(--accent2);}
#experience .timeline-item::before{background:var(--text);box-shadow:0 0 0 4px rgba(17,19,21,.14);}
#experience .timeline-item.current::before{background:var(--accent);box-shadow:0 0 0 4px rgba(240,100,73,.18);}
#about{background:#dfe0dc;}
#about .section-title em{color:var(--accent2);}
#about .philosophy-item{border-left-color:rgba(17,19,21,.22);}
#about .philosophy-item:hover{border-left-color:var(--accent);}
#about .philosophy-item-label{color:var(--text);}
#contact{background:#f2f2ee;color:var(--text);border-color:var(--border);}
#contact .section-index{color:var(--accent);}
#contact .section-title{color:var(--text);}
#contact .section-title em{color:var(--accent);}
#contact .contact-intro{color:var(--subtle);}
#contact .contact-email{color:var(--text);}
#contact .contact-email:hover{color:var(--accent);}
#contact .contact-right{background:#fbfbf8;border:1px solid var(--border);box-shadow:none;}
#contact .social-link{color:var(--text);border-color:var(--border2);}
#contact .social-link:hover{color:var(--accent);border-color:var(--accent);}
#contact .btn-primary{background:#111315;color:#f2f3ee;}
#contact .btn-primary:hover{background:var(--accent);color:#fff;}
footer{background:#0d0f11;border-color:rgba(242,243,238,.16);}
.footer-copy,.footer-right{color:rgba(242,243,238,.58);}
.footer-right a{color:#f2f3ee;}
.footer-right a:hover{color:var(--yellow);}
[data-theme="dark"] #services,[data-theme="dark"] #experience,[data-theme="dark"] #contact{background:#111315;color:#f2f3ee;}
[data-theme="dark"] #about{background:#202426;}
[data-theme="dark"] #services .service-card,[data-theme="dark"] #services .service-card:nth-child(1),[data-theme="dark"] #services .service-card:nth-child(2),[data-theme="dark"] #services .service-card:nth-child(3),[data-theme="dark"] #contact .contact-right{background:#1a1d1f;border-color:rgba(242,243,238,.15);}
[data-theme="dark"] #contact .section-title,[data-theme="dark"] #contact .contact-email{color:#f2f3ee;}
@media(max-width:1024px){
  #hero{padding-top:128px;}.hero-grid{gap:50px;}.hero-profile-card{height:440px;}
}
@media(max-width:640px){
  #hero{padding:112px 0 70px;}.hero-grid{gap:34px;}.hero-name{font-size:clamp(56px,15vw,80px);}.line2{font-size:clamp(60px,14vw,78px);}.hero-profile-card{width:calc(100% - 30px);height:390px;margin-right:0;}.hero-product-chip{left:0;bottom:0;width:205px;}.hero-visual-index{right:10px;}.ticker-track{justify-content:flex-start;gap:10px 24px;}.ticker-item{font-size:11px;}.project-featured-content{padding:30px 24px;}.project-featured-visual{min-height:285px;}.section{padding:92px 0;}
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
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
const SECTIONS = [
  "hero",
  "projects",
  "services",
  "stack",
  "experience",
  "about",
  "contact",
];
const TICKER_ITEMS = [
  "Thoughtful product design",
  "Reliable systems",
  "Simple customer journeys",
  "Built for real people",
  "Web · mobile · WhatsApp",
  "From idea to launch",
];

/* ── PROJECT TABS ── */
const PROJECTS_BY_TAB = {
  Fullstack: {
    featured: {
      index: "Featured product · Credit platform",
      name: "Vodium Ledger",
      desc: "A credit infrastructure product for Nigerian vendors. Credit is recorded in seconds through WhatsApp, reminders go out automatically, and a clear dashboard shows who owes, what is overdue and what has been recovered — with isolated vendor records and NDPR-minded data handling.",
      tags: [
        "Next.js 14",
        "TypeScript",
        "PostgreSQL / Prisma",
        "Docker",
        "Paystack",
        "WhatsApp Cloud API",
        "NDPR-ready workflows",
      ],
      link: "https://vodiumledger.com",
      linkLabel: "View live →",
      live: "Live · PWA",
      arch: [
        "WhatsApp → Guided credit capture",
        "Auto-reminders → Customer replies",
        "Dashboard → Owed · paid · overdue",
        "Isolated vendor records",
        "Secure cloud deployment",
      ],
    },
    cards: [
      {
        id: "Live product · Event ticketing",
        name: "Tictify",
        desc: "Event ticketing for Nigeria with a WhatsApp buying flow — organisers create events, sell multiple ticket types, track sales and withdraw earnings while guests can discover events, pay securely and receive a unique QR ticket without leaving WhatsApp.",
        tags: [
          "React (Vite)",
          "Node.js / Express",
          "MongoDB",
          "Paystack",
          "QR check-in",
          "WhatsApp ticket bot",
          "Sales analytics",
        ],
        link: "https://www.tictify.ng/",
        linkLabel: "View live →",
      },
      {
        id: "University platform",
        name: "DU Alumni Platform",
        desc: "Alumni portal for Dominion University — profile management, discussion forum and admin dashboard on a real-time Firestore backend, with Cloudinary media, responsive UI and secure auth.",
        tags: ["React", "Firebase / Firestore", "Cloudinary", "Vercel"],
        link: "https://du-alumni-steel.vercel.app/",
        linkLabel: "View live →",
      },
    ],
  },
  Automation: {
    featured: {
      index: "Featured product · WhatsApp ticketing",
      name: "Tictify WhatsApp Ticket Bot",
      desc: "A ticket-buying experience inside WhatsApp. Guests can browse live events, type an event name to find it, pay by card, payment link or bank transfer, and receive their QR ticket right in the conversation.",
      tags: [
        "WhatsApp Cloud API",
        "Ticket discovery",
        "Paystack",
        "QR tickets",
        "Node.js",
        "Webhook security",
      ],
      link: "https://www.tictify.ng/",
      linkLabel: "See Tictify live →",
      live: "Live · WhatsApp",
      arch: [
        "WhatsApp → Browse live events",
        "Event name → Ticket selection",
        "Payment → Card · link · transfer",
        "Confirmation → QR ticket in chat",
        "QR scan → Fast gate entry",
      ],
    },
    cards: [
      {
        id: "Live product · Credit workflows",
        name: "Vodium WhatsApp flow",
        desc: "A real product flow that lets vendors add credit in about 15 seconds, then keeps customers on track with respectful due-date reminders and PAID replies.",
        tags: ["WhatsApp", "Credit workflows", "Reminders", "Dashboard"],
        link: "https://www.vodiumledger.com/",
        linkLabel: "See Vodium live →",
      },
      {
        id: "For your business",
        name: "Custom WhatsApp bot systems",
        desc: "Lead capture, booking, support, order updates and internal alerts — designed around the way your customers already ask for help.",
        tags: ["Lead capture", "Support", "Bookings", "Notifications"],
        link: "#contact",
        linkLabel: "Start a conversation →",
      },
    ],
  },
  Mobile: {
    featured: {
      index: "Featured product · Mobile healthcare",
      name: "OMI Health",
      desc: "Bilingual (English / Yoruba) telemedicine app — real-time chat with text, audio and video, doctor–patient matching, appointment booking and text-to-speech for accessibility. Firebase Auth / Firestore / Storage with Cloudinary media and secure role-based login. Live on Android.",
      tags: [
        "React Native",
        "Expo",
        "Firebase",
        "Firestore",
        "Cloudinary",
        "EAS Build",
      ],
      link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
      linkLabel: "Download APK →",
      live: "Live on Android",
      arch: [
        "Firebase Auth → Role-Based Access",
        "React Native (Expo) UI",
        "Firestore Real-Time Sync",
        "Cloudinary Media + Text-to-Speech",
        "EAS Build → APK",
      ],
    },
    cards: [
      {
        id: "Mobile product · Fintech",
        name: "VODIUM",
        desc: "Cross-platform fintech companion app for the Vodium Ledger platform — secure transaction flows, encrypted local state, real-time balance sync, and biometric auth on Android & iOS.",
        tags: ["React Native", "Secure Storage", "REST API", "Biometrics"],
        link: "https://expo.dev/accounts/olamilekan42424242/projects/vodium/builds/e0c811aa-9c81-4367-ac8e-e174167d0f60",
        linkLabel: "Download APK →",
        live: "Live on Android",
      },
    ],
  },
  Frontend: {
    featured: {
      index: "Featured website · Real estate",
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
        id: "Website · Publishing",
        name: "Next to the Mulatto",
        desc: "A novel about discovering who you are and what purpose God has for your life, Written by Gbemisola Akinsipe.",
        tags: ["Next.js", "Paystack", "TypeScript", "Resend", "Stripe"],
        link: "https://www.nexttothemulatto.com/",
        linkLabel: "View live →",
      },
      {
        id: "Website · Event landing page",
        name: "Brownroof Tech Summit",
        desc: "Tech summit landing page with animated hero, event schedule, speaker bios, and registration form — optimized for performance and accessibility.",
        tags: ["Next.js", "Framer Motion", "Tailwind", "SEO"],
        link: "https://brownrooftechsummit.vercel.app/",
        linkLabel: "View live →",
      },
    ],
  },
};

const PROJECT_TAB_LABELS = {
  Fullstack: "Web products",
  Automation: "WhatsApp bots",
  Mobile: "Mobile apps",
  Frontend: "Websites",
};

const STACK = [
  {
    layer: "The experience",
    title: "Web & mobile interfaces",
    items: [
      "React & Next.js 14 (App Router)",
      "React Native (Expo)",
      "TypeScript",
      "Tailwind CSS · Redux",
      "PWA · Figma → Code",
    ],
  },
  {
    layer: "The engine",
    title: "Business logic & APIs",
    items: [
      "Node.js (Express / NestJS)",
      "Laravel (PHP)",
      "REST APIs & Webhooks",
      "Prisma ORM",
      "RBAC · JWT/HMAC · OTP auth",
    ],
  },
  {
    layer: "The foundation",
    title: "Data that stays organised",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Firebase / Firestore",
      "Redis",
      "Supabase",
    ],
  },
  {
    layer: "The follow-through",
    title: "Launch & ongoing care",
    items: [
      "Docker",
      "GitHub Actions CI/CD",
      "Vercel",
      "Sentry monitoring",
      "Cron & background jobs",
    ],
  },
];
const SKILLS = [
  "Paystack",
  "Ercaspay",
  "WhatsApp Cloud API",
  "Resend / Nodemailer",
  "Cloudinary",
  "Signature-Verified Webhooks",
  "AES-256-GCM Encryption",
  "Fail-Closed Rate Limiting",
  "Immutable Audit Logging",
  "Multi-Tenancy",
  "QR + PDF Generation",
  "Recharts",
  "Push Notifications",
  "EAS Build",
  "Git / GitHub",
  "UI/UX · Figma",
  "Data Structures & Algorithms",
  "Application Security",
  "Python",
];
const EXPERIENCE = [
  {
    date: "2023 — Present",
    role: "Full-Stack Product Engineer",
    company: "Independent products",
    body: "Designing, shipping and operating my own production systems — Vodium Ledger (multi-tenant fintech / BNPL SaaS), Tictify (event ticketing) and OMI-Health (bilingual mHealth) — owning architecture, security hardening, CI/CD and cloud deployment end-to-end.",
    current: true,
  },
  {
    date: "Sep 2025 — Feb 2026",
    role: "Full-Stack Developer (Contract)",
    company: "Cyconet",
    body: "Solely built a university portal end-to-end on behalf of the company, and served as the full-stack engineer across 10+ client projects — from database schema and APIs to deployed UI.",
  },
  {
    date: "May 2025 — Aug 2025",
    role: "Web Design Intern",
    company: "FlexiSAF Limited · Remote",
    body: "Delivered weekly UI/UX design deliverables in Figma to product specifications, translating requirements into developer-ready interfaces.",
  },
  {
    date: "2023 & 2024",
    role: "Software Intern (SIWES)",
    company: "Roware Limited",
    body: "Two placements contributing to frontend development and software support on the company's PQAPI project; built foundations in Git, internal tooling and web architecture in a team.",
  },
];
const LEVELING_UP = [
  "System Design",
  "AWS Fundamentals",
  "Kubernetes",
  "LLM & AI integrations",
  "tRPC",
  "Rust",
  "Event-Driven Architecture",
];
const PHILOSOPHY = [
  {
    label: "Careful by default",
    text: "People trust products that protect their information and make the next step clear. I build with secure foundations and thoughtful edge cases.",
  },
  {
    label: "Fast where it matters",
    text: "A fast response feels like respect. I keep experiences quick and comfortable, even when the connection or device is not perfect.",
  },
  {
    label: "Built to last",
    text: "Good work should keep helping after launch. I create foundations that are easy to understand, improve and hand over.",
  },
  {
    label: "Design and code together",
    text: "I care about how a product looks, how it behaves and how it feels in someone’s hands. The details are part of the experience.",
  },
  {
    label: "I take ownership",
    text: "From the first conversation to launch, I stay close to the work and communicate clearly so nothing gets lost along the way.",
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
            Olamilekan<span className="acc">.</span>
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
              Open to select projects
            </div>
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "Light theme" : "Dark theme"}
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
          {theme === "dark" ? "Light theme" : "Dark theme"}
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

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Portrait of Olamilekan Ogunyade, product engineer">
      <div className="hero-visual-index">01 / 06</div>
      <div className="hero-profile-card">
        <img src={profileImage} alt="Olamilekan Ogunyade" />
        <div className="hero-profile-caption">
          <strong>Olamilekan Ogunyade</strong>
          <span>Product engineer · Nigeria</span>
        </div>
      </div>
      <div className="hero-product-chip">
        <span className="chip-label">Selected work</span>
        <strong>Tictify · Vodium Ledger</strong>
        <span>Web · mobile · WhatsApp</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function Ticker() {
  const doubled = TICKER_ITEMS;
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
              Currently available for select projects
            </div>
            <div className="hero-eyebrow">
              Web products, mobile apps &amp; WhatsApp experiences
            </div>
            <h1 className="hero-name">
              <span className="hero-line">Complex ideas.</span>
              <span className="line2">Made simple.</span>
            </h1>
            <p className="hero-desc">
              I’m Olamilekan, a product engineer creating clear, useful
              digital experiences for real people and ambitious businesses —
              from Tictify’s WhatsApp ticket bot to Vodium Ledger’s credit
              platform.
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
                href="#contact"
                className="btn-ghost"
              >
                Let’s work together →
              </a>
            </div>
            <div className="hero-stats">
              {[
                ["15+", "Projects shipped"],
                ["2", "Flagship products live"],
                ["10+", "Client builds delivered"],
              ].map(([n, l]) => (
                <div key={l} className="stat">
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-right"><HeroVisual /></div>
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ featured }) {
  if (featured.name === "Vodium Ledger") {
    return (
      <div className="case-preview">
        <div className="case-preview-top"><span>Vodium / dashboard</span><span className="case-preview-status">● synced</span></div>
        <div className="case-preview-title">Your whole credit book, live.</div>
        <div className="case-preview-row"><span>Owed to you</span><strong>₦142,500</strong></div>
        <div className="case-preview-row"><span>Recovered this month</span><strong>₦38,000</strong></div>
        <div className="case-preview-row"><span>Recovery rate</span><strong className="case-preview-status">71%</strong></div>
      </div>
    );
  }
  if (featured.name === "Tictify" || featured.name === "Tictify WhatsApp Ticket Bot") {
    return (
      <div className="case-preview">
        <div className="case-preview-top"><span>Tictify / WhatsApp</span><span className="case-preview-status">● online</span></div>
        <div className="case-preview-title">Buy tickets without leaving WhatsApp.</div>
        <div className="case-preview-row"><span>Find an event</span><strong>Type a name</strong></div>
        <div className="case-preview-row"><span>Payment</span><strong>Card · link · transfer</strong></div>
        <div className="case-preview-row"><span>Delivery</span><strong className="case-preview-status">QR in chat ✓</strong></div>
      </div>
    );
  }
  if (featured.name === "WhatsApp Bot Systems" || featured.name === "Custom WhatsApp bot systems") {
    return (
      <div className="case-preview">
        <div className="case-preview-top"><span>Conversation / flow</span><span className="case-preview-status">● online</span></div>
        <div className="case-preview-title">The interface your customers already know.</div>
        <div className="case-preview-row"><span>Customer</span><strong>ADD</strong></div>
        <div className="case-preview-row"><span>Bot response</span><strong>Guided</strong></div>
        <div className="case-preview-row"><span>Next step</span><strong className="case-preview-status">Saved ✓</strong></div>
      </div>
    );
  }
  return (
    <div className="case-preview">
      <div className="case-preview-top"><span>Product snapshot</span><span className="case-preview-status">● ready</span></div>
      <div className="case-preview-title">Made to be understood at a glance.</div>
      <div className="case-preview-row"><span>Experience</span><strong>Clear</strong></div>
      <div className="case-preview-row"><span>For teams</span><strong>Practical</strong></div>
      <div className="case-preview-row"><span>Next step</span><strong className="case-preview-status">Ready to use ✓</strong></div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS (tabbed)
───────────────────────────────────────────── */
function Projects() {
  const [activeTab, setActiveTab] = useState("Fullstack");
  const tabs = Object.keys(PROJECTS_BY_TAB);
  const { featured, cards } = PROJECTS_BY_TAB[activeTab];

  return (
    <section className="section" id="projects">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">01 · A few things I’ve made</div>
          <h2 className="section-title">
            Work that makes a <em>difference</em>
          </h2>
        </FadeUp>

        {/* Metrics */}
        <FadeUp delay={0.05} className="metric-row">
          {[
            ["15+", "Projects brought to life"],
            ["7+", "Products live"],
            ["10+", "Client builds delivered"],
            ["3", "Web, mobile & WhatsApp"],
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
                {PROJECT_TAB_LABELS[tab]}
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
                  target={featured.link.startsWith("#") ? undefined : "_blank"}
                  rel={featured.link.startsWith("#") ? undefined : "noopener noreferrer"}
                >
                  {featured.linkLabel}
                </a>
              </div>
              <div className="project-featured-visual">
                <div className="live-badge">{featured.live}</div>
                <ProjectPreview featured={featured} />
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
                    target={p.link.startsWith("#") ? undefined : "_blank"}
                    rel={p.link.startsWith("#") ? undefined : "noopener noreferrer"}
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

function Services() {
  const services = [
    {
      number: "01 · Product builds",
      icon: "✦",
      title: "Websites & web apps",
      text: "A sharp public-facing experience or a full product interface that makes your business easier to understand and easier to use.",
      items: ["Beautiful public websites", "Simple customer portals", "Works on every screen"],
    },
    {
      number: "02 · Business systems",
      icon: "↗",
      title: "SaaS & dashboards",
      text: "The behind-the-scenes systems that help teams see what is happening, make better decisions and keep work moving.",
      items: ["Clear business dashboards", "Payments and everyday workflows", "Secure customer data"],
    },
    {
      number: "03 · WhatsApp automation",
      icon: "⌁",
      title: "WhatsApp bots & automation",
      text: "Helpful conversations for customers and teams — from lead capture and bookings to credit tracking, reminders and support.",
      items: ["Guided customer conversations", "Orders, bookings and reminders", "Human support when needed"],
    },
  ];
  return (
    <section className="section bg2 bordered" id="services">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">02 — What I help with</div>
          <h2 className="section-title">From idea to product <em>people use</em></h2>
        </FadeUp>
        <div className="services-grid">
          {services.map((service, index) => (
            <FadeUp key={service.title} delay={index * 0.08}>
              <article className="service-card">
                <div className="service-number">{service.number}</div>
                <div className="service-icon" aria-hidden="true">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>
                  {service.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
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
          <div className="section-index">03 · The way I work</div>
          <h2 className="section-title">
            The tools behind the <em>work</em>
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
          <div className="section-index">04 · A little background</div>
          <h2 className="section-title">
            Experience you can <em>count on</em>
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
                Education &amp; certification
              </div>
              <div className="timeline-role" style={{ marginBottom: 6 }}>
                B.Sc. Software Engineering
              </div>
              <div className="timeline-company" style={{ marginBottom: 12 }}>
                DOMINION UNIVERSITY, IBADAN
              </div>
              <p className="timeline-body" style={{ marginBottom: 28 }}>
                Software engineering, algorithms and systems design — and built
                the university's live alumni management platform along the way.
              </p>
              <div
                className="timeline-role"
                style={{ marginBottom: 6, fontSize: 17 }}
              >
                ALX AI Starter Certificate
              </div>
              <div className="timeline-company">ALX AFRICA · 2025</div>
            </div>
            <div>
              <div className="section-index" style={{ marginBottom: 24 }}>
                Learning and growing
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
          <div className="section-index">05 · What matters to me</div>
          <h2 className="section-title">
            How I make things <em>feel right</em>
          </h2>
        </FadeUp>
        <div className="philosophy-grid">
          <FadeUp delay={0.1}>
            <p className="philosophy-text">
              I care about the moments that make a product feel
              <em> trustworthy</em>: knowing what to do next, getting a clear
              response and never feeling lost. That is the standard I bring to
              every website, app and WhatsApp experience I build.
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
const IconFile = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
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
    const subject = encodeURIComponent(
      `Portfolio inquiry${form.name ? ` from ${form.name}` : ""}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`,
    );
    window.location.href = `mailto:adeyanjuolamilekan080@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <section className="section" id="contact">
      <div className="container">
        <FadeUp className="section-header">
          <div className="section-index">06 · Let’s talk</div>
          <h2 className="section-title">
            Let’s make something people <em>love to use</em>
          </h2>
        </FadeUp>
        <div className="contact-grid">
          <FadeUp delay={0.1}>
            <p className="contact-intro">
              Have an idea, a business problem or a product that needs a
              better experience? Tell me what you’re working on and let’s
              shape the next step together.
            </p>
            <a
              href="mailto:adeyanjuolamilekan080@gmail.com"
              className="contact-email"
              style={{ marginBottom: 12 }}
            >
              adeyanjuolamilekan080@gmail.com
            </a>
            <a href="tel:+2347036309146" className="contact-email">
              +234 703 630 9146
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
                href="https://www.linkedin.com/in/ogunyade-olamilekan-91807223a"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconLinkedin /> LinkedIn
              </a>
              <a
                href="https://wa.me/2347036309146?text=Hi%20Olamilekan%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span aria-hidden="true">◌</span> WhatsApp
              </a>
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconFile /> Résumé
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
                  placeholder="What are you hoping to build or improve?"
                  value={form.message}
                  onChange={change}
                />
              </div>
              <button type="submit" className="btn-primary btn-full">
                Start the conversation →
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
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-copy">
          © 2026 Olamilekan Ogunyade. Thoughtful digital work.
        </div>
        <div className="footer-right">
          <span>Ibadan, Nigeria · Available remotely</span>
          <a
            href="https://github.com/Ade-yanju"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:adeyanjuolamilekan080@gmail.com">Email</a>
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
        ? localStorage.getItem("portfolio-theme-v2")
        : null;
    return (
      saved ||
      "light"
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof localStorage !== "undefined")
      localStorage.setItem("portfolio-theme-v2", theme);
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
      <Services />
      <Stack />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
