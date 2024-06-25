import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getWardByDistrictAsync } from "../OrdersSlice"

const WardRow = (props) => {
    const dispatch = useDispatch()

    const [ward, setWard] = useState('')

    const getWardName = async (value) => {
        const response = await dispatch(getWardByDistrictAsync(props.district))
        const wards = response.payload.data.filter(item => item.WardCode === value)
        return (wards[0].WardName)
    }

    useEffect(() => {
        // Immediately Invoked Function Expression (IIFE)
        (async () => {
            try {
                const res = await getWardName(props.ward);
                setWard(res)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.ward]);

    return <p>
        {ward}
    </p>
};

export default WardRow