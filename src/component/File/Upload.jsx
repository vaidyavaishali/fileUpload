import { useContext } from "react"
import { Link } from "react-router-dom"
import uploadContext from "../contextAPI/context"

const Upload = () => {
    const { Create, setfile, setfile_name, logout } = useContext(uploadContext)
    // const UploadFile = (e)=>{
    //     // e.preventDefault()
    //     Create()
    // }
    return (
        <>
            <div>
                <header id="header">
                    <h2>File Upload App</h2>
                    <h4 onClick={logout}>Logout</h4>
                    <Link to="/upload"><button>Add more</button></Link>
                </header>
                <form onSubmit={Create}>
                    <div>
                        <label>File Name</label>
                        <input type="text" onChange={(e) => { setfile_name(e.target.value) }} />
                    </div>
                    <div>
                        <label>Picture</label>
                        <input type="file" onChange={(e) => { setfile(e.target.files[0]) }} />
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </>
    )
}
export default Upload