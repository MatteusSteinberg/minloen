interface IContentContainer {
    children: React.ReactNode
}

const ContentContainer = ({ children }: IContentContainer) => {
    return (
        <div className="relative flex max-w-full rounded-none bg-lightSecondary grow dark:bg-darkSecondarySupport md:rounded-3xl">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-2 pt-6 pb-10 sm:px-6 md:p-12 2xl:px-10">{children}</div>
            </div>
        </div>
    )
}

export default ContentContainer
