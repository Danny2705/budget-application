import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Chat from '../../components/Chat/Chat'; 
import '../../index.css'; 

const Layout = ({ children }) => {
  const [scroll, setScroll] = useState(0);
  const [showChat, setShowChat] = useState(false); // State to manage chat visibility

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar scroll={scroll} />
      <div className="container mx-auto px-4">
        {children}
      </div>
      <Footer />
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50"
        onClick={() => setShowChat(!showChat)} 
        style={{ zIndex: 50 }} 
      >
        <img
          src="/chaticon.png" 
          alt="Chat Icon"
          className="w-8 h-8" 
          style={{ borderRadius: '50%' }} 
        />
      </button>
      {showChat && (
        <div className="fixed bottom-20 right-5 w-full max-w-sm shadow-lg z-50">
          <Chat />
        </div>
      )}
    </>
  );
};

export default Layout;
