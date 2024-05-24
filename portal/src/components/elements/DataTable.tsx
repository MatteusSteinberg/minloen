import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import Pagination from "../globals/Pagination"

interface IDataTable {
    tableData: {
        headers: string[]
        rows: Array<Record<string, any>>
    }
    button?: string
}

const DataTable = ({ tableData, button }: IDataTable) => {
    return (
        <div className="relative z-10 w-full h-full shadow-custom rounded-2xl">
            <div className="relative flex items-center justify-between h-full py-6 px-9 bg-primarySupport rounded-t-2xl">
                <h2 className="text-white font-h4">Medarbejder oversigt</h2>
                {button && (
                    <Link className="border-solid border-2 border-[rgb(52,56,57)] bg-transparent text-white font-standard-medium py-3 px-6 rounded-[14px] flex justify-center hover:bg-[rgb(52,56,57)] transition-colors duration-150" to={button}>
                        Tilføj medarbejder
                    </Link>
                )}
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left bg-[#1B1F20]">
                    <thead>
                        <tr>
                            {tableData.headers.map((header, index) => (
                                <th scope="col" className="px-8 py-4 text-white uppercase font-xsmall-normal">
                                    {header}
                                </th>
                            ))}
                            <th scope="col" className="px-8 py-4 text-white uppercase font-xsmall-normal">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.rows.map((row, index) => (
                            <tr className="text-white bg-primarySupport font-small-normal border-b border-solid border-[#343839]">
                                <th scope="row" className="px-8 py-4 font-medium text-white whitespace-nowrap">
                                    {row.id}
                                </th>
                                <td className="px-8 py-4">
                                    <img src={row.image} alt={row.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="px-8 py-4">{row.name}</td>
                                <td className="px-8 py-4">{row.position}</td>
                                <td className="px-8 py-4">{row.email}</td>
                                <td className="px-8 py-4">{row.pay} kr</td>
                                <td className="flex items-center justify-end px-8 py-4 text-right">
                                    <a href="/" className="mr-2 flex items-center text-primaryLight bg-gradientmain border border-solid border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-12 w-12 justify-center">
                                        <EyeIcon className="w-5 h-5" />
                                    </a>
                                    <a href="/" className="mr-2 flex items-center text-primaryLight bg-gradientmain border border-solid border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-12 w-12 justify-center">
                                        <PencilIcon className="w-5 h-5" />
                                    </a>
                                    <a href="/" className="flex items-center text-primaryLight bg-gradientmain border border-solid border-[rgba(231,231,233,0.2)] hover:border-[rgba(231,231,233,0.5)] transition-colors duration-300 rounded-xl h-12 w-12 justify-center">
                                        <TrashIcon className="w-5 h-5" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end py-4 bg-primarySupport rounded-b-2xl px-9">
                <Pagination />
            </div>
        </div>
    )
}

export default DataTable