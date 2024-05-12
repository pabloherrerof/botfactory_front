import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import Input, { InputContainer, Select } from "../Form/Input";
import Label from "../Form/Label";
import { ButtonsContainer } from "../ClientList/ClientList";
import { CardButton } from "../Button/Button";
import { useCategoriesStore, useParamsStore } from "@/store/store";

const Filters = () => {
  const [open, setOpen] = useState(false);
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const setParams = useParamsStore((state) => state.setParams);
  const resetFilters = useParamsStore((state) => state.resetFilters);
  const params = useParamsStore((state) => state.params);
  const [filters, setFilters] = useState({
    category: "",
    active: "",
    bigger_than: "",
    smaller_than: "",
  });

  useEffect(() => {
    if(categories.length === 0)
      fetchCategories();
  }, [categories]);

  useEffect(() => {
      setFilters({
        category: params.category || "",
        active: params.active || "",
        bigger_than: params.bigger_than || "",
        smaller_than: params.smaller_than || "",
      });
  }, [params]);

const onClickApplyHandler = () => {
  setParams("category", filters.category === "All" ? null : filters.category);
  setParams("active", filters.active === "" ? null : filters.active);
  setParams("bigger_than", filters.bigger_than === 0 ? null : filters.bigger_than);
  setParams("smaller_than", filters.smaller_than === 0 ? null : filters.smaller_than);
  setOpen(false);
}


const onClickResetHandler = () => {
  setOpen(false);
  resetFilters();
}

  return (
    <FiltersDropdownContainer>
    <FiltersDropdown open={open} onClick={() => setOpen(!open)}>
      Filter <MdKeyboardArrowDown />
      </FiltersDropdown>
    
      <AnimatePresence>
        {open && (
          <FilterOptions
            key="filterOptions"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 , decelerate: true
            }}

            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <InputContainer>
            <Label htmlFor="active">Status</Label>
            <Select
              name="active"
              id="active"
              minwidth="100px"
              onChange={(e) => setFilters({ ...filters, active: e.target.value })}
              value={filters.active}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option> 
            </Select>
            </InputContainer>
            <InputContainer>
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              id="category"
              minwidth="100px"
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              value={filters.category}
            >
               <option value={null} >All</option>
             {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            </InputContainer>
            <InputContainer>
            <Label htmlFor="greater_than">Age greater than: {filters.bigger_than} </Label>
            <Input minwidth="100px" type="range" name="age" id="age" min="0" max="100" className="range"
              onChange={(e) => setFilters({ ...filters, bigger_than: e.target.value })}
              value={filters.bigger_than}
              />
            </InputContainer>
            <InputContainer>
            <Label htmlFor="category">Age smaller than: {filters.smaller_than} </Label>
            <Input minwidth="100px" type="range" name="age" id="age" min="0" max="100" className="range"
            onChange={(e) => setFilters({ ...filters, smaller_than: e.target.value })}
            value={filters.smaller_than}
            />
            </InputContainer>
            <ButtonsContainer>
            <CardButton size={"50px"} color="#da5649" onClick={onClickResetHandler}>Reset</CardButton>
              <CardButton size={"50px"} onClick={onClickApplyHandler}>Apply</CardButton>
            </ButtonsContainer>
          </FilterOptions>
        )}
      </AnimatePresence>

    </FiltersDropdownContainer>
  );
};

const FiltersDropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 98;
`;

const FiltersDropdown = styled(motion.div)`
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
  padding: 1rem 0.5rem;

  svg {
    font-size: 28px;
    color: white;
    cursor: pointer;
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s;
  }
`;

const FilterOptions = styled(motion.div)`
  position: absolute;
  top: 50px;
  right: 0;
  width: 160px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: block;
  min-height: 100px;
  z-index: 998;
  padding: 1rem;
  background-color: lightgrey;
`;

export default Filters;
