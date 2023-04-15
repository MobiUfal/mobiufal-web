import React, { ReactNode } from 'react';

interface DisplacementsData {
    id: number;
    time: string;
    accepted_at: string;
    finished_at: string;
    origin: string;
    origin_details: string;
    destination: string;
    destination_details: string;
    status: string;
    requester: {
        id: number;
        name: string;
    };
    voluntary: {
        id: number;
        name: string;
    };
}

type Props = {
    info: DisplacementsData | any;
    handleDisplacementClickClose: () => void
}

function DisplacementsModal({ info, handleDisplacementClickClose }: Props): JSX.Element {

    const { time, accepted_at, finished_at, origin, destination, status, requester, voluntary } = info;
    const isOpen = true;

    return (
        <>
            {isOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-black opacity-75"></div>
                        </div>


                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        ></span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-white rounded text-center border bg-[#29AAD7] w-[100%] py-5 mb-10"
                                            id="modal-headline"
                                        >
                                            Informações sobre deslocamento
                                        </h3>
                                        {/* Content div */}
                                        <div className="mt-2 text-black w-[590px]">

                                            <p className=''><strong>Horário:</strong> {time ? time : '-'}</p>
                                            <p className=''><strong>Status:</strong> {status}</p>
                                            <p className=''><strong>Solicitante:</strong> {requester.name}</p>
                                            <p className=''><strong>Voluntário/a:</strong> {voluntary?.name ? voluntary.name : '-'}</p>
                                            <div className='mt-5 items-center'>
                                                <p className='border-b py-2'><strong>Origem</strong>: {origin}</p>
                                                <p className='border-b py-2'><strong>Destino</strong>: {destination}</p>
                                                <p className='border-b py-2'><strong>Aceito</strong>: {accepted_at}</p>
                                                <p className='py-2'><strong>Finalizado</strong>: {finished_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#f93633] text-base font-medium text-white hover:bg-[#f70d09] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#29AAD7] sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDisplacementClickClose}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export { DisplacementsModal };