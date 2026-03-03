import { WeatherModel } from './weather.model';

export type WeatherVm =
    | { kind: 'idle' }
    | { kind: 'loading'; city: string }
    | { kind: 'error'; city: string; message: string }
    | { kind: 'data'; city: string; data: WeatherModel };
