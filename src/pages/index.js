import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});
      return cookies[name];
    };

    const sid = getCookie('sid'); // Get the 'sid' cookie

    const validateCookie = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/validate-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sid }),
          credentials: 'include', // Ensure cookies are sent with the request
        });

        const data = await response.json();

        if (data.valid) {
          // Redirect to dashboard on successful validation
          window.location.href = 'http://localhost:3000/dashboard';
        } else {
          // Redirect to login if session is invalid
          window.location.href = 'http://localhost:4000/login';
        }
      } catch (error) {
        console.error('Error validating session:', error);
        window.location.href = 'http://localhost:4000/login'; // Fallback to login
      }
    };

    if (sid) {
      validateCookie();
    } else {
      // No cookie, redirect to login
      window.location.href = 'http://localhost:4000/login';
    }
  }, []);

  return null; // No UI needed for this component
}
