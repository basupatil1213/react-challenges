import { useToggle } from "../hooks/use-toggle";



const Modal = ({ children }) => {
    const [showModal, toggleModal] = useToggle(true);

    return (
        <div>
            <button onClick={toggleModal}>
                {showModal ? "Hide" : "Show"}
            </button>

            {showModal && (
                <section role="dialog" aria-modal="true">
                    {children}
                </section>
            )}
        </div>
    );
};


export default Modal;