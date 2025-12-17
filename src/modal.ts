import { announce } from './accessibility';

interface ModalOptions {
    title?: string;
    icon?: 'success' | 'error' | 'info' | 'warning';
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
}

const icons = {
    success: `<svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
    error: `<svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
    info: `<svg class="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    warning: `<svg class="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`
};

function getModalElements() {
    return {
        modal: document.getElementById('global-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalMessage: document.getElementById('modal-message'),
        modalActions: document.getElementById('modal-actions'),
        modalIcon: document.getElementById('modal-icon')
    };
}

function openModal() {
    const { modal } = getModalElements();
    if (modal) {
        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.querySelector('div')?.classList.remove('scale-95');
            modal.querySelector('div')?.classList.add('scale-100');
        });
    }
}

function closeModal() {
    const { modal } = getModalElements();
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('div')?.classList.remove('scale-100');
        modal.querySelector('div')?.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

export function showAlert(message: string, options: ModalOptions = {}): Promise<void> {
    return new Promise((resolve) => {
        const { modal, modalTitle, modalMessage, modalActions, modalIcon } = getModalElements();

        if (!modal || !modalTitle || !modalMessage || !modalActions || !modalIcon) {
            console.error('Modal elements not found');
            window.alert(message);
            resolve();
            return;
        }

        modalTitle.innerText = options.title || 'تنبيه';
        modalMessage.innerText = message;
        modalIcon.innerHTML = icons[options.icon || 'info'];

        modalActions.innerHTML = '';
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent-active transition-colors';
        confirmBtn.innerText = options.confirmText || 'حسناً';
        confirmBtn.onclick = () => {
            closeModal();
            resolve();
        };
        modalActions.appendChild(confirmBtn);

        announce(message);
        openModal();
        confirmBtn.focus();
    });
}

export function showConfirm(message: string, onConfirm: () => void, options: ModalOptions = {}): void {
    console.log('showConfirm called');
    const { modal, modalTitle, modalMessage, modalActions, modalIcon } = getModalElements();
    console.log('Modal elements:', { modal, modalTitle, modalMessage, modalActions, modalIcon });

    if (!modal || !modalTitle || !modalMessage || !modalActions || !modalIcon) {
        console.error('Modal elements not found');
        if (window.confirm(message)) onConfirm();
        return;
    }

    modalTitle.innerText = options.title || 'تأكيد';
    modalMessage.innerText = message;
    modalIcon.innerHTML = icons[options.icon || 'warning'];

    modalActions.innerHTML = '';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'bg-slate-100 text-slate-600 px-6 py-2 rounded-lg hover:bg-slate-200 transition-colors';
    cancelBtn.innerText = options.cancelText || 'إلغاء';
    cancelBtn.onclick = () => {
        closeModal();
    };

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors';
    confirmBtn.innerText = options.confirmText || 'تأكيد';
    confirmBtn.onclick = () => {
        closeModal();
        onConfirm();
    };

    modalActions.appendChild(cancelBtn);
    modalActions.appendChild(confirmBtn);

    announce(message);
    openModal();
    confirmBtn.focus();
}
