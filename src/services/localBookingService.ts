import type { IBookingService, Booking, NewBooking } from '../types/Booking';

export class LocalBookingService implements IBookingService {
    private STORAGE_KEY = 'local_bookings';

    private getBookings(): Booking[] {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    private saveBookings(bookings: Booking[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
        // Trigger storage event for cross-tab or same-page listener updates
        window.dispatchEvent(new Event('storage'));
    }

    async createBooking(bookingData: NewBooking): Promise<void> {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        const bookings = this.getBookings();
        const newBooking: Booking = {
            ...bookingData,
            id: 'local_' + Date.now().toString(),
            status: 'pending',
            createdAt: new Date().toISOString() // Store as ISO string for local
        };

        bookings.unshift(newBooking); // Add to top
        this.saveBookings(bookings);
    }

    subscribeToBookings(callback: (bookings: Booking[]) => void): () => void {
        // Initial load
        callback(this.getBookings());

        // Listen for changes
        const handleStorage = () => {
            callback(this.getBookings());
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }

    async updateStatus(id: string, status: Booking['status']): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const bookings = this.getBookings();
        const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
        this.saveBookings(updated);
    }

    async deleteBooking(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const bookings = this.getBookings();
        const updated = bookings.filter(b => b.id !== id);
        this.saveBookings(updated);
    }
}
