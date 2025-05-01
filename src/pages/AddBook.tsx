import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AddBook() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/books');
  }, [navigate]);

  return null;
}
