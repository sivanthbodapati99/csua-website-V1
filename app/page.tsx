'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const BACKEND = 'https://www.csua.berkeley.edu';

const thingsWeDo = [
  ['Events', 'Tech talks, hackathons, info sessions, workshops, LAN parties, socials, and the occasional thing that just sounded fun.'],
  ['Office hours', 'Drop by 390 Cory to talk through a class, a project, or whatever you are stuck on. Officers have always been a big part of keeping CSUA useful and welcoming.'],
  ['Industry', 'CSUA has long been one of Berkeley CS students’ entry points to industry, from company talks and recruiting events to alumni connections.'],
];

const memberPerks = [
  ['Shell + computing', 'CSUA accounts give members access to shared computing resources, including shell access for projects and development.'],
  ['Web hosting', 'Members can host personal projects and websites on CSUA infrastructure — a tradition that goes back decades.'],
  ['People + opportunities', 'Membership connects you to the mailing list, events, job opportunities, officers, alumni, and the wider CSUA community.'],
];

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
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
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
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
            <a href="#office" onClick={() => setMenuOpen(false)}>390 Cory</a>
            <a href="#office-hours" onClick={() => setMenuOpen(false)}>Office hours</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Resources</a>
            <a href="#industry" onClick={() => setMenuOpen(false)}>Industry</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <a className="join-button" href={`${BACKEND}/join/`}>Join us</a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
          </div>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="fluid-field" aria-hidden="true">
          <div className="fluid-blob fluid-blue" />
          <div className="fluid-blob fluid-purple" />
          <div className="fluid-blob fluid-gold" />
          <div className="fluid-sheen" />
        </div>
        <div className="hero-inner" data-reveal>
          <p className="kicker">UC Berkeley · since 1972</p>
          <h1>Computer Science<br />Undergraduate Association</h1>
          <div className="hero-lower">
            <p>Berkeley&apos;s oldest and largest computer science club. A student-run place to meet people, build things, get help, and make Cal feel a little smaller.</p>
            <div className="hero-links">
              <a href="#office">Come by 390 Cory <span>↘</span></a>
              <a href={`${BACKEND}/events/`}>See events <span>↗</span></a>
            </div>
          </div>
        </div>
        <div className="hero-scroll">scroll <span>↓</span></div>
      </section>

      <section id="about" className="community section-pad">
        <div className="community-copy" data-reveal>
          <p className="kicker">This is CSUA</p>
          <h2>A long-running CS club that still feels like a place to hang out.</h2>
          <p className="body-copy">CSUA has been around since 1972. The mission has changed with Berkeley and with computing, but the basic idea has not: support undergraduate CS students, connect people with each other and industry, and keep a space where you can actually show up and belong.</p>
          <div className="small-facts">
            <span><strong>1972</strong> founded</span>
            <span><strong>390 Cory</strong> home base</span>
            <span><strong>Student-run</strong> always</span>
          </div>
        </div>
        <figure className="photo-card hike-photo" data-reveal>
          <img src="/images/csua-hike.webp" alt="CSUA members on a Berkeley hike overlooking campus" />
          <figcaption>A CSUA hike above Berkeley.</figcaption>
        </figure>
      </section>

      <section id="events" className="things section-pad">
        <div className="section-intro" data-reveal>
          <p className="kicker">Around CSUA</p>
          <h2>There&apos;s usually something going on.</h2>
          <p>Some events are practical, some are social, and some are just an excuse to get CS students out of their rooms for a while.</p>
          <a className="text-link" href={`${BACKEND}/events/`}>Open the full events page →</a>
        </div>
        <div className="thing-list">
          {thingsWeDo.map(([title, copy], index) => (
            <article className="thing-row" key={title} data-reveal>
              <span className="thing-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="office" className="office section-pad">
        <div className="office-photo-wrap" data-reveal>
          <img src="/images/390-cory.webp" alt="Inside the CSUA office in 390 Cory Hall" />
          <span className="photo-label">390 Cory Hall</span>
        </div>
        <div className="office-copy" data-reveal>
          <p className="kicker">The office</p>
          <h2>Come through.</h2>
          <p className="body-copy">390 Cory is CSUA&apos;s home base: part study spot, part meeting room, part office-hours space, and part place to decompress between classes. Officers help keep the space open and friendly.</p>
          <p className="office-note">If the door&apos;s open, you&apos;re welcome.</p>
          <a className="text-link" href="#office-hours">See when people are around →</a>
        </div>
      </section>

      <section id="office-hours" className="hours section-pad">
        <div className="hours-copy" data-reveal>
          <p className="kicker">Office hours</p>
          <h2>Need a hand?</h2>
          <p className="body-copy">CSUA tracks officers, their office hours, and the classes they can help with. For now, the new site uses a shared Google Calendar here while we wire the structured officer data into the frontend.</p>
          <a className="text-link" href={`${BACKEND}/officers/`}>Current officers + tutoring info →</a>
        </div>
        <div className="calendar-shell" data-reveal>
          <div className="calendar-head"><strong>CSUA office hours</strong><span>390 Cory</span></div>
          {officeHoursCalendarUrl ? (
            <iframe className="calendar-frame" src={officeHoursCalendarUrl} title="CSUA Office Hours Google Calendar" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="calendar-empty">
              <div className="calendar-mark">cal</div>
              <div><h3>Office-hours calendar</h3><p>Add the public Google Calendar embed URL and the live schedule will fill this space automatically.</p></div>
            </div>
          )}
        </div>
      </section>

      <section id="services" className="things section-pad">
        <div className="section-intro" data-reveal>
          <p className="kicker">More than events</p>
          <h2>CSUA has infrastructure, too.</h2>
          <p>One of the pieces worth carrying forward from the existing CSUA backend is the technical side of membership. CSUA has historically provided computing resources free to members.</p>
        </div>
        <div className="thing-list">
          {memberPerks.map(([title, copy], index) => (
            <article className="thing-row" key={title} data-reveal>
              <span className="thing-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="join-actions" data-reveal style={{ maxWidth: '1150px', margin: '42px auto 0' }}>
          <a className="primary-link" href={`${BACKEND}/join/`}>Get a CSUA account</a>
          <a className="text-link" href={`${BACKEND}/tech/`}>Technical services →</a>
          <a className="text-link" href="https://github.com/CSUA/csua-utils/wiki">Root staff wiki ↗</a>
        </div>
      </section>

      <section id="people" className="people section-pad">
        <div className="section-intro" data-reveal>
          <p className="kicker">People</p>
          <h2>Run by students who were new here once too.</h2>
          <p>The existing CSUA system already keeps current-semester officers, office hours, tutoring subjects, photos and blurbs, plus Politburo roles and contact information. Those records stay the source of truth while this frontend gets rebuilt around them.</p>
        </div>
        <div className="people-links" data-reveal>
          <a href={`${BACKEND}/officers/`}>Meet the officers <span>↗</span></a>
          <a href={`${BACKEND}/politburo/`}>Meet the Politburo <span>↗</span></a>
          <a href={`${BACKEND}/alumni/`}>Alumni <span>↗</span></a>
        </div>
      </section>

      <section id="industry" className="industry section-pad">
        <div className="industry-fluid" aria-hidden="true"><i /><i /><i /></div>
        <div className="industry-copy" data-reveal>
          <p className="kicker">For industry</p>
          <h2>Connect with Berkeley CS students.</h2>
          <p>CSUA has spent decades connecting students with industry through tech talks, info sessions, recruiting, workshops, hackathons, sponsors and alumni. If you want to work with students, keep it useful and we&apos;ll figure out the rest.</p>
          <div className="industry-links">
            <a href="mailto:pb@csua.berkeley.edu">Talk to CSUA <span>↗</span></a>
            <a href={`${BACKEND}/sponsors/`}>Sponsors <span>↗</span></a>
            <a href={`${BACKEND}/events/`}>Events <span>↗</span></a>
          </div>
        </div>
      </section>

      <section id="join" className="join section-pad">
        <div data-reveal>
          <p className="kicker">Get involved</p>
          <h2>You can just show up.</h2>
          <p>Come to an event, stop by 390 Cory, make a CSUA account, or get more involved as an officer. General membership also opens up CSUA&apos;s computing resources and mailing list.</p>
          <div className="join-actions">
            <a className="primary-link" href={`${BACKEND}/join/`}>Join CSUA</a>
            <a className="text-link" href="https://csua.berkeley.edu/officerapp/">Become an officer →</a>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-main">
          <div><div className="footer-wordmark">CSUA<span>.</span></div><p>UC Berkeley · 390 Cory Hall</p></div>
          <div className="footer-links">
            <a href="https://discord.gg/eFBYr2t2Ky">Discord</a>
            <a href="https://github.com/CSUA">GitHub</a>
            <a href={`${BACKEND}/events/`}>Events</a>
            <a href={`${BACKEND}/constitution/`}>Constitution</a>
            <a href="mailto:pb@csua.berkeley.edu">Contact</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Computer Science Undergraduate Association</span><span>made by capybaras with ❤️</span></div>
      </footer>
    </main>
  );
}
