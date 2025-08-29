export default function AboutPage() {
  return (
    <div className="bg-[url('/aboutbg.jpg')] min-h-screen bg-cover text-gray-800 flex">
      <div className=" min-h-screen w-[70%]">
      <div className="absolute w-[50%] p-20">
        <h1 className="text-4xl font-bold mb-6">About Crave Bot</h1>
      <p className="text-lg mb-4">
        Crave Bot is your AI-powered food companion. Whether you’re craving 
        something spicy, sweet, colorful, or healthy, we help you discover the 
        perfect dish instantly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Why Crave Bot?</h2>
      <p className="mb-4">
        Choosing what to eat can be confusing. Crave Bot makes it simple by using 
        smart AI to recommend foods based on your cravings, taste, or even mood.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">How It Works</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Tell us your craving (taste, color, cuisine, mood).</li>
        <li>Our AI processes your input.</li>
        <li>We suggest the perfect food tailored just for you.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Vision</h2>
      <p>
        Our mission is to make food discovery fun, exciting, and stress-free. 
        With Crave Bot, you’ll never struggle with “what should I eat today?” again.
      </p>
      </div>
      </div>
       <div className="bg-green-600 min-h-screen w-[30%]"></div>
        
            <img
        src="/aboutImg.png"
        alt="Food"
        className="absolute top-[15%] right-[15%]  w-130 object-cover object-center"
      />
    </div>
  );
}
