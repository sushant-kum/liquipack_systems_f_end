export interface DialogResponse {
  data?: any;
  operation: 'close' | 'alert.ok' | 'confirm.cancel' | 'confirm.ok' | 'user.add' | 'user.edit';
}
