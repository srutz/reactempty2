import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Zum zusammenführen von Tailwind-Klassen */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
