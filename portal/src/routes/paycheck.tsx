import Header from "../components/globals/Header"

type Props = {}

const paycheck = (props: Props) => {
    return (
        <div className="relative flex max-w-full rounded-none grow bg-secondarySupport md:rounded-3xl dark:bg-white">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">
                    <div>
                        <Header title="Opret lønseddel" history />
                    </div>
                    <div className="relative flex items-start justify-between gap-4">
                        <div className="relative flex flex-col w-2/5 gap-4">
                            <div className="p-8 bg-primarySupport rounded-3xl shadow-custom"></div>
                        </div>
                        <div className="relative flex flex-col w-3/5 gap-4">
                            <div className="p-8 bg-primarySupport rounded-3xl shadow-custom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paycheck
