import { Audio } from  'react-loader-spinner';

const Loader = () => {
    return (
        <div className='containerLoader'>
            <Audio
                height="100"
                width="100"
                color='orangered'
                ariaLabel='loading'
            />
        </div>
    )
}

export default Loader