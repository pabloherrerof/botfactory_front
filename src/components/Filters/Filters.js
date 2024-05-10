import { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const filtersDropdownStyle = {
    position: "absolute",
    top: "50px",
    right: "0",
    width: "160px",
    backgroundColor: "white",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    display: "block",
    minHeight: "100px",
    zIndex: "998",
};

const Filters = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  return (
    <FiltersDropdown open={open} onClick={() => setOpen(!open)}>
      Filter <MdKeyboardArrowDown />
      <AnimatePresence>
        {open && (
          <motion.div
            key="filterOptions"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 , decelerate: true
            }}

            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={filtersDropdownStyle}
          >
            <h4>Options</h4>
            {/* Put more filter options here */}
          </motion.div>
        )}
      </AnimatePresence>
    </FiltersDropdown>
  );
};

const FiltersDropdown = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background-color: #000;
  padding: 0.5rem 1rem;
  height: 40px;
  width: 160px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out 0.1s;
  z-index: 999;

  svg {
    font-size: 28px;
    color: white;
    cursor: pointer;
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s;
  }
`;

export default Filters;
