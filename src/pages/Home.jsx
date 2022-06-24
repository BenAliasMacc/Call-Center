import Users from "../components/Users";
import MainTable from '../components/mainTable'
import '../styles/Home.scss'
import Header from "../components/Header";

const Home = () => {


    return (
        <>
            <Header />

            <section className="home">
                {/* <Users /> */}
                <div className="home--container">
                    <MainTable />
                </div>
                
            </section>      
        </>
    )
}

export default Home
