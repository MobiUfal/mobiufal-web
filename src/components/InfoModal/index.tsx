import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

type UserRequestor = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  affiliation: string;
  course_sector: string;
};

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: UserRequestor;
}

export const InfoModal = ({ isOpen, closeModal, user }: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="p-6 w-full flex bg-[#D9D9D9] justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-[28px] font-medium leading-6 text-gray-900"
                    >
                      {user.name}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-black hover:text-slate-700"
                      onClick={closeModal}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>

                  <div className="mt-2 p-6">
                    <p className="text-[18px] text-black">
                      Email: {user.email}
                    </p>
                    <p className="text-[18px] text-black">CPF: {user.cpf}</p>
                    <p className="text-[18px] text-black">
                      Telefone: {user.phone}
                    </p>
                    <p className="text-[18px] text-black">
                      Vínculo com a UFAL: {user.affiliation}
                    </p>
                    <p className="text-[18px] text-black">
                      Curso: {user.course_sector}
                    </p>
                    <p className="text-[18px] text-black">
                      Possui experiência com mobilidade de PcD?
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
