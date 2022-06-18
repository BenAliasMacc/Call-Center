import '../styles/mainTable.scss'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Identifiant', flex: 1 },
  { field: 'firstName', headerName: 'Prénom', flex: 1 },
  { field: 'lastName', headerName: 'Nom', flex: 1 },
  { field: 'company', headerName: 'Société', flex: 1 },
  { field: 'number', headerName: 'Téléphone', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 2 },
  { field: 'link', headerName: 'Lien', flex: 2 }
];

const rows = [
  { id: '0176360950', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360951', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360952', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360953', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360954', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360955', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360956', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360957', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
  { id: '0176360958', firstName: 'Mickael', lastName: 'Revah', company: 'Cars de France', number: '054 444 3212', email: 'michael@cars-de-france.com', link: 'michael@cars-de-france.com'},
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}