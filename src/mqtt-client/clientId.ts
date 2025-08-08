function sanitizeClientId(clientId: string): string {
  return clientId.replace(/[^\dA-Za-z]/g, '');
}

function retrieveClientId() : string {
  // Load from search parameter
  const urlParameters = new URLSearchParams(window.location.search);
  const clientId = urlParameters.get('clientId');
  if (clientId) {
    return sanitizeClientId(clientId);
  }
  return '1';
}

const clientId = retrieveClientId();

export default clientId;
