export default function ContactPage() {
  return (
    <div className="bg-[url('/aboutbg.jpg')] min-h-screen flex bg-cover">
        <div className="min-h-screen w-[70%] ">
            <div className="absolute bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md top-[20%] left-[10%]">
                <h1 className="text-black text-2xl font-bold mb-6 text-center">Contact Us</h1>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>

            </div>
        </div>
        <div className="bg-green-600 min-h-screen w-[30%]"></div>
        
            <img
        src="https://th.bing.com/th/id/R.3aa2f1f6e9bb9887d33bde6e760a1804?rik=vI%2fEmZceCNiftQ&riu=http%3a%2f%2fwww.xburger.com%2fwp-content%2fuploads%2f2020%2f04%2fxburger-exploding-final-1280x971.png&ehk=WhxHp1nX%2bpW1XJQzG5AuzGF3r0erzTheGkFp3827RrU%3d&risl=&pid=ImgRaw&r=0"
        alt="Food"
        className="absolute top-[25%] right-[10%]  w-130 object-cover "
      />
      
    </div>
  );
}
