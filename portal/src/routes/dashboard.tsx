import Dropdown from "../components/elements/Dropdown"
import Header from "../components/globals/Header"

type Props = {}

const dashboard = (props: Props) => {
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]

    return (
        <div className="relative flex max-w-full rounded-none grow bg-secondarySupport md:rounded-3xl dark:bg-white">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">
                    <div className="">
                        <Header title="Hejsa Tobias!" />
                    </div>
                    <Dropdown name="Test" options={options} />
                </div>
            </div>
        </div>
    )
}

export default dashboard
