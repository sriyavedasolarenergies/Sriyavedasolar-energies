import React from 'react';

const PartnerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Partner Features Removed</h2>
        <p className="text-gray-300">The partner dashboard and related features have been removed because Firebase was removed from this project.</p>
      </div>
    </div>
  );
};

export default PartnerDashboard;