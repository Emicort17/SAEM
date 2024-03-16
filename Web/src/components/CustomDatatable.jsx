import React from 'react';
import Datatable from 'react-data-table-component';
import { Spinner } from 'flowbite-react';

const options = {
  rowsPerPageText: 'Registros por página:',
  rangeSeparatorText: 'de',
};

const Loading = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="text-center">
        <Spinner />
      </div>
    </div>
  );
};

const CustomDatatable = ({ columns, data, isLoading }) => {
  return (
    <Datatable
      columns={columns}
      data={data}
      progressPending={isLoading}
      pagination
      paginationComponentOptions={options}
      noDataComponent={<>Sin registros...</>}
    />
  );
};

export default CustomDatatable;
