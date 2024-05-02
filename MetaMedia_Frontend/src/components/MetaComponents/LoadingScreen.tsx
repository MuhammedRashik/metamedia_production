import React from 'react';

const Loader = () => {
  return (
    <>
      <style>{`
        /* CSS styles */
        .loader-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .spinner {
          margin: auto;
          width: 50px;
          height: 40px;
          text-align: center;
          font-size: 10px;
        }
        
        p {
          font-size: 50px;
          color: transparent;
        }

        audio {
          visibility: hidden;
        }
        
        .spinner > div {
          background-color: #333;
          height: 100%;
          width: 6px;
          display: inline-block;
          -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
          animation: sk-stretchdelay 1.2s infinite ease-in-out;
        }
        
        .spinner .rect1 {
          background: #fff;
          -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
        }
        
        .spinner .rect2 {
          background: #fff;
          -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
        }
        
        .spinner .rect3 {
          background: #fff;
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }
        
        .spinner .rect4 {
          background: #fff;
          -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s;
        }
        
        .spinner .rect5 {
          -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s;
          background: #fff;
        }
        
        @-webkit-keyframes sk-stretchdelay {
          0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
          20% { -webkit-transform: scaleY(1.0) }
        }
        
        @keyframes sk-stretchdelay {
          0%, 40%, 100% { 
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
          }  
          20% { 
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
          }
        }

        body {
          color: #fff;
          background: #1e293b; 
        }
        
        .sk-circle {
          margin: 0 auto;
          width: 10px;
          height: 10px;
          position: relative;
          background: #1e293b;
          border-radius: 100%;
          left: -18px;
          -webkit-animation: sk 1.2s infinite ease-in-out;
          animation: sk 1.2s infinite ease-in-out;
        }
        
        @keyframes sk {
          1% { top: -15px; background: #fff; }
          2% { top: 10px; }
          5% { top: -20px; }
          10% { left: -10px; }
          20% { top: -25px; }
          30% { left: 15px; background: #fff; }
          35% { top: 5px; }
          45% { top: -5px; }
          50% { top: -5px; }
          60% { top: -6px; }
          70% { top: 6px; }
          80% { top: 6px; }
          60% { top: -6px; background: #fff; }
        }
      `}</style>
      
      <div className="loader-container">
        <div className="box">
          <div className="sk-circle"></div>
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
        <audio controls>
          <source src="http://macmhatre.com/karaoke/1.mp3" />
          <source src="http://macmhatre.com/karaoke/1.mp3" />  
        </audio>
      </div>
    </>
  );
};

export default Loader;
