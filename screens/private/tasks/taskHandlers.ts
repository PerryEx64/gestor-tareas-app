export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#60AF20';
    case 'in_progress':
      return '#0495EE';
    case 'pending':
      return '#FF9F05';
    default:
      return '#8F9BB3';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'Completada';
    case 'in_progress':
      return 'En Progreso';
    case 'pending':
      return 'Pendiente';
    default:
      return status;
  }
};
