import { useParamsStore } from "@/store/store";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { CardButton } from "../Button/Button";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

export const Pagination = () => {
  const setPaginationInfo = useParamsStore((state) => state.setParams);
  const paginationInfo = useParamsStore((state) => state.params);

  const onClickPreviousHandler = () => {
    if (paginationInfo.current_page > 1) {
      setPaginationInfo("current_page", paginationInfo.current_page - 1);
    } else {
      setPaginationInfo("current_page", Math.ceil(paginationInfo.total / 10));
    }
  };

  const onClickNextHandler = () => {
    if (paginationInfo.current_page < Math.ceil(paginationInfo.total / 10)) {
      setPaginationInfo("current_page", paginationInfo.current_page + 1);
    } else {
      setPaginationInfo("current_page", 1);
    }
  };

  return (
    <PaginationContainer>
      <PaginationButton disabled={false} onClick={onClickPreviousHandler}>
        <MdNavigateBefore />
      </PaginationButton>
      <PaginationInfo>
        Page {paginationInfo.current_page} of{" "}
        {Math.ceil(paginationInfo.total / 10)}
      </PaginationInfo>
      <PaginationButton disabled={false} onClick={onClickNextHandler}>
        <MdNavigateNext />
      </PaginationButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
  gap: 2rem;

  p {
    margin-bottom: 0;

    @media (max-width: 570px) {
      margin-bottom: 0;
    }
  }
`;

const PaginationButton = styled(CardButton)`
  background: lightgray;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: #1f2937;
  }
  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  svg {
    font-size: 24px;
  }
`;

const PaginationInfo = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`;

export default Pagination;
