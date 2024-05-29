import { Link } from "react-router-dom"

type Props = {}

const Options = (props: Props) => {
  return (
    <div className="flex items-center justify-between pb-3 mb-16 border-b border-solid border-border">
      <div className="flex items-center justify-center gap-4">
        <p className="text-white font-small-normal">Profil</p>
        <p className="text-primaryLight font-small-normal">Medarbejder</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link to="/opret-loenseddel?fast=true" className="text-white font-small-normal">
          Opret fast lønseddel
        </Link>
        <Link to="/opret-loenseddel" className="text-primaryLight font-small-normal">
          Opret tilpasset lønseddel for kommende måned
        </Link>
      </div>
    </div>
  )
}

export default Options
