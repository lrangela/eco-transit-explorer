export interface ForecastDay {
    date: Date;
    tempMin: number;
    tempMax: number;
    icon: string;
    description: string;
}

export type ForecastList = ForecastDay[];
