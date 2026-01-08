import { createTheme, ThemeOptions } from '@mui/material/styles';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: '#4F46E5', // Indigo
            light: '#6366F1',
            dark: '#4338CA',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#06B6D4', // Cyan
            light: '#22D3EE',
            dark: '#0891B2',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#16A34A',
            light: '#22C55E',
            dark: '#15803D',
        },
        warning: {
            main: '#F59E0B',
            light: '#FCD34D',
            dark: '#D97706',
        },
        error: {
            main: '#DC2626',
            light: '#EF4444',
            dark: '#B91C1C',
        },
        background: {
            default: mode === 'light' ? '#F9FAFB' : '#0F172A',
            paper: mode === 'light' ? '#FFFFFF' : '#1E293B',
        },
        text: {
            primary: mode === 'light' ? '#111827' : '#F1F5F9',
            secondary: mode === 'light' ? '#6B7280' : '#94A3B8',
        },
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 20px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: mode === 'light'
                        ? '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
                        : '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'light'
                            ? '0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)'
                            : '0 10px 20px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: mode === 'light' ? '1px solid #E5E7EB' : '1px solid #334155',
                },
                head: {
                    fontWeight: 600,
                    backgroundColor: mode === 'light' ? '#F3F4F6' : '#1E293B',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },
    },
});

export const createAppTheme = (mode: 'light' | 'dark') => {
    return createTheme(getThemeOptions(mode));
};
