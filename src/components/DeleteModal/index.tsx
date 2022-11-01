// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'
// import { AiOutlineClose } from 'react-icons/ai';

// interface ModalProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   textTitle?: string;
//   handleCancel: (id: (number | undefined)) => void;
// }

// export const DeleteModal = ({ isOpen, closeModal, textTitle, handleCancel }: ModalProps) => {
export const DeleteModal = () => {
  return (
    <>
      {/* <Transition appear show={isOpen} as={Fragment}>
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
                  
                  <div className="p-6 w-full flex bg-[#ff6961] justify-between">
                    <Dialog.Title as="h3" className="text-[24px] font-medium leading-6 text-[#fff]-900">
                      Deseja realmente cancelar {textTitle}?
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-black hover:text-slate-700"
                      onClick={closeModal}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>

                  <div className="mt-4 p-6 flex justify-end">
                  <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>

                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
};
