import React, { useEffect, useState } from "react";

import {
  FaUniversity,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

import Swal from "sweetalert2";
import { motion } from "framer-motion";

import {
  updateCollegeStatus,
  getCollegeRegistrations
} from "../api/college-api";

import { API_BASE_URL } from "../constant/constantBaseUrl";


function CollegeRegistrationApproved() {


const [colleges, setColleges] = useState([]);

const [loading, setLoading] = useState(false);


const [search, setSearch] = useState("");

const [statusFilter, setStatusFilter] = useState("all");


const [currentPage, setCurrentPage] = useState(1);

const [itemsPerPage, setItemsPerPage] = useState(10);





// ===============================
// Fetch College Registrations
// ===============================

const fetchColleges = async()=>{

try{

setLoading(true);


const response = await getCollegeRegistrations();


console.log(
"College API Response:",
response
);



setColleges(
response?.data?.colleges || []
);



}
catch(error){


console.log(
"Fetch College Error:",
error
);


Swal.fire(
"Error",
"Unable to fetch college registrations",
"error"
);


}
finally{

setLoading(false);

}


};





useEffect(()=>{

fetchColleges();

},[]);







// ===============================
// Update Status
// ===============================


const handleStatusUpdate = async(id,status)=>{


const result = await Swal.fire({

title:"Approve College?",

text:"College will become visible after approval",

icon:"question",

showCancelButton:true,

confirmButtonText:"Approve",

confirmButtonColor:"#2563eb"

});



if(!result.isConfirmed)
return;




try{


await updateCollegeStatus({

id,

status

});



Swal.fire(

"Success",

"College approved successfully",

"success"

);



fetchColleges();



}
catch(error){


console.log(error);


Swal.fire(

"Failed",

"Status update failed",

"error"

);


}


};







// ===============================
// Search + Filter + Sort
// ===============================


const filteredColleges = colleges

.filter((college)=>{


const searchText = search.toLowerCase();



const matchSearch =

college.collegeName
?.toLowerCase()
.includes(searchText)

||

college.collegeId
?.toString()
.includes(searchText)

||

college.affiliatedUniversity
?.toLowerCase()
.includes(searchText)

||

college.email_id
?.toLowerCase()
.includes(searchText);





const matchStatus =

statusFilter === "all"

||

college.status === statusFilter;



return matchSearch && matchStatus;



})

.sort((a,b)=>{


const statusOrder = {

pending:1,

approve:2,

rejected:3

};



return (

(statusOrder[a.status] || 0)

-

(statusOrder[b.status] || 0)

);


});






// ===============================
// Pagination
// ===============================


const totalPages = Math.ceil(

filteredColleges.length / itemsPerPage

);



const paginatedColleges = filteredColleges.slice(

(currentPage - 1) * itemsPerPage,

currentPage * itemsPerPage

);








return (

<div className="
min-h-screen
bg-gradient-to-br
from-blue-50
via-white
to-indigo-100
p-6
">






{/* Header */}


<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

className="
bg-gradient-to-r
from-blue-700
to-indigo-600
rounded-2xl
shadow-xl
p-6
text-white
mb-8
"

>


<div className="
flex
items-center
gap-4
">


<div className="
bg-white
text-blue-700
p-3
rounded-xl
shadow
">

<FaUniversity size={35}/>

</div>




<div>

<h1 className="
text-3xl
font-bold
">

College Registration Requests

</h1>


<p className="
text-blue-100
mt-1
">

Approve newly registered colleges

</p>


</div>


</div>


</motion.div>







{
loading &&

<div className="
text-center
text-blue-700
font-semibold
mb-5
">

Loading Colleges...

</div>

}







{/* Search Filter Section */}


<div className="
bg-white
rounded-xl
shadow
p-5
mb-6
flex
flex-col
md:flex-row
gap-4
justify-between
">



<input

type="text"

placeholder="Search college name, ID, email..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);

setCurrentPage(1);

}}

className="
border
rounded-lg
px-4
py-3
w-full
md:w-1/2
outline-none
focus:ring-2
focus:ring-blue-500
"

/>





<select

value={statusFilter}

onChange={(e)=>{

setStatusFilter(e.target.value);

setCurrentPage(1);

}}

className="
border
rounded-lg
px-4
py-3
"

>


<option value="all">
All Status
</option>


<option value="pending">
Pending
</option>


<option value="approve">
Approved
</option>


<option value="rejected">
Rejected
</option>


</select>







<select

value={itemsPerPage}

onChange={(e)=>{

setItemsPerPage(Number(e.target.value));

setCurrentPage(1);

}}

className="
border
rounded-lg
px-4
py-3
"

>


<option value="5">
5 / page
</option>


<option value="10">
10 / page
</option>


<option value="20">
20 / page
</option>


</select>



</div>







{/* Table Wrapper */}


<div className="
bg-white
rounded-2xl
shadow-xl
border
border-blue-100
overflow-hidden
">


<div className="
overflow-x-auto
">


<table className="
w-full
text-sm
text-left
">


<thead className="
bg-gradient-to-r
from-blue-700
to-indigo-600
text-white
">


<tr>


<th className="px-6 py-4">
College
</th>


<th className="px-6 py-4">
College ID
</th>


<th className="px-6 py-4">
University
</th>


<th className="px-6 py-4">
Category
</th>


<th className="px-6 py-4">
Email
</th>


<th className="px-6 py-4">
Status
</th>


<th className="px-6 py-4">
Action
</th>


</tr>


</thead>
<tbody>


{

paginatedColleges.length === 0 && !loading && (


<tr>

<td

colSpan="7"

className="
text-center
py-10
text-gray-500
text-lg
"

>

No College Registration Found

</td>

</tr>


)

}






{

paginatedColleges.map((college)=>(



<motion.tr


key={college._id}


initial={{
opacity:0,
y:10
}}


animate={{
opacity:1,
y:0
}}


className="
border-b
hover:bg-blue-50
transition
"


>





{/* College */}


<td className="
px-6
py-4
">


<div className="
flex
items-center
gap-3
">


<img

src={

college.logo

?

`${API_BASE_URL}${college.logo}`

:

"https://cdn-icons-png.flaticon.com/512/167/167707.png"

}


className="
w-12
h-12
rounded-full
object-cover
border-2
border-blue-300
"

/>



<div>


<p className="
font-semibold
text-gray-800
">

{college.collegeName}

</p>


<p className="
text-xs
text-gray-500
">

{college.collegeType}

</p>


</div>


</div>


</td>







{/* College ID */}

<td className="
px-6
py-4
font-medium
">

{college.collegeId}

</td>







{/* University */}

<td className="
px-6
py-4
">

{college.affiliatedUniversity}

</td>







{/* Category */}

<td className="
px-6
py-4
">

{college.category}

</td>







{/* Email */}

<td className="
px-6
py-4
">

{college.email_id}

</td>








{/* Status */}

<td className="
px-6
py-4
">


{

college.status === "approve"


?


<span className="
flex
items-center
gap-2
text-green-600
font-semibold
">


<FaCheckCircle/>

Approved


</span>


:


college.status === "rejected"


?


<span className="
text-red-600
font-semibold
">

Rejected

</span>


:


<span className="
flex
items-center
gap-2
text-yellow-600
font-semibold
">


<FaClock/>

Pending


</span>


}



</td>










{/* Action */}


<td className="
px-6
py-4
">


{


college.status !== "approve"

&&

college.status !== "rejected"

&&



<button


onClick={()=>handleStatusUpdate(

college._id,

"approve"

)}



className="
flex
items-center
gap-2
px-4
py-2
rounded-lg
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
font-semibold
hover:scale-105
transition
cursor-pointer
"


>


<FaCheckCircle/>

Approve


</button>


}





{

college.status === "approve"

&&


<span className="
text-green-600
font-semibold
">

Completed

</span>


}



</td>








</motion.tr>



))


}



</tbody>

</table>


</div>







{/* Pagination */}



<div className="
flex
flex-col
md:flex-row
justify-between
items-center
gap-4
p-5
border-t
bg-gray-50
">


{/* Record Info */}

<div className="
text-sm
text-gray-600
">

Showing

<span className="
font-semibold
mx-1
text-gray-800
">

{paginatedColleges.length}

</span>

of

<span className="
font-semibold
mx-1
text-gray-800
">

{filteredColleges.length}

</span>

colleges


</div>






{/* Pagination Buttons */}

<div className="
flex
items-center
gap-3
">


<button

disabled={currentPage === 1}

onClick={()=>setCurrentPage(prev=>prev-1)}

className="
px-4
py-2
rounded-xl
border
border-gray-300
bg-white
text-gray-700
font-medium
hover:bg-blue-50
hover:border-blue-400
disabled:opacity-40
disabled:cursor-not-allowed
transition
"

>

← Previous

</button>







<div className="
px-4
py-2
rounded-xl
bg-blue-600
text-white
font-semibold
shadow
">


{currentPage}

<span className="
mx-1
text-blue-200
">

/

</span>

{totalPages || 1}


</div>








<button

disabled={currentPage === totalPages || totalPages === 0}

onClick={()=>setCurrentPage(prev=>prev+1)}

className="
px-4
py-2
rounded-xl
border
border-gray-300
bg-white
text-gray-700
font-medium
hover:bg-blue-50
hover:border-blue-400
disabled:opacity-40
disabled:cursor-not-allowed
transition
"

>

Next →

</button>


</div>



</div>




</div>






</div>

);


}



export default CollegeRegistrationApproved;