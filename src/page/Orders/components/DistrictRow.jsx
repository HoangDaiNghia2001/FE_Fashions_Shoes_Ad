import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getDistrictByProvinceAsync } from "../OrdersSlice"

const DistrictRow = (props) => {
    const dispatch = useDispatch()

    const [district, setDistrict] = useState('')

    const getDistrictName = async (value) => {
        const response = await dispatch(getDistrictByProvinceAsync(props.province))
        const districts = response.payload.districts.filter(item => item.code === value)
        return (districts[0].name)
    }

    useEffect(() => {
        // Immediately Invoked Function Expression (IIFE)
        (async () => {
            try {
                const res = await getDistrictName(+props.district);
                setDistrict(res)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.district]);

    return <p>
        {district}
    </p>
};

export default DistrictRow