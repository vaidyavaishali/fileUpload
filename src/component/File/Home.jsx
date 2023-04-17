import { useContext } from "react"
import uploadContext from "../contextAPI/context"
import { Link } from "react-router-dom"
import { useState } from "react"
import { ModalHeader, Modal, ModalBody } from "reactstrap"

import './upload.css'

const HomePage = () => {
    const { data, logout, DeleteData, Update, setId, id } = useContext(uploadContext)
    const [model, setmodel] = useState(false)

    console.log(data, "data")
    return (
        <div id="main-home-div">
             <header id="header">
                <h2>File Upload App</h2>
                <h4 onClick={logout} style={{ textAlign: "right", marginRight: "10%" }}>Logout</h4>
                <Link to="/upload"><button >Add more</button></Link>
            </header>
             
           
            <main>
                {data.map((items, i) => {
                    return (
                        <div id="img-div">
                            <div>
                                <h3>{items.file_name}</h3>
                                <span>
                                    <button id="edit" onClick={() => { { setId(items._id); setmodel(true) } }} >Edit</button>
                                    <button onClick={() => DeleteData(items._id)} id="delete">Delete</button>
                                </span>
                            </div>
                            <img src={items.file} />
                        </div>

                    )
                })}
            </main>
        </div>


    )
}
export default HomePage