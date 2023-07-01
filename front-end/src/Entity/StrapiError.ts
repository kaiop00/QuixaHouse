export interface StrapiError {
    error: {
        status: number,
        name: string,
        message: string,
        details: {
        errors: StrapiErrorDetail[]
        }
    }
}

export interface StrapiErrorDetail {
    path: string[],
    message: string,
    name: string,
}