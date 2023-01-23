import Box from '@mui/material/Box';
import {
  DataGrid,
  gridClasses,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';
import { dateParser } from '../utils/dateParser';

//-----------------------------STRIPED DATA-GRID-----------------------------//
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
    </Box>
  );
}

//-----------------------------COLUMN SETTINGS-----------------------------//
//------------------------------------------------------------------------//
const columns = [
  { field: 'createdAt', 
  headerName: 'Date', 
  flex: 2,
  valueFormatter: params => dateParser(params.value)
},
  { field: 'compte', headerName: 'Utilisateur', flex: 2 },
  { field: 'numero', headerName: 'Destinataire', flex: 2 },
  { field: 'message', headerName: 'Message', flex: 2 }
];
//-----------------------------------------------------

export default function QuickFilteringCustomizedGrid({ data }) {
  const date = dateParser(data.createdAt);
console.log(data)
  const [pageSize, setPageSize] = useState(100);

  return (
    <>
      {data !== undefined &&
        <Box sx={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{ color: 'black', borderColor: '#ccc' }}
            rows={data}
            getRowId={(data) => data._id}
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