import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WorkflowPage() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/'); }, [navigate]);
  return null;
}
