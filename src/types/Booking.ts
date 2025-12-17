export interface Booking {
    id: string; // Made required for read models, use Omit for creation
    description?: string;
    details?: string;
    name: string;
    phone: string;
    date: string;
    service: string;
    message?: string;
    status: 'pending' | 'confirmed' | 'rejected' | 'completed';
    createdAt: any;
}

export type NewBooking = Omit<Booking, 'id' | 'status' | 'createdAt'>;

export interface IBookingService {
    createBooking(booking: NewBooking): Promise<void>;
    subscribeToBookings(callback: (bookings: Booking[]) => void): () => void;
    updateStatus(id: string, status: Booking['status']): Promise<void>;
    deleteBooking(id: string): Promise<void>;
}
