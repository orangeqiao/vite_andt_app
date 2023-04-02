import React from 'react';
import FormSearch from '@/components/FormSearch/Index';
import { SearchField,SearchFormValues } from '@/interface/from';

const fields:SearchField[] = [
  { label: 'Name', name: 'name' },
  { label: 'Age', name: 'age', type: 'number' },
  { label: 'Date', name: 'date', type: 'date' },
];

const App: React.FC = () => {
  const handleSearch = (filters: SearchFormValues) => {
    console.log('Search filters:', filters);
  };

  return (
    <div>
      <FormSearch fields={fields} onSubmit={handleSearch} />
    </div>
  );
};