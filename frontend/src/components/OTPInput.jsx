// import React, { useState, useRef, useEffect } from 'react';

// const OTPInput = ({ length = 4, onComplete }) => {
//   const [otp, setOtp] = useState(new Array(length).fill(''));
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const handleChange = (index, e) => {
//     const value = e.target.value;
    
//     // Only allow numbers
//     if (!/^\d?$/.test(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
    
//     // Trigger completion when all fields are filled
//     if (newOtp.every(digit => digit !== '')) {
//       onComplete(newOtp.join(''));
//     }
    
//     // Auto focus next input
//     if (value && index < length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     // Handle backspace
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text');
//     const numbers = pastedData.replace(/\D/g, '').slice(0, length);
    
//     if (numbers.length === length) {
//       const newOtp = numbers.split('');
//       setOtp(newOtp);
//       onComplete(numbers);
//       inputRefs.current[length - 1].focus();
//     }
//   };

//   return (
//     <div className="flex justify-center space-x-4">
//       {otp.map((digit, index) => (
//         <div key={index} className="relative">
//           <input
//             ref={(el) => (inputRefs.current[index] = el)}
//             type="text"
//             inputMode="numeric"
//             maxLength="1"
//             value={digit}
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             onPaste={handlePaste}
//             className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-200 bg-white"
//           />
//           {index < length - 1 && (
//             <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
//               <div className="w-2 h-0.5 bg-gray-400"></div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OTPInput;

// import React, { useState, useRef, useEffect } from 'react';

// const OTPInput = ({ length = 4, onComplete }) => {
//   const [otp, setOtp] = useState(new Array(length).fill(''));
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const clearOtp = () => {
//     setOtp(new Array(length).fill(""));
//     inputRefs.current[0].focus();
//   };

//   const handleChange = (index, e) => {
//     const value = e.target.value;
//     if (!/^\d?$/.test(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
    
//     if (newOtp.every(digit => digit !== '')) {
//       onComplete(newOtp.join(''));
//     }
    
//     if (value && index < length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text');
//     const numbers = pastedData.replace(/\D/g, '').slice(0, length);
    
//     if (numbers.length === length) {
//       const newOtp = numbers.split('');
//       setOtp(newOtp);
//       onComplete(numbers);
//       inputRefs.current[length - 1].focus();
//     }
//   };

//   return (
//     <div className="flex justify-center space-x-4">
//       {otp.map((digit, index) => (
//         <div key={index} className="relative">
//           <input
//             ref={(el) => (inputRefs.current[index] = el)}
//             type="text"
//             inputMode="numeric"
//             maxLength="1"
//             value={digit}
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             onPaste={handlePaste}
//             className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-200 bg-white"
//           />
//           {index < length - 1 && (
//             <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
//               <div className="w-2 h-0.5 bg-gray-400"></div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OTPInput;

import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 4, onComplete, resetTrigger = 0 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Add this useEffect to clear OTP when resetTrigger changes
  useEffect(() => {
    setOtp(new Array(length).fill(''));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [resetTrigger, length]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
    
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').slice(0, length);
    
    if (numbers.length === length) {
      const newOtp = numbers.split('');
      setOtp(newOtp);
      onComplete(numbers);
      inputRefs.current[length - 1].focus();
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      {otp.map((digit, index) => (
        <div key={index} className="relative">
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-200 bg-white"
          />
          {index < length - 1 && (
            <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
              <div className="w-2 h-0.5 bg-gray-400"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OTPInput;
