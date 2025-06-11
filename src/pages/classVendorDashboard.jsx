import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import {
  FaGraduationCap,
  FaInfoCircle,
  FaBook,
  FaEnvelope,
  FaGlobe,
  FaImage,
  FaFire,
} from "react-icons/fa";
import {
  FaPhone,
  FaCalendarAlt,
  FaTags,
  FaChalkboard,
  FaBuilding,
  FaLayerGroup,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getCookie } from "../utlis/cookieHelper";

const ClassVendorDashboard = () => {
  const [classDetails, setClassDetails] = useState(null);
  const [classID, setClassId] = useState(null);
  const [readMore, setReadMore] = useState(false);

  // ✅ Fetch classID on component mount
  useEffect(() => {
    const storedClassId = getCookie("classId");
    console.log("Fetched ClassId ", classID);
    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  // To Fetch Class Details using get method
  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classID) return;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classID}`
        );
        console.log("Class details fetched:", response.data);

        const classData = response.data?.data?.class;
        setClassDetails({
          ...classData,
          category: classData?.category || "N/A", // Category
          description:
            classData?.info?.description || "No description available", //  Info Description
          address: classData?.address || {}, // Address
          imageGallery: Array.isArray(classData?.imageGallery)
            ? classData.imageGallery
            : [], // Image Gallery Section
        });
      } catch (error) {
        console.error(
          "Error fetching class details:",
          error?.response?.data || error.message || error.response?.data.errMsg
        );
      }
    };

    fetchClassDetails();
  }, [classID]);

  // Card Section function
  const HighlightCard = ({ icon, title, items }) => {
    return (
      <div className="bg-blue-50 rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 mb-2 text-blue-700">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-700">{items}</p>
      </div>
    );
  };

  // Function for Contact Section
  const ContactItem = ({ icon, label, value, link }) => {
    if (!value) return null;

    return (
      <div className="flex items-start gap-3">
        <div className="text-blue-600 mt-1">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-blue-800 hover:underline"
          >
            {value}
          </a>
        </div>
      </div>
    );
  };

  // Cards function
  const Card = ({ children }) => (
    <div className="bg-white rounded-xl shadow-md p-6">{children}</div>
  );

  // Card Header function
  const CardHeader = ({ icon, title }) => (
    <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-3 select-none">
      {icon} {title}
    </h2>
  );

  // Class Details Card function
  const InfoBadge = ({ icon, label }) => (
    <div className="flex items-center gap-2 bg-blue-800 bg-opacity-80 rounded-lg px-4 py-2 shadow-inner">
      <div className="text-white text-lg">{icon}</div>
      <span className="text-white">{label}</span>
    </div>
  );

  // If no Description then handled here
  if (!classDetails || !classDetails.description) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-600" />
          About the Class
        </h2>
        <p className="text-gray-700">No description provided.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen md:p-12 p-4 font-sans text-gray-800">
      {/* 🎓 Hero Header Section */}
      <section className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-10 relative group hover:shadow-2xl transition-shadow duration-500">
  {/* ✅ Main Image with Better Height Handling */}
  <div className="relative h-48 sm:h-60 md:h-72 lg:h-60">
    <img
      src={`${API_BASE_URL}${classDetails?.image}`}
      alt={classDetails?.className}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent h-full" />

    {/* Avatar & Info in Mobile-Friendly Flex */}
    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center gap-4 z-10">
      {/* Avatar Circle */}
      <div className="self-start sm:self-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1 shadow-xl">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 select-none">
            {classDetails?.className?.[0]}
          </div>
        </div>
      </div>

      {/* Info Glass Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl shadow-lg w-full sm:w-auto"
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold leading-snug drop-shadow-sm">
          {classDetails?.className}
        </h1>
        <p className="mt-1 text-sm sm:text-base font-medium text-white/90 truncate">
          {classDetails?.ownerOrInstituteName}
        </p>
      </motion.div>
    </div>
  </div>

  {/* ✅ Info Bar */}
  <div className="hidden sm:flex bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-3 flex-wrap justify-between items-center gap-3 text-sm sm:text-base font-semibold rounded-b-2xl">
  <InfoBadge
    icon={<FaCalendarAlt />}
    label={`Established: ${classDetails?.yearEstablished || "N/A"}`}
  />
  <InfoBadge
    icon={<FaPhone />}
    label={classDetails?.contactDetails || "N/A"}
  />
  <InfoBadge
    icon={<FaChalkboard />}
    label={classDetails?.modeOfTeaching?.join(", ") || "N/A"}
  />
  <InfoBadge
    icon={<FaTags />}
    label={
      classDetails?.keywords?.length > 0
        ? `${classDetails.keywords.slice(0, 2).join(", ")}${
            classDetails.keywords.length > 2 ? "..." : ""
          }`
        : "N/A"
    }
  />
</div>

</section>


      {/* 📄 Main Content Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side - Main Details */}
        <section className="lg:col-span-2 flex flex-col gap-10">
          {/* About Class */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              About the Class
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {readMore
                ? classDetails.description
                : `${classDetails.description.substring(0, 200)}...`}
              {classDetails.description.length > 200 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="ml-2 text-blue-600 font-medium hover:underline"
                >
                  {readMore ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          {/* Highlights */}
          <Card>
            <CardHeader
              icon={<FaBook className="text-blue-600" />}
              title="Key Highlights"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {/* Category */}
              <HighlightCard
                icon={<FaLayerGroup className="text-green-600" />}
                title="Category"
                items={[classDetails?.category?.join(", ") || "N/A"]}
              />
              {/* Type */}
              <HighlightCard
                icon={<FaBuilding className="text-red-600" />}
                title="Type"
                items={[classDetails?.franchiseOrIndependent || "N/A"]}
              />
              {/* Establised Year */}
              <HighlightCard
                icon={<FaCalendarAlt className="text-purple-600" />}
                title="Established year"
                items={[classDetails?.yearEstablished || "N/A"]}
              />
              {/* Mode Of Teaching */}
              <HighlightCard
                icon={<FaChalkboard className="text-pink-600" />}
                title="Mode Of Teaching"
                items={[classDetails?.modeOfTeaching?.join(", ") || "N/A"]}
              />
              {/* Keywords */}
              <HighlightCard
                icon={<FaTags className="text-pink-600" />}
                title="Keywords"
                items={[classDetails?.keywords?.join(", ") || "N/A"]}
              />
            </div>
          </Card>
        </section>

        {/* Right Side - Sidebar */}
        <aside className="flex flex-col gap-8">
          {/* Quick Contact Section */}
          <Card>
            <CardHeader
              icon={<FaPhone className="text-blue-600" />}
              title="Quick Contact"
            />
            <div className="flex flex-col gap-5 mt-4">
              {/* Contact Details */}
              <ContactItem
                icon={<FaPhone />}
                label="Phone"
                value={classDetails?.contactDetails}
                link={`tel:${classDetails?.contactDetails}`}
              />
              {/* Website */}
              <ContactItem
                icon={<FaGlobe />}
                label="Website"
                value={classDetails?.websiteURL}
                link={classDetails?.websiteURL}
              />
            </div>
          </Card>

          {/* Limited Time Offer -for discount and valid till field */}
          <div className="relative bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400 p-6 rounded-[2rem_0_2rem_0] shadow-2xl border-2 border-orange-400 select-none transition-transform hover:scale-[1.02] duration-300">
            {/* 🎁 Discount Label Ribbon */}
            <div className="absolute -top-4 left-4 bg-red-700 text-white px-4 py-1 text-xs font-bold rounded-br-xl shadow-md rotate-[-3deg]">
              🎁 Our Special Discount
            </div>

            {/* 🔥 Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaTags className="text-red-700 text-6xl drop-shadow-sm" />
                <h2 className="text-3xl font-extrabold text-red-900 uppercase tracking-wider drop-shadow-lg">
                  Limited Time Offer
                </h2>
              </div>

              <span className="bg-red-800 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center justify-center animate-bounce min-w-[100px] text-center">
                <FaFire /> Great Deals
              </span>
            </div>

            {/* 💰 Discount Info and Valid Till Section */}
            <div className="text-center text-red-900">
              <p className="text-6xl font-extrabold mb-1 leading-none drop-shadow-md">
                {classDetails?.discount || 0}
                <span className="text-3xl align-top">%</span> OFF
              </p>
              <p className="text-sm text-gray-900 font-semibold">
                Valid Till:{" "}
                <span className="font-bold">
                  {classDetails?.validTill
                    ? new Date(classDetails.validTill).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Image Gallery */}
      {classDetails?.imageGallery?.length > 0 && (
        <section className="max-w-7xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
            <FaImage className="text-blue-600" /> Image Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {classDetails.imageGallery.map((img, i) => (
              <img
                key={i}
                src={`${API_BASE_URL}${img}`}
                alt={`Gallery Image ${i + 1}`}
                className="w-full h-48 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassVendorDashboard;
