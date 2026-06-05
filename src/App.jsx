import { useState } from 'react'
import './App.css'

const API_BASE = 'http://localhost:3001/api'

// Loading Spinner Component
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('outreach')

  return (
    <div className="min-h-screen bg-linkedin-gray">
      {/* Navbar */}
      <nav className="bg-linkedin-blue fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-linkedin-blue font-bold text-2xl">in</span>
              </div>
              <span className="text-white font-semibold text-xl hidden sm:block">LinkedIn AI</span>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-white/10 text-white placeholder-white/60 rounded px-4 py-2 pl-10 focus:outline-none focus:bg-white/20"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('outreach')}
                className={`flex flex-col items-center px-4 py-2 rounded transition-colors ${activeTab === 'outreach' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs">Outreach Composer</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center px-4 py-2 rounded transition-colors ${activeTab === 'profile' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs">Profile Coach</span>
              </button>

              <button
                onClick={() => setActiveTab('job')}
                className={`flex flex-col items-center px-4 py-2 rounded transition-colors ${activeTab === 'job' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Job Debrief</span>
              </button>

              {/* Profile Avatar */}
              <div className="w-10 h-10 bg-gray-300 rounded-full ml-4 flex items-center justify-center border-2 border-white/30">
                <span className="text-linkedin-blue font-semibold">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-8">
        {activeTab === 'outreach' && <OutreachComposer />}
        {activeTab === 'profile' && <ProfileCoach />}
        {activeTab === 'job' && <JobDebrief />}
      </main>
    </div>
  )
}

// Screen 1: Context-Aware Outreach Composer
function OutreachComposer() {
  const [message, setMessage] = useState("Hi Sarah, I came across your recent post on AI product strategy and it really resonated with my work at [Company]. I'm exploring PM roles at consumer AI companies and would love to hear how you navigated the transition to Google. Would you be open to a 15-min chat?");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const profile = {
    name: "Sarah Chen",
    role: "Senior Product Manager at Google",
    recentActivity: "Posted about AI product strategy, commented on a hiring post, shared a Lenny's Newsletter article"
  };

  const generateMessage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Calling API at:', `${API_BASE}/outreach`);
      const response = await fetch(`${API_BASE}/outreach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (data.error) throw new Error(data.error);
      setMessage(data.message);
    } catch (err) {
      console.error('Error fetching:', err);
      // Fallback to mock data if API fails
      setMessage("Hi Sarah! Loved your recent post on AI product strategy. Your work at Google is inspiring - I'd love to connect and learn more about your journey!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 bg-linkedin-blue rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">SC</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Sarah Chen</h2>
              <p className="text-gray-600">Senior Product Manager at Google</p>
              <p className="text-gray-500 text-sm mt-1">San Francisco Bay Area · 500+ connections</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent activity</h3>
            <div className="space-y-4">
              <div className="flex gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">SC</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Sarah Chen</p>
                  <p className="text-gray-600 text-sm">Posted about AI product strategy</p>
                  <p className="text-gray-400 text-xs mt-1">3 days ago</p>
                </div>
              </div>
              <div className="flex gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">SC</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Sarah Chen</p>
                  <p className="text-gray-600 text-sm">Commented on a hiring post</p>
                  <p className="text-gray-400 text-xs mt-1">1 week ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">SC</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Sarah Chen</p>
                  <p className="text-gray-600 text-sm">Shared a Lenny's Newsletter article</p>
                  <p className="text-gray-400 text-xs mt-1">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Message Composer */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">AI Outreach Composer</h2>
              <span className="bg-linkedin-purple text-white text-xs font-medium px-3 py-1 rounded-full">AI</span>
            </div>

            <textarea
              className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent resize-none text-gray-700"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            {error && (
              <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={generateMessage}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Spinner /> : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                Generate Message
              </button>
              <button className="px-4 py-2 bg-linkedin-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Send Message
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Response rate for AI-crafted messages: <strong>34%</strong> vs <strong>3%</strong> average</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 2: Target Role Profile Coach
function ProfileCoach() {
  const [targetRole, setTargetRole] = useState("Product Manager at Google");
  const [gaps, setGaps] = useState([
    { missing: "SQL / data analysis", fix: "Add a project or certification" },
    { missing: "GTM experience", fix: "Add to your experience descriptions" },
    { missing: "Recommendations", fix: "You have 1, top candidates have 5+" },
    { missing: "PM tools keywords", fix: "Add Figma, Jira, Mixpanel to skills" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/profile-coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.gaps.length > 0) setGaps(data.gaps);
    } catch (err) {
      // Fallback to mock data if API fails
      setGaps([
        { missing: "SQL & Data Analysis", fix: "Add a project showcasing SQL queries" },
        { missing: "GTM Experience", fix: "Describe a product launch you led" },
        { missing: "Strong Recommendations", fix: "Ask 2 colleagues for recommendations" },
        { missing: "PM Tools", fix: "Add Figma, Jira, Mixpanel to your skills" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Input Section */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter your target role e.g. Product Manager at Google"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
          />
          <button
            onClick={analyze}
            disabled={isLoading}
            className="px-6 py-3 bg-linkedin-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Spinner /> : "Analyze"}
          </button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* Profile Match */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Match: {targetRole} — 67%</h3>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-linkedin-blue h-3 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>

        {/* Gap Analysis */}
        <h4 className="text-md font-semibold text-gray-900 mb-4">What top PMs have that you don't:</h4>
        <div className="space-y-4">
          {gaps.map((gap, index) => (
            <div key={index} className={`flex gap-4 p-4 rounded-lg border ${index === 2 ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${index === 2 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <svg className={`w-5 h-5 ${index === 2 ? 'text-yellow-600' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">Missing: {gap.missing}</p>
                <p className="text-gray-600 text-sm">{gap.fix}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 px-6 py-3 bg-linkedin-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
          Fix My Profile
        </button>
      </div>
    </div>
  )
}

// Screen 3: Pre-Apply Job Match Debrief
function JobDebrief() {
  const jobDescription = "Product Manager, LinkedIn AI Features. LinkedIn, San Francisco (Hybrid). Requirements: 3+ years PM experience, data-driven mindset, experience with ML products, strong communication, cross-functional leadership";
  const [debrief, setDebrief] = useState({
    strengths: "Your profile shows 3 years PM experience and a recommendation from a senior leader. Your skills section matches 6 of 9 required keywords.",
    watch_out: "You have no listed experience with ML products. Consider adding your exposure to AI tools in your current role.",
    fix_now: "Your headline doesn't mention product management. Update it before applying — recruiters scan headlines first."
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDebrief = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/job-debrief`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.debrief) setDebrief(data.debrief);
    } catch (err) {
      // Fallback to mock data if API fails
      setDebrief({
        strengths: "You have 3+ years PM experience and a senior leader recommendation",
        watch_out: "No ML product experience listed - highlight AI tools you use",
        fix_now: "Update your headline to include 'Product Manager'!"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Job Posting */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-16 h-16 bg-linkedin-blue rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">in</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Product Manager, LinkedIn AI Features</h2>
              <p className="text-gray-600">LinkedIn</p>
              <p className="text-gray-500 text-sm">San Francisco, CA (Hybrid)</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-md font-semibold text-gray-900 mb-3">Requirements:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-linkedin-blue mt-1">•</span>
                3+ years PM experience
              </li>
              <li className="flex items-start gap-2">
                <span className="text-linkedin-blue mt-1">•</span>
                Data-driven mindset
              </li>
              <li className="flex items-start gap-2">
                <span className="text-linkedin-blue mt-1">•</span>
                Experience with ML products
              </li>
              <li className="flex items-start gap-2">
                <span className="text-linkedin-blue mt-1">•</span>
                Strong communication
              </li>
              <li className="flex items-start gap-2">
                <span className="text-linkedin-blue mt-1">•</span>
                Cross-functional leadership
              </li>
            </ul>
          </div>
        </div>

        {/* Right: AI Debrief */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Your AI Job Debrief</h2>
                <span className="bg-linkedin-purple text-white text-xs font-medium px-3 py-1 rounded-full">AI</span>
              </div>
              <button
                onClick={getDebrief}
                disabled={isLoading}
                className="px-4 py-2 bg-linkedin-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Spinner /> : "Get Debrief"}
              </button>
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <div className="space-y-4">
              {/* Strengths */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-green-800 font-semibold">Your Strengths</h4>
                </div>
                <p className="text-green-700 text-sm">{debrief.strengths}</p>
              </div>

              {/* Watch Out For */}
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h4 className="text-yellow-800 font-semibold">Watch Out For</h4>
                </div>
                <p className="text-yellow-700 text-sm">{debrief.watch_out}</p>
              </div>

              {/* Fix Before Applying */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h4 className="text-red-800 font-semibold">Fix Before Applying</h4>
                </div>
                <p className="text-red-700 text-sm">{debrief.fix_now}</p>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-5xl font-bold text-linkedin-blue mb-2">78%</div>
            <p className="text-gray-600 text-lg mb-4">Apply Confidence Score</p>
            <button className="px-8 py-3 bg-linkedin-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
              Start Application
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
