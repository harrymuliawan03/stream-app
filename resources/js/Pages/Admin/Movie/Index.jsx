import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";


export default function Movie({ auth, flashMessage, movies, restore_movies }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "55%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement("#app");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);

    function openModal(id) {
        setIsOpen(true);
        setId(id);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const deleteMovie = (e) => {
        e.preventDefault();
        
        router.delete(
            route("admin.dashboard.movie.destroy", id)
        );
        // router.reload();
        setId(0);
        setIsOpen(false);
    };

    let data = movies.map((movie) => (
        <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={movie.id}
        >
            <td className="px-6 py-4">
                <img
                    src={`/storage/${movie.thumbnail}`}
                    className="w-32 rounded-md"
                    alt={movie.name}
                />
            </td>
            <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {movie.name}
            </td>
            <td className="px-6 py-4">{movie.category}</td>
            <td className="px-6 py-4">{movie.rating}</td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <Link href={route("admin.dashboard.movie.edit", movie.id)}>
                        <Button variant="warning" className="w-[110px]">
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="danger"
                        className="w-[110px]"
                        // onClick={() => deleteMovie(movie.id)}
                        onClick={() => openModal(movie.id)}
                    >
                        Hapus
                    </Button>
                </div>
            </td>
        </tr>
    ));
                        
    const notify = () =>
        toast.success(flashMessage.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    useEffect(() => {
        if (flashMessage.message) {
            notify();
            flashMessage.message = null;
        }
    }, [flashMessage]);

    return (
        <Authenticated auth={auth}>
            <div>
                <ToastContainer />
            </div>
            <div className="flex justify-between">
                <Link href={route("admin.dashboard.movie.create")}>
                    <Button className="p-3">Insert New Movie</Button>
                </Link>
                <Link href={route("admin.dashboard.restore")}>
                    <Button variant="warning" className="p-3">
                        Restore : {restore_movies.length} 
                        </Button>
                </Link>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Movie Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{data}</tbody>
                </table>
            </div>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className="text-red-700 text-xl">
                        Are you sure want to delete this Movie ?{" "}
                    </h2>
                    <div className="flex gap-2 justify-center mt-5">
                        <Button variant="warning" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={deleteMovie}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            </div>
        </Authenticated>
    );
}
