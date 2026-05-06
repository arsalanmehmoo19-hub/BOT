'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        if (!email || !password) {
          setError('Email and password are required.');
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          router.push('/account');
          router.refresh();
        }
      } else {
        if (!fullName || !email || !password) {
          setError('Name, email, and password are required.');
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          if (data.user.identities && data.user.identities.length === 0) {
            setError('An account with this email already exists.');
          } else {
            setMessage('Account created. Check your email to confirm signup.');
            setIsLogin(true);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white border border-bento-line rounded-[32px] space-y-4">
      <h2 className="text-2xl font-black uppercase text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
      {message && <p className="text-green-500 text-xs text-center">{message}</p>}
      {!isLogin && (
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 border border-bento-line focus:border-black outline-none rounded-xl"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-bento-line focus:border-black outline-none rounded-xl"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-bento-line focus:border-black outline-none rounded-xl"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-xl font-bold uppercase disabled:opacity-50"
      >
        {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
      </button>
      <button
        type="button"
        onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
        className="w-full text-xs underline font-bold uppercase"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
      </button>
    </form>
  );
}
