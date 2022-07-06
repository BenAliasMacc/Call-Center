import React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  gridClasses,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import addButton from '../assets/icons/add-button.svg';
import DeleteButton from './DeleteButton';
import OpenModal from './OpenModal';

//-----------------------------STRIPED DATA-GRUD-----------------------------//
//--------------------------------------------------------------------------//
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

//-----------------------------SEARCH FILTER-----------------------------//
//----------------------------------------------------------------------//
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter sx={{
        p: 0.5,
        pb: 0,
      }} />
      <button className='add-client'><Link to="/new-clients"><img src={addButton} alt="ajouter un client" /></Link></button>
    </Box>
  );
}

//-----------------------------COLUMN SETTINGS-----------------------------//
//------------------------------------------------------------------------//
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
  },
  {
    // field: 'id',
    headerName: 'icons',
    flex: 1,
    renderCell: (params) => (
        <div style={{display: 'flex', justifyContent: 'center', gap: "5px", width: "100%"}}>
            <div>
              <OpenModal clientId={params.row._id} />              
            </div>
            <div>
              <DeleteButton clientId={params.row._id} />
            </div>
        </div>
    )
  }
];
//-----------------------------------------------------

export default function QuickFilteringCustomizedGrid({ users, setClientId }) {
  const [pageSize, setPageSize] = React.useState(10);

  

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
            columns={columns}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            components={{ Toolbar: QuickSearchToolbar}} 
          />
        </Box>
      }
    </>
  );
}