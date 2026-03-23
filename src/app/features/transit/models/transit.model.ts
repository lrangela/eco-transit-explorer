export type MobilityMode = 'BIKE';
export type BikeAvailabilityStatus = 'AVAILABLE' | 'LIMITED' | 'EMPTY' | 'OFFLINE';
export type BikeAvailabilityAlertLevel = 'NORMAL' | 'WARNING' | 'SEVERE';

export interface BikeAvailabilityStation {
  id: string;
  stationName: string;
  mode: MobilityMode;
  status: BikeAvailabilityStatus;
  availableBikes: number;
  availableDocks: number;
  city: string;
  operatorId: string;
  operatorLabel: string;
  alertLevel: BikeAvailabilityAlertLevel;
}

export interface CityBikeNetworkDto {
  network?: {
    location?: {
      city?: string;
    };
    stations?: CityBikeStationDto[];
  };
}

export interface CityBikeStationDto {
  id: string;
  name: string;
  free_bikes?: number;
  empty_slots?: number;
}
