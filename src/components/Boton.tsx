interface BotonProps {
  text: string;
  color?: string;
  onClick?: any;
}

const Boton: React.FC<BotonProps> = ({ text, color = "blue", onClick }) => {
  const style = `bg-${color}-500 hover:bg-${color}-600`
  return (
    <button onClick={onClick} className={`dark:text-slate-600 w-1/6 md:w-fit lg:w-fit p-2 rounded m-4 ${style}`} >
      {text}
    </button>
  );
};
export default Boton;