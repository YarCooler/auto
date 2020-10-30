import { plainToClass } from 'class-transformer';

export const toCars = (o: object[]): Car[] => {
  return plainToClass(Car, o);
};

export interface CarFilter {
    page: number,
    per_page: number,
    sort_by: string,
    sort_asc: boolean,
    with_context_filters: boolean,
    filter: {
        id?: number[],
        catalog?: [
            {
                brand_id?: number | number[],
                model_id?: number | number[],
                folder_id?: number | number[],
                modification_id?: string | string[]
            }
        ],
        region_id?: number[],
        city_id?: number[],
        price_from?: number | undefined,
        price_to?: number | undefined,
        year_from?: number | undefined,
        year_to?: number | undefined,
        engine_type_code?: string[],
        engine_power_from?: number | undefined,
        engine_power_to?: number | undefined,
        pts_type_code?: string | undefined,
        transmission_code?: string[],
        transmission_drive_code?: string[],
        wheel_code?: string,
        body_type_code?: string[],
        mileage_from?: number | undefined,
        mileage_to?: number | undefined,
        color_code?: string[],
        option_ids?: string[],
        is_new?: null | boolean,
        label_code?: string[]
    }
}

export interface CarResponseData {
    results: Car[],
    total: number,
    total_s: string,
    context_filters: {
        title: string,
        total_count: number,
        filter: {
            price_to: number
        }
    }[]
}

export class Car {
    id: number;

    uuid: string;

    is_new: boolean;

    is_published: boolean;

    brand: string

    model: string;

    modification: string;

    folder: {
        name: string;
        generation_name: string;
        year_from: number;
        year_to: number
    };

    region: string;

    city_id: number;

    city: string;

    price: number;

    year: number;

    mileage: number;

    description: string

    transmission_code: string;

    transmission_drive: string;

    engine_power: number;

    engine_type: string;

    body_type: string;

    availability_code: string;

    images: {
        urls: {
            url_original: string;
            url_preview: string
        }
    }[];

    labels: [
        {
            code: string;
            name: string;
        }
    ];

    get fullName() {
      return `${this.brand} ${this.model}`;
    }
}
