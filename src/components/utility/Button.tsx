const Button = ({ children, disabled, type }: ButtonType) => {
  return (
    <button
      className="bg-[#4587f2] text-white px-4 py-2 rounded-md hover:bg-[#4285F4]/10 hover:text-black shadow-md font-bold disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-white"
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

type ButtonType = { children: string; disabled?: boolean; type: 'submit' }

export default Button
