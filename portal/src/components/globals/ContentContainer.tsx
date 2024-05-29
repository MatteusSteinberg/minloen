interface IContentContainer {
    children: React.ReactNode
}

const ContentContainer = ({ children }: IContentContainer) => {
    return (
        <div className="relative flex max-w-full bg-white rounded-none grow dark:bg-secondarySupport md:rounded-3xl">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">{children}</div>
            </div>
        </div>
    )
}

export default ContentContainer
