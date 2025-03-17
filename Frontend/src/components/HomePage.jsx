import React from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="bg-gray-900 text-white p-4 shadow-lg w-full">
//       <div className="flex justify-between items-center px-6">
//         <Link to="/" className="text-2xl font-bold">RealTime Chat</Link>
        
//         <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>

//         <nav className={`absolute md:static top-16 left-0 w-full bg-gray-900 md:flex md:items-center md:space-x-6 md:w-auto transition-all ${isOpen ? 'block' : 'hidden'}`}>
//           <Link to="/login" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">Login</Link>
//           <Link to="/signup" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">Signup</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white p-4 text-center w-full">
//       <p className="text-sm">&copy; 2025 Real Time Chat Application. All rights reserved.</p>
//       <div className="flex justify-center space-x-4 mt-2">
//         <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
//         <Link to="/terms" className="hover:underline">Terms of Service</Link>
//       </div>
//     </footer>
//   );
// }

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <div className="flex-grow flex flex-row sm:h-[450px] md:h-[600px] rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 gap-4 m-5 p-3">
        <Sidebar />
        <div className="flex-grow overflow-y-auto">
          <MessageContainer />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;