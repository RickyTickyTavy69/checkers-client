import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/${(+new Date()).toString(16)}`);
    }, []);



    return(
        <div>you will be redirected soon...</div>
    )
}

export default Redirect;