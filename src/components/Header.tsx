import { useState } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  const handleNavigation = (path : string) => {
    setActiveTab(path);
    // For SPA navigation, you might want to use your router's navigation method
    // For example: navigate(path) or history.push(path)
    window.location.href = path;
  };

  return (
    <header className='bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg border-b border-blue-500/20'>
      <div className='flex items-center justify-between px-6 py-4 h-20'>
        {/* Logo/Brand Section */}
        <div className='flex items-center gap-4'>
          <div className='bg-white/10 backdrop-blur-sm rounded-xl p-2'>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className='text-2xl font-bold text-white tracking-tight'>
              Course Management
            </h1>
            <p className='text-blue-100 text-sm font-medium'>
              Learning Path Administration
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className='flex items-center gap-2'>
          <div className='flex bg-white/10 backdrop-blur-sm rounded-xl p-1'>
            <button
              onClick={() => handleNavigation('/course')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === '/course'
                  ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Courses
            </button>
            
            <button
              onClick={() => handleNavigation('/instance')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === '/instance'
                  ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Instances
            </button>
          </div>
        </nav>
      </div>

      {/* Subtle bottom gradient */}
      <div className='h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600'></div>
    </header>
  )
}

export default Header