import React from 'react';

const InlineMessage = ({ type, text }) => <span className={`inline-message ${type}`}>{text}</span>;

export default InlineMessage;
