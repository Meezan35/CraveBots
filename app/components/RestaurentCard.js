const RestaurantCard = ({ resData }) => {
  const { dishName, cuisine, rating, time, image, spiceLevel, glutenFree, restaurantName } =
    resData;

  return (
    <div className="group bg-white shadow-md rounded-lg m-2 w-80 flex flex-col transform transition duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          className="w-full h-50 object-cover rounded-md transform transition duration-500 group-hover:scale-110"
          src={image}
          alt={dishName}
        />

        <span className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
          {restaurantName}
        </span>
      </div>
      <h3 className="text-lg font-bold mt-4 ml-2">{dishName} </h3>
      <h4 className="text-gray-600 mt-3 ml-2">{cuisine}</h4>
      <div className="flex gap-2 mt-4 ml-2">
        <h4 className="text-yellow-500">⭐{rating}</h4>
        <h4 className="text-gray-500">⏳{time}</h4>
        <h4 className="text-gray-500">🌶️{spiceLevel}</h4>
      </div>
      <div className="mt-auto flex flex-col items-start">
        {/* Badge placeholder (height fixed) */}
        <div className="h-8 mb-2">
          {glutenFree && (
            <span className="mt-2 ml-2 inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Gluten-free
            </span>
          )}
        </div>

        {/* Add to Order button */}
        <button className="cursor-pointer mt-4 block w-full p-2 bg-green-600 text-white rounded-lg">
          🛍️ Add to Order
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
