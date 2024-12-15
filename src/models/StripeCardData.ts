export interface StripeCardData {
    card: {
        country: string
        brand: string
        exp_month: number
        exp_year: number
        last4: string
        funding: string
    },
    billing_details: {
        address: {
            city: string
            country: string
            line1: string
            line2: string
            postal_code: string
            state: string
        },
        email: string
        name: string
        phone: string
    },
    id: string
    quantityPayementMethods: number
}

