export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isValidEmail(email) {
    if (!email) return false;
    return emailRegex.test(email.trim());
}
