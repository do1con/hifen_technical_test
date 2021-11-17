import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Pagination = ({ currentPage, maxPage, setCurrentPage }) => {
  const pageBandCalc = () => {
    const calcNumb = currentPage % 10 ? currentPage : currentPage - 9;
    const bandMinPage = Math.floor(calcNumb / 10) * 10 + 1;
    const bandMaxPage = Math.ceil(calcNumb / 10) * 10;
    return {
      bandMinPage,
      bandMaxPage: bandMaxPage > maxPage ? maxPage : bandMaxPage
    }
  }
  const { bandMinPage, bandMaxPage } = pageBandCalc();
  const drawPages = () => {
    const pageButtons = [];
    for (let i = bandMinPage; i <= bandMaxPage; i++){
      pageButtons.push(
        <PageButton
          key={i}
          currentPage={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageButton>
      )
    }
    return pageButtons;
  }
  return (
    <PaginationWrapper>
      {currentPage > 10 &&
        <PageButton
          onClick={() => setCurrentPage(bandMinPage - 1)}
        >
          &lt;
        </PageButton>
      }
      {drawPages()}
      {maxPage > bandMaxPage &&
        <PageButton
          onClick={() => setCurrentPage(bandMaxPage + 1)}
        >
          &gt;
        </PageButton>
      }
    </PaginationWrapper>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

export default Pagination;

const PaginationWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  font-size: 16px;
  color: ${props => props.currentPage ? '#000000' : '#3f3f3f'};
  font-weight: ${props => props.currentPage ? 'bolder' : 'lighter'};
  border: 0;
  background-color: #ffffff;
  padding: 0 10px;
  cursor: pointer;
`;
