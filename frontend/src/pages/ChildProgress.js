import React from 'react';
import ParentDashboard from '../components/ParentDashboard';

const ChildProgress = ({ user }) => {
  return (
    <div className="child-progress-page">
      <ParentDashboard user={user} />
    </div>
  );
};

export default ChildProgress;