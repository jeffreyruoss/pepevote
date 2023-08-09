export function validateMessage(message: string): string {
	message = message.trim();
	if (!message) {
			return 'Signature is required.';
	}
	const signatureField = document.getElementById('signature') as HTMLInputElement;
	// if the message includes any form of "Message" or "message" followed by an optional colon and space, remove it
	if (message.toLowerCase().includes('message')) {
		message = message.replace(/message\s?(:)?\s?/gi, '');
	}
	// if the message includes any form of "Signature" or "signature" followed by an optional colon and space, remove it
	if (message.toLowerCase().includes('signature')) {
		message = message.replace(/signature\s?(:)?\s?/gi, '');
	}
	signatureField.value = message;
	if (message.length !== 88) {
		console.log('Signature length is not 88');
		return `This doesn't seem to be a valid signature.`;
	}
	return '';
}

export function validateAddress(address: string): string {
	address = address.trim();
	if (!address) {
		return 'Address is required.';
	}
	const addressField = document.getElementById('input-address') as HTMLInputElement;
	// if the address includes any form of "Address" or "address" followed by an optional colon and space, remove it
	if (address.toLowerCase().includes('address')) {
		address = address.replace(/address\s?(:)?\s?/gi, '');
	}
	addressField.value = address;
	if (address.length !== 34) {
		console.log('address length is not 34');
		return `This doesn't seem to be a valid wallet address.`;
	}
	return '';
}