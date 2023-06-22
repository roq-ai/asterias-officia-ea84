const mapping: Record<string, string> = {
  invitations: 'invitation',
  us: 'me',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
