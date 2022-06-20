import React from 'react';
import '../styles/mainTable.scss'
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}

const columns = [
  { field: 'id', headerName: 'Identifiant', flex: 1 },
  { field: 'name', headerName: 'Prénom', flex: 1 },
  { field: 'username', headerName: 'Nom', flex: 1 },
  { field: 'company', headerName: 'Société', flex: 1 },
  { field: 'phone', headerName: 'Téléphone', flex: 1 },
  { 
    field: 'email', 
    headerName: 'Email', 
    flex: 2,
    renderCell: (params) => (<Link to={`mailto:${params.value}`}>{params.value}</Link>)
  },
  { 
    field: 'website', 
    headerName: 'Lien', 
    flex: 2,
    renderCell: (params) => (<Link to={`/mailto:/${params.value}`}>{params.value}</Link>)
      
  }
];

export default function QuickFilteringCustomizedGrid({ users }) {

  return (
    <>
      {users !== undefined &&
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            sx={{ color: 'white' }}
            rows={users}
            columns={columns}
            pageSize={5}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLinkOperator.Or,
                },
              },
            }}
            components={{ 
              Toolbar: QuickSearchToolbar, 
              Pagination: CustomPagination
            }}
          />
        </Box>
      }
    </>
  );
}