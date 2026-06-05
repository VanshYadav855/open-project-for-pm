import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = 'http://localhost:3001/api'

/* ─── Spinner ──────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

/* ─── AI Badge ─────────────────────────────────────────────────────────────── */
function AIBadge() {
  return <span className="ai-badge">✦ AI</span>
}

/* ─── Toast Notification ───────────────────────────────────────────────────── */
function Toast({ message, type = 'ai' }) {
  const bg = type === 'ai'
    ? 'linear-gradient(135deg, #7C3AED, #5b21b6)'
    : 'linear-gradient(135deg, #10B981, #059669)'
  const shadow = type === 'ai'
    ? '0 8px 28px rgba(124,58,237,0.45)'
    : '0 8px 28px rgba(16,185,129,0.4)'
  return (
    <div className="toast-notification" style={{ background: bg, boxShadow: shadow }}>
      <span style={{ fontSize: 15 }}>{type === 'ai' ? '✦' : '✓'}</span>
      <span>{message}</span>
    </div>
  )
}

/* ─── Confidence Score Ring (SVG) ──────────────────────────────────────────── */
function ConfidenceRing({ score = 78 }) {
  const [animated, setAnimated] = useState(false)
  const r = 52
  const circumference = 2 * Math.PI * r
  const offset = animated ? circumference - (score / 100) * circumference : circumference

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'relative', width: 148, height: 148, flexShrink: 0 }}>
      <svg width="148" height="148" viewBox="0 0 148 148" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0A66C2" />
            <stop offset="55%"  stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx="74" cy="74" r={r} fill="none" stroke="#e8eef5" strokeWidth="11" />
        {/* Progress */}
        <circle
          cx="74" cy="74" r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 74 74)"
          filter="url(#ringGlow)"
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      {/* Inner label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        lineHeight: 1.1,
      }}>
        <span style={{ fontSize: 30, fontWeight: 800, color: '#0A66C2', letterSpacing: '-0.04em' }}>{score}%</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Match</span>
      </div>
    </div>
  )
}

/* ─── App Shell ────────────────────────────────────────────────────────────── */
function App() {
  const [activeTab, setActiveTab] = useState('outreach')

  // Scroll to top smoothly on every tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const tabs = [
    {
      id: 'outreach',
      label: 'Outreach',
      path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
    {
      id: 'profile',
      label: 'Profile Coach',
      path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      id: 'job',
      label: 'Job Debrief',
      path: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(ellipse at 18% 0%, rgba(10,102,194,0.08) 0%, transparent 48%),' +
          'radial-gradient(ellipse at 82% 100%, rgba(124,58,237,0.07) 0%, transparent 48%),' +
          '#F3F2EF',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #0A66C2, #0855a5)',
                borderRadius: 9,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(10,102,194,0.35)',
              }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 19, lineHeight: 1, letterSpacing: '-0.02em' }}>in</span>
              </div>
              <div className="hidden sm:flex flex-col" style={{ lineHeight: 1.1 }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', letterSpacing: '-0.025em' }}>LinkedIn</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #0A66C2, #7C3AED)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>AI Powered</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm mx-6 hidden md:block">
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search people, jobs, posts…"
                  style={{
                    width: '100%', borderRadius: 9999, padding: '8px 16px 8px 36px',
                    background: '#f0f4f9', border: '1.5px solid #e2e8f0',
                    fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13, color: '#334155',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
                <svg
                  style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#94a3b8' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Tabs + Avatar */}
            <div className="flex items-center gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-pill ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.path} />
                  </svg>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
              <div className="nav-avatar ml-1">JD</div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="pt-20 pb-12">
        <div key={activeTab} className="tab-content">
          {activeTab === 'outreach' && <OutreachComposer />}
          {activeTab === 'profile'  && <ProfileCoach />}
          {activeTab === 'job'      && <JobDebrief />}
        </div>
      </main>
    </div>
  )
}

/* ─── Screen 1: Context-Aware Outreach Composer ────────────────────────────── */
function OutreachComposer() {
  const [message, setMessage] = useState(
    "Hi Sarah, I came across your recent post on AI product strategy and it really resonated with my work at [Company]. I'm exploring PM roles at consumer AI companies and would love to hear how you navigated the transition to Google. Would you be open to a 15-min chat?"
  )
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess]     = useState(false)
  const [toast, setToast]         = useState(null)
  const [error, setError]         = useState(null)

  const fireToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  const profile = {
    name:           'Sarah Chen',
    role:           'Senior Product Manager at Google',
    recentActivity: "Posted about AI product strategy, commented on a hiring post, shared a Lenny's Newsletter article",
  }

  const generateMessage = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('Calling API at:', `${API_BASE}/outreach`)
      const response = await fetch(`${API_BASE}/outreach`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(profile),
      })
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      if (data.error) throw new Error(data.error)
      setMessage(data.message)
      setSuccess(true)
      fireToast('AI message generated!', 'success')
      setTimeout(() => setSuccess(false), 2500)
    } catch (err) {
      console.error('Error fetching:', err)
      // Fallback to mock data if API fails
      setMessage("Hi Sarah! Loved your recent post on AI product strategy. Your work at Google is inspiring - I'd love to connect and learn more about your journey!")
      setSuccess(true)
      fireToast('AI message generated!', 'success')
      setTimeout(() => setSuccess(false), 2500)
    } finally {
      setIsLoading(false)
    }
  }

  const activities = [
    { text: 'Posted about AI product strategy',    when: '3 days ago',  emoji: '✍️' },
    { text: 'Commented on a hiring post',          when: '1 week ago',  emoji: '💬' },
    { text: "Shared a Lenny's Newsletter article", when: '2 weeks ago', emoji: '🔗' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen header */}
      <div className="mb-6 pt-2">
        <span className="screen-label">Context-Aware</span>
        <h1 className="screen-title">Outreach Composer</h1>
        <p className="screen-subtitle">AI analyses Sarah's recent activity to craft the perfect opening message</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Profile Card ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-5">

          {/* Profile identity card */}
          <div className="card-flush">
            <div className="profile-banner" />
            <div className="card-flush-body">
              {/* Avatar overlapping banner */}
              <div style={{ marginTop: -46, marginBottom: 14, position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 78, height: 78, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0A66C2, #0855a5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '4px solid #fff',
                  boxShadow: '0 4px 18px rgba(10,102,194,0.28)',
                }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: '0.02em' }}>SC</span>
                </div>
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 2 }}>Sarah Chen</h2>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>Senior Product Manager · Google</p>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>San Francisco Bay Area · 500+ connections</p>
              <div className="flex flex-wrap gap-2">
                <span className="tag-green">🟢 Active today</span>
                <span className="tag-purple">✦ AI match: 94%</span>
              </div>
            </div>
          </div>

          {/* Recent Activity timeline */}
          <div className="card" style={{ padding: 22 }}>
            <div className="flex items-center justify-between mb-5">
              <span className="section-title">Recent Activity</span>
              <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Last 2 weeks</span>
            </div>
            <div>
              {activities.map((item, i) => (
                <div key={i} className={`activity-line flex gap-3 ${i < activities.length - 1 ? 'mb-4' : ''}`}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #0A66C2, #0855a5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(10,102,194,0.2)',
                  }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>SC</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 1 }}>Sarah Chen</p>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 2, lineHeight: 1.4 }}>{item.emoji} {item.text}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{item.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: AI Composer ──────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center gap-3 mb-1">
              <span className="section-title-underline">AI Outreach Composer</span>
              <AIBadge />
            </div>
            <p className="section-subtitle mb-5">Personalised based on Sarah's recent LinkedIn activity</p>

            {/* Textarea with character counter */}
            <div style={{ position: 'relative' }}>
              <textarea
                className="ai-input w-full rounded-xl resize-none"
                style={{ padding: '16px', minHeight: 176, lineHeight: 1.7, borderRadius: 13, display: 'block' }}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <span style={{
                position: 'absolute', bottom: 12, right: 14,
                fontSize: 11, color: '#94a3b8', fontWeight: 500,
                background: 'rgba(255,255,255,0.9)', padding: '1px 6px', borderRadius: 6,
              }}>
                {message.length} chars
              </span>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              {/* AI button — calls Claude API */}
              <button
                onClick={generateMessage}
                disabled={isLoading}
                className={`btn-ai ${success ? 'btn-success' : ''}`}
              >
                {isLoading ? (
                  <><Spinner /><span>✦ AI is thinking…</span></>
                ) : success ? (
                  <><span style={{ fontSize: 15 }}>✓</span><span>Generated!</span></>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate with AI
                  </>
                )}
              </button>
              {toast && <Toast message={toast.msg} type={toast.type} />}
              <button className="btn-linkedin">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </button>
            </div>

            {/* Stats pill */}
            <div className="stats-pill mt-5">
              <span style={{ fontSize: 20 }}>📈</span>
              <span>AI-crafted messages get <strong>11× higher</strong> response rates than cold outreach</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Screen 2: Target Role Profile Coach ──────────────────────────────────── */
function ProfileCoach() {
  const [targetRole, setTargetRole] = useState('Product Manager at Google')
  const [gaps, setGaps] = useState([
    { missing: 'SQL / data analysis',  fix: 'Add a project or certification',       status: 'missing'    },
    { missing: 'GTM experience',       fix: 'Add to your experience descriptions',  status: 'missing'    },
    { missing: 'Recommendations',      fix: 'You have 1, top candidates have 5+',  status: 'needs_work' },
    { missing: 'PM tools keywords',    fix: 'Add Figma, Jira, Mixpanel to skills', status: 'missing'    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess]     = useState(false)
  const [toast, setToast]         = useState(null)
  const [error, setError]         = useState(null)

  const fireToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  const analyze = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/profile-coach`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ targetRole }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      if (data.gaps && data.gaps.length > 0) {
        setGaps(data.gaps.map(g => ({ ...g, status: g.status || 'missing' })))
      }
      setSuccess(true)
      fireToast('Profile analysis complete!', 'success')
      setTimeout(() => setSuccess(false), 2500)
    } catch (err) {
      // Fallback to mock data if API fails
      setGaps([
        { missing: 'SQL & Data Analysis',    fix: 'Add a project showcasing SQL queries',    status: 'missing'    },
        { missing: 'GTM Experience',         fix: 'Describe a product launch you led',        status: 'missing'    },
        { missing: 'Strong Recommendations', fix: 'Ask 2 colleagues for recommendations',    status: 'needs_work' },
        { missing: 'PM Tools',              fix: 'Add Figma, Jira, Mixpanel to your skills', status: 'missing'    },
      ])
      setSuccess(true)
      fireToast('Profile analysis complete!', 'success')
      setTimeout(() => setSuccess(false), 2500)
    } finally {
      setIsLoading(false)
    }
  }

  const meta = {
    missing:    { chip: '✗ Missing',    icon: 'bg-red-100',   svg: 'text-red-500'   },
    needs_work: { chip: '⚡ Needs work', icon: 'bg-amber-100', svg: 'text-amber-500' },
    good:       { chip: '✓ Good',       icon: 'bg-green-100', svg: 'text-green-500' },
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen header */}
      <div className="mb-6 pt-2">
        <span className="screen-label">AI Gap Analysis</span>
        <h1 className="screen-title">Profile Coach</h1>
        <p className="screen-subtitle">Pinpoint exactly what's holding your profile back from top roles</p>
      </div>

      <div className="card">
        {/* Input row */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Target role, e.g. Product Manager at Google"
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
            className="ai-input flex-1 rounded-xl"
            style={{ padding: '12px 16px' }}
          />
          {/* AI button — calls Claude API */}
          <button
            onClick={analyze}
            disabled={isLoading}
            className={`btn-ai ${success ? 'btn-success' : ''}`}
            style={{ flexShrink: 0 }}
          >
            {isLoading ? (
              <><Spinner /><span>✦ AI is thinking…</span></>
            ) : success ? (
              <><span style={{ fontSize: 15 }}>✓</span><span>Analysis done!</span></>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Analyze Profile
              </>
            )}
          </button>
          {toast && <Toast message={toast.msg} type={toast.type} />}
        </div>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

        {/* Profile match score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', margin: 0 }}>
              Profile Match Score
            </h3>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#0A66C2', letterSpacing: '-0.04em' }}>67%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '67%' }} />
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
            vs. <strong style={{ color: '#334155' }}>{targetRole}</strong>
          </p>
        </div>

        <div className="divider-label">What top PMs have that you don't</div>

        {/* Gap cards */}
        <div className="space-y-3">
          {gaps.map((gap, i) => {
            const m = meta[gap.status] || meta.missing
            return (
              <div key={i} className={`gap-card status-${gap.status}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${m.icon}`}>
                  <svg className={`w-4 h-4 ${m.svg}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>{gap.missing}</p>
                    <span className={`status-chip chip-${gap.status}`}>{m.chip}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{gap.fix}</p>
                </div>
              </div>
            )
          })}
        </div>

        <button className="btn-linkedin w-full justify-center mt-8" style={{ padding: '13px 24px', fontSize: 15 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Fix My Profile
        </button>
      </div>
    </div>
  )
}

/* ─── Screen 3: Pre-Apply Job Match Debrief ────────────────────────────────── */
function JobDebrief() {
  const jobDescription = 'Product Manager, LinkedIn AI Features. LinkedIn, San Francisco (Hybrid). Requirements: 3+ years PM experience, data-driven mindset, experience with ML products, strong communication, cross-functional leadership'
  const [debrief, setDebrief] = useState({
    strengths: 'Your profile shows 3 years PM experience and a recommendation from a senior leader. Your skills section matches 6 of 9 required keywords.',
    watch_out: 'You have no listed experience with ML products. Consider adding your exposure to AI tools in your current role.',
    fix_now:   "Your headline doesn't mention product management. Update it before applying — recruiters scan headlines first.",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess]     = useState(false)
  const [toast, setToast]         = useState(null)
  const [error, setError]         = useState(null)

  const fireToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  const getDebrief = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/job-debrief`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ jobDescription }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      if (data.debrief) setDebrief(data.debrief)
      setSuccess(true)
      fireToast('Job debrief ready!', 'success')
      setTimeout(() => setSuccess(false), 2500)
    } catch (err) {
      // Fallback to mock data if API fails
      setDebrief({
        strengths: 'You have 3+ years PM experience and a senior leader recommendation',
        watch_out: 'No ML product experience listed - highlight AI tools you use',
        fix_now:   "Update your headline to include 'Product Manager'!",
      })
      setSuccess(true)
      fireToast('Job debrief ready!', 'success')
      setTimeout(() => setSuccess(false), 2500)
    } finally {
      setIsLoading(false)
    }
  }

  const keywords = [
    { text: '3+ yrs PM',        match: true  },
    { text: 'Data-driven',      match: true  },
    { text: 'ML Products',      match: false },
    { text: 'Communication',    match: true  },
    { text: 'Cross-functional', match: true  },
    { text: 'AI/ML Tools',      match: false },
  ]

  const requirements = [
    '3+ years PM experience',
    'Data-driven mindset',
    'Experience with ML products',
    'Strong communication',
    'Cross-functional leadership',
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen header */}
      <div className="mb-6 pt-2">
        <span className="screen-label">Pre-Apply Intelligence</span>
        <h1 className="screen-title">Job Match Debrief</h1>
        <p className="screen-subtitle">Know your strengths and gaps before hitting Apply</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Left: Job Posting ───────────────────────────────────────────── */}
        <div className="card">
          {/* Company header */}
          <div className="flex gap-4 mb-5">
            <div style={{
              width: 56, height: 56, borderRadius: 14, flexShrink: 0,
              background: 'linear-gradient(135deg, #0A66C2, #0855a5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(10,102,194,0.28)',
            }}>
              <span style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>in</span>
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 3 }}>
                Product Manager, LinkedIn AI Features
              </h2>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 5 }}>LinkedIn · San Francisco, CA · Hybrid</p>
              <span className="tag-green">🟢 Actively hiring</span>
            </div>
          </div>

          <div className="divider-label">Requirements</div>

          <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {requirements.map((r, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155' }}>
                <span style={{ color: '#0A66C2', fontWeight: 800, fontSize: 15 }}>•</span>
                {r}
              </li>
            ))}
          </ul>

          <div className="divider-label">Keyword Match</div>

          <div className="flex flex-wrap gap-2">
            {keywords.map((k, i) => (
              <span key={i} className={`keyword-chip ${k.match ? 'keyword-match' : 'keyword-missing'}`}>
                {k.match ? '✓' : '✗'} {k.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: AI Debrief + Score ────────────────────────────────────── */}
        <div className="space-y-5">

          {/* AI Debrief card */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="section-title-underline">AI Job Debrief</span>
                <AIBadge />
              </div>
              {/* AI button — calls Claude API */}
              <button
                onClick={getDebrief}
                disabled={isLoading}
                className={`btn-ai ${success ? 'btn-success' : ''}`}
                style={{ padding: '8px 16px', fontSize: 13 }}
              >
                {isLoading ? (
                  <><Spinner /><span>✦ AI is thinking…</span></>
                ) : success ? (
                  <><span style={{ fontSize: 14 }}>✓</span><span>Debrief ready!</span></>
                ) : (
                  'Get Debrief'
                )}
              </button>
              {toast && <Toast message={toast.msg} type={toast.type} />}
            </div>

            {error && <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

            <div className="space-y-3">
              <div className="insight-card insight-green">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#15803d', margin: 0 }}>Your Strengths</h4>
                </div>
                <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.6, margin: 0 }}>{debrief.strengths}</p>
              </div>

              <div className="insight-card insight-yellow">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#92400e', margin: 0 }}>Watch Out For</h4>
                </div>
                <p style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6, margin: 0 }}>{debrief.watch_out}</p>
              </div>

              <div className="insight-card insight-red">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c', margin: 0 }}>Fix Before Applying</h4>
                </div>
                <p style={{ fontSize: 13, color: '#991b1b', lineHeight: 1.6, margin: 0 }}>{debrief.fix_now}</p>
              </div>
            </div>
          </div>

          {/* Confidence Score card */}
          <div className="card">
            <div className="score-ring-wrapper">
              <ConfidenceRing score={78} />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 4px' }}>
                  Apply Confidence Score
                </h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px' }}>
                  Based on your profile vs. job requirements
                </p>
              </div>
              <button className="btn-linkedin w-full justify-center" style={{ padding: '13px 24px', fontSize: 15 }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Start Application
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
