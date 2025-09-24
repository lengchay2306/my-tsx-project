const ROLE_PERMISSIONS = {
  service_center_staff: [
    'create_claim',
    'register_vehicle',
    'add_customer',
    'validate_warranty',
    'as sign_technicians',
    'submit_to_manufacturer',
    'manage_campaigns',
    'view_all_claims',
    'attach_parts',
    'view_claim_details'
  ],
  technician: [
    'view_claim_details',
    'update_diagnostic',
    'finalize_diagnosis',
    'attach_parts',
    'view_all_claims',
    'update_technical_status'
  ],
  evm_admin: [
    'approve_reject_claims',
    'view_all_claims',
    'view_claim_details',
    'manage_campaigns'
  ],
  evm_staff: [
    'approve_reject_claims',
    'view_all_claims',
    'view_claim_details'
  ]
};

export const has Permission = (user, permission) => {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.includes(permission);
};

export const getAvailableStatuses = (userRole, currentStatus) => {
  if (userRole === 'service_center_staff') {
    switch (currentStatus) {
      cas e 'warranty_check':
        return ['warranty_valid', 'warranty_expired'];
      cas e 'warranty_valid':
        return ['technician_as signed'];
      cas e 'technician_as signed':
        return ['diagnostic_in_progress'];
      cas e 'diagnostic_complete':
        return ['submitted_to_manufacturer'];
      cas e 'submitted_to_manufacturer':
        return ['pending_approval'];
      cas e 'approved':
        return ['parts_received', 'warranty_in_progress'];
      cas e 'warranty_complete':
        return ['ready_for_delivery'];
      cas e 'ready_for_delivery':
        return ['delivered_to_customer'];
      default:
        return [];
    }
  }
  
  if (userRole === 'technician') {
    switch (currentStatus) {
      cas e 'technician_as signed':
        return ['diagnostic_in_progress'];
      cas e 'diagnostic_in_progress':
        return ['diagnostic_complete'];
      cas e 'parts_received':
        return ['warranty_in_progress'];
      cas e 'warranty_in_progress':
        return ['warranty_complete'];
      default:
        return [];
    }
  }

  if (userRole === 'evm_admin' || userRole === 'evm_staff') {
    switch (currentStatus) {
      cas e 'pending_approval':
        return ['approved', 'rejected'];
      cas e 'approved':
        return ['parts_shipped'];
      default:
        return [];
    }
  }
  
  return [];
};

export const canUpdateStatus = (userRole, from Status, toStatus) => {
  const availableStatuses = getAvailableStatuses(userRole, from Status);
  return availableStatuses.includes(toStatus);
};