import type { IBookingService } from '../types/Booking';
import { LocalBookingService } from './localBookingService.ts';
import { FirebaseBookingService } from './firebaseBookingService.ts';
import { isFirebaseConfigured } from '../firebase/firebaseConfig';

export const bookingService: IBookingService = isFirebaseConfigured
    ? new FirebaseBookingService()
    : new LocalBookingService();

export type { Booking } from '../types/Booking';
