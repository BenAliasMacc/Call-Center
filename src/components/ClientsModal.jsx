import React from 'react'
import DisplayClientsData from './DisplayClientsData'

const ClientsModal = ({ client, setClient, clientId, token }) => {

    return (
        <div className='clients-modal'>
            <DisplayClientsData client={client} setClient={setClient} clientId={clientId} token={token} />
        </div>
    )
}

export default ClientsModal