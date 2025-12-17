/**
 * Announces a message to screen readers using an ARIA live region.
 * @param message The message to announce
 * @param politeness The politeness setting ('polite' or 'assertive'), default is 'polite'
 */
export function announce(message: string, politeness: 'polite' | 'assertive' = 'polite') {
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
        announcer.setAttribute('aria-live', politeness);
        // Clear first to ensure screen readers register the change if the message is the same
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    } else {
        console.warn('Accessibility announcer element #a11y-announcer not found.');
    }
}
