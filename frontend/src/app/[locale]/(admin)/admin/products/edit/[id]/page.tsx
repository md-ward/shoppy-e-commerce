const EditProductPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex w-full grow flex-col items-center py-4">
      <h1> edit product with id of {id}</h1>
    </div>
  );
};

export default EditProductPage;
