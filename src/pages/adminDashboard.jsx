import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaSchool,
  FaChalkboardTeacher,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import {
  TbSmartHome,
  TbUserSquareRounded,
} from "react-icons/tb";

import {
  GiGraduateCap,
  GiSchoolBag,
  GiTeacher,
  GiNotebook,
  GiNetworkBars,
} from "react-icons/gi";

import {
  GraduationCap,
  Landmark,
  Puzzle,
  Route,
} from "lucide-react";


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



const navigation = [

{
name:"Home",
href:"/dashboard",
icon:TbSmartHome,
bg:"bg-blue-100",
iconColor:"text-blue-600"
},

{
name:"Universities",
href:"/university-details",
icon:GiGraduateCap,
bg:"bg-purple-100",
iconColor:"text-purple-600"
},

{
name:"Colleges",
href:"/colleges",
icon:GiSchoolBag,
bg:"bg-green-100",
iconColor:"text-green-600"
},

{
name:"Classes",
href:"/class-list",
icon:GiTeacher,
bg:"bg-yellow-100",
iconColor:"text-yellow-600"
},

{
name:"IQ Tests",
href:"/iq-test",
icon:GiNotebook,
bg:"bg-pink-100",
iconColor:"text-pink-600"
},

{
name:"Road Map",
href:"/manage-roadmap",
icon:Route,
bg:"bg-cyan-100",
iconColor:"text-cyan-600"
},

{
name:"Analytics",
href:"/reports",
icon:GiNetworkBars,
bg:"bg-red-100",
iconColor:"text-red-600"
},

{
name:"Profile",
href:"/profile",
icon:TbUserSquareRounded,
bg:"bg-indigo-100",
iconColor:"text-indigo-600"
}

];





const AdminDashboard =()=>{


const navigate=useNavigate();


const [stats,setStats]=useState({
universities:0,
colleges:0,
classes:0
});



useEffect(()=>{

const fetchStats=async()=>{

try{

const [
collegeRes,
universityRes,
classRes

]=await Promise.all([

axios.get(`${API_BASE_URL}/api/college/all`),

axios.get(`${API_BASE_URL}/api/university/all`),

axios.get(`${API_BASE_URL}/api/class/all`)

]);


setStats({

universities:
universityRes?.data?.data?.universities?.length || 0,

colleges:
collegeRes?.data?.data?.colleges?.length || 0,

classes:
classRes?.data?.data?.classes?.length || 0

});


}
catch(error){

console.log(error);

}


};


fetchStats();


},[]);





const donutData={

labels:[
"Universities",
"Colleges",
"Classes"
],

datasets:[

{

data:[
stats.universities,
stats.colleges,
stats.classes
],

backgroundColor:[
"#6366F1",
"#10B981",
"#F59E0B"
]

}

]

};





const options={

plugins:{

legend:{

position:"bottom",

labels:{
boxWidth:12
}

}

}

};





return(

<div className="
h-screen
overflow-hidden
bg-gradient-to-br
from-blue-50
via-indigo-50
to-purple-100
p-4
">


{/* Header */}

<div className="mb-3">

<h1 className="
text-2xl
font-bold
text-gray-800
">

Admin Dashboard

</h1>


<p className="text-sm text-gray-500">

Manage complete education system

</p>

</div>





{/* Stats Cards */}

<div className="
grid
grid-cols-3
gap-4
h-[18vh]
mb-4
">


<div className="
rounded-2xl
bg-gradient-to-r
from-indigo-600
to-blue-500
text-white
p-5
shadow-lg
flex
items-center
">

<FaUniversity className="text-4xl mr-4 opacity-80"/>

<div>

<p className="text-sm">
Universities
</p>

<h2 className="text-3xl font-bold">
{stats.universities}
</h2>

</div>

</div>




<div className="
rounded-2xl
bg-gradient-to-r
from-green-500
to-emerald-600
text-white
p-5
shadow-lg
flex
items-center
">


<FaSchool className="text-4xl mr-4"/>

<div>

<p className="text-sm">
Colleges
</p>

<h2 className="text-3xl font-bold">
{stats.colleges}
</h2>

</div>

</div>





<div className="
rounded-2xl
bg-gradient-to-r
from-orange-500
to-yellow-500
text-white
p-5
shadow-lg
flex
items-center
">


<FaChalkboardTeacher className="text-4xl mr-4"/>

<div>

<p className="text-sm">
Classes
</p>

<h2 className="text-3xl font-bold">
{stats.classes}
</h2>

</div>


</div>


</div>







{/* Middle Section */}

<div className="
grid
grid-cols-2
gap-4
h-[42vh]
mb-4
">


{/* Chart */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-5
flex
flex-col
items-center
">


<h2 className="
font-bold
text-lg
text-gray-700
mb-2
">

Data Distribution

</h2>


<div className="w-60 h-60">

<Doughnut
data={donutData}
options={options}
/>

</div>


</div>






{/* Category */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-5
">


<h2 className="
font-bold
text-lg
mb-4
text-gray-700
">

Add Categories

</h2>



<div className="space-y-3">


<Link
to="/add-class-category"
className="
flex
items-center
gap-3
p-3
rounded-xl
bg-blue-50
hover:bg-blue-100
"
>

<div className="
w-10
h-10
rounded-lg
bg-blue-500
flex
items-center
justify-center
">

<Puzzle className="text-white w-5"/>

</div>


<span className="font-semibold text-blue-700">

Class Category

</span>

</Link>





<Link
to="/add-college-category"
className="
flex
items-center
gap-3
p-3
rounded-xl
bg-green-50
hover:bg-green-100
"
>


<div className="
w-10
h-10
rounded-lg
bg-green-500
flex
items-center
justify-center
">

<Landmark className="text-white w-5"/>

</div>


<span className="font-semibold text-green-700">

College Category

</span>


</Link>






<Link
to="/add-university-category"
className="
flex
items-center
gap-3
p-3
rounded-xl
bg-purple-50
hover:bg-purple-100
"
>


<div className="
w-10
h-10
rounded-lg
bg-purple-500
flex
items-center
justify-center
">

<GraduationCap className="text-white w-5"/>

</div>


<span className="font-semibold text-purple-700">

University Category

</span>


</Link>



</div>


</div>


</div>








{/* Quick Shortcut */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-4
h-[28vh]
">


<h2 className="
font-bold
text-lg
text-gray-700
mb-3
">

🚀 Quick Shortcuts

</h2>



<div className="
grid
grid-cols-8
gap-3
">


{
navigation.map((item,index)=>{

const Icon=item.icon;


return(

<button
key={index}
onClick={()=>navigate(item.href)}

className="
group
relative
overflow-hidden
rounded-2xl
p-3
border
bg-white
hover:shadow-xl
transition-all
duration-300
hover:-translate-y-2
"
>


{/* Animated background */}

<div className="
absolute
inset-0
bg-gradient-to-br
from-blue-50
via-purple-50
to-pink-50
opacity-0
group-hover:opacity-100
transition
duration-500
">
</div>



<div className="relative z-10">


{/* Animated Icon */}

<div
className={`
mx-auto
w-12
h-12
rounded-xl
${item.bg}
flex
items-center
justify-center
shadow-md
group-hover:scale-110
group-hover:rotate-6
transition-all
duration-500
`}
>


<Icon
className={`
text-2xl
${item.iconColor}
group-hover:animate-bounce
`}
/>


</div>



<p
className="
mt-3
text-xs
font-bold
text-gray-700
group-hover:text-blue-700
transition
"
>

{item.name}

</p>


</div>


</button>

)

})
}


}


</div>


</div>




</div>

)


}


export default AdminDashboard;