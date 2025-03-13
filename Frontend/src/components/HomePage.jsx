import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu,  X } from 'lucide-react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg w-full">
      <div className="flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold">RealTime Chat</Link>
        
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`absolute md:static top-16 left-0 w-full bg-gray-900 md:flex md:items-center md:space-x-6 md:w-auto transition-all ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/login" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">Login</Link>
          <Link to="/signup" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">Signup</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center w-full fixed bottom-0 left-0">
      <p className="text-sm">&copy; 2025 Real Time Chat Application. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link to="/terms" className="hover:underline">Terms of Service</Link>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      {/* <Header /> */}
      <main className="flex-grow p-6 text-center text-white">
        {/* <h1 className="text-3xl font-semibold text-[#e9d116b2]">Welcome to Real-Time Chat</h1>
        <p className="mt-2 text-[#e9d116b2]">Connect and chat with your friends instantly.</p> */}
        <Sidebar/>
        <MessageContainer/>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
