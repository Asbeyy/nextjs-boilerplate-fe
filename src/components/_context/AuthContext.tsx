"use client"

// AuthContext.js
import { authenticate } from '@/services/api';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect } from 'react';
import ToastCustom from '../toast/Toast';

export const AuthContext = createContext({
    setIsSidepanelOpen: (boolean: boolean)=> {},
    isSidepanelOpen: false,
    
    name: null,
    role: null,
    isActive: null,
    id: null
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isSidepanelOpen, setIsSidepanelOpen] = useState<boolean>(true);
    const [name, setName] = useState<any>(null);
    const [id, setId] = useState<any>(null);
    const [role, setRole] = useState<any>(null);
    const [isActive, setIsActive] = useState<any>(null);

    
    
    useEffect(() => {
        //check if you are in the protected route /dashboard (only then you need to check if the user is authenticated)
        if (pathname.startsWith('/dashboard')){
            
            const fetchAdminStatus = async () => {
                const adminStatus = await authenticate();
                
                if (!adminStatus) {
                    router.push('/auth/login');
                    ToastCustom('error', 'You need to be logged in to access this page');
                    return;
                }
    
                if (!adminStatus.success){
                    router.push('/auth/login');
                    ToastCustom('error', 'You need to be logged in to access this page');
                    return;
                }
                
    
                setIsActive(adminStatus.data.account.booleans.isVerified);
                setRole(adminStatus.data.account.user.type);
                setName(adminStatus.data.account.user.name);
                setId(adminStatus.data.account._id);
            };

            fetchAdminStatus();
        }
        
        

        
    }, []);

    return (
        <AuthContext.Provider value={{ name, role, isActive, id, isSidepanelOpen, setIsSidepanelOpen }}>
            {children}
        </AuthContext.Provider>
    );
};
