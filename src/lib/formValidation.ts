export function validateMessage(message: string): string {
	message = message.trim();
	if (!message) {
			return 'Signature is required.';
	}
	const signatureField = document.getElementById('signature') as HTMLInputElement;
	// if there is "Message", "message", "Message:", "message:", "Message: ", "message: ", "Message : ", "message : " remove it
	if (message.toLowerCase().includes('message')) {
		message = message.replace(/message(:)?\s?/gi, '');
	}
	// if these is "Signature", "signature", "Signature:", "signature:", "Signature: ", "signature: ", "Signature : ", "signature : " remove it
	if (message.toLowerCase().includes('signature')) {
		message = message.replace(/signature(:)?\s?/gi, '');
	}
	signatureField.value = message;
	if (message.length !== 88) {
		console.log('Signature length is not 88');
		return `This doesnt' seem to be a valid signature.`;
	}
	return '';
}

export function validateAddress(address: string): string {
	address = address.trim();
	if (!address) {
		return 'Address is required.';
	}
	const addressField = document.getElementById('input-address') as HTMLInputElement;
	// if there is "Address", "address", "Address:", "address:", "Address: ", "address: ", "Address : ", "address : " remove it
	if (address.toLowerCase().includes('address')) {
		address = address.replace(/address(:)?\s?/gi, '');
	}
	addressField.value = address;
	if (address.length !== 34) {
		console.log('address length is not 34');
		return `This doesn's seem to be a valid wallet address.`;
	}
	return '';
}

