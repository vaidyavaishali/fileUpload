import { useContext } from "react"
import uploadContext from "../contextAPI/context"
import { Link } from "react-router-dom"
import "./login.css"
const Login = () => {
    const { login, setLogin,LoginUser} = useContext(uploadContext)
    const LoginSubmit = () =>{
        LoginUser()
    }
    return (

        <div style={{ "width": "300px", "height": "auto", "boxShadow": "5px 5px 5px #cccc", "margin": "100px auto", borderRadius: "20px", padding: "30px", textAlign: "center", "position": "relative" }} cla>
            <h3>Login</h3>
            <div className="email div">
                <input type="text" placeholder="Enter email Adderss" onChange={(e) => { setLogin({ ...login, email: e.target.value }) }} />
            </div>
            <div className="password div">
                <input type="password" placeholder="Enter password" onChange={(e) => { setLogin({ ...login, password: e.target.value }) }} ></input>
            </div>
            <button className='reg-btn' onClick={LoginSubmit}>Login</button>
            <Link to="/signup">
                <p style={{ color: "red" }}>Register</p>
            </Link>

        </div>

    )
}
export default Login