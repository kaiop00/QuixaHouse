interface Cover {
    data: {
        attributes:{
            url: string,
        }
    }
}
export interface Imovel {
    id: number,
    attributes: {
        photos: Cover,
        description: string,
        value: number,
        street: string,
        Type: string,
        district: string,
        number: number,
        cellphone: number,
        operation: string,
        users_permissions_user: string,
    }
}