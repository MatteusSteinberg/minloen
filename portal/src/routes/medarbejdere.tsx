import TranImage from "../assets/images/jonas1.png"
import DataTable from "../components/elements/DataTable"
import Header from "../components/globals/Header"

const coworkersData = {
    headers: ["ID #", "Billede", "Navn", "Stilling", "Email", "Løn"],
    rows: [
        {
            id: 1,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 2,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 3,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 4,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 5,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 6,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 7,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 8,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 9,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
        {
            id: 10,
            image: TranImage,
            name: "Tobias Thien Tran",
            position: "IT Support Elev",
            email: "ttt@flc.dk",
            pay: "18.057",
        },
    ],
}

const Coworkers = () => {
    return (
        <div className="relative flex max-w-full rounded-none grow bg-secondarySupport md:rounded-3xl dark:bg-white">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">
                    <div className="">
                        <Header title="Dine medarbejdere" />
                    </div>
                    <div className="">
                        <DataTable tableData={coworkersData} button="/ny-medarbejder" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coworkers
