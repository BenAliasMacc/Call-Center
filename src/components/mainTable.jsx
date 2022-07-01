import React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  gridClasses,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

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

const columns = [
  { 
    field: 'id', 
    headerName: 'Identifiant', 
    flex: 1,
    renderCell: (params) => (<Link to={`${params.row._id}`}>{params.value}</Link>)
  },
  { field: 'nom', headerName: 'Prénom', flex: 1 },
  { field: 'prenom', headerName: 'Nom', flex: 1 },
  { field: 'societe', headerName: 'Société', flex: 1 },
  { field: 'telephone', headerName: 'Téléphone', flex: 1 },
  { 
    field: 'mail', 
    headerName: 'Email', 
    flex: 2,
    renderCell: (params) => (<a rel="noreferrer" target="_blank" href={`mailto:${params.value}`}>{params.value}</a>)
  },
  { 
    field: 'site', 
    headerName: 'Lien', 
    flex: 2,
    renderCell: (params) => (<a rel="noreferrer" target="_blank" href={`${params.value}`}>{params.value}</a>)
      
  }
];

//----------------Mocked Data-------------------------------
const rows = [
  { id: 176360950 , name: 'REVAH', username: 'ROMAIN', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360951 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://google.com'},
  { id: 176360952 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://twitter.com'},
  { id: 176360953 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://facebook.com'},
  { id: 176360954 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://mui.com'},
  { id: 176360955 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
];
//-----------------------------------------------------

export default function QuickFilteringCustomizedGrid({ users }) {
  console.log(users);
  return (
    <>
      {users !== undefined &&
        <Box sx={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{ color: 'black', borderColor: '#ccc' }}
            rows={users}
            // rows={rows}
            columns={columns}
            pageSize={20}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{ 
              Toolbar: GridToolbar, 
              Pagination: CustomPagination
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      }
    </>
  );
}