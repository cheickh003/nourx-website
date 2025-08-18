interface CinetPay {
    setConfig(config: {
        apikey: string;
        site_id: string;
        mode: string;
        notify_url: string;
    }): void;
    getCheckout(paymentData: {
        transaction_id: string;
        amount: number;
        currency: string;
        channels: string;
        description: string;
        customer_name?: string;
        customer_surname?: string;
        customer_email?: string;
        customer_phone_number?: string;
        customer_address?: string;
        customer_city?: string;
        customer_country?: string;
        customer_state?: string;
        customer_zip_code?: string;
    }): void;
    waitResponse(callback: (data: {
        status: "ACCEPTED" | "REFUSED";
        [key: string]: any;
    }) => void): void;
    onError(callback: (error: any) => void): void;
}

interface Window {
    CinetPay: CinetPay;
}
