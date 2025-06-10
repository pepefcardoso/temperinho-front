const RecipeSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-warm-200"></div>
        <div className="p-6">
            <div className="h-6 w-3/4 mb-4 bg-warm-200 rounded"></div>
            <div className="h-4 w-full mb-2 bg-warm-100 rounded"></div>
            <div className="h-4 w-5/6 mb-4 bg-warm-100 rounded"></div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-4 w-1/4 bg-warm-200 rounded"></div>
                <div className="h-8 w-8 bg-warm-200 rounded-full"></div>
            </div>
        </div>
    </div>
);

export default RecipeSkeleton;