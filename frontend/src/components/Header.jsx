export default function Header() {
  return (
    <div className="max-w-8xl  mx-auto p-6 mb-5">

      <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow min-h-[500px]">

        {/* LEFT SIDE */}
        <div className="bg-white p-10 flex flex-col justify-center">

          <p className="text-sm text-indigo-500 bg-indigo-100 inline-block px-4 py-1 rounded-full mb-4">
            ● TRUSTED HEALTHCARE
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Book Appointment <br />
            With <span className="text-indigo-600">Trusted</span> Doctors
          </h1>

          <p className="text-gray-600 mt-6 max-w-md">
            Simply browse through our extensive list of trusted doctors,
            and schedule your appointment hassle-free.
          </p>

          {/* Buttons */}
         <div className="flex gap-4 mt-8">

  {/* Book Appointment */}
  <button
    onClick={() => {
      document.getElementById("speciality")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="px-6 py-3 border rounded-xl hover:bg-gray-100 flex items-center gap-2"
  >
    Book appointment →
  </button>

  {/* Browse Doctors */}
  <button
    onClick={() => {
      document.getElementById("top-doctors")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="px-6 py-3 border rounded-xl hover:bg-gray-100"
  >
    Browse doctors
  </button>

</div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gradient-to-br from-indigo-700 to-indigo-500 p-8 text-white flex flex-col justify-center">

          <div className="grid grid-cols-2 gap-6">

            {/* Card */}
            <div className="border border-white/30 rounded-xl p-6 text-center">
              <h2 className="text-3xl font-bold">20+</h2>
              <p className="text-sm opacity-80">Doctors</p>
            </div>

            <div className="border border-white/30 rounded-xl p-6 text-center">
              <h2 className="text-3xl font-bold">5k+</h2>
              <p className="text-sm opacity-80">Patients</p>
            </div>

            <div className="border border-white/30 rounded-xl p-6 text-center">
              <h2 className="text-3xl font-bold">5+</h2>
              <p className="text-sm opacity-80">Specialities</p>
            </div>

            <div className="border border-white/30 rounded-xl p-6 text-center">
              <h2 className="text-3xl font-bold">4.9★</h2>
              <p className="text-sm opacity-80">Rating</p>
            </div>

          </div>

          {/* Bottom strip */}
          <div className="flex justify-between mt-10 text-sm opacity-90 border-t border-white/20 pt-6">

            <p>24/7 SUPPORT</p>
            <p>100% VERIFIED</p>
            <p>FREE BOOKING</p>

          </div>

        </div>

      </div>

      {/* AVAILABLE DOCTORS */}
      {/* <div className="mt-6 bg-white p-6 rounded-2xl shadow">

        <p className="text-gray-500 mb-4">AVAILABLE DOCTORS</p>

        <div className="flex flex-wrap gap-4">

          {["Dr. R. Sharma","Dr. P. Kumar","Dr. A. Mehta","Dr. S. Gupta"].map((doc, i)=>(
            <div key={i} className="flex items-center gap-3 border px-4 py-2 rounded-full">

              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600">
                {doc.split(" ")[1][0]}
              </div>

              <div>
                <p className="text-sm font-medium">{doc}</p>
                <p className="text-xs text-gray-500">Specialist</p>
              </div>

              <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>

            </div>
          ))}

        </div>

      </div> */}

    </div>
  );
}