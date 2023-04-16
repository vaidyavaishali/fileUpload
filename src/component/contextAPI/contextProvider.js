import { useContext, useState } from "react"
import uploadContext from "./context"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { upload } from "@testing-library/user-event/dist/upload"

const ContextProvider = (props) => {
    const [login, setLogin] = useState({ email: "", password: "" })
    const [reg_data, setReg_data] = useState({ email: "", password: "" })
    const [confirm, setConfirm] = useState("")
    const [data, setData] = useState([])
    const [uploadData, setUploadData] = useState({ file_name: "", file: "" })
    const navigate = useNavigate()
    const RegisterSubmit = () => {
        // console.log("ok")
        axios.post("http://localhost:8000/register", reg_data).then((res) => {
            console.log(res.status)
            if (res.status === 200) {
                alert("successfully register")
                navigate("/")
            } else {
                console.log("error")
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const LoginUser = () => {
        
        axios.post("http://localhost:8000/login", login).then((res) => {
            window.localStorage.setItem("token",res.data.token);
            FetchData()
        }).catch((e) => {
            console.log(e)
        })
    }

    const FetchData = () => {
        const token = window.sessionStorage.getItem("token")
        const config = {
            headers: {
                authorization: token
            }
        }
        axios.get("http://localhost:8000/fileupload", config).then((res) => {
            console.log(res.data, "d")
            setData(res.data.data)
            navigate("/home")
        }).catch(e => {
            console.log(e)
        })
    }

    const Create = (e) => {
        e.preventDefault()
        try {
            let formData = new FormData()
            formData.append({ file_name: "file_name" })
            formData.append({ file: "file" })
            const token = window.localStorage.getItem('token')
            const config = {
                headers: {
                    authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.post("http://localhost:8000/fileupload", uploadData, config).then((res) => {
                console.log("ok")
                if(res.status === 200){
                    alert("data added")
                    FetchData()
                }
               
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {

        }

    }

    const logout = () => {
        window.sessionStorage.removeItem("token")
        navigate("/")
    }

    return (

        <>
            <uploadContext.Provider value={{ login, setLogin, setReg_data, data, uploadData, setUploadData, reg_data, RegisterSubmit, confirm, setConfirm, LoginUser, logout, Create, FetchData }}>
                {props.children}
            </uploadContext.Provider>
        </>
    )
}
export default ContextProvider