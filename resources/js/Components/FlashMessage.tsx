import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const FlashMessage: React.FC = () => {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error' | 'info'>('success');

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else if (flash.info) {
            setMessage(flash.info);
            setType('info');
            setVisible(true);
        }
    }, [flash]);

    if (!visible || !message) return null;

    const styles = {
        success: {
            bg: 'bg-[#122216] border-emerald-500/40 text-emerald-200',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        },
        error: {
            bg: 'bg-[#291415] border-rose-500/40 text-rose-200',
            icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
        },
        info: {
            bg: 'bg-[#181C28] border-sky-500/40 text-sky-200',
            icon: <Info className="w-5 h-5 text-sky-400" />,
        },
    }[type];

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slide-up">
            <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${styles.bg}`}>
                <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
                <div className="text-xs font-medium leading-relaxed flex-1">{message}</div>
                <button
                    onClick={() => setVisible(false)}
                    className="p-1 text-gray-400 hover:text-white transition"
                    aria-label="Close notification"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
