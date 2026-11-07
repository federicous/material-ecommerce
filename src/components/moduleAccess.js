const enabled = value => [true, 'true', 'on'].includes(value);

export function availableModules(user, urls) {
  if (!user) return [];
  const modules = [];
  if (enabled(user.isAdmin) && urls.ADMINISTRADOR) {
    modules.push({ id: 'admin', label: 'Administración', href: new URL('/ordenes', urls.ADMINISTRADOR).href });
  }
  if (enabled(user.isManagement) && urls.GESTION) {
    modules.push({ id: 'management', label: 'Gestión', href: new URL('/facturas', urls.GESTION).href });
  }
  return modules;
}
