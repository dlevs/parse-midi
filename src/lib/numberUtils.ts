import { BITS_PER_DATA } from './constants';

/**
 * Combine "Most Significant Byte" and "Least Significant Byte" for
 * parameters that use 2 bytes instead of just 1 for increased resolution.
 */
export const combineMsbAndLsb = (msb: number, lsb: number) =>
	(msb << BITS_PER_DATA) + lsb;
