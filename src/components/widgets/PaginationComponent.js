// PaginationComponent.js
import React from 'react';
import { Pagination } from '@themesberg/react-bootstrap';

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageLimit = 5;
    const pages = [];
    let startPage, endPage;

    if (totalPages <= pageLimit) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.ceil(pageLimit / 2)) {
            startPage = 1;
            endPage = pageLimit;
        } else if (currentPage + Math.floor(pageLimit / 2) >= totalPages) {
            startPage = totalPages - pageLimit + 1;
            endPage = totalPages;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <Pagination>
            {currentPage > 1 && (
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)}>
                    Anterior
                </Pagination.Prev>
            )}
            {startPage > 1 && (
                <>
                    <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
                    {startPage > 2 && <Pagination.Ellipsis />}
                </>
            )}
            {pages.map(pageNum => (
                <Pagination.Item
                    key={pageNum}
                    active={pageNum === currentPage}
                    onClick={() => onPageChange(pageNum)}
                >
                    {pageNum}
                </Pagination.Item>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <Pagination.Ellipsis />}
                    <Pagination.Item onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                </>
            )}
            {currentPage < totalPages && (
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)}>
                    Siguiente
                </Pagination.Next>
            )}
        </Pagination>
    );
};

export default PaginationComponent;
