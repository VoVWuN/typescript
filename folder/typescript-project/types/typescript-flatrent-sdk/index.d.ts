declare module 'typescript-flatrent-sdk' {
    export interface Flat {
      id: string;
      title: string;
      details: string;
      photos: string[];
      coordinates: number[];
      bookedDates: [];
      price: number;
    }
  
    export function cloneDate(date: Date): Date;
  
    export function addDays(date: Date, days: number): Date;
  
    export const backendPort: 3040 | number;
    export const localStorageKey: 'flat-rent-db' | string;
  
    export interface SearchParams {
      city: string;
      checkInDate: Date;
      checkOutDate: Date;
      priceLimit: number;
    }
  
    export interface BookParams extends Omit<SearchParams, 'priceLimit'> {}
  
    export class FlatRentSdk {
      database: Flat[];
      _generateTransactionId: () => number;
  
      get(id: string): Promise<any | null>;
  
      search(parameters: SearchParams): Promise<Flat[] | null>;
  
      book(flatId: number, checkInDate: Date, checkOutDate: Date): Number;
  
      _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void;
  
      _resetTime(date: Date): void;
  
      _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
  
      _generateDateRange(from: number, to: number): Date[];
  
      _areAllDatesAvailable(flat: Flat, dateRange: number): boolean;
  
      _formatFlatObject(flat: Flat, nightNumber: number): object;
  
      _readDatabase(): string | object;
  
      _writeDatabase(database: Flat[]): void;
  
      _syncDatabase(database: Flat[]): void;
    }
  }