import { useState, useCallback } from 'react';

export const useAuthModal = () => {
const [isOpen, setIsOpen] = useState(false);
const [mode, setMode] = useState<'login' | 'register'>('login');

const openLogin = useCallback(() => {
    setMode('login');
    setIsOpen(true);
}, []);

const openRegister = useCallback(() => {
    setMode('register');
    setIsOpen(true);
}, []);

const close = useCallback(() => {
    setIsOpen(false);
}, []);

const switchMode = useCallback(() => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
}, []);

return {
    isOpen,
    mode,
    openLogin,
    openRegister,
    close,
    switchMode
};
};