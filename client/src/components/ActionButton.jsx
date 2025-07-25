// src/components/ActionButton.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({ icon: Icon, label, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition ${className}`}
  >
    {/* now Icon is defined */}
    {Icon && <Icon className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />}
    <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
      {label}
    </span>
  </button>
);

ActionButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ActionButton;
