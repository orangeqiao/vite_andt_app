
export interface SearchField {
	label: string;
  name: string;
  type?: 'text' | 'number'| 'date' | 'select';
  options?: string[];
}
export interface SearchFormValues {
  [key: string]: string | number | Date;
}