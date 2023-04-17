import { useContext, useState } from "react"
import uploadContext from "./context"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { upload } from "@testing-library/user-event/dist/upload"

const ContextProvider = (props) => {
    const [login, setLogin] = useState({ email: "", password: "" })
    const [reg_data, setReg_data] = useState({ email: "", password: "" })
    const [confirm, setConfirm] = useState("")
    const [updateName, setUpdateName] = useState("")
    const [data, setData] = useState([])
    const [file, setfile] = useState("")
    const [id, setId] = useState("")
    const [file_name, setfile_name] = useState("")
    const navigate = useNavigate()
    const RegisterSubmit = () => {
        axios.post("https://file-upload-pe8d.onrender.com/register", reg_data).then((res) => {
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
        axios.post("https://file-upload-pe8d.onrender.com/login", login).then((res) => {
            console.log(res.data.token)
            window.sessionStorage.setItem("token", res.data.token);
            FetchData()
            alert("login Successfully..!!")
        }).catch((e) => {
            console.log(e)
        })
    }

    const FetchData = () => {
        const token = window.sessionStorage.getItem("token")
        console.log(token)
        const config = {
            headers: {
                authorization: token
            }
        }
        axios.get("https://file-upload-pe8d.onrender.com/fileupload", config).then((res) => {
            console.log(res.data, "d")
            setData(res.data.data)
            navigate("/home")
        }).catch(e => {
            console.log(e)
        })
    }

    const Create = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("file_name", file_name)
        formData.append("file", file)
        const token = window.sessionStorage.getItem('token')
        const config = {
            headers: {
                authorization: token,
                "Content-Type": "multipart/form-data"
            }
        }
        axios.post("https://file-upload-pe8d.onrender.com/fileupload", formData, config).then((res) => {
            console.log("ok")
            console.log(res.status)
            if (res.status === 200) {
                alert("data added")
                FetchData()
                // navigate("/home")
            } else {
                console.log("not ok")
            }

        }).catch(e => {
            console.log(e)
        })
    }

    const Update = () => {
        const token = window.sessionStorage.getItem('token')
        const config = {
            headers: {
                authorization: token,
            }
        }
        axios.put(`https://file-upload-pe8d.onrender.com/fileupload/${id}`, {file_name: updateName}, config).then(res => {
            if (res.status === 200)
                FetchData()
        }).catch(e => {
            console.log(e)
        })
    }


    const DeleteData = (id) => {
        const token = window.sessionStorage.getItem('token')
        const config = {
            headers: {
                authorization: token,
            }
        }
        axios.delete(`https://file-upload-pe8d.onrender.com/fileupload/${id}`, config).then(res => {
            if (res.status === 200) {
                alert("data is deleted")
                FetchData()
            } else {
                alert("invalid response")
            }
        }).catch(e => {
            console.log(e)
        })

    }



    const logout = () => {
        window.sessionStorage.removeItem("token")
        navigate("/")
    }

    return (

        <>
            <uploadContext.Provider value={{ login, setLogin, setReg_data, data, reg_data, RegisterSubmit, confirm, setConfirm, LoginUser, logout, Create, FetchData, setfile, setfile_name, DeleteData, Update, setId , id, setUpdateName}}>
                {props.children}
            </uploadContext.Provider>
        </>
    )
}
export default ContextProvider