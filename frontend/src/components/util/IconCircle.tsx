import { GrClose } from "react-icons/gr";
import './IconCircle.css'

const IconCircle = ({ path }) => {

    // const goBack = () => {
    //     window.history.go(-1);
    // }

    return (
        <div className='icon-position'>
            <a /*onClick={goBack}*/ href={path}>
                <div className='icon-circle' >
                    <GrClose />
                </div>
            </a>
        </div>
    )
}
export default IconCircle;