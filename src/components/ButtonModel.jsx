import arrow from "../assets/icons/down-arrow.svg"

export const ButtonModel = ({ modeles, setModelSelected, isOpen, setIsOpen }) => {

    const handleButtonModel = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }   

    const handleOpenButtonModel = () => {

    }

    const handleModel = (e, i) => {
        setIsOpen(false);
        setModelSelected(i)       
    }

    const stopPropagation = (e) => {
        
    }

    const displayModels = isOpen ? "show-models" : ""

    return (
        
        <div className={`button-model ${displayModels}`} onClick={handleButtonModel}>
            <div className="button-model__button" >
                <p>modeles</p>
                <img src={arrow} alt="drop down arrow" />
            </div>
            {isOpen && 
                <ul className="button-model__list">
                    {modeles.map((modele, i) => <li onClick={(e) => handleModel(e, i)} key={i}>{modele.title}</li>)}
                    {/* <li>Test 1</li>
                    <li>Test 2</li>
                    <li>Test 3</li> */}
                </ul>            
            }         
        </div>
    )
}
