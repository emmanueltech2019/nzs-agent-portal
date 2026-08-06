'use client'
import React, { useState } from 'react';
import axios from '../utils/axios'; // Adjust your path if needed
import { X, Copy, Check } from 'lucide-react';

interface AgentReferralButtonProps {
    children?: React.ReactNode;
}

const AgentReferralButton = ({ children = "View Code" }: AgentReferralButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [referralLink, setReferralLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleOpenModal = async () => {
        setIsOpen(true);
        if (referralLink) return; // Don't fetch if already have it

        setIsLoading(true);
        try {
            const response = await axios(
                { url: '/agents/profile', headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            } }, 
                );
            // Assuming the agent ID is in response.data.agentId or response.data.id
            const agentId = response.data.data.referralCode 
            console.log("Agent ID:", agentId);
            setReferralLink(`https://naijazoneonline.com/auth/sign-up?agentId=${agentId}`);
        } catch (error) {
            console.error("Error fetching agent profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <>
            {/* The Trigger Element */}
            <div 
                onClick={handleOpenModal} 
                className="rounded-full bg-superlightgreen flex-shrink-0 text-major-green p-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
                {children}
            </div>

            {/* The Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
                        
                        {isLoading ? (
                            <p className="py-4 text-center">Generating link...</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="bg-gray-100 p-3 rounded-lg text-sm break-all font-mono border border-gray-200">
                                    {referralLink || "Could not generate link."}
                                </div>
                                <button 
                                    onClick={copyToClipboard}
                                    className="flex items-center justify-center gap-2 w-full bg-majorgreen text-white py-3 rounded-xl font-bold"
                                >
                                    {isCopied ? <Check size={20} /> : <Copy size={20} />}
                                    {isCopied ? "Copied!" : "Copy Link"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AgentReferralButton;