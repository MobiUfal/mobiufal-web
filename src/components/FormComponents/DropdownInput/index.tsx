import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { IoMdArrowDropdown } from 'react-icons/io'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface DropDownProps {
  placeholder: string;
  data: String[];
  onChangeValue(value: string): void;
  value: string;
}

export const DropdownInput = ({ placeholder, data, onChangeValue, value }: DropDownProps) => {

  return (
    <Listbox value={value} onChange={e => {onChangeValue(e ? e : '');}}>
      {({ open }) => (
        <>
          <div className="mt-1 mr-[7px] relative w-full min-w-[184px]">
            <Listbox.Button className="relative w-full border border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
              <span className="flex items-center">
                <span className={classNames(!value ? 'text-[#79747E]' : 'font-normal', 'block truncate text-black')}>{!value ? placeholder : value}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <IoMdArrowDropdown size={20} color="#79747E"/>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data.map((dataFromString, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-gray-200 text-gray-900' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={dataFromString}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                          >
                            {dataFromString}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-gray-900' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}