
const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <button className="relative flex items-center justify-center w-10 h-10">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 9L2.20711 5.70711C1.81658 5.31658 1.81658 4.68342 2.20711 4.29289L5.5 1" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <button className="w-10 h-10 flex items-center justify-center relative bg-gradientmain border-[rgba(231,231,233,0.2)] border-solid border text-white font-small-medium rounded-lg">1</button>
      <button className="relative flex items-center justify-center w-10 h-10 text-primaryLight font-small-medium">2</button>
      <button className="relative flex items-center justify-center w-10 h-10 text-primaryLight font-small-medium">3</button>
      <button className="relative flex items-center justify-center w-10 h-10">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 9L4.79289 5.70711C5.18342 5.31658 5.18342 4.68342 4.79289 4.29289L1.5 1" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
