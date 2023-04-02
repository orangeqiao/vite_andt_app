
export interface SearchField {
	label: string;
  name: string;
  type?: 'text' | 'number'| 'date' | 'select';
  options?: any[];
}
export interface SearchFormValues {
  [key: string]: string | number | Date;
}