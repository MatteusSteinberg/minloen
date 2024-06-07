import _ from "lodash";
import { Fragment, useMemo } from "react";

const Pagination = ({ onClick, currentPage, count, size }: { onClick?: (page: number) => void; currentPage?: number; size?: number; count?: number }) => {
  const handlePageClick = (page: number) => {
    onClick?.(page)
  }

  const onPage = useMemo(() => {
    return currentPage || 1
  }, [currentPage])

  const { hasPrevious, hasNext } = useMemo(() => {
    if (!size || !count) return { hasPrevious: false, hasNext: false }

    const skipped = (onPage - 1) * size
    const remaining = count - skipped

    const hasPrevious = onPage > 1
    const hasNext = remaining > size
    return { hasPrevious, hasNext }
  }, [count, onPage, size])

  const pages: number[] = useMemo(() => {
    if (!size || !count) {
      return [1, 2, 3]
    }

    const hasData = []

    for (let i = 0; i < 5; i++) {
      const p = onPage + i - 2
      if (p < 1) {
        continue
      }
      const skipped = (p - 1) * size
      const remaining = count - skipped
      const countOnPage = remaining > size ? size : remaining
      if (countOnPage > 0) {
        hasData.push(p)
      }
    }
    hasData.push(onPage)
    return _.uniq(hasData)
  }, [size, count, onPage])

  return (
    <div className="flex items-center justify-center gap-1">
      {hasPrevious && (
        <>
          <button onClick={() => handlePageClick(onPage - 1)} className="relative flex items-center justify-center w-10 h-10">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 9L2.20711 5.70711C1.81658 5.31658 1.81658 4.68342 2.20711 4.29289L5.5 1" className="stroke-text dark:stroke-[#E7E7E9]" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </>
      )}
      {pages.map((pageNumber) => (
        <Fragment key={pageNumber}>
          <button className={onPage === pageNumber ? "w-10 h-10 flex items-center justify-center relative bg-lightPrimary dark:bg-gradientmain border-lightBorder dark:border-[rgba(231,231,233,0.2)] border-solid border text-white font-small-medium rounded-lg" : "relative flex items-center justify-center w-10 h-10 text-lightPrimary dark:text-darkPrimaryLight font-small-medium"} onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </button>
        </Fragment>
      ))}
      {hasNext && (
        <>
          <button onClick={() => handlePageClick(onPage + 1)} className="relative flex items-center justify-center w-10 h-10">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 9L4.79289 5.70711C5.18342 5.31658 5.18342 4.68342 4.79289 4.29289L1.5 1" className="stroke-text dark:stroke-[#E7E7E9]" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

export default Pagination
