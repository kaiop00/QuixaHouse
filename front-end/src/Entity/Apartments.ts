interface Cover {
    data: {
        attributes:{
            url: string,
        }
    }
}
export interface Apartment {
    id: number,
    attributes: {
        photos: Cover,
        description: string,
        value: string,
        rented: boolean,
        address: string,
        Type: string,
    }
}