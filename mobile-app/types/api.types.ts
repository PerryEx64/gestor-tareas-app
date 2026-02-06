export interface ApiFieldError {
  field: string;
  message:
    | 'string_invalid | email_invalid | is_required | characters_minimum_6'
    | 'invalid_password'
    | 'email_not_found'
    | 'uuid_invalid'
    | 'characters_between_3_100'
    | 'status_invalid'
    | 'characters_maximum_500'
    | string;
  code: string;
}

export interface ApiError {
  errors: ApiFieldError[];
}
