import type { IBookingService, Booking, NewBooking } from '../types/Booking';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export class FirebaseBookingService implements IBookingService {

    async createBooking(bookingData: NewBooking): Promise<void> {
        // Create a timeout promise that rejects after 15 seconds
        const timeout = new Promise<void>((_, reject) => {
            setTimeout(() => reject(new Error("Request timed out - Please check specific Firestore setup steps")), 15000);
        });

        // Race between the actual request and the timeout
        await Promise.race([
            addDoc(collection(db, 'bookings'), {
                ...bookingData,
                status: 'pending',
                createdAt: serverTimestamp()
            }),
            timeout
        ]);
    }

    subscribeToBookings(callback: (bookings: Booking[]) => void): () => void {
        const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

        return onSnapshot(q, (snapshot) => {
            const bookings = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Handle Firestore Timestamp or standard date strings
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
                } as Booking;
            });
            callback(bookings);
        }, (error) => {
            console.error("Error fetching bookings:", error);
            // On auth error or other issues, callback might be called with empty or handled externally
        });
    }

    async updateStatus(id: string, status: Booking['status']): Promise<void> {
        const bookingRef = doc(db, 'bookings', id);
        await updateDoc(bookingRef, { status });
    }

    async deleteBooking(id: string): Promise<void> {
        const bookingRef = doc(db, 'bookings', id);
        await deleteDoc(bookingRef);
    }
}
