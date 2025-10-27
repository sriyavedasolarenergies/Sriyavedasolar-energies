import React from 'react';

const ProfileManagement: React.FC = () => {
  return (
    <div className="min-h-40 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-orange-500/20 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Profile Management Removed</h3>
        <p className="text-gray-300">Profile editing is disabled because Firebase was removed from the project.</p>
      </div>
    </div>
  );
};

export default ProfileManagement;