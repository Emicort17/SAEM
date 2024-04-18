import React from 'react';
import Datatable from 'react-data-table-component';
import { Spinner } from 'flowbite-react';

const styles = {
  table: {
    style: {
      backgroundColor: '#E6ECF1',
      border: '2px solid #03104A',
      borderRadius: '20px',
      paddingBottom: '10px',
    },
  },
  headRow: {
    style: {
      borderStartStartRadius: '20px',
      borderStartEndRadius: '20px',
      marginBottom: '10px',
      backgroundColor: '#03104A',
      color: '#fff',
      fontSize: '18px',
      textAlign: 'center',
    },
  },
  rows: {
    style: {
      padding: '20px',
      marginTop: '10px',
      marginBottom: '10px',
      textAlign: 'center',
      fontSize: '15px',
      border: '0px solid ',
      backgroundColor: '#ffffff',
      '&:nth-child(odd)': {
        backgroundColor: '#ffffff',
        border: '0px solid ',
      },
    },
  },
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
  const options = {
    pagination: true,
    paginationPerPage: 10,
    paginationRowsPerPageOptions: [10, 20, 30, 50],
    paginationTotalRows: data.length,
    paginationServer: false,
    paginationComponentOptions: {
      rowsPerPageText: 'Registros por página:',
      rangeSeparatorText: 'de',
    },
  };

  return (
      <div style={{ padding: '20px' }}>
        <Datatable
            columns={columns}
            data={data}
            progressPending={isLoading}
            noDataComponent={<>Sin registros...</>}
            customStyles={styles}
            pagination
            paginationComponentOptions={options.paginationComponentOptions}
            paginationPerPage={options.paginationPerPage}
            paginationRowsPerPageOptions={options.paginationRowsPerPageOptions}
            paginationTotalRows={options.paginationTotalRows}
            paginationServer={options.paginationServer}
        />
      </div>
  );
};

export default CustomDatatable;
