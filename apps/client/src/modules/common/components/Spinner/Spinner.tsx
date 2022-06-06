const Spinner = () => {
  return (
    <div data-testid="loading" className="flex justify-center items-center mt-16">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner