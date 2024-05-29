import { Link } from "react-router-dom"
import Pagination from "../globals/Pagination"

interface IDataTable {
    tableData: {
        headers: string[]
        rows: Array<Record<string, any>>
    }
    button?: string
    actions?: (data: any) => React.ReactNode
    title?: string
    currentPage?: number
    onPageClick?: (page: number) => void
    metadata?: { count: number; size: number }
}

const DataTable = ({ tableData, currentPage, onPageClick, metadata, button, actions, title }: IDataTable) => {
    return (
        <div className="relative z-10 w-full h-full border border-solid shadow-custom rounded-2xl border-lightBorder dark:border-darkBorder">
            <div className="relative flex items-center justify-between h-full py-6 bg-white px-9 dark:bg-darkPrimarySupport rounded-t-2xl">
                <h2 className="text-text dark:text-white font-medium-medium">{title ? title : "Indtast title"}</h2>
                {button && (
                    <Link className="border-solid border-2  bg-lightPrimary border-lightPrimary dark:border-[rgb(52,56,57)] dark:bg-transparent text-white font-standard-medium py-3 px-6 rounded-[14px] flex justify-center hover:bg-lightSecondaryLight hover:border-lightSecondaryLight hover:text-text dark:hover:bg-[rgb(52,56,57)] transition-colors duration-150" to={button}>
                        Tilføj medarbejder
                    </Link>
                )}
            </div>
            <div className="relative overflow-x-auto no-scrollbar scroll-smooth">
                <table className="w-full text-left bg-white  dark:bg-[#1B1F20]">
                    <thead className="border-t border-b border-solid border-lightBorder dark:border-none">
                        <tr>
                            {tableData.headers.map((header, index) => (
                                <th scope="col" className="px-8 py-2 uppercase text-text dark:text-white text-nowrap font-xsmall-normal">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.rows.map((row, index) => (
                            <tr className="text-text dark:text-white bg-white dark:bg-darkPrimarySupport font-small-normal border-b border-solid border-lightBorder dark:border-[#343839]">
                                {tableData.headers.map((header, colIndex) => (
                                    <td key={colIndex} className="px-8 py-4 text-nowrap">
                                        {header === "Billede" && row[header] ? <img src={`${row[header]}`} alt={row.name || "Image"} className="w-10 h-10 rounded-full" /> : row[header]}
                                    </td>
                                ))}
                                {actions?.(row)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end py-4 bg-white dark:bg-darkPrimarySupport rounded-b-2xl px-9">
                <Pagination onClick={onPageClick} currentPage={currentPage} size={metadata?.size} count={metadata?.count} />
            </div>
        </div>
    )
}

export default DataTable
