import { createContext, useContext, useState, type ReactNode } from 'react';

type IconType = 'success' | 'error' | 'info' | 'warning';

interface AlertOptions {
    title?: string;
    icon?: IconType;
    confirmText?: string;
    cancelText?: string;
}

interface AlertContextType {
    showAlert: (message: string, options?: AlertOptions) => Promise<void>;
    showConfirm: (message: string, onConfirm: () => void, options?: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<{
        message: string;
        title: string;
        icon: IconType;
        confirmText: string;
        cancelText?: string;
        onConfirm: () => void;
        showCancel: boolean;
    }>({
        message: '',
        title: '',
        icon: 'info',
        confirmText: 'حسناً',
        onConfirm: () => { },
        showCancel: false,
    });

    const showAlert = (message: string, options: AlertOptions = {}) => {
        return new Promise<void>((resolve) => {
            setConfig({
                message,
                title: options.title || 'تنبيه',
                icon: options.icon || 'info',
                confirmText: options.confirmText || 'حسناً',
                showCancel: false,
                onConfirm: () => {
                    setIsOpen(false);
                    resolve();
                },
            });
            setIsOpen(true);
        });
    };

    const showConfirm = (message: string, onConfirm: () => void, options: AlertOptions = {}) => {
        setConfig({
            message,
            title: options.title || 'تأكيد',
            icon: options.icon || 'warning',
            confirmText: options.confirmText || 'تأكيد',
            cancelText: options.cancelText || 'إلغاء',
            showCancel: true,
            onConfirm: () => {
                setIsOpen(false);
                onConfirm();
            },
        });
        setIsOpen(true);
    };

    const getIcon = (type: IconType) => {
        switch (type) {
            case 'success':
                return <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
            case 'error':
                return <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
            case 'info':
                return <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
            case 'warning':
                return <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>;
        }
    };

    return (
        <AlertContext.Provider value={{ showAlert, showConfirm }}>
            {children}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all scale-100 duration-300 text-center">
                        <div className="mb-4 text-primary flex justify-center">
                            {getIcon(config.icon)}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{config.title}</h3>
                        <p className="text-slate-600 mb-8">{config.message}</p>

                        <div className="flex justify-center gap-4">
                            {config.showCancel && (
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-slate-100 text-slate-600 px-6 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    {config.cancelText}
                                </button>
                            )}
                            <button
                                onClick={config.onConfirm}
                                className={`${config.icon === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-accent-active'} text-white px-6 py-2 rounded-lg transition-colors`}
                            >
                                {config.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};
