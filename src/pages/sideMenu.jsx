import mainLogo from "../assets/mainLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardListIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LogoutIcon,
  IdentificationIcon,
} from "@heroicons/react/solid";
import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Puzzle,
  Landmark,
  GraduationCap,
  LibraryBig,
  Building2,
  Map,
  Settings2,
  RouteIcon,
  UserCheckIcon,
  ScaleIcon,
  FileSpreadsheet,
  BookAIcon,
} from "lucide-react";
import { clearAuthCookies } from "../utlis/cookieHelper";
import Swal from "sweetalert2";

//SideMenu Navigation Routes
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    color: "text-blue-400",
  },
  {
    name: "College",
    icon: GraduationCap,
    color: "text-green-400",
    children: [
      {
        name: "Manage Colleges",
        href: "/colleges",
        icon: Building2,
        color: "text-blue-400",
      },
      {
        name: "Add College Excel",
        href: "/add-college-excel",
        icon: FileSpreadsheet,
        color: "text-gray-400",
      },
      {
        name: "Add College Courses Excel",
        href: "/add-college-courses-excel",
        icon: BookAIcon,
        color: "text-orange-400",
      },
       {
        name: "College registration request",
        href: "/college-registration-approved",
        icon: BookAIcon,
        color: "text-orange-400",
      },
    ],
  },
  {
    name: "University",
    icon: LibraryBig,
    color: "text-purple-400",
    children: [
      {
        name: "Manage University",
        href: "/university-details",
        icon: Building2,
        color: "text-blue-400",
      },
    ],
  },
  {
    name: "Manage Classes",
    href: "/class-list",
    icon: BookOpenIcon,
    color: "text-blue-500",
  },
  {
    name: "Add Categories",
    icon: ClipboardListIcon,
    color: "text-orange-400",
    children: [
      {
        name: "Add Class Category",
        href: "/add-class-category",
        icon: Puzzle,
        color: "text-blue-400",
      },
      {
        name: "Add College Category",
        href: "/add-college-category",
        icon: Landmark,
        color: "text-green-400",
      },
      {
        name: "Add University Category",
        href: "/add-university-category",
        icon: GraduationCap,
      }
    ],

  },
  // {
  //   name: "Add Eligibility",
  //   href: "/add-cutoff-eligibility",
  //   icon: UserCheckIcon,
  //   color: "text-emerald-500",
  // },

    {
    name: "Eligibility",
    icon: UserCheckIcon,
    color: "text-emerald-500",
    children: [
       {
        name: "Add Current Education",
        href: "/add-caste-category",
        icon: GraduationCap,
        color: "text-purple-400",
      },
      {
        name: "Add CutOff List",
        href: "/add-cutoff-excel",
        icon: FileSpreadsheet,
        color: "text-gray-400",
      },
      // {
      //   name: "Add CutOff Form",
      //   href: "/add-cutoff-eligibility",
      //   icon: Puzzle,
      //   color: "text-blue-400",
      // },
      // {
      //   name: "CuttOff Table",
      //   href: "/cutoff-table",
      //   icon: Landmark,
      //   color: "text-green-400",
      // },
     
    ],
  },
  {
    name: "IQ Test",
    href: "/iq-test",
    icon: PresentationChartBarIcon,
    color: "text-indigo-400",
  },
  {
    name: "Roadmap",
    icon: Map,
    color: "text-red-400",
    children: [
      {
        name: "Manage Type ",
        href: "/manage-type",
        icon: Settings2,
        color: "text-blue-400",
      },
      {
        name: "Manage Roadmap",
        href: "/manage-roadmap",
        icon: RouteIcon,
        color: "text-green-400",
      },
    ],
  },
  {
    name: "Reports & Analytics",
    href: "/reports",
    icon: ChartBarIcon,
    color: "text-teal-400",
  },
  {
    name: "View Profile",
    href: "/profile",
    icon: UserCircleIcon,
    color: "text-pink-400",
  },

];

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownStates, setDropdownStates] = useState({});
const [activeLink,setActiveLink]=useState("");

useEffect(()=>{
 setActiveLink(location.pathname);
},[location.pathname]);
  const toggleDropdown = (itemName) => {
    setDropdownStates((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };
  const handleLogout = () => {
    Swal.fire({
      title: "👋 Ready to logout?",
      text: "See you soon! Want to log out now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuthCookies();
        window.location.href = "/"; // Hard reload + redirect
      }
    });
  };

 
   return (
<div
className="
hidden
md:flex
md:w-80
flex-col
md:fixed
md:inset-y-0
h-screen
bg-slate-900
shadow-2xl
z-50
border-r
border-slate-700
"
>


{/* LOGO SECTION */}

<div
className="
relative
flex
flex-col
items-center
justify-center
py-6
bg-slate-800
border-b
border-slate-700
"
>


<div
className="
absolute
top-0
left-0
right-0
h-1
bg-gradient-to-r
from-blue-500
via-purple-500
to-pink-500
"
/>



<div
className="
h-20
w-20
rounded-full
bg-blue-100
backdrop-blur
border
border-white/30
shadow-xl
flex
items-center
justify-center
"
>

<img

src={mainLogo}

alt="Career Jupiter"

className="
h-14
w-14
object-contain
"

 />

</div>



<h4
className="
mt-3
text-xl
font-extrabold
tracking-wider
bg-gradient-to-r
from-cyan-400
to-blue-400
bg-clip-text
text-transparent
"
>

CAREER JUPITER

</h4>



<p
className="
text-xs
text-gray-400
mt-1
"
>

Admin Panel

</p>


</div>





{/* MENU AREA */}


 <div
  className="
  flex-1
  overflow-y-auto
  overflow-x-hidden
  px-4
  py-5
  scrollbar-hide
  pb-24
  "
>

<nav
className="
space-y-2
"
>

{navigation.map((item) => {

const isActive = activeLink === item.href;


if(item.children){

const isDropdownOpen =
dropdownStates[item.name] || false;


return (

<div
key={item.name}
className="
space-y-1
"
>


<button

onClick={()=>toggleDropdown(item.name)}

className="
w-full
flex
items-center
justify-between
px-4
py-3
rounded-xl
text-sm
font-semibold
text-slate-200
hover:bg-slate-700
transition-all
duration-300
group
cursor-pointer
"

>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
h-9
w-9
rounded-xl
bg-slate-700
flex
items-center
justify-center
group-hover:scale-110
transition-transform
duration-300
"
>

<item.icon

className={`
h-5
w-5
${item.color}
`}

/>

</div>



<span>

{item.name}

</span>


</div>



{
isDropdownOpen ?

<ChevronUpIcon
className="
h-5
w-5
text-gray-300
"
/>

:

<ChevronDownIcon
className="
h-5
w-5
text-gray-300
"
/>

}



</button>






<AnimatePresence>


{
isDropdownOpen &&
<motion.div
initial={{opacity:0,height:0}}
animate={{opacity:1,height:"auto"}}
exit={{opacity:0,height:0}}
transition={{duration:0.3}}
className="
ml-12
mt-2
space-y-2
overflow-hidden
"
>


{

item.children.map((child)=>{


const isChildActive =
activeLink === child.href;



return(


<button

key={child.name}

onClick={()=>{

setActiveLink(child.href);

navigate(child.href);

}}


className={`

w-full
flex
items-center
gap-3
px-3
py-2.5
rounded-lg
text-sm
transition-all
duration-300
cursor-pointer

${
isChildActive

?

"text-slate-300 hover:bg-slate-700 hover:text-white shadow-lg"

:

"text-slate-300 hover:bg-slate-700 hover:text-white"

}

`}


>


<div
className="
h-7
w-7
rounded-md
bg-blue-100
flex
items-center
justify-center
"
>


<child.icon

className={`
h-4
w-4
${child.color}
`}

/>


</div>


<span>

{child.name}

</span>



</button>


)


})

}



</motion.div>


}



</AnimatePresence>


</div>


)


}






return (

<button

key={item.name}

onClick={()=>{

setActiveLink(item.href);

navigate(item.href);

}}


className={`

w-full

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-sm

font-semibold

transition-all

duration-300

cursor-pointer


${
isActive

?

"bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"

:

"text-gray-300 hover:bg-blue-100 hover:text-white"

}

`}


>


<div

className="
h-9
w-9
rounded-lg
bg-blue-100
flex
items-center
justify-center
"

>


<item.icon

className={`
h-5
w-5

${
isActive

?

"text-white"

:

item.color

}

`}

/>


</div>



<span>

{item.name}

</span>



</button>


)


})}
</nav>

</div>





{/* LOGOUT SECTION */}

<div

className="
p-4
border-t
border-white/10
bg-slate-800
"

>


<button

onClick={handleLogout}

className="
group
w-full
flex
items-center
justify-center
gap-3
px-4
py-3
rounded-xl
bg-gradient-to-r from-rose-500 to-red-600
text-white
font-semibold
shadow-lg
hover:shadow-red-500/30
hover:scale-[1.03]
transition-all
duration-300
cursor-pointer
"

>


<div

className="
h-8
w-8
rounded-lg
bg-white/20
flex
items-center
justify-center
group-hover:rotate-12
transition
"

>


<LogoutIcon

className="
h-5
w-5
"

/>


</div>



<span>

Logout

</span>



</button>



</div>




</div>
);
}
export default SideMenu;

