import './style.css'
import { showConfirm } from './modal';
import { db } from './firebase/firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('isAdmin');
    window.location.href = '/';
  });
}

// Types
interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed';
  createdAt: any; // Firestore Timestamp
}

// DOM Elements
const statusFilter = document.getElementById('status-filter') as HTMLSelectElement;
const notificationBadge = document.getElementById('notification-badge');

// Stats Elements
const totalEl = document.getElementById('total-bookings');
const pendingEl = document.getElementById('pending-bookings');
const confirmedEl = document.getElementById('confirmed-bookings');
const todayEl = document.getElementById('today-bookings');

// Request Notification Permission
if ('Notification' in window) {
  Notification.requestPermission();
}

let currentBookings: Booking[] = [];

// Render Logic
const renderTable = (bookings: Booking[]) => {
  // Re-fetch elements to ensure we have the latest DOM state
  const tableBody = document.getElementById('bookings-table-body');
  const emptyState = document.getElementById('empty-state');
  const statusFilter = document.getElementById('status-filter') as HTMLSelectElement;

  const filter = statusFilter?.value || 'all';
  const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

  // Update Stats
  if (totalEl) totalEl.innerText = bookings.length.toString();
  if (pendingEl) pendingEl.innerText = bookings.filter(b => b.status === 'pending').length.toString();
  if (confirmedEl) confirmedEl.innerText = bookings.filter(b => b.status === 'confirmed').length.toString();
  if (todayEl) {
    const today = new Date().toISOString().split('T')[0];
    todayEl.innerText = bookings.filter(b => b.date === today).length.toString();
  }

  if (tableBody && emptyState) {
    tableBody.innerHTML = '';

    if (filteredBookings.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');

      filteredBookings.forEach(booking => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 transition-colors';

        const statusColors = {
          pending: 'bg-yellow-100 text-yellow-700',
          confirmed: 'bg-green-100 text-green-700',
          rejected: 'bg-red-100 text-red-700',
          completed: 'bg-blue-100 text-blue-700'
        };

        const statusLabels = {
          pending: 'قيد الانتظار',
          confirmed: 'مؤكد',
          rejected: 'مرفوض',
          completed: 'مكتمل'
        };

        row.innerHTML = `
          <td class="px-6 py-4">
            <div class="font-medium text-slate-900">${booking.name}</div>
            <div class="text-sm text-slate-500" dir="ltr">${booking.phone}</div>
          </td>
          <td class="px-6 py-4">
            <div class="text-slate-700">${booking.service}</div>
            ${booking.message ? `<div class="text-xs text-slate-400 mt-1 truncate max-w-xs" title="${booking.message}">${booking.message}</div>` : ''}
          </td>
          <td class="px-6 py-4 text-slate-600">
            ${booking.date}
          </td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}">
              ${statusLabels[booking.status]}
            </span>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              ${booking.status === 'pending' ? `
                <button data-action="update" data-id="${booking.id}" data-status="confirmed" class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="قبول">
                  <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </button>
                <button data-action="update" data-id="${booking.id}" data-status="rejected" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="رفض">
                  <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              ` : ''}
              ${booking.status === 'confirmed' ? `
                <button data-action="update" data-id="${booking.id}" data-status="completed" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="إكمال">
                  <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
              ` : ''}
              ${['confirmed', 'rejected', 'completed'].includes(booking.status) ? `
                <button data-action="delete" data-id="${booking.id}" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                    <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              ` : ''}
            </div>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  }
};

// Firestore Listener
const subscribeToBookings = () => {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

  onSnapshot(q, (snapshot) => {
    currentBookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];

    renderTable(currentBookings);

    // Initial load check to avoid notification on first load could be added here,
    // but for simplicity we rely on the visual badge mostly.

    // Check if there are new pending bookings for badge
    const hasPending = currentBookings.some(b => b.status === 'pending');
    if (hasPending && notificationBadge) {
      notificationBadge.classList.remove('hidden');
    } else if (notificationBadge) {
      notificationBadge.classList.add('hidden');
    }

  }, (error) => {
    console.error("Error fetching bookings: ", error);
  });
};

const updateBookingStatus = async (id: string, status: Booking['status']) => {
  try {
    const bookingRef = doc(db, 'bookings', id);
    await updateDoc(bookingRef, { status });
    // UI updates automatically via snapshot listener
  } catch (error) {
    console.error("Error updating status: ", error);
    alert('حدث خطأ أثناء تحديث الحالة');
  }
};

const deleteBooking = async (id: string) => {
  try {
    const bookingRef = doc(db, 'bookings', id);
    await deleteDoc(bookingRef);
    // UI updates automatically via snapshot listener
  } catch (error) {
    console.error("Error deleting booking: ", error);
    alert('حدث خطأ أثناء حذف الحجز');
  }
};

// Event Delegation for Table Actions
const handleTableAction = (e: Event) => {
  const target = (e.target as HTMLElement).closest('button');
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;
  const status = target.dataset.status as Booking['status'];

  if (!action || !id) return;

  if (action === 'update') {
    if (status === 'confirmed') {
      showConfirm('هل تريد تأكيد الحجز', () => updateBookingStatus(id, status),
        { title: 'تأكيد الحجز', icon: 'info', confirmText: 'نعم، أكد الحجز', cancelText: 'تراجع' });
    } else if (status === 'rejected') {
      showConfirm('هل انت متأكد من رفض الحجز', () => updateBookingStatus(id, status),
        { title: 'رفض الحجز', icon: 'warning', confirmText: 'نعم، ارفض', cancelText: 'تراجع' });
    } else {
      showConfirm('هل أنت متأكد من تغيير حالة الحجز؟', () => updateBookingStatus(id, status),
        { title: 'تأكيد الإجراء', icon: 'warning', confirmText: 'نعم، غيّر الحالة', cancelText: 'تراجع' });
    }
  } else if (action === 'delete') {
    showConfirm('هل أنت متأكد من حذف هذا الحجز نهائياً؟', () => deleteBooking(id),
      { title: 'حذف الحجز', icon: 'error', confirmText: 'نعم، احذف', cancelText: 'تراجع' });
  }
};

// Init
const tableBody = document.getElementById('bookings-table-body');
if (tableBody) {
  tableBody.addEventListener('click', handleTableAction);
}

// Filter Change
if (statusFilter) {
  statusFilter.addEventListener('change', () => renderTable(currentBookings));
}

// Start Listener
subscribeToBookings();
