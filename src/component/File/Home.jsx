import { useContext } from "react"
import uploadContext from "../contextAPI/context"
import { Link } from "react-router-dom"
import './upload.css'

const HomePage = () => {
    const { data, logout } = useContext(uploadContext)
    console.log(data.file_name, "data")
    return (
        <div id="main-home-div">
            <header id="header">
                <h4 onClick={logout}>Logout</h4>
                <Link to="/upload"><button>Add more</button></Link>
            </header>
            <main>
                {data.map((items, i) => {
                    return (
                        <div>
                            <p>{items.file_name}</p>
                            <img src={items.file} />
                        </div>

                    )
                })}

            </main>
        </div>


    )
}
export default HomePage