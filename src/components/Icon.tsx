interface IconProps {
    color: string;
    path: string;
}

const Icon: React.FC<IconProps> = ({ color, path }) => {
    return (
        <a className={`text-gray-200 hover:text-${color} dark:text-gray-400 dark:hover:text-white`}>
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-10 h-10 hover:scale-125 transition-all duration-200`}>
                <path
                    clip-rule="evenodd"
                    d={path}
                    fill-rule="evenodd">
                </path>
            </svg>
        </a>
    );
};

export default Icon;
