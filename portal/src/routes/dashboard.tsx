import Dropdown from "../components/elements/Dropdown"
import Header from "../components/globals/Header"

type Props = {}

const options = [{ value: "Option 1", label: "Option 1" }, { value: "Option 2", label: "Option 2" }, { value: "Option 3", label: "Option 3" }, { value: "Option 4", label: "Option 4" }, { value: "Option 5", label: "Option 5" }]

const dashboard = (props: Props) => {

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
