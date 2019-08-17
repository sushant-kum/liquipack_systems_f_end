export interface DialogResponse {
  data?: any;
  operation: 'close' | 'alert.close' | 'alert.ok' | 'user.add' | 'user.edit';
}
