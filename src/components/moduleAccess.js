const enabled = value => [true, 'true', 'on'].includes(value);

export function availableModules(user, urls) {
  if (!user) return [];
  const modules = [];
  if (enabled(user.isAdmin) && urls.ADMINISTRADOR) {
    modules.push({ id: 'admin', label: 'Administración', href: urls.ADMINISTRADOR });
  }
  if (enabled(user.isManagement) && urls.GESTION) {
    modules.push({ id: 'management', label: 'Gestión', href: urls.GESTION });
  }
  return modules;
}
