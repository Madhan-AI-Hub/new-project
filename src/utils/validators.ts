export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const getEmailError = (email: string): string => {
    if (!validateRequired(email)) {
        return 'Email is required';
    }
    if (!validateEmail(email)) {
        return 'Please enter a valid email address';
    }
    return '';
};

export const getRequiredError = (fieldName: string, value: string): string => {
    if (!validateRequired(value)) {
        return `${fieldName} is required`;
    }
    return '';
};
