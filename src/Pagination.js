import React from 'react'
import styled from 'styled-components'

const PaginationBlock = styled.div`
    display: flex;
    justify-content: center;
    div {
        display: flex;
        width: 100px;

        justify-content: space-around;
        align-items: center;
    }
    button {
        height: 30px;
        border-radius: 100%;
        line-height: 14px;
    }
`
export const Pagination = ({
    list,
    currentPage,
    setCurrentPage,
    usersPerPage,
}) => {
    const PageCount = Math.ceil(list.users.length / usersPerPage)
    const nextPage = () => {
        if (currentPage === PageCount) {
            return setCurrentPage(1)
        }
        return setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage === 1) {
            setCurrentPage(PageCount)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }
    return (
        <>
            {PageCount > 1 && (
                <PaginationBlock>
                    <div>
                        <button onClick={prevPage}> &larr;</button>
                        <span>
                            {currentPage}/{PageCount}
                        </span>
                        <button onClick={nextPage}> &rarr;</button>
                    </div>
                </PaginationBlock>
            )}
        </>
    )
}
