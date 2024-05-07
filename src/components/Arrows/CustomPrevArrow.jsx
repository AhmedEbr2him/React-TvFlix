import './CustomArrow.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
const CustomPrevArrow = ({ onClick }) => {
  return (
    <button className='arrow prev-arrow' onClick={onClick}>
      <IoMdArrowRoundBack size={24} />
    </button>
  );
};
export default CustomPrevArrow;
