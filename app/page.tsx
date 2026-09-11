'use client';

import { useEffect, useState } from 'react';
import hikePhoto from './photo-data/hike';
import officePhoto from './photo-data/office';

type Theme = 'light' | 'dark';

const thingsWeDo = [
  ['Events', 'Tech talks, socials, workshops, game nights, and whatever else sounds fun that week.'],
  ['Office hours', 'Drop by 390 Cory to get help with a class, talk through a project, or just work around other people.'],
  ['Industry', 'Meet engineers, founders, alumni, and teams that want to spend time with Berkeley students.'],
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
            <a href="#industry" onClick={() => setMenuOpen(false)}>Industry</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <a className="join-button" href="#join">Join us</a>
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
            <p>Berkeley&apos;s student-run computer science community. Come hang out, meet people, build things, and make Cal a little less anonymous.</p>
            <div className="hero-links">
              <a href="#office">Come by 390 Cory <span>↘</span></a>
              <a href="#office-hours">Office hours <span>↘</span></a>
            </div>
          </div>
        </div>
        <div className="hero-scroll">scroll <span>↓</span></div>
      </section>

      <section id="about" className="community section-pad">
        <div className="community-copy" data-reveal>
          <p className="kicker">This is CSUA</p>
          <h2>A CS club that actually feels like a community.</h2>
          <p className="body-copy">CSUA has been around for a long time, but the point is pretty simple: give Berkeley CS students a place to find each other. Some days that means a company talk. Other days it means homework, a hike, a game night, or sitting around the office way too late.</p>
          <div className="small-facts">
            <span><strong>1972</strong> founded</span>
            <span><strong>390 Cory</strong> home base</span>
          </div>
        </div>
        <figure className="photo-card hike-photo" data-reveal>
          <img src={hikePhoto} alt="CSUA members on a Berkeley hike overlooking campus" />
          <figcaption>A CSUA hike above Berkeley.</figcaption>
        </figure>
      </section>

      <section id="events" className="things section-pad">
        <div className="section-intro" data-reveal>
          <p className="kicker">Around CSUA</p>
          <h2>There&apos;s usually something going on.</h2>
          <p>Not everything needs to be a huge production. We care about giving people reasons to show up and stick around.</p>
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
          <img src={officePhoto} alt="Inside the CSUA office in 390 Cory Hall" />
          <span className="photo-label">390 Cory Hall</span>
        </div>
        <div className="office-copy" data-reveal>
          <p className="kicker">The office</p>
          <h2>Come through.</h2>
          <p className="body-copy">390 Cory is our little corner of campus. It&apos;s a study spot, meeting room, office-hours space, snack stop, and occasional place to procrastinate between classes.</p>
          <p className="office-note">If the door&apos;s open, you&apos;re welcome.</p>
          <a className="text-link" href="#office-hours">See when people are around →</a>
        </div>
      </section>

      <section id="office-hours" className="hours section-pad">
        <div className="hours-copy" data-reveal>
          <p className="kicker">Office hours</p>
          <h2>Need a hand?</h2>
          <p>Officers host office hours in 390 Cory. The calendar can list the person, course, and time, and updates show up here automatically.</p>
        </div>
        <div className="calendar-shell" data-reveal>
          <div className="calendar-head"><strong>CSUA office hours</strong><span>390 Cory</span></div>
          {officeHoursCalendarUrl ? (
            <iframe className="calendar-frame" src={officeHoursCalendarUrl} title="CSUA Office Hours Google Calendar" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="calendar-empty">
              <div className="calendar-mark">cal</div>
              <div><h3>Calendar goes here.</h3><p>Connect the public Google Calendar embed URL and the live schedule will fill this space.</p></div>
            </div>
          )}
        </div>
      </section>

      <section id="people" className="people section-pad">
        <div className="section-intro" data-reveal>
          <p className="kicker">People</p>
          <h2>Run by students who were new here once too.</h2>
          <p>Officers keep the office alive, run events, work with companies, maintain CSUA infrastructure, and answer an unreasonable number of messages.</p>
        </div>
        <div className="people-links" data-reveal>
          <a href="#">Meet the officers <span>↗</span></a>
          <a href="#">Meet the Politburo <span>↗</span></a>
        </div>
      </section>

      <section id="industry" className="industry section-pad">
        <div className="industry-fluid" aria-hidden="true"><i /><i /><i /></div>
        <div className="industry-copy" data-reveal>
          <p className="kicker">For industry</p>
          <h2>Meet Berkeley CS students without making it weird.</h2>
          <p>Tech talks, recruiting events, workshops, sponsorships — we&apos;re happy to build something that makes sense for students and your team.</p>
          <div className="industry-links">
            <a href="#contact">Host something <span>↗</span></a>
            <a href="#contact">Recruit with CSUA <span>↗</span></a>
            <a href="#contact">Sponsor us <span>↗</span></a>
          </div>
        </div>
      </section>

      <section id="join" className="join section-pad">
        <div data-reveal>
          <p className="kicker">Get involved</p>
          <h2>You can just show up.</h2>
          <p>No elaborate initiation sequence. Come to an event, stop by the office, join the community, and see where it goes.</p>
          <div className="join-actions">
            <a className="primary-link" href="#contact">Join CSUA</a>
            <a className="text-link" href="#events">See what we do →</a>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-main">
          <div><div className="footer-wordmark">CSUA<span>.</span></div><p>UC Berkeley · 390 Cory Hall</p></div>
          <div className="footer-links"><a href="#">Discord</a><a href="#">Instagram</a><a href="#">GitHub</a><a href="#">LinkedIn</a><a href="mailto:pb@csua.berkeley.edu">Contact</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Computer Science Undergraduate Association</span><span>made by capybaras with ❤️</span></div>
      </footer>
    </main>
  );
}
