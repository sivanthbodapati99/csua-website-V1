'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const events = [
  { date: '01', month: 'OCT', title: 'CSUA General Meeting', meta: '7:00 PM · 311 Soda', tag: 'Community' },
  { date: '03', month: 'OCT', title: 'CS Office Hours', meta: '4:00–6:00 PM · 311 Soda', tag: 'Office Hours' },
  { date: '08', month: 'OCT', title: 'Industry Night', meta: '6:00 PM · Soda Hall', tag: 'Industry' },
];

function Capybara({ className = '' }: { className?: string }) {
  return (
    <div className={`capy ${className}`} aria-hidden="true">
      <div className="capy-ear capy-ear-left" />
      <div className="capy-ear capy-ear-right" />
      <div className="capy-body" />
      <div className="capy-eye capy-eye-left" />
      <div className="capy-eye capy-eye-right" />
      <div className="capy-nose" />
      <div className="capy-leg capy-leg-left" />
      <div className="capy-leg capy-leg-right" />
    </div>
  );
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <button
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className={theme === 'light' ? 'active' : ''}>☼</span>
      <span className={theme === 'dark' ? 'active' : ''}>☾</span>
    </button>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('csua-theme') as Theme | null;
    const preferred = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('csua-theme', theme);
  }, [theme]);

  return (
    <main>
      <header className="nav-shell">
        <nav className="nav">
          <a href="#top" className="wordmark">CSUA<span>.</span></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
            <a href="#office" onClick={() => setMenuOpen(false)}>Office</a>
            <a href="#people" onClick={() => setMenuOpen(false)}>People</a>
            <a href="#industry" onClick={() => setMenuOpen(false)}>Industry</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <a className="join-button" href="#join">Join CSUA <span>↗</span></a>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
          </div>
        </nav>
      </header>

      <section id="top" className="hero section-dark">
        <div className="hero-gradient" />
        <div className="star star-1">✦</div><div className="star star-2">✦</div><div className="star star-3">✦</div>
        <div className="star star-4">✦</div><div className="star star-5">✦</div>
        <div className="hero-content">
          <p className="eyebrow">UC BERKELEY · EST. 1972</p>
          <h1>COMPUTER<br /><span>SCIENCE</span><br />UNDERGRADUATE<br />ASSOCIATION</h1>
          <div className="hero-bottom">
            <p>Berkeley&apos;s undergraduate computer science community.</p>
            <div className="hero-ctas"><a href="#events">Explore CSUA <span>↘</span></a><a href="#office">Visit 311 Soda <span>↘</span></a></div>
          </div>
        </div>
        <Capybara className="hero-capy" />
        <div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="statement section-light">
        <div className="section-number">01 / 06</div>
        <div className="statement-copy">
          <p className="eyebrow">THE COMMUNITY</p>
          <h2>BUILT FOR<br /><em>BERKELEY CS.</em></h2>
          <p className="lede">CSUA brings Berkeley&apos;s undergraduate computer science community together through events, office hours, industry opportunities, and a place to learn, build, and hang out.</p>
        </div>
        <div className="giant-word">CSUA</div>
        <div className="stat-row">
          <div><strong>1972</strong><span>Founded</span></div>
          <div><strong>311</strong><span>Soda Hall</span></div>
          <div><strong>∞</strong><span>Ways to get involved</span></div>
        </div>
      </section>

      <section id="events" className="events section-light">
        <div className="section-header"><div><p className="eyebrow">02 / 06 · WHAT&apos;S HAPPENING</p><h2>UP NEXT.</h2></div><a className="text-link" href="#events">View all events ↗</a></div>
        <div className="event-list">
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <div className="event-date"><strong>{event.date}</strong><span>{event.month}</span></div>
              <div className="event-main"><span className="event-tag">{event.tag}</span><h3>{event.title}</h3><p>{event.meta}</p></div>
              <span className="event-arrow">↗</span>
            </article>
          ))}
        </div>
        <div className="event-glow" />
      </section>

      <section id="office" className="office section-dark">
        <div className="office-backdrop">311</div>
        <div className="office-grid">
          <div className="office-title"><p className="eyebrow">03 / 06 · YOUR SPACE ON CAMPUS</p><h2>311<br /><span>SODA.</span></h2></div>
          <div className="office-copy"><p>Study. Build. Play. Hang out. The CSUA office is a home base for Berkeley&apos;s CS community.</p><div className="office-pills"><span>Computers</span><span>Study Space</span><span>Games</span><span>Library</span></div><a className="text-link light-link" href="#office-hours">Learn about the office ↗</a></div>
        </div>
        <div className="office-scene"><div className="scene-window"><span>311 SODA</span><div className="scene-desk" /><div className="scene-monitor" /><Capybara className="office-capy" /></div></div>
      </section>

      <section id="people" className="people section-light">
        <div className="section-header"><div><p className="eyebrow">04 / 06 · THE PEOPLE</p><h2>BEHIND CSUA.</h2></div><a className="text-link" href="#people">Meet everyone ↗</a></div>
        <div className="people-grid">
          <div className="person-card person-feature"><div className="portrait placeholder-portrait one">CSUA</div><h3>YOUR OFFICERS</h3><p>Meet the students who keep CSUA moving.</p></div>
          <div className="person-card"><div className="portrait placeholder-portrait two">PB</div><h3>POLITBURO</h3><p>Learn who does what and how CSUA is run.</p></div>
          <div className="person-card people-note"><span>“You don&apos;t have to know anyone to get involved.”</span><Capybara className="people-capy" /></div>
        </div>
      </section>

      <section id="industry" className="industry section-dark">
        <div className="section-number">05 / 06</div>
        <p className="eyebrow">FOR INDUSTRY</p>
        <h2>CONNECT WITH<br /><span>BERKELEY CS.</span></h2>
        <p className="industry-lede">Partner with the undergraduate computer science community through events, recruiting, sponsorships, and more.</p>
        <div className="industry-actions"><a href="#contact">Host an event <span>↗</span></a><a href="#contact">Recruit students <span>↗</span></a><a href="#contact">Sponsor CSUA <span>↗</span></a></div>
      </section>

      <section id="join" className="join section-light">
        <div className="join-bg">JOIN</div>
        <p className="eyebrow">06 / 06 · GET INVOLVED</p>
        <h2>YOU&apos;RE<br /><em>INVITED.</em></h2>
        <p>Come to an event. Hang out in 311. Meet someone new. Make something happen.</p>
        <div className="join-links"><a href="#contact">Join CSUA <span>↗</span></a><a href="#people">Become an officer <span>↗</span></a><a href="#events">Come to an event <span>↗</span></a></div>
      </section>

      <footer id="contact" className="footer section-light">
        <div className="footer-wordmark">CSUA<span>.</span></div>
        <div className="footer-links"><div><a href="#">Instagram</a><a href="#">Discord</a><a href="#">GitHub</a></div><div><a href="#">LinkedIn</a><a href="#">Contact</a><a href="#">Industry</a></div></div>
        <div className="footer-meta"><span>© 2026 CSUA · UC Berkeley</span><span>Made by students, for students.</span></div>
        <div className="footer-fluid"><div className="fluid-layer layer-1" /><div className="fluid-layer layer-2" /><Capybara className="footer-capy" /></div>
      </footer>
    </main>
  );
}
