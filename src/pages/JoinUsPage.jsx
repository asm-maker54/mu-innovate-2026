import React, { useEffect } from 'react';
import JoinUs from '../components/JoinUs';

const JoinUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <JoinUs />
    </div>
  );
};

export default JoinUsPage;
