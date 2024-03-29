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
      backgroundColor: alpha(theme.palette.primary.main),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    // '&.Mui-selected': {
    //   backgroundColor: alpha(
    //     theme.palette.primary.main,
    //     ODD_OPACITY + theme.palette.action.selectedOpacity,
    //   ),
    //   '&:hover, &.Mui-hovered': {
    //     backgroundColor: alpha(
    //       theme.palette.primary.main,
    //       ODD_OPACITY +
    //         theme.palette.action.selectedOpacity +
    //         theme.palette.action.hoverOpacity,
    //     ),
    //     // Reset on touch devices, it doesn't add specificity
    //     '@media (hover: none)': {
    //       backgroundColor: alpha(
    //         theme.palette.primary.main,
    //         ODD_OPACITY + theme.palette.action.selectedOpacity,
    //       ),
    //     },
    //   },
    // },
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
  flex: 1,
  sort: 'desc',
  valueFormatter: params => dateParser(params.value)
},
  { field: 'compte', headerName: 'Utilisateur', flex: 1 },
  { field: 'numero', headerName: 'Destinataire', flex: 1 },
  { field: 'message', headerName: 'Message', flex: 3
  }
];
//-----------------------------------------------------

export default function QuickFilteringCustomizedGrid({ data }) {
  const [pageSize, setPageSize] = useState(100);
  const [message, setMessage] = useState("");

  const handleEvent = (params, events, details) => {
    setMessage(params.row.message)
  };

  return (
    <>
      {data !== undefined &&
        <Box sx={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'createdAt', sort: 'desc' }],
              },
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{ color: 'black', borderColor: '#ccc' }}
            rows={data}
            getRowId={(data) => data._id}
            columns={columns}
            onRowClick={handleEvent}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            components={{ Toolbar: QuickSearchToolbar}} 
          />
          {message !== "" && <div className='message-container'><span style={{fontWeight: "bold"}}>Message :</span> {message}</div>}
        </Box>
      }
    </>
  );
}