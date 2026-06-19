import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './Nav'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', background: '#0b0e14' }}>
      {/* 1. Sticky Navbar */}
      <Nav />

      <div className="d-flex flex-grow-1">
        {/* 2. Professional Sidebar Container */}
        <aside className="d-none d-md-block" style={{ width: '250px', position: 'sticky', top: '70px', height: 'calc(100vh - 70px)' }}>
          <Sidebar />
        </aside>

        {/* 3. Dynamic Main Content Area */}
        <main className="flex-grow-1 p-4 overflow-auto" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* 4. Animated Glass Toast Notification */}
      <AnimatePresence>
        <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 1 }}
          className="position-fixed bottom-0 end-0 p-4" 
          style={{ zIndex: 1050 }}
        >
          <div 
            className="toast show border-0 shadow-lg" 
            style={{ 
              background: 'rgba(28, 200, 138, 0.2)', 
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(28, 200, 138, 0.4)',
              borderRadius: '15px'
            }}
          >
            <div className="toast-body d-flex align-items-center text-white p-3">
              <span className="fs-5 me-2">🚀</span>
              <div>
                <strong className="d-block">Welcome back!</strong>
                <small className="opacity-75">Ready to learn something new?</small>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default Layout