export type TransitType = 'METRO' | 'BUS' | 'BIKE';
export type TransitStatus = 'ON_TIME' | 'DELAYED' | 'CLOSED';

export interface TransitLine {
    id: string;
    name: string;
    type: TransitType;
    status: TransitStatus;
    nextArrival: number; // minutes
    destination: string;
    // Open Data Extras
    agencyId?: string; // e.g., 'DGT-MAD-01'
    alertLevel?: 'NORMAL' | 'WARNING' | 'SEVERE';
    dataSource?: string;
}
