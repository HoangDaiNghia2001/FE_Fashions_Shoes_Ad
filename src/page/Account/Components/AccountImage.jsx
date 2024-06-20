import { useRef } from "react";
import { ConvertImageToBase64 } from "utils/ConvertImageToBase64";

const AccountImage = (props) => {

    const { adminImage, setAdminImage } = props

    const inputRef = useRef(null)

    const handleImageClick = () => {
        inputRef.current.click()
    }

    const handleChangeAdminImage = async (e) => {
        if (e.target.files[0]) {
            setAdminImage(await ConvertImageToBase64(e.target.files[0]))
        }
    }

    const handleDropImage = () => {
        setAdminImage(null)
        inputRef.current.value = ""
    }

    return <div className="account--image w-[25%] h-full ml-12">
        <div className="m-auto">
            <div className=" relative w-full h-[220px] flex justify-center items-center ">
                <i onClick={handleDropImage} className="fa-solid fa-xmark absolute right-0 top-0 cursor-pointer text-[18px] duration-150 hover:text-red-custom"></i>
                <img className="h-full w-full object-cover object-center rounded-[50%] border border-light-gray"
                    src={adminImage}
                    alt="" />
            </div>
            <div className="my-4 w-full">
                <input type="file" accept=".png, .jpg, .jpeg, .avif, .webp, .jfif" ref={inputRef} className='hidden' onChange={handleChangeAdminImage} />
                <div className="select-image text-center my-2">
                    <button className="custom-btn py-1 px-9 text-[14px] rounded-[8px]" onClick={handleImageClick}>Select</button>
                </div>
                <div className="text-grey text-[14px] font-normal tracking-[0.75px]">
                    <p>Maximum file size: 1MB</p>
                    <p className="truncate w-full" title=".png, .jpg, .jpeg, .avif, .webp, .jfif">Format: .png, .jpg, .jpeg, .avif, .webp, .jfif</p>
                </div>
            </div>
        </div>
    </div>
}

export default AccountImage