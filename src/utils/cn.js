import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes
 * Combines clsx and tailwind-merge for optimal class merging
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}