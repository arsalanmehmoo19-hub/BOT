'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Prototype bypass
    if (email === 'usman@gmail.com' && password === '123456') {
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/inventory';
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.reload();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) setError(error.message);
      else alert('Check your email for confirmation!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white border border-bento-line rounded-[32px] space-y-4">
      <h2 className="text-2xl font-black uppercase text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {!isLogin && <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border rounded-xl" />}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-xl" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-xl" />
      <button type="submit" className="w-full bg-black text-white p-3 rounded-xl font-bold uppercase">{isLogin ? 'Log In' : 'Sign Up'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full text-xs underline font-bold uppercase">
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
      </button>
    </form>
  );
}
