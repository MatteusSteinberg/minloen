import Dropdown from "../components/elements/Dropdown"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"

type Props = {}

const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
    { value: "Option 4", label: "Option 4" },
    { value: "Option 5", label: "Option 5" },
]

const dashboard = (props: Props) => {
    return (
        <ContentContainer>
            <div className="">
                <Header title="Hejsa Tobias!" />
            </div>
            <Dropdown name="Test" options={options} />
        </ContentContainer>
    )
}

export default dashboard
