export const MOCK_WEATHER_RESPONSE = {
    london: {
        name: 'London',
        main: {
            temp: 15,
            temp_min: 12,
            temp_max: 18,
            pressure: 1013,
            humidity: 72,
            feels_like: 14
        },
        weather: [
            {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }
        ],
        wind: { speed: 4.5 },
        visibility: 10000,
        dt: 1706716800,
        sys: {
            country: 'GB',
            sunrise: 1706683200,
            sunset: 1706716800,
            id: 2019646,
            type: 2
        }
    },
    paris: {
        name: 'Paris',
        main: {
            temp: 18,
            temp_min: 16,
            temp_max: 20,
            pressure: 1015,
            humidity: 65,
            feels_like: 17
        },
        weather: [
            {
                id: 802,
                main: 'Clouds',
                description: 'scattered clouds',
                icon: '03d'
            }
        ],
        wind: { speed: 3.8 },
        visibility: 9000,
        dt: 1706716800,
        sys: { country: 'FR', sunrise: 0, sunset: 0, id: 1, type: 1 }
    },
    invalidCity: {
        cod: '404',
        message: 'city not found'
    }
};

export const MOCK_FORECAST_RESPONSE = {
    london: {
        city: {
            name: 'London',
            timezone: 0
        },
        list: [
            {
                dt: 1706716800,
                main: { temp: 15, temp_min: 12, temp_max: 18 },
                weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
            },
            {
                dt: 1706803200,
                main: { temp: 14, temp_min: 11, temp_max: 17 },
                weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }]
            },
            {
                dt: 1706889600,
                main: { temp: 16, temp_min: 13, temp_max: 19 },
                weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
            },
            {
                dt: 1706976000,
                main: { temp: 13, temp_min: 10, temp_max: 15 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }]
            },
            {
                dt: 1707062400,
                main: { temp: 12, temp_min: 9, temp_max: 14 },
                weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }]
            }
        ]
    }
};
