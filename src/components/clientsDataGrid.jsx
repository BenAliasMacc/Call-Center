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
import { useState } from 'react';

//-----------------------------STRIPED DATA-GRUD-----------------------------//
//--------------------------------------------------------------------------//
const userRole = localStorage.getItem("userRole");
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
      {userRole == "1" && <button className='add-client'><Link to="/new-clients"><img src={addButton} alt="ajouter un client" /></Link></button>}
    </Box>
  );
}

//-----------------------------COLUMN SETTINGS-----------------------------//
//------------------------------------------------------------------------//
const columns = [
  { 
    field: 'id', 
    headerName: 'Identifiant', 
    flex: 2,
    renderCell: (params) => (<Link to={`/client?tel=${params.row.id}`}>{params.value}</Link>)
  },
  { field: 'nom', headerName: 'Nom', flex: 2 },
  { field: 'prenom', headerName: 'Prénom', flex: 2 },
  { field: 'societe', headerName: 'Société', flex: 2 },
  { field: 'telephone', headerName: 'Téléphone', flex: 2 },
  { 
    field: 'mail', 
    headerName: 'Email', 
    flex: 3,
    renderCell: (params) => (<a rel="noreferrer" target="_blank" href={`mailto:${params.value}`}>{params.value}</a>)
  },
  { 
    field: 'site', 
    headerName: 'Lien', 
    flex: 3,
    renderCell: (params) => (<a rel="noreferrer" target="_blank" href={`${params.value}`}>{params.value}</a>)
  },
  {
    field: 'activite',
    renderHeader: () => (<div style={{width: "100%!important"}}></div>),
    flex: 1,
    renderCell: (params) => (
        <div style={{display: 'flex', justifyContent: 'center', gap: "5px", width: "100%" }}>
            <div>
              <OpenModal clientId={params.row.id} />
            </div>
            <div>
              <DeleteButton clientId={params.row._id} />
            </div>
        </div>
    )
  }
];
//-----------------------------------------------------

export default function QuickFilteringCustomizedGrid({ clients }) {
  const [pageSize, setPageSize] = useState(100);

  return (
    <>
      {clients !== undefined &&
        <Box sx={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{ color: 'black', borderColor: '#ccc' }}
            rows={clients}
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