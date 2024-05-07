import './CustomArrow.css';
import { IoMdArrowRoundForward } from 'react-icons/io';

const CustomNextArrow = ({ onClick }) => {
  return (
    <button className='arrow next-arrow' onClick={onClick}>
      <IoMdArrowRoundForward size={24} />
    </button>
  );
};
export default CustomNextArrow;
