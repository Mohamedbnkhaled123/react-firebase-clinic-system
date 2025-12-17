/// <reference types="vitest" />
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('Booking Logic', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should save booking to localStorage', () => {
        const booking = {
            id: '123',
            name: 'Test User',
            status: 'pending'
        };

        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
        expect(saved).toHaveLength(1);
        expect(saved[0].name).toBe('Test User');
    });

    it('should update booking status', () => {
        const booking = {
            id: '123',
            name: 'Test User',
            status: 'pending'
        };
        localStorage.setItem('bookings', JSON.stringify([booking]));

        // Simulate update
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings[0].status = 'confirmed';
        localStorage.setItem('bookings', JSON.stringify(bookings));

        const updated = JSON.parse(localStorage.getItem('bookings') || '[]');
        expect(updated[0].status).toBe('confirmed');
    });
});
