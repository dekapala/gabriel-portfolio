import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { content } from './content'
import type { Lang } from './content'
import './App.css'

type IconName = 'arrow' | 'print' | 'external' | 'sun' | 'moon' | 'close' | 'menu' | 'copy' | 'check' | 'mail' | 'pin'
function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h15M13 5l7 7-7 7" />,
    print: <><path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 13h12v8H6zM17 10h1" /></>,
    external: <path d="M6 18 18 6M6 6h12v12" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20 14A8.5 8.5 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />, menu: <path d="M4 8h16M4 16h16" />,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
    check: <path d="m4 12 5 5L20 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
const anchors = ['perfil', 'experiencia', 'competencias', 'formacion']
const email = 'gabrielleandro.p@gmail.com'
const cvPath = '/cv-gabriel-palazzini.html'
function App() {
  const [lang, setLang] = useState<Lang>('es')
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('perfil')
  const [copyState, setCopyState] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t = content[lang]
  useEffect(() => {
    try {
      setLang(localStorage.getItem('gp-language') === 'en' ? 'en' : 'es')
      setDark(localStorage.getItem('gp-theme') === 'dark')
    } catch { /* Preferences are optional. */ }
    setReady(true)
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.title = lang === 'es' ? 'Gabriel Palazzini | CV · Operaciones e IA aplicada' : 'Gabriel Palazzini | CV · Operations & applied AI'
    try { if (ready) { localStorage.setItem('gp-language', lang); localStorage.setItem('gp-theme', dark ? 'dark' : 'light') } } catch { /* Preferences are optional. */ }
  }, [lang, dark, ready])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }), { rootMargin: '-15% 0px -60% 0px' })
    document.querySelectorAll('main section[id]').forEach(el => observer.observe(el))
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', escape)
    return () => { observer.disconnect(); window.removeEventListener('keydown', escape); if (timer.current) clearTimeout(timer.current) }
  }, [])
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyState('copied') } catch { setCopyState('error') }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState(''), 3500)
  }
  const contactHref = `mailto:${email}?subject=${encodeURIComponent(lang === 'es' ? 'Oportunidad laboral — Gabriel Palazzini' : 'Career opportunity — Gabriel Palazzini')}`
  return <>
    <a className="skip-link" href="#contenido">{t.skip}</a>
    <header className="site-header"><div className="nav-wrap"><a className="brand" href="#inicio" aria-label="Gabriel Palazzini">gp<span>.</span></a><span className="nav-label">{t.cvLabel}</span>
      <nav id="main-nav" className={menu ? 'main-nav open' : 'main-nav'} aria-label={lang === 'es' ? 'Secciones del CV' : 'CV sections'}>{t.nav.map((s, i) => <a key={anchors[i]} href={`#${anchors[i]}`} className={active === anchors[i] ? 'active' : ''} onClick={() => setMenu(false)}>{s}</a>)}</nav>
      <div className="nav-actions"><button className="language-button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}>{lang.toUpperCase()}<span>⌄</span></button><button className="icon-button theme-button" onClick={() => setDark(!dark)} aria-label={t.theme}><Icon name={dark ? 'sun' : 'moon'} size={17} /></button><button className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-label={t.menu} aria-controls="main-nav" aria-expanded={menu}><Icon name={menu ? 'close' : 'menu'} /></button></div>
    </div></header>
    <aside className="document-top" aria-label={t.cvLabel}><span>{t.cvLabel.toUpperCase()} / 2026</span><span>{t.updated}</span></aside>
    <main id="contenido" className="resume-document">
      <div className="identity" id="inicio"><div className="identity-top"><span className="availability"><i />{t.seeking}</span><span className="identity-mark" aria-hidden="true">GP / 01</span></div>
        <h1>Gabriel Leandro<br /><span>Palazzini</span></h1><p className="job-title">{t.headline}</p><p className="specialty">{t.specialty}</p>
        <div className="identity-links"><span><Icon name="pin" size={15} />{t.location}</span><a href={`mailto:${email}`}><Icon name="mail" size={15} />{email}</a><a href="https://www.linkedin.com/in/gabrielpalazzini/" target="_blank" rel="noreferrer">LinkedIn<Icon name="external" size={14} /></a></div>
        <div className="identity-actions"><a className="button primary" href={cvPath} target="_blank" rel="noreferrer">{t.cv}<Icon name="print" size={17} /></a><a className="button secondary" href={contactHref}>{t.email}<Icon name="arrow" size={17} /></a></div>
      </div>
      <div className="resume-body">
        <section id="perfil" className="resume-section"><div className="section-heading"><span>01</span><h2>{t.profileTitle}</h2></div><div className="section-body"><p className="profile-lead">{t.summary}</p><p className="profile-secondary">{t.summaryMore}</p><p className="interests"><strong>{t.interests}</strong>{t.interestsText}</p></div></section>
        <section id="experiencia" className="resume-section"><div className="section-heading"><span>02</span><h2>{t.experienceTitle}</h2></div><div className="section-body">
          <div className="employer"><div className="employer-icon" aria-hidden="true">T<span>.</span></div><div><h3>{t.employer}</h3><p>{t.tenure}</p><small>{t.companyNote}</small></div><span className="tenure-badge">12+ {lang === 'es' ? 'años' : 'years'}</span></div>
          <div className="roles">{t.roles.map((r, i) => <article className={`role ${i === 0 ? 'current-role' : ''}`} key={r.title}><div className="role-marker" /><div className="role-header"><time>{r.date}</time><h3>{r.title}</h3><p className="role-area">{r.area}</p></div>{r.note && <p className="role-note">{r.note}</p>}<ul>{r.bullets.map(s => <li key={s}>{s}</li>)}</ul>
            {i === 0 && <div className="contributions"><h4>{t.contributionsTitle}</h4><p className="contributions-intro">{t.contributionsNote}</p>{t.contributions.map(c => <div className="contribution" key={c.name}><div className="contribution-heading"><h5>{c.name}</h5><span className={`status status-${c.state}`}><i />{c.status}</span></div><p>{c.description}</p>{c.tech && <small>{c.tech}</small>}</div>)}</div>}
          </article>)}</div>
        </div></section>
        <section id="competencias" className="resume-section"><div className="section-heading"><span>03</span><h2>{t.skillsTitle}</h2></div><div className="section-body"><dl className="skills-list">{t.skills.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl><p className="skills-note">{t.skillsNote}</p></div></section>
        <section id="formacion" className="resume-section"><div className="section-heading"><span>04</span><h2>{t.educationTitle}</h2></div><div className="section-body"><div className="education-list">{t.education.map(([date, title, institution, note]) => <article key={title}><div><h3>{title}</h3><p>{institution}</p>{note && <small>{note}</small>}</div><time>{date}</time></article>)}</div><h3 className="subsection-title">{t.coursesTitle}</h3><div className="course-list">{t.courses.map(([year, title, institution]) => <div key={title}><span>{title}<small>{institution}</small></span><time>{year}</time></div>)}</div></div></section>
        <section id="idiomas" className="resume-section languages-section"><div className="section-heading"><span>05</span><h2>{t.languagesTitle}</h2></div><div className="section-body"><dl className="languages-list">{t.languages.map(([name, level]) => <div key={name}><dt>{name}</dt><dd>{level}</dd></div>)}</dl></div></section>
        <section id="contacto" className="resume-section contact-section"><div className="section-heading"><span>06</span><h2>{t.contactTitle}</h2></div><div className="section-body"><p>{t.contactText}</p><div className="contact-row"><a href={contactHref} className="contact-email">{email}<Icon name="external" size={18} /></a><button className="icon-button copy-email" onClick={copyEmail} aria-label={copyState === 'copied' ? t.copied : t.copy}><Icon name={copyState === 'copied' ? 'check' : 'copy'} size={17} /></button></div><p className="copy-feedback" role="status">{copyState === 'copied' ? t.copied : copyState === 'error' ? t.copyError : ''}</p></div></section>
      </div><div className="document-footer"><span>Gabriel Leandro Palazzini</span><a href={cvPath} target="_blank" rel="noreferrer">{t.cv}<Icon name="print" size={15} /></a></div>
    </main><footer className="site-footer"><p>{t.footer}</p><a href="#inicio">{t.top}<Icon name="arrow" size={15} /></a></footer>
  </>
}
export default App
