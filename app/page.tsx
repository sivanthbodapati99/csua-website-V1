'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const eventTypes = [
  {
    number: '01',
    title: 'Tech talks',
    copy: 'Hear directly from engineers, researchers, founders, and alumni working across computing.',
  },
  {
    number: '02',
    title: 'Community',
    copy: 'Meet people outside class through socials, game nights, study sessions, and spontaneous office hangs.',
  },
  {
    number: '03',
    title: 'Industry',
    copy: 'Connect with teams through recruiting events, company talks, workshops, and the CSUA network.',
  },
];

function Capybara({ className = '' }: { className?: string }) {
  return (
    <div className={`capy ${className}`} aria-hidden="true">
      <div className="capy-shadow" />
      <div className="capy-leg capy-leg-back" />
      <div className="capy-leg capy-leg-front" />
      <div className="capy-body" />
      <div className="capy-head">
        <div className="capy-ear capy-ear-left"><span /></div>
        <div className="capy-ear capy-ear-right"><span /></div>
        <div className="capy-eye capy-eye-left" />
        <div className="capy-eye capy-eye-right" />
        <div className="capy-muzzle">
          <div className="capy-nose" />
          <div className="capy-mouth" />
        </div>
      </div>
    </div>
  );
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <button
      className="theme-toggle"
      type="button"
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
  const officeHoursCalendarUrl = process.env.NEXT_PUBLIC_OFFICE_HOURS_CALENDAR_URL;

  useEffect(() => {
    const stored = window.localStorage.getItem('csua-theme') as Theme | null;
    const preferred = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('csua-theme', theme);
  }, [theme]);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -4% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="nav-shell">
        <nav className="nav" aria-label="Main navigation">
          <a href="#top" className="wordmark">CSUA<span>.</span></a>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
            <a href="#office" onClick={() => setMenuOpen(false)}>Office</a>
            <a href="#office-hours" onClick={() => setMenuOpen(false)}>Office Hours</a>
            <a href="#people" onClick={() => setMenuOpen(false)}>People</a>
            <a href="#industry" onClick={() => setMenuOpen(false)}>Industry</a>
          </div>

          <div className="nav-actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <a className="join-button" href="#join">Join CSUA <span>↗</span></a>
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '×' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      <section id="top" className="hero section-dark">
        <div className="hero-mesh" aria-hidden="true">
          <div className="liquid-orb orb-blue" />
          <div className="liquid-orb orb-violet" />
          <div className="liquid-orb orb-gold" />
          <div className="hero-noise" />
        </div>

        <div className="star star-1">✦</div>
        <div className="star star-2">✦</div>
        <div className="star star-3">✦</div>
        <div className="star star-4">✦</div>
        <div className="star star-5">✦</div>

        <div className="hero-content" data-reveal>
          <p className="eyebrow">UC BERKELEY · EST. 1972</p>
          <h1>
            COMPUTER<br />
            <span>SCIENCE</span><br />
            UNDERGRADUATE<br />
            ASSOCIATION
          </h1>

          <div className="hero-bottom">
            <p>Berkeley&apos;s undergraduate computer science community — built by students, for students.</p>
            <div className="hero-ctas">
              <a href="#events">Explore CSUA <span>↘</span></a>
              <a href="#office">Visit 390 Cory <span>↘</span></a>
            </div>
          </div>
        </div>

        <div className="hero-capy-stage" aria-hidden="true">
          <div className="capy-halo" />
          <Capybara className="hero-capy" />
          <div className="capy-platform" />
        </div>

        <div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="statement section-light">
        <div className="section-number">01 / 07</div>
        <div className="statement-copy" data-reveal>
          <p className="eyebrow">THE COMMUNITY</p>
          <h2>BUILT FOR<br /><em>BERKELEY CS.</em></h2>
          <p className="lede">
            CSUA brings Berkeley&apos;s undergraduate computer science community together through events,
            office hours, industry opportunities, and a place to learn, build, and hang out.
          </p>
        </div>

        <div className="giant-word" aria-hidden="true">CSUA</div>

        <div className="stat-row" data-reveal>
          <div><strong>1972</strong><span>Founded</span></div>
          <div><strong>390</strong><span>Cory Hall</span></div>
          <div><strong>∞</strong><span>Ways to get involved</span></div>
        </div>
      </section>

      <section id="events" className="events section-light">
        <div className="section-header" data-reveal>
          <div>
            <p className="eyebrow">02 / 07 · WHAT WE DO</p>
            <h2>SHOW UP.<br /><em>FIND YOUR PEOPLE.</em></h2>
          </div>
          <a className="text-link" href="#join">Get involved ↗</a>
        </div>

        <div className="event-grid">
          {eventTypes.map((event) => (
            <article className="event-tile" key={event.title} data-reveal>
              <div className="event-number">{event.number}</div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.copy}</p>
              </div>
              <span className="event-arrow">↗</span>
            </article>
          ))}
        </div>
        <div className="event-glow" />
      </section>

      <section id="office" className="office section-dark">
        <div className="office-backdrop" aria-hidden="true">390</div>
        <div className="office-grid">
          <div className="office-title" data-reveal>
            <p className="eyebrow">03 / 07 · YOUR SPACE ON CAMPUS</p>
            <h2>390<br /><span>CORY.</span></h2>
          </div>

          <div className="office-copy" data-reveal>
            <p>
              Study. Build. Play. Hang out. The CSUA office in 390 Cory Hall is a home base for Berkeley&apos;s
              computer science community.
            </p>
            <div className="office-pills">
              <span>Study space</span>
              <span>Office hours</span>
              <span>Community</span>
              <span>Games</span>
            </div>
            <a className="text-link light-link" href="#office-hours">See office hours ↘</a>
          </div>
        </div>

        <div className="office-scene" data-reveal>
          <div className="scene-window">
            <div className="window-glow" />
            <span>390 CORY HALL · BERKELEY, CA</span>
            <div className="scene-shelf" />
            <div className="scene-desk" />
            <div className="scene-monitor"><div /></div>
            <div className="scene-lamp" />
            <Capybara className="office-capy" />
          </div>
        </div>
      </section>

      <section id="office-hours" className="office-hours section-light">
        <div className="office-hours-copy" data-reveal>
          <p className="eyebrow">04 / 07 · OFFICE HOURS</p>
          <h2>DROP IN.<br /><em>ASK ANYTHING.</em></h2>
          <p>
            See when CSUA officers are in 390 Cory, which courses they can help with, and when the office is a good
            place to stop by. The schedule is powered by Google Calendar so updates can happen without redeploying the site.
          </p>
          <div className="calendar-key">
            <span><i /> Officer hours</span>
            <span><i /> Course help</span>
            <span><i /> Community time</span>
          </div>
        </div>

        <div className="calendar-shell" data-reveal>
          <div className="calendar-topbar">
            <div>
              <span className="calendar-dot" />
              <strong>CSUA Office Hours</strong>
            </div>
            <span>390 Cory Hall</span>
          </div>

          {officeHoursCalendarUrl ? (
            <iframe
              className="calendar-frame"
              src={officeHoursCalendarUrl}
              title="CSUA Office Hours Google Calendar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="calendar-placeholder">
              <div className="calendar-placeholder-grid" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, index) => <span key={index} />)}
              </div>
              <div className="calendar-placeholder-copy">
                <span className="calendar-icon">CAL</span>
                <h3>Google Calendar ready.</h3>
                <p>Add the public CSUA office-hours embed URL to the site environment and the live schedule will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="people" className="people section-light">
        <div className="section-header" data-reveal>
          <div>
            <p className="eyebrow">05 / 07 · THE PEOPLE</p>
            <h2>BEHIND CSUA.</h2>
          </div>
          <a className="text-link" href="#people">Meet everyone ↗</a>
        </div>

        <div className="people-grid">
          <div className="person-card person-feature" data-reveal>
            <div className="portrait placeholder-portrait one"><span>CSUA</span></div>
            <h3>YOUR OFFICERS</h3>
            <p>Meet the students who keep CSUA moving.</p>
          </div>

          <div className="person-card" data-reveal>
            <div className="portrait placeholder-portrait two"><span>PB</span></div>
            <h3>POLITBURO</h3>
            <p>Learn who does what and how CSUA is run.</p>
          </div>

          <div className="person-card people-note" data-reveal>
            <span>“You don&apos;t have to know anyone to get involved.”</span>
            <Capybara className="people-capy" />
          </div>
        </div>
      </section>

      <section id="industry" className="industry section-dark">
        <div className="industry-orb" aria-hidden="true" />
        <div className="section-number">06 / 07</div>
        <div className="industry-inner" data-reveal>
          <p className="eyebrow">FOR INDUSTRY</p>
          <h2>CONNECT WITH<br /><span>BERKELEY CS.</span></h2>
          <p className="industry-lede">
            Partner with Berkeley&apos;s undergraduate computer science community through events, recruiting,
            sponsorships, and more.
          </p>
          <div className="industry-actions">
            <a href="#contact">Host an event <span>↗</span></a>
            <a href="#contact">Recruit students <span>↗</span></a>
            <a href="#contact">Sponsor CSUA <span>↗</span></a>
          </div>
        </div>
      </section>

      <section id="join" className="join section-light">
        <div className="join-bg" aria-hidden="true">JOIN</div>
        <div className="join-inner" data-reveal>
          <p className="eyebrow">07 / 07 · GET INVOLVED</p>
          <h2>YOU&apos;RE<br /><em>INVITED.</em></h2>
          <p>Come to an event. Stop by 390 Cory. Meet someone new. Make something happen.</p>
          <div className="join-links">
            <a href="#contact">Join CSUA <span>↗</span></a>
            <a href="#people">Become an officer <span>↗</span></a>
            <a href="#events">Come to an event <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer section-light">
        <div className="footer-top">
          <div className="footer-wordmark">CSUA<span>.</span></div>
          <p>Computer Science Undergraduate Association<br />UC Berkeley · 390 Cory Hall</p>
        </div>

        <div className="footer-links">
          <div><a href="#">Instagram</a><a href="#">Discord</a><a href="#">GitHub</a></div>
          <div><a href="#">LinkedIn</a><a href="#">Contact</a><a href="#industry">Industry</a></div>
        </div>

        <div className="footer-meta">
          <span>© 2026 CSUA · UC Berkeley</span>
          <span>Made by students, for students.</span>
        </div>

        <div className="footer-fluid" aria-hidden="true">
          <div className="fluid-layer layer-1" />
          <div className="fluid-layer layer-2" />
          <div className="footer-capy-track"><Capybara className="footer-capy" /></div>
        </div>
      </footer>
    </main>
  );
}
