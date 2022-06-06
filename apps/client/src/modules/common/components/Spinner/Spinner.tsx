const Spinner = () => {
  return (
    <div
      data-testid="loading"
      className="mt-16 flex items-center justify-center"
    >
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner;
