export interface Booking {
	id: string;
	vendorName: string;
	vendorCategory: string;
	eventName: string;
	eventDate: string;
	bookingDate: string;
	status: 'pending' | 'confirmed' | 'quote_requested' | 'cancelled';
	amount: number;
	deposit: number;
	remaining: number;
	services: string[];
	notes: string;
	vendorImage: string;
	contractSigned: boolean;
	paymentStatus: 'pending' | 'partial' | 'paid';
	nextPaymentDue: string | null;
}
