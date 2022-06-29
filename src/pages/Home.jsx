import Users from "../components/Users";
import MainTable from '../components/mainTable'
import Header from "../components/Header";

const Home = () => {


    return (
        <>
            <Header />

            <section className="home">
                <div className="home--container">
                    <Users />
                    {/* <MainTable /> */}
                </div>
                
            </section>      
        </>
    )
}

export default Home
