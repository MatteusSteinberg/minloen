import { Link, useParams } from "react-router-dom"

const Options = ({ canCreatePayroll }: { canCreatePayroll: boolean }) => {
  const { id } = useParams()

  return (
    <div className="flex items-center justify-between pb-3 mb-16 border-b border-solid border-lightBorder dark:border-darkBorder">
      <div className="flex items-center justify-center gap-4">
        <p className="text-text dark:text-white font-small-normal">Profil</p>
        <p className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">Medarbejder</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        {canCreatePayroll && <>
          <Link to={`/opret-loenseddel/${id}?fast=true`} className="text-text dark:text-white font-small-normal">
            Opret fast lønseddel
          </Link>
          <Link to={"/opret-loenseddel/" + id} className="text-lightPrimary dark:text-darkPrimaryLight font-small-normal">
            Opret tilpasset lønseddel for kommende måned
          </Link>
        </>}
      </div>
    </div>
  )
}

export default Options
