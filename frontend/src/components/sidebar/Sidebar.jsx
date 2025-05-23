import { useAuthContext } from "../../context/AuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const { authUser } = useAuthContext();

	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			{/* Top bar with search and profile pic */}
			<div className='flex items-center justify-between mb-4'>
				<SearchInput />
				{authUser?.profilePic && (
					<div className='relative group ml-2'>
						<img
							src={authUser.profilePic}
							alt="Profile"
							className='w-11 h-11 rounded-full object-cover cursor-pointer border border-slate-400 hover:border-white transition'
						/>
						<div className='absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10'>
							{authUser.username}
						</div>
					</div>
				)}
			</div>

			<div className='divider px-3'></div>

			<Conversations />
			<LogoutButton />
		</div>
	);
};

export default Sidebar;
