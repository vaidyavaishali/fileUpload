import { useContext } from "react"
import uploadContext from "../contextAPI/context"

const Upload = () => {
    const { uploadData, setUploadData, Create } = useContext(uploadContext)
    const UploadFile = ()=>{
        Create()
    }
    return (
        <>
            <div>
                <form onSubmit={UploadFile}>
                    <div>
                        <label>File Name</label>
                        <input type="text" onChange={(e) => { setUploadData({ ...uploadData, file_name: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Picture</label>
                        <input type="file" onChange={(e) => { setUploadData({ ...uploadData, file: e.target.value }) }} />
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </>
    )
}
export default Upload