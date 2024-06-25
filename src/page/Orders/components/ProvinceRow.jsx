import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getProvinceAsync } from "../OrdersSlice"

const ProvinceRow = (props) => {
    const dispatch = useDispatch()
    const [province, setProvince] = useState('')
    const getProvinceName = async (value) => {
        const response = await dispatch(getProvinceAsync())
        const provinces = response.payload.data.filter(item => item.ProvinceID === value)
        return (provinces[0].ProvinceName)
    }

    useEffect(() => {
        // Immediately Invoked Function Expression (IIFE)
        (async () => {
            try {
                const res = await getProvinceName(+props.province);
                setProvince(res)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.province]);

    return <p>
        {province}
    </p>
};

export default ProvinceRow